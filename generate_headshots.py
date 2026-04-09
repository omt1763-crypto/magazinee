#!/usr/bin/env python3
"""
Generate professional headshot images for article subjects using stable diffusion via replicate
"""
import os
import requests
from pathlib import Path

# List of people who need professional headshots
people = {
    "pranjali-awasthi": "professional headshot of a young Indian female AI founder, serious businesswoman, modern professional, studio lighting",
    "anna-monaco": "professional headshot of a young female tech CEO, businesswoman, serious expression, studio lighting",
    "guohao-li": "professional headshot of an Asian male researcher, AI scientist, professional attire, studio lighting",
    "akshita-iyer": "professional headshot of an Indian female entrepreneur, businesswoman, professional outfit, studio lighting",
    "tiancheng-xu": "professional headshot of an Asian male tech founder, serious businessperson, professional lighting",
    "james-wilson": "professional headshot of a male medical director, scientist, professional attire, studio lighting",
    "rajesh-kumar": "professional headshot of an Indian male tech executive, VP, professional suit, studio lighting",
    "alex-foster": "professional headshot of a male tech CTO, serious professional, modern office background, studio lighting",
    "catherine-li": "professional headshot of an Asian female CEO, businesswoman, professional attire, studio lighting",
    "john-smith": "professional headshot of a male researcher, scientist, professional outfit, studio lighting",
    "marcus-johnson": "professional headshot of an African male CEO, robotics company leader, professional suit, studio lighting",
    "timnit-gebru": "professional headshot of an African female tech founder, researcher, professional attire, studio lighting",
    "paul-graham": "professional headshot of a male investor, venture capitalist, professional suit, studio lighting",
    "elon-musk": "professional headshot of a male tech entrepreneur CEO, serious expression, modern professional attire",
    "sundar-pichai": "professional headshot of an Indian male tech CEO, Google leader, professional business suit, studio lighting",
    "satya-nadella": "professional headshot of an Indian male CEO, Microsoft executive, professional attire, studio lighting",
    "bill-gates": "professional headshot of a male tech philanthropist, business leader, professional suit, studio lighting",
    "holly-herndon": "professional headshot of a female musician AI artist, creative professional, modern aesthetic",
    "steve-jobs": "professional headshot of a male tech founder, minimalist professional, iconic style, studio lighting",
}

public_dir = Path("public")

# First, try using Replicate API (requires REPLICATE_API_TOKEN env var)
replicate_token = os.getenv("REPLICATE_API_TOKEN")

if replicate_token:
    print("🎨 Using Replicate API to generate headshots...")
    try:
        import replicate
        
        for filename, prompt in people.items():
            output_path = public_dir / f"professional-headshot-{filename}.png"
            
            # Skip if already exists
            if output_path.exists():
                print(f"✓ {filename} already exists")
                continue
            
            print(f"🖼️ Generating: {filename}...")
            try:
                # Using Stable Diffusion 3
                output = replicate.run(
                    "stability-ai/stable-diffusion-3",
                    input={
                        "prompt": f"{prompt}, 8k, professional headshot, high quality, realistic, corporate photography",
                        "aspect_ratio": "1:1",
                        "output_format": "png",
                    }
                )
                
                if output:
                    # Download the image
                    img_url = output[0] if isinstance(output, list) else output
                    img_data = requests.get(img_url).content
                    
                    with open(output_path, 'wb') as f:
                        f.write(img_data)
                    print(f"✅ Created: {output_path}")
            except Exception as e:
                print(f"⚠️ Error generating {filename}: {e}")
    except ImportError:
        print("Install replicate: pip install replicate")
else:
    print("\n⚠️ No REPLICATE_API_TOKEN found. Using placeholder generation instead...")
    print("\nTo generate AI headshots, set the REPLICATE_API_TOKEN environment variable:")
    print("  $env:REPLICATE_API_TOKEN = 'your_token'")
    print("  python generate_headshots.py\n")
    
    # Create simple colorful placeholder headshots instead
    try:
        from PIL import Image, ImageDraw, ImageFont
        import colorsys
        import random
        
        print("📝 Creating placeholder professional headshots...")
        
        # Generate consistent colors for each person
        random.seed(42)
        
        for filename in people.keys():
            output_path = public_dir / f"professional-headshot-{filename}.png"
            
            if output_path.exists():
                print(f"✓ {filename} already exists")
                continue
            
            # Create a professional-looking gradient background
            hue = hash(filename) % 1.0
            rgb_color = colorsys.hsv_to_rgb(hue, 0.4, 0.95)
            bg_color = tuple(int(c * 255) for c in rgb_color)
            
            # Create image with gradient
            img = Image.new('RGB', (400, 500), bg_color)
            draw = ImageDraw.Draw(img)
            
            # Add subtle gradient effect with circles
            for i in range(50):
                alpha = (50 - i) / 50
                circle_color = tuple(int(c * (0.8 + alpha * 0.2)) for c in bg_color)
                radius = 200 + i * 5
                draw.ellipse(
                    [100 - radius, 100 - radius, 100 + radius, 100 + radius],
                    outline=circle_color
                )
            
            # Add professional placeholder text
            try:
                # Try to use a decent font, fall back to default
                font = ImageFont.truetype("arial.ttf", 24)
            except:
                font = ImageFont.load_default()
            
            # Add initials or abbreviated name
            name_parts = filename.split('-')
            initials = ''.join([part[0].upper() for part in name_parts])
            
            # Draw initials in center
            bbox = draw.textbbox((0, 0), initials, font=font)
            text_width = bbox[2] - bbox[0]
            text_height = bbox[3] - bbox[1]
            x = (400 - text_width) // 2
            y = (350 - text_height) // 2
            draw.text((x, y), initials, fill=(255, 255, 255), font=font)
            
            # Add "PROFESSIONAL" label at bottom
            try:
                label_font = ImageFont.truetype("arial.ttf", 16)
            except:
                label_font = font
            
            draw.text((50, 440), "PROFESSIONAL PROFILE", fill=(200, 200, 200), font=label_font)
            
            # Save
            img.save(output_path)
            print(f"✅ Created placeholder: {output_path}")
    except Exception as e:
        print(f"Error creating placeholders: {e}")

print("\n✨ Headshot generation complete!")
print("For better AI-generated images, use: pip install replicate")
print("Then set REPLICATE_API_TOKEN and run again.")
