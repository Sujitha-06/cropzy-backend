import os
import shutil
from pathlib import Path

# Set your source and target paths
source_dir = r'C:\Users\Rudhra\OneDrive\Desktop\CROPZY\frontend\data\small_dataset\train'  # Use raw string format
target_dir = r'C:\Users\Rudhra\OneDrive\Desktop\CROPZY\frontend\data\processed_dataset\train'  # Update if needed

# Define the number of images you want per class
num_images_per_class = 50

# Create the target directory if it doesn't exist
Path(target_dir).mkdir(parents=True, exist_ok=True)

# Iterate through each class folder in the source directory
for class_name in os.listdir(source_dir):
    class_source_path = os.path.join(source_dir, class_name)
    
    # Check if it is a directory (to avoid any non-directory files)
    if os.path.isdir(class_source_path):
        class_target_path = os.path.join(target_dir, class_name)
        
        # Create target directory for each class
        Path(class_target_path).mkdir(parents=True, exist_ok=True)
        
        # Get the first 'num_images_per_class' images in the class folder
        images = os.listdir(class_source_path)[:num_images_per_class]
        
        # Copy images to the target directory
        for image_name in images:
            source_image_path = os.path.join(class_source_path, image_name)
            target_image_path = os.path.join(class_target_path, image_name)
            shutil.copy(source_image_path, target_image_path)

print("50 images per class have been copied to the small dataset.")
