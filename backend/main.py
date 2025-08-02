import os
import time
import uuid
import docker
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import textwrap
import ast

app = FastAPI()

# Add CORS middleware after app is created
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or specify your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

docker_client = docker.from_env()

class CodeRequest(BaseModel):
    code: str

@app.post("/execute")
def execute_code(req: CodeRequest):
    filename = f"user_code_{uuid.uuid4().hex}.py"
    with open(filename, "w") as f:
        f.write(req.code)
    try:
        output = docker_client.containers.run(
            image="python:3.11",
            command=f"python /code/{filename}",
            volumes={os.path.abspath('.'): {"bind": "/code", "mode": "rw"}},
            working_dir="/code",
            remove=True,
            network_disabled=True,
            mem_limit="128m",
            stderr=True,
            stdout=True,
            detach=False,
        )
        return {"output": output.decode()}
    except docker.errors.ContainerError as e:
        return {"error": e.stderr.decode() if e.stderr else str(e)}
    except Exception as e:
        print("UNEXPECTED ERROR:", e)
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if os.path.exists(filename):
            os.remove(filename)

@app.post("/benchmark")
def benchmark_code(req: CodeRequest):
    filename = f"user_code_{uuid.uuid4().hex}.py"
    with open(filename, "w") as f:
        f.write(req.code)
    try:
        start = time.time()
        output = docker_client.containers.run(
            image="python:3.11",
            command=f"python /code/{filename}",
            volumes={os.path.abspath('.'): {"bind": "/code", "mode": "rw"}},
            working_dir="/code",
            remove=True,
            network_disabled=True,
            mem_limit="128m",
            stderr=True,
            stdout=True,
            detach=False,
        )
        elapsed = time.time() - start
        return {
            "output": output.decode(),
            "runtime_seconds": elapsed,
            "memory": "N/A (see notes for real memory profiling)"
        }
    except docker.errors.ContainerError as e:
        return {"error": e.stderr.decode() if e.stderr else str(e)}
    except Exception as e:
        print("UNEXPECTED ERROR:", e)
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if os.path.exists(filename):
            os.remove(filename)

@app.post("/analyze")
def analyze_code(req: CodeRequest):
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
        def visit_For(self, node):
            self.depth += 1
            self.max_depth = max(self.max_depth, self.depth)
            self.generic_visit(node)
            self.depth -= 1
        def visit_While(self, node):
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
def test_code(req: CodeRequest):
    code_filename = f"user_code_{uuid.uuid4().hex}.py"
    test_filename = f"test_{uuid.uuid4().hex}.py"
    # Write user code
    with open(code_filename, "w") as f:
        f.write(req.code)
    # Write test code (example: you can generate this dynamically)
    test_code = textwrap.dedent("""
        from user_code import min_swaps

        def test_empty():
            assert min_swaps(0, 0) == 0

        def test_large():
            assert min_swaps(123456789, 987654321) >= 0
    """)
    with open(test_filename, "w") as f:
        f.write(test_code)
    try:
        output = docker_client.containers.run(
            image="python:3.11",
            command=f"pytest /code/{test_filename}",
            volumes={os.path.abspath('.'): {"bind": "/code", "mode": "rw"}},
            working_dir="/code",
            remove=True,
            network_disabled=True,
            mem_limit="128m",
            stderr=True,
            stdout=True,
            detach=False,
        )
        return {"output": output.decode()}
    except Exception as e:
        print("UNEXPECTED ERROR:", e)
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        for fn in [code_filename, test_filename]:
            if os.path.exists(fn):
                os.remove(fn)

class BenchmarkRequest(BaseModel):
    code1: str
    code2: str

@app.post("/benchmark_compare")
def benchmark_compare(req: BenchmarkRequest):
    def run_benchmark(code):
        filename = f"user_code_{uuid.uuid4().hex}.py"
        with open(filename, "w") as f:
            f.write(code)
        try:
            start = time.time()
            output = docker_client.containers.run(
                image="python:3.11",
                command=f"python /code/{filename}",
                volumes={os.path.abspath('.'): {"bind": "/code", "mode": "rw"}},
                working_dir="/code",
                remove=True,
                network_disabled=True,
                mem_limit="128m",
                stderr=True,
                stdout=True,
                detach=False,
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
def optimize_code(req: CodeRequest):
    # Example: detect nested loops
    tree = ast.parse(req.code)
    nested_loops = False
    class LoopVisitor(ast.NodeVisitor):
        def __init__(self):
            self.depth = 0
            self.max_depth = 0
        def visit_For(self, node):
            self.depth += 1
            self.max_depth = max(self.max_depth, self.depth)
            self.generic_visit(node)
            self.depth -= 1
        def visit_While(self, node):
            self.depth += 1
            self.max_depth = max(self.max_depth, self.depth)
            self.generic_visit(node)
            self.depth -= 1
    visitor = LoopVisitor()
    visitor.visit(tree)
    suggestions = []
    if visitor.max_depth > 1:
        suggestions.append("Consider reducing nested loops for better performance.")
    # Add more static analysis as needed
    return {"suggestions": suggestions}