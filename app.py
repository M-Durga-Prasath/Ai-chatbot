from flask import Flask, request, jsonify
from Chatbot import handle_query  
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS so frontend can call backend from localhost

@app.route("/ask", methods=["POST"])
def ask():
    data = request.get_json()
    user_message = data.get("message", "")
    response = handle_query(user_message)
    return jsonify({"reply": response})

if __name__ == "__main__":
    app.run()
