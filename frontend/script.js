const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const chatMessages = document.getElementById("chatMessages");

const moodOptions = document.querySelectorAll(".mood-option");
const themeToggle = document.getElementById("themeToggle");

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




themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    const isDarkMode =
        document.body.classList.contains("dark-mode");

    themeToggle.textContent =
        isDarkMode ? "☀️" : "🌙";

    themeToggle.setAttribute(
        "aria-label",
        isDarkMode
            ? "Switch to light mode"
            : "Switch to dark mode"
    );
});



chatForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const message = userInput.value.trim();

    if (!message) {
        return;
    }

    addUserMessage(message);

    userInput.value = "";

    userInput.focus();


    try {

        const response = await fetch(
            "http://127.0.0.1:8000/chat",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    message: message,
                    mood: selectedMood
                })
            }
        );


        if (!response.ok) {

            throw new Error(
                `Server returned ${response.status}`
            );
        }


        const data = await response.json();

        addBotMessage(data.response);

    } catch (error) {

        console.error(
            "Chat error:",
            error
        );

        addBotMessage(
            "Sorry, I couldn't connect to the chatbot server."
        );
    }
});


function addUserMessage(message) {

    const row =
        document.createElement("div");

    row.className = "message-row";


    const bubble =
        document.createElement("div");

    bubble.className =
        "message user-message";

    bubble.textContent = message;


    row.appendChild(bubble);

    chatMessages.appendChild(row);

    scrollToBottom();
}




function addBotMessage(message) {

    const row =
        document.createElement("div");

    row.className =
        "message-row bot-row";


    const avatar =
        document.createElement("div");

    avatar.className =
        "avatar bot-avatar";

    avatar.textContent = "✦";


    const bubble =
        document.createElement("div");

    bubble.className =
        "message bot-message";


    const label =
        document.createElement("span");

    label.className =
        "message-label";

    label.textContent =
        "MoodMate AI";


    const text =
        document.createElement("p");

    text.textContent = message;


    bubble.appendChild(label);
    bubble.appendChild(text);

    row.appendChild(avatar);
    row.appendChild(bubble);

    chatMessages.appendChild(row);

    scrollToBottom();
}



function scrollToBottom() {

    chatMessages.scrollTop =
        chatMessages.scrollHeight;
}