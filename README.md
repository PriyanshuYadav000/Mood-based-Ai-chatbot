# MoodMate AI

**Mood-based conversational AI chatbot built with LangChain, Groq, FastAPI, HTML, CSS, and JavaScript.**

MoodMate AI is a full-stack AI chatbot that lets users choose a conversational mood and receive responses adapted to that style. The project started as a LangChain chat-model experiment and is being developed into a complete AI application with a dedicated frontend and backend.

## ✨ Features

* 🤝 Supportive mode for empathetic responses
* 😊 Happy mode for positive and enthusiastic responses
* 😢 Sad mode for gentle and compassionate responses
* 😂 Funny mode for playful and humorous responses
* 😌 Calm mode for relaxed and reassuring responses
* 💪 Motivational mode for encouraging responses
* 🌙 Dark mode / ☀️ Light mode
* 💬 Interactive web-based chat interface
* 🔗 LangChain integration
* ⚡ Groq API for fast LLM inference
* 🚀 FastAPI backend
* 🎨 Responsive HTML/CSS/JavaScript frontend

## 🏗️ Architecture

```text
┌──────────────────────────────┐
│          Frontend            │
│      HTML + CSS + JS         │
└──────────────┬───────────────┘
               │
               │ POST /chat
               ▼
┌──────────────────────────────┐
│          FastAPI             │
│         Backend API          │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│          LangChain           │
│       Chat Model Layer       │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│            Groq              │
│       GPT-OSS-20B            │
└──────────────────────────────┘
```

## 🧠 How Mood-Based Responses Work

The frontend sends both the user's message and the selected mood to the backend.

```json
{
  "message": "I had a difficult day",
  "mood": "supportive"
}
```

FastAPI receives the request and selects a system prompt based on the chosen mood.

```text
User message + Selected mood
            ↓
       FastAPI /chat
            ↓
      Mood-specific prompt
            ↓
         LangChain
            ↓
           Groq
            ↓
      AI-generated response
```

## 🛠️ Tech Stack

### AI / LLM

* LangChain
* Groq API
* GPT-OSS-20B

### Backend

* Python
* FastAPI
* Uvicorn

### Frontend

* HTML5
* CSS3
* JavaScript

### Environment / Development

* uv
* Python virtual environment
* Git
* GitHub

## 📁 Project Structure

```text
Mood-based-Ai-chatbot/
│
├── backend/
│   └── main.py
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
└── README.md
```

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/PriyanshuYadav000/Mood-based-Ai-chatbot.git
cd Mood-based-Ai-chatbot
```

### 2. Create the environment

```bash
uv venv --python 3.12
```

### 3. Install dependencies

```bash
uv sync
```

### 4. Configure environment variables

Create a `.env` file:

```env
GROQ_API_KEY=your_groq_api_key
```

Never commit your `.env` file or expose your API key publicly.

### 5. Start the backend

```bash
uv run uvicorn backend.main:app --reload
```

The backend will run at:

```text
http://127.0.0.1:8000
```

### 6. Start the frontend

In another terminal:

```bash
cd frontend
python3 -m http.server 5500
```

Open:

```text
http://127.0.0.1:5500
```

## 🎯 Current Status

MoodMate AI currently supports:

* Full web chat interface
* Mood selection
* Mood-specific AI responses
* FastAPI backend
* LangChain + Groq integration
* Light and dark themes

## 🔮 Future Improvements

The project will evolve toward a more production-oriented AI system with planned improvements such as:

* Automatic mood detection instead of manual selection
* Conversation memory
* Streaming responses
* Better prompt management
* Persistent chat history
* RAG capabilities
* Tool calling and agents
* Authentication
* Production deployment
* Improved observability and evaluation

## 👨‍💻 Author

**Priyanshu Yadav**

GitHub: [PriyanshuYadav000](https://github.com/PriyanshuYadav000)

---

**MoodMate AI — Your AI companion, your mood, your conversation.**
