from pydantic import BaseModel


class InteractionCreate(BaseModel):

    hcp_id: int

    interaction_type: str

    summary: str

    products: str

    sentiment: str

    next_action: str


class InteractionResponse(InteractionCreate):

    id: int

    class Config:
        from_attributes = True