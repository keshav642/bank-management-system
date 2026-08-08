from pydantic import BaseModel


class BankAccount(BaseModel):
    account_number: int
    holder_name: str
    balance: float