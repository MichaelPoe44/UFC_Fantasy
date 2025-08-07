import random
import json
import database


# order = [8, 6, 7]
league_id = 9

total_rounds = 16  #2 fighters per weightclass maybe later add dynamic amount of fighters per class
user_1 = 18
user_2 = 14
user_3 = 2

# pick = database.draft_pick(league_id, 2, "Tom Aspinall", "Heavyweight")
# print(pick)

# print(database.draft_pick(league_id, user_1, "Islam Makhachev", "Lightweight"))

## Leon Edwards, 'Welterweight
# Benoît Saint Denis', 'Lightweight'
# Islam Makhachev', 'Lightweight
# Rafael Fiziev    
# Jailton Almeida   ""Heavyweight"
#
#

# Flyweight picks
# print(database.draft_pick(league_id, user_1, "Alexandre Pantoja", "Flyweight"))
# print(database.draft_pick(league_id, user_2, "Brandon Moreno", "Flyweight"))
print(database.draft_pick(league_id, user_3, "Amir Albazi", "Flyweight"))
print(database.draft_pick(league_id, user_3, "Kai Kara‑France", "Flyweight"))
print(database.draft_pick(league_id, user_2, "Tatsuro Taira", "Flyweight"))
print(database.draft_pick(league_id, user_1, "Manel Kape", "Flyweight"))

# Bantamweight picks
print(database.draft_pick(league_id, user_1, "Merab Dvalishvili", "Bantamweight"))
print(database.draft_pick(league_id, user_2, "Sean O'Malley", "Bantamweight"))
print(database.draft_pick(league_id, user_3, "Petr Yan", "Bantamweight"))
print(database.draft_pick(league_id, user_3, "Umar Nurmagomedov", "Bantamweight"))
print(database.draft_pick(league_id, user_2, "Cory Sandhagen", "Bantamweight"))
print(database.draft_pick(league_id, user_1, "Song Yadong", "Bantamweight"))

# Featherweight picks
print(database.draft_pick(league_id, user_1, "Ilia Topuria", "Featherweight"))
print(database.draft_pick(league_id, user_2, "Alexander Volkanovski", "Featherweight"))
print(database.draft_pick(league_id, user_3, "Max Holloway", "Featherweight"))
print(database.draft_pick(league_id, user_3, "Diego Lopes", "Featherweight"))
print(database.draft_pick(league_id, user_2, "Yair Rodríguez", "Featherweight"))
print(database.draft_pick(league_id, user_1, "Arnold Allen", "Featherweight"))

# Lightweight picks
print(database.draft_pick(league_id, user_1, "Islam Makhachev", "Lightweight"))
print(database.draft_pick(league_id, user_2, "Arman Tsarukyan", "Lightweight"))
print(database.draft_pick(league_id, user_3, "Charles Oliveira", "Lightweight"))
print(database.draft_pick(league_id, user_3, "Justin Gaethje", "Lightweight"))
print(database.draft_pick(league_id, user_2, "Dustin Poirier", "Lightweight"))
print(database.draft_pick(league_id, user_1, "Max Holloway", "Lightweight"))

# Welterweight picks
print(database.draft_pick(league_id, user_1, "Jack Della Maddalena", "Welterweight"))
print(database.draft_pick(league_id, user_2, "Khamzat Chimaev", "Welterweight"))
print(database.draft_pick(league_id, user_3, "Belal Muhammad", "Welterweight"))
print(database.draft_pick(league_id, user_3, "Khamzat Chimaev", "Welterweight"))  # second pick – duplicates from rankings
print(database.draft_pick(league_id, user_2, "Belal Muhammad", "Welterweight"))
print(database.draft_pick(league_id, user_1, "Jack Della Maddalena", "Welterweight"))

# Middleweight picks
print(database.draft_pick(league_id, user_1, "Dricus du Plessis", "Middleweight"))
print(database.draft_pick(league_id, user_2, "Khamzat Chimaev", "Middleweight"))
print(database.draft_pick(league_id, user_3, "Sean Strickland", "Middleweight"))
print(database.draft_pick(league_id, user_3, "Nassourdine Imavov", "Middleweight"))
print(database.draft_pick(league_id, user_2, "Sean Strickland", "Middleweight"))
print(database.draft_pick(league_id, user_1, "Khamzat Chimaev", "Middleweight"))

# Light Heavyweight picks
print(database.draft_pick(league_id, user_1, "Magomed Ankalaev", "Light Heavyweight"))
print(database.draft_pick(league_id, user_2, "Alex Pereira", "Light Heavyweight"))
print(database.draft_pick(league_id, user_3, "Jiri Procházka", "Light Heavyweight"))
print(database.draft_pick(league_id, user_3, "Carlos Ulberg", "Light Heavyweight"))
print(database.draft_pick(league_id, user_2, "Jiri Procházka", "Light Heavyweight"))
print(database.draft_pick(league_id, user_1, "Alex Pereira", "Light Heavyweight"))

# Heavyweight picks
print(database.draft_pick(league_id, user_1, "Tom Aspinall", "Heavyweight"))
print(database.draft_pick(league_id, user_2, "Ciryl Gane", "Heavyweight"))
print(database.draft_pick(league_id, user_3, "Alexander Volkov", "Heavyweight"))
print(database.draft_pick(league_id, user_3, "Ciryl Gane", "Heavyweight"))
print(database.draft_pick(league_id, user_2, "Alexander Volkov", "Heavyweight"))
print(database.draft_pick(league_id, user_1, "Tom Aspinall", "Heavyweight"))





status = database.draft_status(league_id)
print(f"status: {status["payload"]["status"]}")
print(f"current_pick: {status["payload"]["current_pick_user"]}")
print(f"current_round: {status["payload"]["round"]}")
print()
print(f"all picks: {status["payload"]["picks"]}")
print()
print()
print()
print()
database.print_my_info()