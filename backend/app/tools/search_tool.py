from app.database.database import SessionLocal
from app.models.hcp import HCP


def search_hcp(state):
    """
    LangGraph Tool
    Search Healthcare Professional from MySQL
    """

    db = SessionLocal()

    query = state["message"].strip()

    doctor = (
        db.query(HCP)
        .filter(HCP.name.ilike(f"%{query}%"))
        .first()
    )

    db.close()

    if not doctor:
        return {
            "response": "No Healthcare Professional found."
        }

    return {
        "response": f"""
Doctor Name : {doctor.name}

Speciality : {doctor.speciality}

Hospital : {doctor.hospital}

City : {doctor.city}
"""
    }