import psycopg2
def get_connection():
    connection = psycopg2.connect(
        host="localhost",
        database="bank_system",
        user="postgres",
        password="your_password"
    )
    return connection