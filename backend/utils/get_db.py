from database.db import session_local


# connect to db
def get_db():
    db = session_local()
    try:
        yield db
    finally:
        db.close()
