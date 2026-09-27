from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from config.env_config import settings

db_url = settings.db_url

# DB Connection
engine = create_engine(db_url)

session_local = sessionmaker(bind=engine)

Base = declarative_base()
