from app.database.db import get_connection


class BankDao:

    def create_account(self, account):
        connection = get_connection()
        cursor = connection.cursor()

        query = """
            INSERT INTO bank_accounts
            (account_number, holder_name, balance)
            VALUES (%s, %s, %s)
        """

        cursor.execute(
            query,
            (
                account.account_number,
                account.holder_name,
                account.balance
            )
        )

        connection.commit()
        cursor.close()
        connection.close()

        return True

    def get_account(self, account_number):
        connection = get_connection()
        cursor = connection.cursor()

        query = """
            SELECT *
            FROM bank_accounts
            WHERE account_number = %s
        """

        cursor.execute(query, (account_number,))

        result = cursor.fetchone()

        cursor.close()
        connection.close()

        return result

    def deposit(self, account_number, amount):
        connection = get_connection()
        cursor = connection.cursor()

        query = """
            UPDATE bank_accounts
            SET balance = balance + %s
            WHERE account_number = %s
        """

        cursor.execute(
            query,
            (amount, account_number)
        )

        connection.commit()

        rows_updated = cursor.rowcount

        cursor.close()
        connection.close()

        return rows_updated

    def withdraw(self, account_number, amount):
        connection = get_connection()
        cursor = connection.cursor()

        query = """
            UPDATE bank_accounts
            SET balance = balance - %s
            WHERE account_number = %s
            AND balance >= %s
        """

        cursor.execute(
            query,
            (amount, account_number, amount)
        )

        connection.commit()

        rows_updated = cursor.rowcount

        cursor.close()
        connection.close()

        return rows_updated
    def get_all_accounts(self):
        connection = get_connection()
        cursor = connection.cursor()
    
        query = """
            SELECT *
            FROM bank_accounts
        """
    
        cursor.execute(query)
    
        result = cursor.fetchall()
    
        cursor.close()
        connection.close()
    
        return result
    def delete_account(self, account_number):
        connection = get_connection()
        cursor = connection.cursor()
    
        query = """
            DELETE FROM bank_accounts
            WHERE account_number = %s
        """
    
        cursor.execute(query, (account_number,))
    
        connection.commit()
    
        rows_deleted = cursor.rowcount
    
        cursor.close()
        connection.close()
    
        return rows_deleted
    def transfer_money(self, sender_account, receiver_account, amount):
        connection = get_connection()
        cursor = connection.cursor()
    
        try:
            # 1. Sender se amount deduct
            withdraw_query = """
                UPDATE bank_accounts
                SET balance = balance - %s
                WHERE account_number = %s
                AND balance >= %s
            """
    
            cursor.execute(
                withdraw_query,
                (amount, sender_account, amount)
            )
    
            if cursor.rowcount == 0:
                connection.rollback()
                return False
    
            # 2. Receiver ke account mein amount add
            deposit_query = """
                UPDATE bank_accounts
                SET balance = balance + %s
                WHERE account_number = %s
            """
    
            cursor.execute(
                deposit_query,
                (amount, receiver_account)
            )
    
            if cursor.rowcount == 0:
                connection.rollback()
                return False
    
            # Dono operations successful
            connection.commit()
    
            return True
    
        except Exception:
            connection.rollback()
            raise
    
        finally:
            cursor.close()
            connection.close()