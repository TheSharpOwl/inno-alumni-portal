import sqlite3 

def validate_diploma_id(diploma_id):
    conn = sqlite3.connect("DiplomaRecords.db")
    cur = conn.cursor()
    alumni = cur.execute("select * from Graduates where diploma_id = ?", (diploma_id, )).fetchall()
    if alumni != []:
        return alumni[0][0]
    return ""