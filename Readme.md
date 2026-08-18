</> markdown
# 🏦 Bank Management System

A full-stack **Bank Management System** built using **React, FastAPI, PostgreSQL, Docker, Nginx, and Kubernetes**.

The application provides a modern web interface for managing bank accounts and performing common banking operations such as creating accounts, deposits, withdrawals, transfers, searching accounts, and viewing account details.

## 🚀 Features

- 📊 Account dashboard
- 🏦 Create bank accounts
- 👥 View all accounts
- 🔍 Search accounts by name or account number
- 👤 View account details
- 🗑️ Delete accounts
- 💰 Deposit money
- 💸 Withdraw money
- 🔄 Transfer money between accounts
- 🗄️ PostgreSQL database integration
- 🔌 REST API using FastAPI
- ⚡ Axios-based API communication
- ✅ Backend validation
- 💵 Decimal-based money handling
- 🐳 Docker containerization
- ☸️ Kubernetes deployment
- ⛵ Minikube support
- 🌐 Nginx reverse proxy
- 📱 Responsive user interface

## 🛠️ Tech Stack

### Frontend

- React
- Vite
- React Router
- Axios
- CSS

### Backend

- Python
- FastAPI
- Pydantic
- Uvicorn
- psycopg2

### Database

- PostgreSQL

### DevOps

- Docker
- Kubernetes
- Minikube
- Nginx

## 🏗️ Architecture

```text
                         ┌──────────────────┐
                         │     Browser      │
                         │  React Frontend  │
                         └────────┬─────────┘
                                  │
                                  │ /api
                                  ▼
                         ┌──────────────────┐
                         │      Nginx       │
                         │  Reverse Proxy   │
                         └────────┬─────────┘
                                  │
                                  │ bank-backend-service:8000
                                  ▼
                         ┌──────────────────┐
                         │     FastAPI      │
                         │     Backend      │
                         └────────┬─────────┘
                                  │
                                  │ SQL
                                  ▼
                         ┌──────────────────┐
                         │   PostgreSQL     │
                         │     Database     │
                         └──────────────────┘

📁 Project Structure
BankManagementSystem/
│
├── app/
│   ├── main.py
│   ├── dao/
│   │   └── bank_dao.py
│   ├── database/
│   │   └── db.py
│   └── models/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AccountCard.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── Sidebar.jsx
│   │   ├── pages/
│   │   │   ├── Accounts.jsx
│   │   │   ├── CreateAccount.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Deposit.jsx
│   │   │   ├── Transfer.jsx
│   │   │   └── Withdraw.jsx
│   │   ├── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── .env.example
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── k8s/
│   ├── backend-deployment.yaml
│   ├── backend-service.yaml
│   ├── frontend-deployment.yaml
│   └── frontend-service.yaml
│
├── Screenshots/
│   ├── Dashboard.png
│   ├── Accounts.png
│   ├── Create_Account.png
│   ├── Deposit.png
│   ├── Withdraw.png
│   └── Transfer.png
│
├── .gitignore
├── Dockerfile
├── requirements.txt
└── README.md
⚙️ Local Development Setup
1. Clone Repository
git clone https://github.com/keshav642/bank-management-system.git
cd bank-management-system
🐍 Backend Setup

Create a Python virtual environment:

python3 -m venv venv
source venv/bin/activate

Install dependencies:

pip install -r requirements.txt
Backend Environment Variables

Create a .env file in the project root:

DB_HOST=localhost
DB_NAME=bank_system
DB_USER=postgres
DB_PASSWORD=your_password
DB_PORT=5432

Do not commit the actual .env file to GitHub.

🗄️ PostgreSQL Setup

Create the database:

CREATE DATABASE bank_system;

Create the bank accounts table:

CREATE TABLE bank_accounts (
    account_number INTEGER PRIMARY KEY,
    holder_name VARCHAR(100) NOT NULL,
    balance NUMERIC(12,2) NOT NULL CHECK (balance >= 0)
);
▶️ Start Backend
python3 -m uvicorn app.main:app --reload

Backend:

http://127.0.0.1:8000

FastAPI Swagger documentation:

http://127.0.0.1:8000/docs
⚛️ Frontend Setup

Go to the frontend directory:

cd frontend

Install dependencies:

npm install

Create frontend/.env:

VITE_API_URL=http://127.0.0.1:8000

Start the frontend:

npm run dev

Frontend:

http://localhost:5173
🔌 API Endpoints
Method	Endpoint	Description
GET	/	Backend health check
GET	/about	About endpoint
GET	/contact	Contact endpoint
GET	/accounts	Get all accounts
GET	/accounts/{account_number}	Get account details
POST	/accounts	Create account
DELETE	/accounts/{account_number}	Delete account
POST	/accounts/{account_number}/deposit	Deposit money
POST	/accounts/{account_number}/withdraw	Withdraw money
POST	/accounts/transfer	Transfer money
💵 Financial Validation

The backend uses PostgreSQL NUMERIC values for monetary amounts instead of unrestricted floating-point values.

Account balances are validated so that:

balance >= 0

Transaction amounts are validated to ensure that deposit, withdrawal, and transfer amounts are positive.

Deposit amount > 0
Withdraw amount > 0
Transfer amount > 0
Opening balance >= 0
🐳 Docker
Build Backend Image
docker build -t bank-backend:latest .
Build Frontend Image

The Kubernetes frontend uses /api as the API base URL:

docker build \
  --build-arg VITE_API_URL=/api \
  -t bank-frontend:latest ./frontend
🌐 Nginx Reverse Proxy

In Kubernetes, the React frontend uses:

VITE_API_URL=/api

Browser requests therefore look like:

/api/accounts
/api/accounts/101
/api/accounts/101/deposit
/api/accounts/101/withdraw
/api/accounts/transfer

Nginx forwards /api/ requests to the Kubernetes backend service:

bank-backend-service:8000

Architecture:

Browser
   │
   │ /api/accounts
   ▼
Nginx
   │
   │ bank-backend-service:8000
   ▼
FastAPI
   │
   ▼
PostgreSQL

This prevents the browser from directly accessing the internal Kubernetes service name.

☸️ Kubernetes Deployment

The project includes Kubernetes manifests inside:

k8s/
Start Minikube
minikube start

Check Minikube:

minikube status
Build Frontend Image
docker build --no-cache \
  --build-arg VITE_API_URL=/api \
  -t bank-frontend:latest ./frontend

Load the image into Minikube:

minikube image load bank-frontend:latest
Deploy Kubernetes Resources
kubectl apply -f k8s/

Check deployments:

kubectl get deployments

Check pods:

kubectl get pods

Check services:

kubectl get svc

Check all resources:

kubectl get all
📦 Kubernetes Resources
Backend Deployment
bank-backend
Backend Service
bank-backend-service

Type:

ClusterIP

Port:

8000
Frontend Deployment
bank-frontend
Frontend Service
bank-frontend-service

Type:

NodePort

Port:

80:30080
🚀 Access Application on Minikube

Get the frontend URL:

minikube service bank-frontend-service --url

Example:

http://192.168.49.2:30080

Open the generated URL in your browser.

🧪 Verify API Through Nginx

The backend API can be accessed through the frontend service:

curl http://192.168.49.2:30080/api/accounts

Example response:

{
  "data": [
    {
      "account_number": 101,
      "holder_name": "keshav",
      "balance": 53545750.0
    },
    {
      "account_number": 104,
      "holder_name": "golu",
      "balance": 2029838.0
    }
  ]
}
📊 Kubernetes Dashboard

Minikube provides a graphical Kubernetes Dashboard.

Start it with:

minikube dashboard

The dashboard can be used to monitor:

Pods
Deployments
Services
ReplicaSets
Application status
Cluster resources
🔍 Useful Kubernetes Commands
View Pods
kubectl get pods
Detailed Pod Information
kubectl describe pod <pod-name>
View Pod Logs
kubectl logs <pod-name>
View Deployments
kubectl get deployments
View Services
kubectl get svc
Restart Frontend
kubectl rollout restart deployment bank-frontend
Check Rollout
kubectl rollout status deployment bank-frontend
View All Resources
kubectl get all
🧪 Testing

Run backend tests:

pytest

Verbose mode:

pytest -v
🔐 Environment Variables
Variable	Description	Example
VITE_API_URL	Frontend API base URL	http://127.0.0.1:8000
DB_HOST	PostgreSQL host	localhost
DB_NAME	PostgreSQL database	bank_system
DB_USER	PostgreSQL username	postgres
DB_PASSWORD	PostgreSQL password	your_password
DB_PORT	PostgreSQL port	5432

⚠️ Never commit .env files containing passwords, credentials, API keys, or other secrets.

🏗️ Production Build

Build the React application:

npm run build

Production files are generated inside:

dist/

The production frontend is served by Nginx inside the Docker container.

🔄 Frontend API Configuration
Local Development
VITE_API_URL=http://127.0.0.1:8000
Kubernetes
VITE_API_URL=/api

In Kubernetes:

/api/*
   ↓
Nginx
   ↓
bank-backend-service:8000
📸 Screenshots
Dashboard

Accounts

Create Account

Deposit

Withdraw

Transfer

🎯 Project Highlights

This project demonstrates practical experience with:

Full-stack application development
React frontend development
REST API development
PostgreSQL database integration
DAO-based database interaction
Backend validation
Financial data handling
Docker containerization
Nginx reverse proxy
Kubernetes Deployments
Kubernetes Services
Minikube
API integration
Git and GitHub
👨‍💻 Author

Keshav Jha

GitHub: https://github.com/keshav642