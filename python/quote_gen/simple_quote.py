import random
from PIL import Image, ImageDraw, ImageFont
import textwrap

width = 512
height = 512
message = "Hello boss!"
# fonts = ["resource/barcelony/Barcelony.ttf"]
fonts = ["resource/Lato/Lato-Regular.ttf"]
images = ["resource/sample.jpg"]
quotes = ["Everybody wants to be famous, but nobody wants to do the work. I live by that. You grind hard so you can play hard. At the end of the day, you put all the work in, and eventually it’ll pay off. It could be in a year, it could be in 30 years. Eventually, your hard work will pay off."]


def text_wrap(text,font,writing,max_width,max_height):
    lines = [[]]
    words = text.split()
    for word in words:
        # try putting this word in last line then measure
        lines[-1].append(word)
        (w,h) = writing.multiline_textsize('\n'.join([' '.join(line) for line in lines]), font=font)
        if w > max_width: # too wide
            # take it back out, put it on the next line, then measure again
            lines.append([lines[-1].pop()])
            (w,h) = writing.multiline_textsize('\n'.join([' '.join(line) for line in lines]), font=font)
            if h > max_height: # too high now, cannot fit this word in, so take out - add ellipses
                lines.pop()
                # try adding ellipses to last word fitting (i.e. without a space)
                lines[-1][-1] += '...'
                # keep checking that this doesn't make the textbox too wide, 
                # if so, cycle through previous words until the ellipses can fit
                while writing.multiline_textsize('\n'.join([' '.join(line) for line in lines]),font=font)[0] > max_width:
                    lines[-1].pop()
                    if lines[-1]:
                        lines[-1][-1] += '...'
                    else:
                        lines[-1].append('...')
                break
    return '\n'.join([' '.join(line) for line in lines])

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
    title_font = getfont(100)
    image_editable = ImageDraw.Draw(my_image)
    width, height = my_image.size
    description_wrapped = text_wrap(random.choice(quotes),title_font,image_editable,width-50,height)
    # image_editable.text((width/3, height/3),description_wrapped , (237, 230, 211), font=title_font)
    image_editable.text((80, height/3),description_wrapped,font=title_font)
    my_image.save("image_quote.jpg")
    my_image.show()


imageBGQuotes()
