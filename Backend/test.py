import mysql.connector

db = mysql.connector.connect(
    host="localhost",
    user="root",
    passwd="Froggy122204",
    database="testdatabase"
)

mycursor = db.cursor()

#python Mysql tutorial - setup and basic queries
# tech with tim