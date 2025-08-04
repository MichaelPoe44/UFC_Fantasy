from database import update_fighter_pool
from scrape import get_fighter_pool

"""
This file used for manual updates to the fighter pool

"""


#scrape the rankings
pool = get_fighter_pool()

if pool:

    update_fighter_pool(pool)
else:
    print("error getting rankings from UFC")



