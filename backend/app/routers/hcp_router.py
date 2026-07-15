from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import SessionLocal
from app.database.database import get_db

from app.models.hcp import HCP

from app.schemas.hcp_schema import HCPCreate

router = APIRouter(prefix="/hcp", tags=["HCP"])


@router.post("/")
def create_hcp(data: HCPCreate):

    db: Session = SessionLocal()

    doctor = HCP(
        name=data.name,
        speciality=data.speciality,
        hospital=data.hospital,
        city=data.city
    )

    db.add(doctor)

    db.commit()

    db.refresh(doctor)

    db.close()

    return doctor


@router.get("/")
def get_all():

    db = SessionLocal()

    doctors = db.query(HCP).all()

    db.close()

    return doctors

@router.get("/")
def get_all_hcps(db: Session = Depends(get_db)):
    return db.query(HCP).all()
