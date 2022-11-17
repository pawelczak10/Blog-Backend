from bs4 import BeautifulSoup
from requests import get
import json
import time
import requests

API_KEY = "TU WPISZ KLUCZ"


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
        address = "".join([city, name])

        api_url = "https://maps.googleapis.com/maps/api/geocode/json?address=$" + \
            address + "&key=" + API_KEY
        response = requests.get((api_url)).json()
        location_lat = response['results'][0]['geometry']['location']['lat']
        location_lng = response['results'][0]['geometry']['location']['lng']

        places[i] = {"name": name,
                     "image": image,
                     "location_lng": location_lng,
                     "location_lat": location_lat,
                     }

    places_json = json.dumps(places)

    return places_json
