import random
from PIL import Image, ImageDraw, ImageFont

width = 512
height = 512
message = "Hello boss!"
fonts = ["resource/barcelony/Barcelony.ttf","resource/Lato/Lato-Thin.ttf","resource/dreamer/Dreamer.ttf"]
images = ["resource/sample.jpg"]
quotes = ["The Beauty of Nature"]

def getfont(fontsize=50):
    font = random.choice(fonts)
    print("selected font : "+font)
    return ImageFont.truetype(font,size=fontsize)

def simple():
    img = Image.new('RGB', (width, height), color='blue')
    imgDraw = ImageDraw.Draw(img)
    textWidth, textHeight = imgDraw.textsize(message,font=getfont)
    xText = (width - textWidth) / 2
    yText = (height - textHeight) / 2
    imgDraw.text((xText, yText), message,font=getfont, fill=(255, 255, 0))
    img.save('result.png')

def imageBGQuotes():
    my_image = Image.open(random.choice(images))
    title_font = getfont(200)
    image_editable = ImageDraw.Draw(my_image)
    image_editable.text((15,15), random.choice(quotes), (237, 230, 211), font=title_font)
    my_image.save("image_quote.jpg")


imageBGQuotes()
