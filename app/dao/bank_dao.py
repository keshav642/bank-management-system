from app.database.db import get_connection


class BankDao:

    def create_account(self, account):
        connection = get_connection()
        cursor = connection.cursor()

        try:
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

            return True

        except Exception:
            connection.rollback()
            raise

        finally:
            cursor.close()
            connection.close()

    def get_account(self, account_number):
        connection = get_connection()
        cursor = connection.cursor()

        try:
            query = """
                SELECT *
                FROM bank_accounts
                WHERE account_number = %s
            """

            cursor.execute(query, (account_number,))

            return cursor.fetchone()

        finally:
            cursor.close()
            connection.close()

    def get_all_accounts(self):
        connection = get_connection()
        cursor = connection.cursor()

        try:
            query = """
                SELECT *
                FROM bank_accounts
                ORDER BY account_number
            """

            cursor.execute(query)

            return cursor.fetchall()

        finally:
            cursor.close()
            connection.close()

    def deposit(self, account_number, amount):
        connection = get_connection()
        cursor = connection.cursor()

        try:
            query = """
                UPDATE bank_accounts
                SET balance = balance + %s
                WHERE account_number = %s
            """

            cursor.execute(
                query,
                (amount, account_number)
            )

            if cursor.rowcount == 0:
                connection.rollback()
                return 0

            connection.commit()

            return cursor.rowcount

        except Exception:
            connection.rollback()
            raise

        finally:
            cursor.close()
            connection.close()

    def withdraw(self, account_number, amount):
        connection = get_connection()
        cursor = connection.cursor()

        try:
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

            if cursor.rowcount == 0:
                connection.rollback()
                return 0

            connection.commit()

            return cursor.rowcount

        except Exception:
            connection.rollback()
            raise

        finally:
            cursor.close()
            connection.close()

    def transfer_money(self, sender_account, receiver_account, amount):
        connection = get_connection()
        cursor = connection.cursor()

        try:
            # Sender and receiver cannot be the same account
            if sender_account == receiver_account:
                return False

            # Check sender and receiver exist
            cursor.execute(
                """
                SELECT account_number
                FROM bank_accounts
                WHERE account_number IN (%s, %s)
                """,
                (sender_account, receiver_account)
            )

            accounts = cursor.fetchall()

            account_numbers = {row[0] for row in accounts}

            if sender_account not in account_numbers:
                return False

            if receiver_account not in account_numbers:
                return False

            # Deduct money from sender only if sufficient balance exists
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

            if cursor.rowcount != 1:
                connection.rollback()
                return False

            # Add money to receiver
            deposit_query = """
                UPDATE bank_accounts
                SET balance = balance + %s
                WHERE account_number = %s
            """

            cursor.execute(
                deposit_query,
                (amount, receiver_account)
            )

            if cursor.rowcount != 1:
                connection.rollback()
                return False

            # Both operations successful
            connection.commit()

            return True

        except Exception:
            connection.rollback()
            raise

        finally:
            cursor.close()
            connection.close()

    def delete_account(self, account_number):
        connection = get_connection()
        cursor = connection.cursor()

        try:
            query = """
                DELETE FROM bank_accounts
                WHERE account_number = %s
            """

            cursor.execute(query, (account_number,))

            if cursor.rowcount == 0:
                connection.rollback()
                return 0

            connection.commit()

            return cursor.rowcount

        except Exception:
            connection.rollback()
            raise

        finally:
            cursor.close()
            connection.close()