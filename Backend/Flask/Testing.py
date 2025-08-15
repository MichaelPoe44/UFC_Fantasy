import random
import json
import database


total_rounds = 16  #2 fighters per weightclass maybe later add dynamic amount of fighters per class
user_1 = 18
user_2 = 14
user_3 = 2


order = [18, 14, 2]
league_id = 9

print(database.get_current_matchups(league_id))

# database.debug(9)
# database.print_my_info()
