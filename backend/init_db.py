import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.exc import SQLAlchemyError

# Load environment variables from .env file
load_dotenv('../.env')

DB_HOST = os.getenv('DB_HOST')
DB_PORT = os.getenv('DB_PORT')
DB_USER = os.getenv('DB_USER')
DB_PASS = os.getenv('DB_PASS')
DB_NAME = os.getenv('DB_NAME')

try:
    # Create database engine
    engine = create_engine(f'mysql+pymysql://{DB_USER}:{DB_PASS}@{DB_HOST}:{DB_PORT}/{DB_NAME}')
    
    # Test connection
    with engine.connect() as connection:
        print("MySQL connection successful.")
    
    # Import models to ensure they are registered with Base
    from models import Base

    # Create all tables
    Base.metadata.create_all(engine)
    print("Database tables created successfully in ghana_farm_db")

except SQLAlchemyError as e:
    print(f"Database error: {e}")
    exit(1)
except Exception as e:
    print(f"Unexpected error: {e}")
    exit(1)