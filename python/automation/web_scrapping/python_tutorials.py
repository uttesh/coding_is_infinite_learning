from bs4 import BeautifulSoup
import requests

base_url = 'https://pythonawesome.com'
python_awesome_tutorials_tags = ['bot','machine-learning','api','natural-language-processing','automation']
def getTutorilas(url):
    response = requests.get(url)
    links = []
    soup = BeautifulSoup(response.content,"html.parser")
    for i, tag in enumerate(soup.find_all('h2',attrs={'class':'post-title'},limit=10)):
        tut = {'img_url': '', 'title': '', 'post_link': ''}
        tut['title'] = tag.find('a').contents[0]
        tut['post_link'] = base_url+tag.find('a')['href']
        links.append(tut)
    return  links

# tuts = getTutorilas('https://pythonawesome.com/tag/machine-learning/')
# print("tuts :: "+str(len(tuts)))