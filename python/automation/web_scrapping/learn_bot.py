from web_scrapping.python_tutorials import getTutorilas
from web_scrapping.python_tutorials import python_awesome_tutorials_tags
from web_scrapping.hacker_news_daily import extractHackernoonData
from web_scrapping.example_tutorial import getReactTuts,getGoTuts
import json
data = {}
def getPythonTuts(python_tags):
    base = 'https://pythonawesome.com/tag/'
    tutsObj = {}
    for tag in python_tags:
        tutsObj[tag] = getTutorilas(base + tag)
    return tutsObj

def populateDailyTuts():
    data['python_tuts'] = getPythonTuts(python_awesome_tutorials_tags)
def populateHackerNews():
    data['hacker_news'] = extractHackernoonData()
def populateTutsExmplaes():
    data['react_tuts'] = getReactTuts()
    data['go_tuts'] = getGoTuts()

def getAllData():
    populateDailyTuts()
    populateHackerNews()
    populateTutsExmplaes()
    with open("data.json", "w") as outfile:
        json.dump(data, outfile)

getAllData()


