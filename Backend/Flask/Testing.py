import random
import json
# import database






participants = [2, 14, 18]
length = len(participants)
position = 2

is_last = True if (position % length == (length - 1)) else False
is_first = True if (position % length == 0) else False


print(is_last)
print(is_first)
print()
