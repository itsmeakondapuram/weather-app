from flask import Flask, jsonify
import os

app = Flask(__name__)
threshold = int(os.getenv("TEMP_LIMIT", 35))

@app.route("/notify")
def notify():
    return jsonify({"alert": f"If temperature > {threshold}°C, send notification!"})

app.run(host="0.0.0.0", port=5000)

