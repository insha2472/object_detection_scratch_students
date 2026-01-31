"""
Background Removal Script using OpenCV GrabCut Algorithm
"""

import cv2
import numpy as np
from PIL import Image

def remove_background(input_path, output_path):
    print(f"Processing {input_path}...")
    
    try:
        # Read the image
        img = cv2.imread(input_path)
        if img is None:
            print(f"Error: Could not read image from {input_path}")
            return
        
        # Create a mask initialized with zeros (background)
        mask = np.zeros(img.shape[:2], np.uint8)
        
        # Define the rectangle that contains the foreground (the bottle)
        # Format: (x, y, width, height)
        height, width = img.shape[:2]
        rect = (int(width*0.1), int(height*0.02), int(width*0.8), int(height*0.96))
        
        # Arrays used by GrabCut algorithm
        bgd_model = np.zeros((1, 65), np.float64)
        fgd_model = np.zeros((1, 65), np.float64)
        
        # Apply GrabCut algorithm
        print("Applying GrabCut algorithm (this may take a moment)...")
        cv2.grabCut(img, mask, rect, bgd_model, fgd_model, 5, cv2.GC_INIT_WITH_RECT)
        
        # Create a mask where 0 and 2 are background, 1 and 3 are foreground
        mask2 = np.where((mask == 2) | (mask == 0), 0, 1).astype('uint8')
        
        # Apply the mask to the image
        img_fg = img * mask2[:, :, np.newaxis]
        
        # Convert to RGBA (add alpha channel)
        b, g, r = cv2.split(img_fg)
        alpha = mask2 * 255
        
        # Create RGBA image
        rgba = cv2.merge([r, g, b, alpha])  # Note: PIL uses RGB order
        
        # Save the output
        pil_image = Image.fromarray(rgba)
        pil_image.save(output_path, 'PNG')
        
        print(f"Successfully saved to {output_path}")
        print("Note: For better results, you may need to adjust the rectangle or use a more advanced tool.")
        
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    input_file = "bottle.jpg"
    output_file = "bottle_no_bg.png"
    
    remove_background(input_file, output_file)
