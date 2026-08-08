from app.database.db import get_connection
conn=get_connection()
print("database connected sucessfully")
conn.close()