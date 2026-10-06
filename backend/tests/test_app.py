from app import app


def test_health():
    client = app.test_client()

    response = client.get("/health")

    assert response.status_code == 200
    assert response.json["status"] == "healthy"


def test_status():
    client = app.test_client()

    response = client.get("/api/status")

    assert response.status_code == 200
    assert response.json["application"] == "DevOps Cloud Platform"
    assert response.json["status"] == "operational"