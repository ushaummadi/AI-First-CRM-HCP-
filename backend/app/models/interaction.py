from sqlalchemy import Column, Integer, String, ForeignKey, Text, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from app.database.base import Base


class Interaction(Base):
    __tablename__ = "interactions"

    id = Column(Integer, primary_key=True, index=True)

    hcp_id = Column(Integer, ForeignKey("hcps.id"))

    interaction_type = Column(String(50))
    summary = Column(Text)
    products = Column(Text)
    sentiment = Column(String(50))
    next_action = Column(Text)

    created_at = Column(DateTime(timezone=True), server_default=func.now())

    hcp = relationship("HCP", back_populates="interactions")