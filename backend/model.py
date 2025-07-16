from PIL import Image
import numpy as np
import torch
import torch.nn as nn
import torchvision.transforms as transforms
import torchvision.models as models

# Define transform used during training
transform = transforms.Compose([
    transforms.Resize((128, 128)),
    transforms.ToTensor()
])

# Load the same CNN you used for feature extraction (with classifier)
class CNNClassifier(nn.Module):
    def __init__(self, num_classes=2):
        super(CNNClassifier, self).__init__()
        self.model = models.resnet18(pretrained=False)
        self.model.fc = nn.Linear(512, num_classes)

    def forward(self, x):
        return self.model(x)

def predict_image(file_path):
    # Load and preprocess image
    image = Image.open(file_path).convert('RGB')
    image = transform(image).unsqueeze(0)  # add batch dimension

    # Load model
    model = CNNClassifier(num_classes=2)
    model.load_state_dict(torch.load('cnn_model.pt', map_location='cpu'))
    model.eval()

    # Predict
    with torch.no_grad():
        output = model(image)
        probs = torch.softmax(output, dim=1)
        class_idx = torch.argmax(probs).item()
        confidence = probs[0, class_idx].item()

    labels = ['Healthy', 'Leukemia']
    return labels[class_idx], confidence
