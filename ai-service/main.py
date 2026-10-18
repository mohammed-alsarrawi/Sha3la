from fastapi import FastAPI, Header, HTTPException
from pydantic import BaseModel
from agent import run_agent
from config import INTERNAL_API_KEY

app = FastAPI()


class ChatRequest(BaseModel):
    message: str
    history: list = []


@app.post("/chat")
def chat(
    req: ChatRequest,
    x_internal_key: str = Header(None),
    x_auth_token: str = Header(None),
):
    if not INTERNAL_API_KEY or x_internal_key != INTERNAL_API_KEY:
        raise HTTPException(status_code=403, detail="Forbidden")
    return {"reply": run_agent(req.message, req.history, auth_token=x_auth_token)}