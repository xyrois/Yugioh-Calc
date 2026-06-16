from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from calculations import hypergeom_probability
from models import DeckInput

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
    "http://localhost:5173",
    "https://your-vercel-app.vercel.app"
    ],
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.post("/analyze")
def analyze(deck: DeckInput):

    first_results = []
    second_results = []

    for requirement in deck.requirements:

        first_probability = hypergeom_probability(
            deck_size=deck.deck_size,
            copies=requirement.copies,
            hand_size=deck.hand_size,
            min_cards=requirement.min,
            max_cards=requirement.max,
        )

        second_probability = hypergeom_probability(
            deck_size=deck.deck_size,
            copies=requirement.copies,
            hand_size=deck.hand_size + 1,
            min_cards=requirement.min,
            max_cards=requirement.max,
        )

        first_results.append(first_probability)
        second_results.append(second_probability)

    opening_first = min(first_results)
    opening_second = min(second_results)

    return {
        "going_first": round(opening_first * 100, 2),
        "going_second": round(opening_second * 100, 2),
    }