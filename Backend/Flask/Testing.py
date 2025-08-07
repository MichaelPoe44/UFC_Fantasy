import random
import json
import database


# order = [8, 6, 7]
league_id = 9

total_rounds = 16  #2 fighters per weightclass maybe later add dynamic amount of fighters per class


# pick = database.draft_pick(league_id, 2, "Tom Aspinall", "Heavyweight")
# print(pick)

print(database.draft_pick(league_id, 18, "Islam Makhachev", "Lightweight"))

## Leon Edwards, 'Welterweight
# Benoît Saint Denis', 'Lightweight'
# Islam Makhachev', 'Lightweight
# Rafael Fiziev    
# Jailton Almeida   ""Heavyweight"
#
#



# status = database.draft_status(league_id)
# print(f"status: {status["payload"]["status"]}")
# print(f"current_pick: {status["payload"]["current_pick_user"]}")
# print(f"current_round: {status["payload"]["round"]}")
# print()
# print(f"all picks: {status["payload"]["picks"]}")
# print()

