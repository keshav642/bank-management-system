from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from app.models.bank_Account import BankAccount
from app.dao.bank_dao import BankDao


app = FastAPI()


# =========================================================
# CORS
# =========================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


dao = BankDao()


# =========================================================
# Request Models
# =========================================================

class DepositRequest(BaseModel):
    amount: float


class WithdrawRequest(BaseModel):
    amount: float


class TransferRequest(BaseModel):
    sender_account: int
    receiver_account: int
    amount: float


# =========================================================
# Home
# =========================================================

@app.get("/")
def home():
    return {
        "message": "Welcome to Bank Management System"
    }


# =========================================================
# About
# =========================================================

@app.get("/about")
def about():
    return {
        "project": "Bank Management System",
        "language": "Python",
        "framework": "FastAPI"
    }


# =========================================================
# Contact
# =========================================================

@app.get("/contact")
def contact():
    return {
        "email": "kesha@gmail.com",
        "mobileNo": "xxxxxxxxx"
    }


# =========================================================
# Create Account
# =========================================================

@app.post("/accounts")
def create_account(account: BankAccount):

    result = dao.create_account(account)

    return {
        "message": "Account created successfully",
        "success": result
    }


# =========================================================
# Get All Accounts
# =========================================================

@app.get("/accounts")
def get_all_accounts():

    results = dao.get_all_accounts()

    accounts = []

    for result in results:
        accounts.append({
            "account_number": result[0],
            "holder_name": result[1],
            "balance": result[2]
        })

    return {
        "data": accounts
    }


# =========================================================
# Get Account
# =========================================================

@app.get("/accounts/{account_number}")
def get_account(account_number: int):

    result = dao.get_account(account_number)

    if result is None:
        raise HTTPException(
            status_code=404,
            detail="Account not found"
        )

    return {
        "data": {
            "account_number": result[0],
            "holder_name": result[1],
            "balance": result[2]
        }
    }


# =========================================================
# Deposit
# =========================================================

@app.post("/accounts/{account_number}/deposit")
def deposit(account_number: int, request: DepositRequest):

    result = dao.deposit(
        account_number,
        request.amount
    )

    if result == 0:
        raise HTTPException(
            status_code=404,
            detail="Account not found"
        )

    return {
        "message": "Amount deposited successfully",
        "account_number": account_number,
        "amount": request.amount
    }


# =========================================================
# Withdraw
# =========================================================

@app.post("/accounts/{account_number}/withdraw")
def withdraw(account_number: int, request: WithdrawRequest):

    result = dao.withdraw(
        account_number,
        request.amount
    )

    if result == 0:
        raise HTTPException(
            status_code=400,
            detail="Insufficient balance or account not found"
        )

    return {
        "message": "Amount withdrawn successfully",
        "account_number": account_number,
        "amount": request.amount
    }


# =========================================================
# Transfer Money
# =========================================================

@app.post("/accounts/transfer")
def transfer_money(request: TransferRequest):

    result = dao.transfer_money(
        request.sender_account,
        request.receiver_account,
        request.amount
    )

    if result is False:
        raise HTTPException(
            status_code=400,
            detail="Transfer failed"
        )

    return {
        "message": "Money transferred successfully",
        "sender_account": request.sender_account,
        "receiver_account": request.receiver_account,
        "amount": request.amount
    }


# =========================================================
# Delete Account
# =========================================================

@app.delete("/accounts/{account_number}")
def delete_account(account_number: int):

    result = dao.delete_account(account_number)

    if result == 0:
        raise HTTPException(
            status_code=404,
            detail="Account not found"
        )

    return {
        "message": "Account deleted successfully",
        "account_number": account_number
    }
