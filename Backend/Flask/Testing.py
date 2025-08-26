import random
import json
import database


total_rounds = 16  #2 fighters per weightclass maybe later add dynamic amount of fighters per class
user_1 = 18
user_2 = 14
user_3 = 2



order = [18, 14, 2]
league_id = 9

print(database.get_all_matchups(league_id))

database.print_my_info()
{'success': True, 
'payload': 
    {1: #week
        {41: #matchupId
            {18: 
                {'Flyweight': {None: 'pending'}, 
                 'Bantamweight': {None: 'pending'}, 
                 'Featherweight': {None: 'pending'}, 
                 'Lightweight': {None: 'pending'}, 
                 'Welterweight': {None: 'pending'}, 
                 'Middleweight': {None: 'pending'}, 
                 'Light Heavyweight': {None: 'pending'}, 
                 'Heavyweight': {None: 'pending'}
                }, 
            2: 
                {'Flyweight': {None: 'pending'}, 
                 'Bantamweight': {None: 'pending'}, 
                 'Featherweight': {None: 'pending'}, 
                 'Lightweight': {None: 'pending'}, 
                 'Welterweight': {None: 'pending'}, 
                 'Middleweight': {None: 'pending'}, 
                 'Light Heavyweight': {None: 'pending'}, 
                 'Heavyweight': {None: 'pending'}
                },
            'status': 'pending'}}}}