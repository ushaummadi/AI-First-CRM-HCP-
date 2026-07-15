from fastapi import APIRouter

from pydantic import BaseModel

from app.agents.graph import graph
from app.services.crud_service import total_hcps, total_interactions

router = APIRouter()


class ChatRequest(BaseModel):
    message: str


@router.post("/chat")
def chat(data: ChatRequest):

    result = graph.invoke(
        {
            "message": data.message
        }
    )

    return {
        "response": result["response"]
    }
