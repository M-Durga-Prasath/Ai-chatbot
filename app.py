from flask import Flask, request, jsonify, send_from_directory
from Chatbot import handle_query
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all domains


@app.route("/")
def serve_index():
    return send_from_directory("static", "index.html")


@app.route("/ask", methods=["POST"])
def ask():
    try:
        data = request.get_json(force=True)
        if not data or "message" not in data:
            return jsonify({"error": "Missing 'message' in JSON payload"}), 400

        user_message = data["message"]
        response = handle_query(user_message)
        return jsonify({"reply": response})

    except Exception as e:
        print("Error processing request:", e)
        return jsonify({"error": "Invalid request"}), 400

if __name__ == "__main__":
    app.run(debug=True)
