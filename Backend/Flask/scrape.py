from bs4 import BeautifulSoup
import requests


SINGLE_URL = 'https://www.ufc.com/athlete/'
POOL_URL = 'https://www.ufc.com/rankings'

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

def get_fighter_stats(name):

    #send a request and get the page content in a soup
    page = requests.get(f"{SINGLE_URL}{name}")
    if (page.status_code != 200):
        print("bad request")
    soup = BeautifulSoup(page.content,'html.parser')


    #find headshot image
    fighter_image_url = soup.find(class_="image-style-event-results-athlete-headshot").get("src")

    #find current dvision
    fighter_division = soup.find(class_="hero-profile__division-title").text

    #find record
    record = soup.find(class_="hero-profile__division-body").text



    #find accuracies and clean
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


    full_stats = {
        "fighter_name":name,
        "fighter_img": fighter_image_url,
        "fighter_division":fighter_division,
        "fighter_accuracy": fighter_accuracy,
        "fighter_info": fighter_info,
        "record": record,
        "percent_win_by": percent_win_by,
    }

    return full_stats 



fighter_pool = {
    "Flyweight": {
        #name: rank,
        #name: rank,
    },
    "Bantamweight":{},
    "Featherweight":{},
    "Lightweight":{},
    "Welterweight":{},
    "Middleweight":{},
    "Light Heavyweight":{},
    "Heavyweight":{}
}

def get_fighter_pool():

    headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) '
                  'AppleWebKit/537.36 (KHTML, like Gecko) '
                  'Chrome/114.0.0.0 Safari/537.36',
    'Accept-Language': 'en-US,en;q=0.9'
    }



    #send a request and get the page content in a soup
    page = requests.get('https://www.ufc.com/rankings', headers=headers)
    if (page.status_code != 200):
        print(page.status_code)
        print("bad request")
    soup = BeautifulSoup(page.content,'html.parser')

    for weightclass in fighter_pool:
        #get info for each division
        header = soup.find("div",string=weightclass)
        content = header.find_next_sibling("div")

        #get the champion
        fighter_pool[weightclass]["0"] = content.find("a").text

        #get contenders
        contenders = content.find_all("tr")
        for i in range(len(contenders)):
            row = contenders[i]
            contender = row.find("a").text
            fighter_pool[weightclass][i+1] = contender


    print(fighter_pool)


    return ()


get_fighter_pool()

