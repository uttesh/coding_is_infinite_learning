import requests
from bs4 import BeautifulSoup

react_base ='https://reactjsexample.com'
go_base ='https://golangexample.com/'

def gettuts(url,limit=10):
    response = requests.get(url)
    if response.content:
        data = []
        soup = BeautifulSoup(response.content,"html.parser")
        for i,tag in enumerate(soup.find_all("article",attrs={'class':'post'})):
            tut = {'img_url': '', 'title': '', 'post_link': ''}
            _tag_img = tag.find("img")
            if _tag_img:
                post_img_class = _tag_img['class']
                if post_img_class[0] == "post-image":
                    srcset = _tag_img['data-srcset'].split(",")[0].split(" ")[0]
                    img_url = url + srcset
                    tut['img_url'] = img_url
            title_link = tag.find("h2")
            title_link_class = title_link.find('a')['class']
            if title_link_class[0]=='post-title-link':
                tut['title'] = title_link.find("a").contents[0]
                tut['post_link'] = url+title_link.find("a")['href']
                data.append(tut)
            if i == limit:
                break
        return data

def getReactTuts(limit=10):
    return gettuts(react_base)

def getGoTuts(limit=10):
    return gettuts(go_base)

getGoTuts()