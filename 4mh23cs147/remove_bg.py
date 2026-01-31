import cv2
import numpy as np
from PIL import Image
import os

# Paths
input_path = r'C:/Users/student/.gemini/antigravity/brain/3aed479a-d405-4b3d-b431-e84d57d4dc9f/uploaded_media_1769766979620.jpg'
output_path = 'processed_image_no_bg.png'

def remove_background():
    try:
        print(f"Processing image: {input_path}")
        
        # Read image
        img = cv2.imread(input_path)
        if img is None:
            raise FileNotFoundError(f"Could not load image from {input_path}")
        
        # Create mask
        mask = np.zeros(img.shape[:2], np.uint8)
        
        # Background and foreground models
        bgd_model = np.zeros((1, 65), np.float64)
        fgd_model = np.zeros((1, 65), np.float64)
        
        # Define rectangle around the main object (center of image)
        height, width = img.shape[:2]
        margin = 20
        rect = (margin, margin, width - 2*margin, height - 2*margin)
        
        print("Running GrabCut algorithm... this may take a moment.")
        
        # Apply GrabCut
        cv2.grabCut(img, mask, rect, bgd_model, fgd_model, 5, cv2.GC_INIT_WITH_RECT)
        
        # Create binary mask where foreground is white
        mask2 = np.where((mask == 2) | (mask == 0), 0, 1).astype('uint8')
        
        # Apply mask to original image
        result = img * mask2[:, :, np.newaxis]
        
        # Convert to RGBA (add alpha channel)
        result_rgba = cv2.cvtColor(result, cv2.COLOR_BGR2BGRA)
        
        # Set transparent where mask is 0
        result_rgba[:, :, 3] = mask2 * 255
        
        # Save result
        cv2.imwrite(output_path, result_rgba)
        
        print(f"Success! Image saved to: {os.path.abspath(output_path)}")
        
    except FileNotFoundError as e:
        print(f"Error: {e}")
    except Exception as e:
        print(f"An error occurred: {str(e)}")

if __name__ == "__main__":
    remove_background()
