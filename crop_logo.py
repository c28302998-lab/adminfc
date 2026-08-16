from PIL import Image

def process():
    img = Image.open('/Users/thf/.gemini/antigravity/scratch/football-challenge-academy/src/assets/logo_transparent.png')
    # getbbox() returns the bounding box of non-zero alpha pixels!
    bbox = img.getbbox()
    if bbox:
        img = img.crop(bbox)
        img.save('/Users/thf/.gemini/antigravity/scratch/football-challenge-academy/src/assets/logo_transparent.png', 'PNG')
        print(f"Cropped to {bbox}")
    else:
        print("No bounding box found.")

process()
print("Done")
