# Yu-Gi-Oh Deck Probability Calculator

A full-stack web application that calculates the probability of opening key cards in a Yu-Gi-Oh! deck using hypergeometric distribution. The tool allows users to evaluate deck consistency going first vs. going second based on card requirements.

Live Application: https://yugioh-calc.vercel.app/

---

## Features

- Calculates opening hand probabilities using hypergeometric distribution
- Supports multiple card requirements (combo pieces, starters, extenders, etc.)
- Compares probability of going first (5-card hand) vs going second (6-card hand)
- Real-time results via API
- FastAPI backend with Python-based computation
- React (Vite) frontend deployed on Vercel
- Backend deployed on Render

---

## How It Works

The application uses combinatorics to compute probabilities:

C(copies, k) × C(deck_size - copies, hand_size - k) / C(deck_size, hand_size)

For each requirement, the probability is calculated over the valid range of draws and then aggregated to estimate overall deck consistency.

---

## Tech Stack

### Frontend
- React (Vite)
- TypeScript
- Axios
- Vercel

### Backend
- FastAPI
- Python
- Pydantic
- Math (standard library combinatorics)

---

## API Endpoint

### POST /analyze

Request body:

```json
{
  "deck_size": 40,
  "hand_size": 5,
  "requirements": [
    {
      "name": "Starter",
      "copies": 3,
      "min": 1,
      "max": 1
    }
  ]
}
