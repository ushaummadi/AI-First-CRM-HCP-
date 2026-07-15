from fastapi import APIRouter
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.database.database import SessionLocal
from app.models.interaction import Interaction
from app.schemas.interaction_schema import InteractionCreate
from fastapi.responses import StreamingResponse
from io import StringIO
import pandas as pd
from app.services.crud_service import (
    delete_interaction,
    update_interaction,
)

router = APIRouter(
    prefix="/interactions",
    tags=["Interactions"]
)


class UpdateSummary(BaseModel):
    summary: str


@router.post("/")
def create_interaction(data: InteractionCreate):

    db: Session = SessionLocal()

    interaction = Interaction(
        hcp_id=data.hcp_id,
        interaction_type=data.interaction_type,
        summary=data.summary,
        products=data.products,
        sentiment=data.sentiment,
        next_action=data.next_action,
    )

    db.add(interaction)
    db.commit()
    db.refresh(interaction)
    db.close()

    return interaction


@router.get("/")
def get_all():

    db = SessionLocal()

    records = db.query(Interaction).all()

    db.close()

    return records


@router.delete("/{interaction_id}")
def delete(interaction_id: int):
    return delete_interaction(interaction_id)


@router.put("/{interaction_id}")
def update(interaction_id: int, data: UpdateSummary):
    return update_interaction(
        interaction_id,
        data.summary,
    )
@router.get("/recent")
def recent_interactions():
    db = SessionLocal()

    records = (
        db.query(Interaction)
        .order_by(Interaction.id.desc())
        .limit(5)
        .all()
    )

    db.close()

    return records
@router.get("/export")
def export_interactions():
    db = SessionLocal()

    interactions = db.query(Interaction).all()

    db.close()

    data = []

    for i in interactions:
        data.append({
            "ID": i.id,
            "Type": i.interaction_type,
            "Summary": i.summary,
            "Product": i.products,
            "Sentiment": i.sentiment,
            "Next Action": i.next_action,
        })

    df = pd.DataFrame(data)

    stream = StringIO()
    df.to_csv(stream, index=False)

    response = StreamingResponse(
        iter([stream.getvalue()]),
        media_type="text/csv"
    )

    response.headers[
        "Content-Disposition"
    ] = "attachment; filename=interactions.csv"

    return response