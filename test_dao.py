from app.dao.bank_dao import BankDao
from app.models.bank_Account import BankAccount

dao = BankDao()


# ==========================================
# CREATE ACCOUNT
# ==========================================

account = BankAccount(
    account_number=104,
    holder_name="Test User",
    balance=5000
)

# Uncomment to test account creation
# result = dao.create_account(account)
# print("Account created:", result)


# ==========================================
# GET SINGLE ACCOUNT
# ==========================================

result = dao.get_account(101)
print("Account:", result)


# ==========================================
# GET ALL ACCOUNTS
# ==========================================

result = dao.get_all_accounts()
print("All accounts:", result)


# ==========================================
# DEPOSIT
# ==========================================

# result = dao.deposit(101, 1000)
# print("Rows updated:", result)


# ==========================================
# WITHDRAW
# ==========================================

# result = dao.withdraw(101, 500)
# print("Rows updated:", result)


# ==========================================
# DELETE ACCOUNT
# ==========================================

# result = dao.delete_account(104)
# print("Rows deleted:", result)


# ==========================================
# TRANSFER MONEY
# ==========================================

# result = dao.transfer_money(101, 103, 500)
# print("Transfer successful:", result)