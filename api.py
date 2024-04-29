import requests


def get_fact(param):
    response = requests.get(param)
    json_reponse = response.json()
    return json_reponse['fact']