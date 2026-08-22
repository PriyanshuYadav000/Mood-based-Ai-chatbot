const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const chatMessages = document.getElementById("chatMessages");

const moodOptions = document.querySelectorAll(".mood-option");

let selectedMood = "supportive";




moodOptions.forEach((option) => {
    option.addEventListener("click", () => {

        moodOptions.forEach((item) => {
            item.classList.remove("active");
        });

        option.classList.add("active");

        selectedMood = option.dataset.mood;
    });
});




chatForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const message = userInput.value.trim();

    if (!message) {
        return;
    }

    // Show user message immediately
    addUserMessage(message);

    // Clear input
    userInput.value = "";

    try {

        const response = await fetch("http://127.0.0.1:8000/chat", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                message: message,
                mood: selectedMood
            })
        });

        if (!response.ok) {
            throw new Error(
                `Server returned ${response.status}`
            );
        }

        const data = await response.json();

        addBotMessage(data.response);

    } catch (error) {

        console.error("Chat error:", error);

        addBotMessage(
            "Sorry, I couldn't connect to the chatbot server."
        );
    }
});




function addUserMessage(message) {

    const row = document.createElement("div");

    row.className = "message-row";

    row.innerHTML = `
        <div class="message user-message">
            ${escapeHtml(message)}
        </div>
    `;

    chatMessages.appendChild(row);

    scrollToBottom();
}



function addBotMessage(message) {

    const row = document.createElement("div");

    row.className = "message-row bot-row";

    row.innerHTML = `
        <div class="avatar bot-avatar">
            ✦
        </div>

        <div class="message bot-message">

            <span class="message-label">
                MoodMate AI
            </span>

            <p>
                ${escapeHtml(message)}
            </p>

        </div>
    `;

    chatMessages.appendChild(row);

    scrollToBottom();
}




function scrollToBottom() {

    chatMessages.scrollTop =
        chatMessages.scrollHeight;
}


function escapeHtml(text) {

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;
}