import os
import time
import uuid
import subprocess
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import textwrap
import ast
from pymongo import MongoClient

client = MongoClient("your-mongodb-uri")
db = client.algoclinic
submissions = db.submissions

app = FastAPI()

# Update this to your deployed frontend domain for production!
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://algo-clinic-pp1wiibt8-kypythons-projects.vercel.app",
        "https://algoclinic-frontend.vercel.app",
        "https://algoclinic.vercel.app",
        "*",  # For testing only
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class CodeRequest(BaseModel):
    code: str
    language: str = "python"  # default to python

@app.post("/execute")
def execute_code(req: CodeRequest) -> dict[str, str | int]:
    ext = {"python": "py", "cpp": "cpp", "js": "js"}.get(req.language, "py")
    filename = f"user_code.{ext}"
    with open(filename, "w") as f:
        f.write(req.code)
    try:
        if req.language == "python":
            cmd = ["python", filename]
        elif req.language == "cpp":
            exe = "user_code.out"
            compile_res = subprocess.run(["g++", filename, "-o", exe], capture_output=True, text=True)
            if compile_res.returncode != 0:
                return {"output": "", "stderr": compile_res.stderr, "returncode": compile_res.returncode}
            cmd = [f"./{exe}"]
        elif req.language == "js":
            cmd = ["node", filename]
        else:
            return {"output": "", "stderr": f"Unsupported language: {req.language}", "returncode": 1}
        result = subprocess.run(cmd, capture_output=True, text=True, timeout=5)
        return {
            "output": result.stdout,
            "stderr": result.stderr,
            "returncode": result.returncode
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if os.path.exists(filename):
            os.remove(filename)
        if req.language == "cpp" and os.path.exists("user_code.out"):
            os.remove("user_code.out")

@app.post("/benchmark")
def benchmark_code(req: CodeRequest) -> dict[str, str | float]:
    ext = {"python": "py", "cpp": "cpp", "js": "js"}.get(req.language, "py")
    filename = f"user_code_bench.{ext}"
    exe = "user_code_bench.out"
    with open(filename, "w") as f:
        f.write(req.code)
    try:
        start = time.time()
        if req.language == "python":
            cmd = ["python", filename]
        elif req.language == "cpp":
            compile_res = subprocess.run(["g++", filename, "-o", exe], capture_output=True, text=True)
            if compile_res.returncode != 0:
                return {
                    "output": "",
                    "stderr": compile_res.stderr,
                    "runtime_seconds": 0,
                    "memory": "N/A (see notes for real memory profiling)"
                }
            cmd = [f"./{exe}"]
        elif req.language == "js":
            cmd = ["node", filename]
        else:
            return {
                "output": "",
                "stderr": f"Unsupported language: {req.language}",
                "runtime_seconds": 0,
                "memory": "N/A"
            }
        result = subprocess.run(cmd, capture_output=True, text=True, timeout=5)
        elapsed = time.time() - start
        return {
            "output": result.stdout,
            "stderr": result.stderr,
            "runtime_seconds": elapsed,
            "memory": "N/A (see notes for real memory profiling)"
        }
    except Exception as e:
        print("UNEXPECTED ERROR:", e)
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if os.path.exists(filename):
            os.remove(filename)
        if req.language == "cpp" and os.path.exists(exe):
            os.remove(exe)

@app.post("/analyze")
def analyze_code(req: CodeRequest) -> dict[str, int | str | list[str]]:
    lines = req.code.strip().split("\n")
    num_lines = len(lines)
    num_functions = sum(1 for l in lines if l.strip().startswith("def "))
    num_todos = sum(1 for l in lines if "TODO" in l)
    # Simple static analysis for complexity: count nested loops
    tree = ast.parse(req.code)
    class LoopVisitor(ast.NodeVisitor):
        def __init__(self):
            self.depth = 0
            self.max_depth = 0
        def visit_For(self, node: ast.For) -> None:
            self.depth += 1
            self.max_depth = max(self.max_depth, self.depth)
            self.generic_visit(node)
            self.depth -= 1
        def visit_While(self, node: ast.While) -> None:
            self.depth += 1
            self.max_depth = max(self.max_depth, self.depth)
            self.generic_visit(node)
            self.depth -= 1
    visitor = LoopVisitor()
    visitor.visit(tree)
    complexity = f"O(n^{visitor.max_depth})" if visitor.max_depth > 0 else "O(1)"
    return {
        "lines_of_code": num_lines,
        "functions": num_functions,
        "todos": num_todos,
        "edge_cases": ["Empty input", "Large input"],  # Example
        "complexity": complexity
    }

@app.post("/test")
def test_code(req: CodeRequest) -> dict[str, str | int]:
    ext = {"python": "py", "cpp": "cpp", "js": "js"}.get(req.language, "py")
    code_filename = f"user_code_test.{ext}"
    test_filename = f"test_{uuid.uuid4().hex}.py"
    exe = "user_code_test.out"
    with open(code_filename, "w") as f:
        f.write(req.code)
    # Write test code (Python only for now)
    test_code = textwrap.dedent("""
        from user_code_test import min_swaps

        def test_empty():
            assert min_swaps(0, 0) == 0

        def test_large():
            assert min_swaps(123456789, 987654321) >= 0
    """)
    with open(test_filename, "w") as f:
        f.write(test_code)
    try:
        if req.language == "python":
            result = subprocess.run(
                ["pytest", test_filename],
                capture_output=True,
                text=True,
                timeout=10
            )
        elif req.language == "cpp":
            # For C++, you would need to write and run C++ test code (not implemented here)
            return {
                "output": "",
                "stderr": "C++ testing not implemented yet.",
                "returncode": 1
            }
        elif req.language == "js":
            # For JS, you would need to write and run JS test code (not implemented here)
            return {
                "output": "",
                "stderr": "JavaScript testing not implemented yet.",
                "returncode": 1
            }
        else:
            return {
                "output": "",
                "stderr": f"Unsupported language: {req.language}",
                "returncode": 1
            }
        return {
            "output": result.stdout,
            "stderr": result.stderr,
            "returncode": result.returncode
        }
    except Exception as e:
        print("UNEXPECTED ERROR:", e)
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        for fn in [code_filename, test_filename]:
            if os.path.exists(fn):
                os.remove(fn)
        if req.language == "cpp" and os.path.exists(exe):
            os.remove(exe)

class BenchmarkRequest(BaseModel):
    code1: str
    code2: str

@app.post("/benchmark_compare")
def benchmark_compare(req: BenchmarkRequest) -> dict[str, float]:
    def run_benchmark(code: str) -> float:
        filename = f"user_code_{uuid.uuid4().hex}.py"
        with open(filename, "w") as f:
            f.write(code)
        try:
            start = time.time()
            subprocess.run(
                ["python", filename],
                capture_output=True,
                text=True,
                timeout=5
            )
            elapsed = time.time() - start
            return elapsed
        finally:
            if os.path.exists(filename):
                os.remove(filename)
    t1 = run_benchmark(req.code1)
    t2 = run_benchmark(req.code2)
    return {"runtime_1": t1, "runtime_2": t2}

@app.post("/optimize")
def optimize_code(req: CodeRequest) -> dict[str, list[str]]:
    # Example: detect nested loops
    tree = ast.parse(req.code)
    class LoopVisitor(ast.NodeVisitor):
        def __init__(self):
            self.depth = 0
            self.max_depth = 0
        def visit_For(self, node: ast.For) -> None:
            self.depth += 1
            self.max_depth = max(self.max_depth, self.depth)
            self.generic_visit(node)
            self.depth -= 1
        def visit_While(self, node: ast.While) -> None:
            self.depth += 1
            self.max_depth = max(self.max_depth, self.depth)
            self.generic_visit(node)
            self.depth -= 1
    visitor = LoopVisitor()
    visitor.visit(tree)
    suggestions: list[str] = []
    if visitor.max_depth > 1:
        suggestions.append("Consider reducing nested loops for better performance.")
    # Add more static analysis as needed
    return {"suggestions": suggestions}

@app.post("/submit_log")
def log_submission(data: dict[str, object]):
    submissions.insert_one(data)
    return {"status": "logged"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)