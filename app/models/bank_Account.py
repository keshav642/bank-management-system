from decimal import Decimal

from pydantic import BaseModel, Field


class BankAccount(BaseModel):
    account_number: int
    holder_name: str
    balance: Decimal = Field(ge=0)