import requests
import json
from bs4 import BeautifulSoup

base_url = "https://hackernoon.com/tagged/hackernoon-top-story"


"""
'https://news.ycombinator.com/'
"""
def getHackerNews(url,limit=10):
    response = requests.get(url)
    news_list = [];
    if response:
        content = response.content
        soup = BeautifulSoup(content,'html.parser')
        for i, tag in enumerate(soup.find_all('td', attrs={'class':'title', 'valign':''})):
            url = tag.find('a')['href']
            print("url: ",url)
            if tag.text and url:
                news_list.append({
                'title':tag.text,
                'link':url
                })
            if len(news_list) == limit:
                return news_list
        print("news_list :: ",len(news_list))
        return news_list


def extractHackernoonData(limit=10):
    response = requests.get("https://hackernoon.com/_next/data/2lbL7N-inB8ldLm0_d53B/index.json")
    data_list = [];
    if response:
        data = response.json()
        featuredStories = data['pageProps']['data']['featuredStories']
        for tag in featuredStories:
            tut = {'img_url': '', 'title': '', 'post_link': ''}
            tut['title'] = tag['title']
            tut['img_url'] = tag['mainImage']
            tut['post_link'] = 'https://hackernoon.com/'+ tag['slug']
            data_list.append(tut)
        return data_list

# data = extractHackernoonData()
# for news in data:
#     print(news)
