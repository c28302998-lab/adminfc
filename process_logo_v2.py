from PIL import Image

def process():
    # We will process the original image, which is on the desktop.
    img = Image.open('/Users/thf/Desktop/2026-07-23 22.22.06.png')
    img = img.convert('RGBA')
    data = img.getdata()

    # Find the reference green color
    max_diff = 0
    ref_color = (0, 168, 89)
    for r, g, b, a in data:
        if int(g) - int(r) > max_diff:
            max_diff = int(g) - int(r)
            ref_color = (r, g, b)
            
    print("Reference green color:", ref_color)
    ref_r, ref_g, ref_b = ref_color

    new_data = []
    for item in data:
        r, g, b, a = item
        
        # Determine if pixel is green-ish
        if int(g) - int(r) > 15:
            # It's green.
            # R_o = alpha * ref_r + (1 - alpha) * 255
            # alpha * (ref_r - 255) = R_o - 255
            # alpha = (255 - R_o) / (255 - ref_r)
            if 255 - ref_r == 0:
                alpha_float = 0
            else:
                alpha_float = (255 - r) / (255.0 - ref_r)
            
            alpha_float = max(0.0, min(1.0, alpha_float))
            alpha = int(alpha_float * 255)
            new_data.append((ref_r, ref_g, ref_b, alpha))
        else:
            # It's grayscale (black text / white background)
            brightness = (r + g + b) / 3.0
            alpha = int(255 - brightness)
            alpha = max(0, min(255, alpha))
            new_data.append((255, 255, 255, alpha))
            
    img.putdata(new_data)
    
    # Crop to bounding box
    bbox = img.getbbox()
    if bbox:
        img = img.crop(bbox)
        
    img.save('/Users/thf/.gemini/antigravity/scratch/football-challenge-academy/src/assets/logo_transparent.png', 'PNG')

process()
print("Done")
