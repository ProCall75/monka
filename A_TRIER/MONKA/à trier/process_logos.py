from PIL import Image

def remove_background(input_path, output_path, threshold=180):
    try:
        img = Image.open(input_path)
        img = img.convert("RGBA")
        data = img.getdata()
        
        new_data = []
        for item in data:
            # More aggressive threshold to catch gray background
            if item[0] > threshold and item[1] > threshold and item[2] > threshold:
                new_data.append((255, 255, 255, 0))
            else:
                new_data.append(item)
        
        img.putdata(new_data)
        img.save(output_path, "PNG")
        print(f"Processed {input_path} -> {output_path}")
    except Exception as e:
        print(f"Error processing {input_path}: {e}")

# Process Pragma Logo with very aggressive threshold (180 instead of 200)
remove_background("pragma-logo-new.png", "pragma-logo-transparent.png", threshold=180)
