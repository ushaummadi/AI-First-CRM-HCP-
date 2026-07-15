from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from app.database.base import Base


class HCP(Base):
    __tablename__ = "hcps"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    speciality = Column(String(100))
    hospital = Column(String(150))
    city = Column(String(100))

    interactions = relationship(
        "Interaction",
        back_populates="hcp",
        cascade="all, delete-orphan"
    )