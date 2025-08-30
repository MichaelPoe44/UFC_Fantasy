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
 #mike = 2    call = 18
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
picks_18 = {
    "Flyweight": "Alexandre Pantoja",
    "Bantamweight": "Song Yadong", 
    "Featherweight": "Arnold Allen", 
    "Lightweight": "Max Holloway", 
    "Welterweight": "Jack Della Maddalena", 
    "Middleweight": "Khamzat Chimaev", 
    "Light Heavyweight": "Magomed Ankalaev", 
    "Heavyweight": "Tom Aspinall"
}
matchup_id = 106
# print(database.matchup_pick(matchup_id, 18, picks_18))
# print(database.matchup_pick(matchup_id, 2, picks_2))
# print(database.get_current_matchups(league_id))

print(database.get_scores(9))
# database.print_my_info()