
##in future make more complex and return a method and round of win and points based on that

def compare_fighters(fighter1, fighter2):
    score1 = 0
    score2 = 0

    # Define weight for each stat
    weights = {
        "sig_str_per_min": 2,
        "sig_str_absorbed_per_min": -2,
        "tkd_per_15_min": 2,
        "sub_per_15_min": 1.5,
        "sig_str_defense": 2,
        "tkd_defense": 2,
        "knockdown_per_15_min": 2,
        "avg_fight_time": 1,
        "strike_accuracy": 2,
        "takedown_accuracy": 2,
        "win_by_tko": 1,
        "win_by_dec": 1,
        "win_by_sub": 1,
    }

    # just to make the stats have same keys as the weights
    stats1 = {
        **fighter1["fighter_info"], #** is to unpack a dict in pyt
        "strike_accuracy": fighter1["fighter_accuracy"]["strike"],
        "takedown_accuracy": fighter1["fighter_accuracy"]["takedown"],
        "win_by_tko": fighter1["percent_win_by"]["tko"],
        "win_by_dec": fighter1["percent_win_by"]["dec"],
        "win_by_sub": fighter1["percent_win_by"]["sub"],
    }

    stats2 = {
        **fighter2["fighter_info"],
        "strike_accuracy": fighter2["fighter_accuracy"]["strike"],
        "takedown_accuracy": fighter2["fighter_accuracy"]["takedown"],
        "win_by_tko": fighter2["percent_win_by"]["tko"],
        "win_by_dec": fighter2["percent_win_by"]["dec"],
        "win_by_sub": fighter2["percent_win_by"]["sub"],
    }

    # Score calculation
    for stat, weight in weights.items():
        val1 = stats1[stat]
        val2 = stats2[stat]

        if val1 is not None and val2 is not None:
            if val1 > val2:
                score1 += weight
            elif val2 > val1:
                score2 += weight
            # if equal, no points awarded

    # Determine the winner
    if score1 > score2:
        winner = "Fighter 1"
    elif score2 > score1:
        winner = "Fighter 2"
    else:
        winner = "Draw"

    return {
        "score_fighter_1": score1,
        "score_fighter_2": score2,
        "winner": winner
    }
