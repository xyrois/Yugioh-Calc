from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from calculations import multivariate_hypergeom_probability
from models import DeckInput

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://yugioh-calc.vercel.app"
    ],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/analyze")
def analyze(deck: DeckInput):

    reqs = [
        {"copies": r.copies, "min": r.min, "max": r.max}
        for r in deck.requirements
    ]

    opening_first = multivariate_hypergeom_probability(
        deck_size=deck.deck_size,
        hand_size=deck.hand_size,
        requirements=reqs,
    )

    opening_second = multivariate_hypergeom_probability(
        deck_size=deck.deck_size,
        hand_size=deck.hand_size + 1,
        requirements=reqs,
    )

    return {
        "going_first": round(opening_first * 100, 2),
        "going_second": round(opening_second * 100, 2),
    }