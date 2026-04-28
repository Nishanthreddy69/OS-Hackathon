from flask import Flask, jsonify
from flask_cors import CORS
import random

app = Flask(__name__)   # MUST be here
CORS(app)

# ---------- STATIC ----------
@app.route('/static')
def run_static():
    processes = [random.randint(1, 10) for _ in range(6)]
    cores = [0, 0, 0]

    for i, p in enumerate(processes):
        cores[i % 3] += p

    return jsonify({
        "message": "Static Scheduling Done",
        "cores": cores
    })

# ---------- DYNAMIC ----------
@app.route('/dynamic')
def run_dynamic():
    processes = [random.randint(1, 10) for _ in range(6)]
    cores = [0, 0, 0]

    for p in processes:
        min_core = cores.index(min(cores))
        cores[min_core] += p

    return jsonify({
        "message": "Dynamic Scheduling Done",
        "cores": cores
    })

# ---------- RUN ----------
if __name__ == '__main__':
    app.run(debug=True)