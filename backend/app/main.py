from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.base import Base
from app.database.database import engine

from app.models import hcp
from app.models import interaction

from app.routers.hcp_router import router as hcp_router
from app.routers.interaction_router import router as interaction_router
from app.routers.agent import router as agent_router
from app.routers.stats_router import router as stats_router
Base.metadata.create_all(bind=engine)

app = FastAPI(title="AI First CRM")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(hcp_router)
app.include_router(interaction_router)

app.include_router(
    agent_router,
    prefix="/agent",
    tags=["AI Agent"]
)
app.include_router(stats_router)
@app.get("/")
def home():
    return {"status": "Running"}