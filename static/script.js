const input = document.getElementById("chat-input");
const sendBtn = document.getElementById("send-btn");
const chatContainer = document.getElementById("chat-container");
let isLoading = false;

sendBtn.addEventListener("click", sendMessage);
input.addEventListener("keydown", function (e) {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

function addMessage(text, sender) {
  const message = document.createElement("div");
  message.className = `chatbot-message ${sender}`;
  message.innerHTML = text;
  chatContainer.appendChild(message);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

async function sendMessage() {
  const text = input.value.trim();
  if (!text || isLoading) return;

  addMessage(text, "user");
  input.value = "";
  isLoading = true;

  try {
    const res = await fetch("https://pokemon-chatbot.onrender.com/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text }),
    });

    const data = await res.json();
    addMessage(data.reply, "bot");

  } catch (error) {
    console.error(error);
    addMessage("Something went wrong!", "bot");
  } finally {
    isLoading = false;
  }
}
