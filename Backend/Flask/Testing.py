import random
import json
import database


total_rounds = 16  #2 fighters per weightclass maybe later add dynamic amount of fighters per class
user_1 = 18
user_2 = 14
user_3 = 2



order = [18, 14, 2]
league_id = 9
# database.clear_all_matchup_picks(87)
# database.debug(9)
matchup_id = 92
user_id =  2 #mike = 2    call = 18
picks_2 = {
    "Flyweight": "Amir Albazi",
    "Bantamweight": "Petr Yan", 
    "Featherweight": "Max Holloway", 
    "Lightweight": "Charles Oliveira", 
    "Welterweight": "Belal Muhammad", 
    "Middleweight": "Sean Strickland", 
    "Light Heavyweight": "Jiri Procházka", 
    "Heavyweight": "Alexander Volkov"
}
# picks_2 = {

# }
# print(database.matchup_pick(matchup_id, user_id, picks_2))
print(database.get_current_matchups(league_id))
# database.print_my_info()