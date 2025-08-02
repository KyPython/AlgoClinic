from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_execute_endpoint():
    code = "print('hello world')"
    response = client.post("/execute", json={"code": code})
    assert response.status_code == 200
    assert "hello world" in response.json()["output"]

def test_benchmark_endpoint():
    code = "print('hi')"
    response = client.post("/benchmark", json={"code": code})
    assert response.status_code == 200
    assert "output" in response.json()
    assert "runtime_seconds" in response.json()

def test_analyze_endpoint():
    code = "def foo():\n    pass"
    response = client.post("/analyze", json={"code": code})
    assert response.status_code == 200
    data = response.json()
    assert data["functions"] == 1
    assert "complexity" in data

def test_optimize_endpoint():
    code = "for i in range(10):\n    for j in range(10):\n        pass"
    response = client.post("/optimize", json={"code": code})
    assert response.status_code == 200
    assert "nested loops" in response.json().get("suggestions", [""])[0]