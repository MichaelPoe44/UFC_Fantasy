from bs4 import BeautifulSoup
import requests

#tom aspinall
#take input name insert into url
fighter_name = input("What fighter?: ")
fighter_name = fighter_name.replace(" ", "-")

URL = f'https://www.ufc.com/athlete/{fighter_name}'

#send a request and get the page content in a soup
page = requests.get(URL)
if (page.status_code != 200):
    print("bad request")
soup = BeautifulSoup(page.content,'html.parser')


fighter_accuracy = {
    "strike":None,
    "takedown":None,
}

fighter_info = {
    "sig_str_per_min":None,
    "sig_str_absorbed_per_min":None,
    "tkd_per_15_min":None,
    "sub_per_15_min":None,
    "sig_str_defense":None,
    "tkd_defense":None,
    "knockdown_per_15_min":None,
    "avg_fight_time":None
}

percent_win_by = {
    "tko":None,
    "dec":None,
    "sub":None,
}

#find accuracies and clean data
accuracies = soup.find_all(class_="e-chart-circle__percent")
fighter_accuracy["strike"] = accuracies[0].text.replace("%","")
fighter_accuracy["takedown"] = accuracies[1].text.replace("%","")


#find other stats and clean data
info = (soup.find_all(class_="c-stat-compare__number"))
for index,key in enumerate(fighter_info):
    temp = info[index].text
    temp = temp.replace("\n","").replace(" ","").replace("%","")
    fighter_info[key] = temp

#find types of wins and clean
wins = soup.find_all(class_="c-stat-3bar__value")
for index,key in enumerate(percent_win_by):
    temp = wins[index+3].text.split()
    percent_win_by[key] = temp[1].replace("%","").replace("(","").replace(")","")



print()
print(fighter_accuracy)
print()
print(fighter_info)
print()
print(percent_win_by)
