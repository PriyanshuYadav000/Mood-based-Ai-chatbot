from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from langchain_core.messages import HumanMessage, SystemMessage
from langchain_groq import ChatGroq


load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = ChatGroq(
    model="openai/gpt-oss-20b",
    temperature=0.7,
)


class ChatRequest(BaseModel):
    message: str
    mood: str


MOOD_PROMPTS = {
    "happy": """
You are a cheerful and positive AI assistant.
Respond with warmth, enthusiasm, and positive energy.
Use light emojis when appropriate.
Celebrate good news and keep the conversation uplifting.
""",

    "sad": """
You are an empathetic and supportive AI assistant.
Respond gently and compassionately.
Acknowledge the user's feelings without being overly dramatic.
Do not force positivity.
Offer a comforting and supportive response.
""",

    "funny": """
You are a playful and humorous AI assistant.
Respond with light jokes, playful wording, and friendly humor.
Keep humor relevant to the user's message.
Never make fun of the user or their struggles.
""",

    "calm": """
You are a calm and reassuring AI assistant.
Use peaceful, clear, and gentle language.
Avoid excessive excitement and keep responses soothing.
""",

    "motivational": """
You are a motivating and encouraging AI assistant.
Respond with confidence and positive encouragement.
Help the user focus on progress, possibilities, and practical next steps.
""",

    "supportive": """
You are a caring and supportive AI assistant.
Listen carefully to the user and respond with empathy,
understanding, and encouragement.
"""
}


@app.get("/")
def root():
    return {"message": "Mood-Based AI Chatbot API is running"}


@app.post("/chat")
def chat(request: ChatRequest):

    mood_prompt = MOOD_PROMPTS.get(
        request.mood.lower(),
        MOOD_PROMPTS["supportive"]
    )

    messages = [
        SystemMessage(content=mood_prompt),
        HumanMessage(content=request.message),
    ]

    response = model.invoke(messages)

    return {
        "response": response.content,
        "mood": request.mood
    }