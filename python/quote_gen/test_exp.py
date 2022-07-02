import textwrap
from PIL import Image, ImageDraw, ImageFont
caption = "Obama warns far-left candidates says average American does not want to tear down the system"

wrapper = textwrap.TextWrapper(width=50) 
word_list = wrapper.wrap(text=caption) 
caption_new = ''
for ii in word_list[:-1]:
    caption_new = caption_new + ii + '\n'
caption_new += word_list[-1]

print("caption_new :: "+caption_new)

image = Image.open('resource/sample.jpg')
draw = ImageDraw.Draw(image)

# Download the Font and Replace the font with the font file. 
font = ImageFont.truetype("resource/barcelony/Barcelony.ttf", size=200)
w,h = draw.textsize(caption_new, font=font)
W,H = image.size
x,y = 0.5*(W-w),0.90*H-h

image.save('output.png')