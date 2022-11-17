from bs4 import BeautifulSoup
from requests import get
import json

API_KEY= ""


def scrap_city(city):
    url_imdb = 'https://www.noclegowo.pl/atrakcje/' + city
    page = get(url_imdb)

    places = {}

    bs = BeautifulSoup(page.content, features="html.parser")
    place_names = bs.find_all(class_='place-searchList__single__title')
    place_imgs = bs.find_all(class_='place-searchList__image')

    for i in range(len(place_names)):
        name = place_names[i].text
        image = str(str(str(place_imgs[i]).split(
            "data-src", 1)[1])[2:].split(" ", 1)[0])[:-1]
        
        #Pobrać z API
        location_lat = 23
        location_lng = 42
        
        
        places[i] = {"name": name,
                     "image": image,
                     "location_lng": location_lng,
                     "location_lat": location_lat,
                     }

    places_json = json.dumps(places)

    return places_json

