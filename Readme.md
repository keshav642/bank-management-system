# 🏦 Bank Management System — Frontend

A modern React frontend for the **Bank Management System**, connected to a FastAPI backend and PostgreSQL database.

The frontend provides a simple dashboard for managing bank accounts and performing common banking operations.

## 🚀 Features

- 📊 Account dashboard
- 🏦 Create bank accounts
- 👥 View all accounts
- 🔍 Search accounts
- 🗑️ Delete accounts
- 💰 Deposit money
- 💸 Withdraw money
- 🔄 Transfer money between accounts
- 🔌 REST API integration with FastAPI
- ⚡ Axios-based API communication
- 📱 Responsive user interface

## 🛠️ Tech Stack

- **React**
- **Vite**
- **React Router**
- **Axios**
- **CSS**

## 📁 Project Structure

```text
frontend/
├── public/
│   ├── favicon.svg
│   └── icons.svg
│
├── src/
│   ├── assets/
│   │   ├── hero.png
│   │   ├── react.svg
│   │   └── vite.svg
│   │
│   ├── components/
│   │   ├── AccountCard.jsx
│   │   ├── AccountCard.css
│   │   ├── Navbar.jsx
│   │   ├── Navbar.css
│   │   ├── Sidebar.jsx
│   │   └── Sidebar.css
│   │
│   ├── pages/
│   │   ├── Accounts.jsx
│   │   ├── Accounts.css
│   │   ├── CreateAccount.jsx
│   │   ├── CreateAccount.css
│   │   ├── Dashboard.jsx
│   │   ├── Dashboard.css
│   │   ├── Deposit.jsx
│   │   ├── Deposit.css
│   │   ├── Transfer.jsx
│   │   ├── Transfer.css
│   │   ├── Withdraw.jsx
│   │   └── Withdraw.css
│   │
│   ├── api.js
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
└── vite.config.js
```

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/keshav642/bank-management-system.git
cd bank-management-system/frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file inside the `frontend` directory:

```env
VITE_API_URL=http://127.0.0.1:8000
```

The frontend reads the API URL using:

```javascript
import.meta.env.VITE_API_URL
```

Do not commit the actual `.env` file to GitHub.

A `.env.example` file is included in the repository as a template.

### 4. Start the development server

```bash
npm run dev
```

The frontend will be available at:

```text
http://localhost:5173
```

## 🔌 Backend Connection

The frontend communicates with the FastAPI backend through Axios.

The API base URL is configured using:

```env
VITE_API_URL=http://127.0.0.1:8000
```

The backend should be running before using account operations.

Start the backend from the project root:

```bash
python3 -m uvicorn app.main:app --reload
```

Backend:

```text
http://127.0.0.1:8000
```

FastAPI documentation:

```text
http://127.0.0.1:8000/docs
```

## 📸 Screenshots

### Dashboard

![Dashboard](../Screenshots/Dashboard.png)

### Accounts

![Accounts](../Screenshots/Accounts.png)

### Create Account

![Create Account](../Screenshots/Create_Account.png)

### Deposit

![Deposit](../Screenshots/Deposit.png)

### Withdraw

![Withdraw](../Screenshots/Withdraw.png)

### Transfer

![Transfer](../Screenshots/Transfer.png)

## 🔐 Environment Variables

| Variable | Description | Example |
|---|---|---|
| `VITE_API_URL` | FastAPI backend URL | `http://127.0.0.1:8000` |

> Never commit `.env` files containing sensitive configuration or credentials.

## 🧪 API Integration

The frontend uses Axios to communicate with the following backend endpoints:

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/accounts` | Get all accounts |
| GET | `/accounts/{account_number}` | Get account |
| POST | `/accounts` | Create account |
| DELETE | `/accounts/{account_number}` | Delete account |
| POST | `/accounts/{account_number}/deposit` | Deposit money |
| POST | `/accounts/{account_number}/withdraw` | Withdraw money |
| POST | `/accounts/transfer` | Transfer money |

## 🏗️ Build for Production

Create a production build:

```bash
npm run build
```

The production files will be generated inside:

```text
dist/
```

To preview the production build locally:

```bash
npm run preview
```

## 👨‍💻 Author

**Keshav Jha**

GitHub: https://github.com/keshav642