from flask import Flask, request, jsonify
from PIL import Image
import torch
import torchvision.transforms as transforms
from torchvision.models import resnet18
import torch.nn.functional as F
from Om_GNN_Leukmia_22BCE2051 import GNNModel
from torch_geometric.data import Data
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load model
input_dim = 512
hidden_dim = 64
output_dim = 2

model = GNNModel(input_dim, hidden_dim, output_dim)
model.load_state_dict(torch.load('model.pt', map_location='cpu'))
model.eval()

# Dummy edge for single node
dummy_edge_index = torch.tensor([[0], [0]], dtype=torch.long)

# Image transform
transform = transforms.Compose([
    transforms.Resize((128, 128)),
    transforms.ToTensor(),
])

@app.route("/", methods=["POST"])
def classify():
    if 'file' not in request.files:
        return jsonify({"error": "No file provided"}), 400

    file = request.files['file']
    image = Image.open(file.stream).convert("RGB")
    image = transform(image).unsqueeze(0)

    # Extract features using ResNet18
    backbone = resnet18(pretrained=True)
    backbone.fc = torch.nn.Identity()
    backbone.eval()

    with torch.no_grad():
        feature = backbone(image).squeeze(0)
        data = Data(x=feature.unsqueeze(0), edge_index=dummy_edge_index)
        output = model(data)
        prob = F.softmax(output, dim=1)
        pred = prob.argmax(dim=1).item()
        confidence = round(prob[0][pred].item(), 2)

    label = "Leukemia" if pred == 1 else "Healthy"
    return jsonify({"label": label, "confidence": confidence})

if __name__ == "__main__":
    app.run(debug=True)
