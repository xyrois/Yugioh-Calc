from pydantic import BaseModel

class Requirement(BaseModel):
    name: str
    copies: int
    min: int
    max: int

class DeckInput(BaseModel):
    deck_size: int
    hand_size: int
    requirements: list[Requirement]