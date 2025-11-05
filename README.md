# 🧬 Leukemia Classification Using GNN

An **AI-powered Leukemia Cell Classification System** built using **Graph Neural Networks (GNN)**.  
This project integrates a **Flask backend** and a **ReactJS frontend** to deliver a complete deep learning web application capable of classifying blood smear images into **healthy** or **leukemic** cells.

---

## 🎥 Demo

[https://github.com/user-attachments/assets/d4e1a041c530810da10492139c05905f151591a8](https://github.com/user-attachments/assets/0d37b4b9-2ac6-45f0-8067-1e942ed139fe)


---

## 🚀 Features

- Upload blood smear images for automatic classification  
- GNN model built with **PyTorch Geometric**  
- Flask backend for handling inference requests  
- ReactJS frontend for an intuitive and responsive interface  
- Real-time prediction with classification results and confidence scores  
- Clean and minimal medical-grade UI  
- Compatible with **C-NMC 2019 Leukemia Dataset**

---

## 🧠 Tech Stack

**Frontend:** ReactJS, HTML, CSS, JavaScript  
**Backend:** Flask, Python  
**Machine Learning:** PyTorch Geometric, Scikit-learn, NumPy, Pandas  
**Tools & Libraries:** Matplotlib, Torch, Pillow  
**Deployment:** Render / Localhost  

---

## 🧩 Project Structure
```bash
Leukemia-Classification-Using-GNN-/
│
├── backend/
│ ├── app.py # Flask API for model inference
│ ├── Om_GNN_Leukmia_22BCE2051.py # GNN model architecture and training
│ ├── requirements.txt # Python dependencies
│ ├── uploads/ # Uploaded test images
│ └── static/ # (Optional) Static assets
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ │ ├── Upload.js # Image upload component
│ │ │ ├── Result.js # Displays prediction results
│ │ │ └── LoadingSpinner.js # Loading animation
│ │ ├── services/api.js # API service for Flask communication
│ │ └── styles/App.css # Styling for the app
│ ├── package.json # React dependencies
│ └── public/ # Static public files
│
└── README.md # Project documentation

```
---

## ⚙️ How to Run the Project

### 🧩 1. Clone the Repository

```bash
git clone https://github.com/KapadiaOm/Leukemia-Classification-Using-GNN-.git
cd Leukemia-Classification-Using-GNN-

cd backend
python -m venv venv
venv\Scripts\activate       # For Windows
# or
source venv/bin/activate    # For macOS/Linux

pip install -r requirements.txt
python app.py

cd frontend
npm install
npm start

