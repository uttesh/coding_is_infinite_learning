from pynter.pynter import generate_captioned
font_path = 'resource/Lato/Lato-Regular.ttf'
image_path = 'resource/sample.jpg'
im = generate_captioned('China lands rover on Mars'.upper(), image_path=image_path, size=(100, 100),
                        font_path=font_path, filter_color=(0, 0, 0, 40))
im.show()
im.convert('RGB').save('drawn_image.jpg')