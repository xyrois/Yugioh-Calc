from math import comb
from itertools import product


def multivariate_hypergeom_probability(
    deck_size: int,
    hand_size: int,
    requirements: list,  # list of {"copies": int, "min": int, "max": int}
):
    total = 0

    # Generate all combinations of draw counts for each requirement
    ranges = [range(req["min"], min(req["max"], req["copies"]) + 1) for req in requirements]

    for combo in product(*ranges):
        cards_used = sum(combo)

        # Remaining cards drawn from the rest of the deck
        remaining_draw = hand_size - cards_used
        remaining_deck = deck_size - sum(r["copies"] for r in requirements)

        if remaining_draw < 0 or remaining_draw > remaining_deck:
            continue

        numerator = 1
        for k, req in zip(combo, requirements):
            numerator *= comb(req["copies"], k)

        numerator *= comb(remaining_deck, remaining_draw)
        total += numerator / comb(deck_size, hand_size)

    return total