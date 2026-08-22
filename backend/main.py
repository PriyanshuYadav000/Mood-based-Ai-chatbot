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


@app.get("/")
def root():
    return {"message": "Mood-Based AI Chatbot API is running"}


@app.post("/chat")
def chat(request: ChatRequest):

    messages = [
        SystemMessage(
            content=(
                "You are a mood-based AI chatbot. "
                "Your responses should reflect the user's mood "
                "and provide empathetic and supportive replies."
            )
        ),
        HumanMessage(content=request.message),
    ]

    response = model.invoke(messages)

    return {
        "response": response.content
    }