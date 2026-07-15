from sqlalchemy.orm import Session

from app.database.database import SessionLocal
from app.models.hcp import HCP
from app.models.interaction import Interaction


def get_db():
    return SessionLocal()


from sqlalchemy import func

def get_hcp_by_name(name):

    db = get_db()

    # Remove newlines and extra spaces
    name = " ".join(name.replace("\n", " ").split())

    print("Searching for:", repr(name))

    doctors = db.query(HCP).all()

    print("Doctors in DB:")
    for d in doctors:
        print(d.id, repr(d.name))

    doctor = (
        db.query(HCP)
        .filter(func.trim(func.lower(HCP.name)) == func.trim(func.lower(name)))
        .first()
    )

    if doctor is None:
        doctor = (
            db.query(HCP)
            .filter(HCP.name.ilike(f"%{name}%"))
            .first()
        )

    print("Found:", doctor)

    db.close()

    return doctor
def get_interactions_by_doctor(name):

    db = get_db()

    doctor = db.query(HCP).filter(
        HCP.name.ilike(f"%{name.strip()}%")
    ).first()

    if not doctor:
        db.close()
        return None

    interactions = db.query(Interaction).filter(
        Interaction.hcp_id == doctor.id
    ).all()

    db.close()

    return interactions

def save_interaction(
        hcp_id,
        interaction_type,
        summary,
        products,
        sentiment,
        next_action
):

    db = get_db()

    interaction = Interaction(
        hcp_id=hcp_id,
        interaction_type=interaction_type,
        summary=summary,
        products=products,
        sentiment=sentiment,
        next_action=next_action
    )

    db.add(interaction)

    db.commit()

    db.refresh(interaction)

    db.close()

    return interaction

def update_interaction(interaction_id, summary):

    db = get_db()

    interaction = db.query(Interaction).filter(
        Interaction.id == interaction_id
    ).first()

    if not interaction:
        db.close()
        return None

    interaction.summary = summary

    db.commit()
    db.refresh(interaction)

    db.close()

    return interaction
def total_hcps():

    db = get_db()
    count = db.query(HCP).count()
    db.close()

    return count


def total_interactions():

    db = get_db()
    count = db.query(Interaction).count()
    db.close()

    return count
def delete_interaction(interaction_id):

    db = get_db()

    interaction = db.query(Interaction).filter(
        Interaction.id == interaction_id
    ).first()

    if interaction:
        db.delete(interaction)
        db.commit()

    db.close()

    return {"message": "Interaction Deleted"}
def edit_summary(interaction_id, summary):

    db = get_db()

    interaction = db.query(Interaction).filter(
        Interaction.id == interaction_id
    ).first()

    if interaction:
        interaction.summary = summary
        db.commit()

    db.close()

    return interaction
def get_latest_interaction():

    db = get_db()

    interaction = (
        db.query(Interaction)
        .order_by(Interaction.id.desc())
        .first()
    )

    db.close()

    return interaction
