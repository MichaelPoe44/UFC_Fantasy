import random
import json







participants = [2, 14, 18]


draft_order = random.sample(participants, len(participants))
total_rounds = 16  #2 fighters per weightclass maybe later add dynamic amount of fighters per class

this = json.dumps(draft_order)
print(this)
