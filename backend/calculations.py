from math import comb


def hypergeom_probability(
    deck_size: int,
    copies: int,
    hand_size: int,
    min_cards: int,
    max_cards: int,
):
    probability = 0

    for k in range(min_cards, max_cards + 1):

        if k > copies:
            continue

        if hand_size - k > deck_size - copies:
            continue

        probability += (
            comb(copies, k)
            * comb(deck_size - copies, hand_size - k)
            / comb(deck_size, hand_size)
        )

    return probability