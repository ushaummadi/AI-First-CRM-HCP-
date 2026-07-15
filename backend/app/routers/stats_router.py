from fastapi import APIRouter
from app.services.crud_service import total_hcps, total_interactions

router = APIRouter(
    prefix="/stats",
    tags=["Statistics"]
)

@router.get("/")
def stats():
    return {
        "total_hcps": total_hcps(),
        "total_interactions": total_interactions()
    }