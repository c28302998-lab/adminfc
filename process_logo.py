from PIL import Image

def process():
    img = Image.open('/Users/thf/.gemini/antigravity/scratch/football-challenge-academy/src/assets/logo.png')
    img = img.convert('RGBA')
    data = img.getdata()

    new_data = []
    for item in data:
        r, g, b, a = item
        
        # Check if the pixel is mostly grayscale (color difference is small)
        if abs(r - g) < 30 and abs(g - b) < 30 and abs(r - b) < 30:
            brightness = (r + g + b) / 3
            new_a = max(0, min(255, int(255 - brightness)))
            new_data.append((255, 255, 255, new_a))
        else:
            # It's green.
            # To remove white fringing from green, we could make it slightly transparent if it's very bright.
            # But let's just keep it opaque first.
            new_data.append(item)
            
    img.putdata(new_data)
    img.save('/Users/thf/.gemini/antigravity/scratch/football-challenge-academy/src/assets/logo_transparent.png', 'PNG')

process()
print("Done")
