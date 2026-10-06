from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/health")
def health():
    return jsonify({
        "status": "healthy",
        "service": "devops-cloud-platform"
    }), 200


@app.route("/api/status")
def status():
    return jsonify({
        "application": "DevOps Cloud Platform",
        "environment": "development",
        "version": "2.0.0",
        "deployment": "Kubernetes",
        "container": "Docker",
        "ci_cd": "Jenkins",
        "monitoring": "Prometheus + Grafana",
        "status": "operational"
    }), 200


if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5000,
        debug=False
    )