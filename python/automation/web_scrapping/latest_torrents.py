import requests
from bs4 import BeautifulSoup
def extract_data(url,limit=10):
    response = requests.get(url)
    news_list = [];
    if response:
        content = response.content
        soup = BeautifulSoup(content,'html.parser')
        for i, tag in enumerate(soup.find_all('img', attrs={})):
            print('tag :: ',tag)
            # url = tag.find('a')['href']
            # if tag.text and url:
            #     news_list.append({
            #     'title':tag.text,
            #     'link':url
            #     })
            # if len(news_list) == limit:
            #     return news_list
        return news_list
"""
<div class="boxed film">
<div class="cont_display">
<a title="Hum Do Hamare Do (2021) HDRip Hindi Movie Watch Online Free" href="https://3hiidude.fun/watch-hum-do-hamare-do-2021-hindi-full-movie-online-free-7365.html">
<img width="165" height="220" src="https://m.media-amazon.com/images/M/MV5BNzZhMWEzNjYtMjYwYi00MDUxLTk3ODAtOWM4YTZiODJjYmY0XkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_QL75_UY562_CR35,0,380,562_.jpg" class="attachment-post-thumbnail size-post-thumbnail wp-post-image" alt="Hum Do Hamare Do (2021) HDRip Hindi Movie Watch Online Free" />
</a>
</div>
<p><b>Hum Do Hamare Do (2021) HDRip Hindi Movie Watch Online Free</b></p>
</div>
"""
def extractTorrentData(url,limit=10):
    response = requests.get(url)
    data_list = [];
    if response:
        soup = BeautifulSoup(response.content,"html.parser")
        for i, tag in enumerate(soup.find_all("img",attrs={'class':'attachment-post-thumbnail'})):
            print("tag :: ",tag)
            data_list.append({
                'name':tag['alt'],
                'imgURL':tag['src']
            })
        print(len(data_list))




extractTorrentData("https://3hiidude.fun/movies/latest")