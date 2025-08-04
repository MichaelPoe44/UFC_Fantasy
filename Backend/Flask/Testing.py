import random
import json
import database


# order = [8, 6, 7]
league_id = 3

total_rounds = 16  #2 fighters per weightclass maybe later add dynamic amount of fighters per class

database.delete_league_draft(league_id)
# pick = database.draft_pick(league_id, 8, "asdfa", "asdf")
# print(pick)


# status = database.draft_status(league_id)
# print(f"status: {status["payload"]["status"]}")
# print(f"current_pick: {status["payload"]["current_pick_user"]}")
# print(f"current_round: {status["payload"]["round"]}")
# print()
# print(f"all picks: {status["payload"]["picks"]}")
# print()

