from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from pydantic import BaseModel, Field, field_validator
from datetime import datetime
import os
from dotenv import load_dotenv

try:
    from backend.models import Base, Farmer, Livestock, Transaction, Pen, Vaccination, WeatherForecast, DiseaseAlert
except ImportError:
    from models import Base, Farmer, Livestock, Transaction, Pen, Vaccination, WeatherForecast, DiseaseAlert

load_dotenv()

DB_HOST = os.getenv('DB_HOST')
DB_PORT = os.getenv('DB_PORT')
DB_USER = os.getenv('DB_USER')
DB_PASS = os.getenv('DB_PASS')
DB_NAME = os.getenv('DB_NAME')

DATABASE_URL = f'mysql+pymysql://{DB_USER}:{DB_PASS}@{DB_HOST}:{DB_PORT}/{DB_NAME}'

engine = create_engine(DATABASE_URL, echo=False)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

app = FastAPI(title="Ghana Farm Manager API", version="1.0.0")

# CORS middleware for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic schemas
class FarmerCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    location: str = Field(..., max_length=100)
    phone: str = Field(..., max_length=20)
    email: str = Field(..., max_length=100)

class FarmerResponse(FarmerCreate):
    id: int
    class Config:
        from_attributes = True

class LivestockCreate(BaseModel):
    pen_id: int
    type: str = Field(..., max_length=50)
    breed: str = Field(..., max_length=50)
    age_months: int = Field(..., ge=0)
    weight_kg: float = Field(..., gt=0)
    rfj_compliance: str = Field(..., max_length=100)

    @field_validator('rfj_compliance')
    @classmethod
    def validate_rfj_compliance(cls, v):
        valid_rfj = ['breed_improvement', 'feed_conversion', 'mortality_tracking', 'production_rate', 'none']
        if v not in valid_rfj:
            raise ValueError(f'RFJ compliance must be one of {valid_rfj}')
        return v

    @field_validator('type')
    @classmethod
    def validate_type(cls, v):
        valid_types = ['broiler', 'layer']
        if v not in valid_types:
            raise ValueError(f'Livestock type must be one of {valid_types}')
        return v

class LivestockResponse(LivestockCreate):
    id: int
    class Config:
        from_attributes = True

class TransactionCreate(BaseModel):
    farmer_id: int
    type: str = Field(..., max_length=50)
    amount: float = Field(..., gt=0)
    reference: str = Field(..., max_length=100)

    @field_validator('type')
    @classmethod
    def validate_transaction_type(cls, v):
        valid_types = ['MTN MoMo', 'Vodafone Cash', 'bank_transfer']
        if v not in valid_types:
            raise ValueError(f'Transaction type must be one of {valid_types}')
        return v

    @field_validator('reference')
    @classmethod
    def validate_momo_reference(cls, v):
        # MoMo references are typically REF-XXXXX or alphanumeric
        if len(v) < 3:
            raise ValueError('MoMo reference must be at least 3 characters')
        return v

class TransactionResponse(TransactionCreate):
    id: int
    date: datetime
    status: str
    class Config:
        from_attributes = True

class DashboardResponse(BaseModel):
    total_livestock: int
    active_disease_alerts: int
    momo_balance: float
    rainy_season_onset: str | None
    dry_spell_alert: str | None

class VaccinationResponse(BaseModel):
    id: int
    livestock_id: int
    vaccine_type: str
    date_administered: datetime
    next_due: datetime
    administered_by: str

class MoMoBalanceResponse(BaseModel):
    balance: float

class MoMoPayResponse(BaseModel):
    id: int
    reference: str
    status: str

class PenResponse(BaseModel):
    id: int
    farmer_id: int
    type: str
    capacity: int
    current_count: int
    class Config:
        from_attributes = True

class PenCreate(BaseModel):
    farmer_id: int
    type: str = Field(..., max_length=50)
    capacity: int = Field(..., gt=0)

    @field_validator('type')
    @classmethod
    def validate_type(cls, v):
        if v != 'poultry':
            raise ValueError('Only poultry pens are supported')
        return v

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/dashboard", response_model=DashboardResponse)
def get_dashboard(db: Session = Depends(get_db)):
    total_livestock = db.query(Livestock).count()
    active_disease_alerts = db.query(DiseaseAlert).filter(DiseaseAlert.severity != 'low').count()
    latest_weather = db.query(WeatherForecast).order_by(WeatherForecast.forecast_date.desc()).first()

    return {
        "total_livestock": total_livestock,
        "active_disease_alerts": active_disease_alerts,
        "momo_balance": 320.0,
        "rainy_season_onset": latest_weather.rainy_season_onset.isoformat() if latest_weather else None,
        "dry_spell_alert": latest_weather.dry_spell_alert if latest_weather else None,
    }

@app.get("/vaccinations", response_model=list[VaccinationResponse])
def list_vaccinations(db: Session = Depends(get_db)):
    records = db.query(Vaccination).all()
    return records

@app.get("/momo/balance", response_model=MoMoBalanceResponse)
def get_momo_balance():
    return {"balance": 320.0}

@app.post("/momo/pay", response_model=MoMoPayResponse)
def pay_for_feed(transaction: TransactionCreate, db: Session = Depends(get_db)):
    farmer = db.query(Farmer).filter(Farmer.id == transaction.farmer_id).first()
    if not farmer:
        raise HTTPException(status_code=404, detail="Farmer not found")

    db_transaction = Transaction(**transaction.dict(), date=datetime.now(), status="pending")
    db.add(db_transaction)
    db.commit()
    db.refresh(db_transaction)

    return {"status": "pending", "reference": db_transaction.reference, "id": db_transaction.id}

# Farmer endpoints
@app.post("/farmers", response_model=FarmerResponse, status_code=201)
def create_farmer(farmer: FarmerCreate, db: Session = Depends(get_db)):
    try:
        db_farmer = Farmer(**farmer.dict())
        db.add(db_farmer)
        db.commit()
        db.refresh(db_farmer)
        return db_farmer
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=f"Error creating farmer: {str(e)}")

@app.get("/farmers", response_model=list[FarmerResponse])
def list_farmers(db: Session = Depends(get_db)):
    try:
        farmers = db.query(Farmer).all()
        return farmers
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching farmers: {str(e)}")

@app.get("/farmers/{farmer_id}", response_model=FarmerResponse)
def get_farmer(farmer_id: int, db: Session = Depends(get_db)):
    try:
        farmer = db.query(Farmer).filter(Farmer.id == farmer_id).first()
        if not farmer:
            raise HTTPException(status_code=404, detail="Farmer not found")
        return farmer
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching farmer: {str(e)}")

# Livestock endpoints
@app.post("/livestock", response_model=LivestockResponse, status_code=201)
def create_livestock(livestock: LivestockCreate, db: Session = Depends(get_db)):
    try:
        # Verify pen exists
        pen = db.query(Pen).filter(Pen.id == livestock.pen_id).first()
        if not pen:
            raise HTTPException(status_code=404, detail="Pen not found")

        db_livestock = Livestock(**livestock.dict())
        db.add(db_livestock)
        db.commit()
        db.refresh(db_livestock)
        return db_livestock
    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=f"Error creating livestock: {str(e)}")

@app.get("/livestock", response_model=list[LivestockResponse])
def list_livestock(db: Session = Depends(get_db)):
    try:
        livestock = db.query(Livestock).all()
        return livestock
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching livestock: {str(e)}")

@app.get("/livestock/{livestock_id}", response_model=LivestockResponse)
def get_livestock(livestock_id: int, db: Session = Depends(get_db)):
    try:
        livestock = db.query(Livestock).filter(Livestock.id == livestock_id).first()
        if not livestock:
            raise HTTPException(status_code=404, detail="Livestock not found")
        return livestock
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching livestock: {str(e)}")

@app.get("/livestock/farmer/{farmer_id}", response_model=list[LivestockResponse])
def get_livestock_by_farmer(farmer_id: int, db: Session = Depends(get_db)):
    try:
        farmer = db.query(Farmer).filter(Farmer.id == farmer_id).first()
        if not farmer:
            raise HTTPException(status_code=404, detail="Farmer not found")

        livestock = db.query(Livestock).join(Pen).filter(Pen.farmer_id == farmer_id).all()
        return livestock
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching livestock: {str(e)}")

# Transaction endpoints
@app.post("/transactions", response_model=TransactionResponse, status_code=201)
def create_transaction(transaction: TransactionCreate, db: Session = Depends(get_db)):
    try:
        # Verify farmer exists
        farmer = db.query(Farmer).filter(Farmer.id == transaction.farmer_id).first()
        if not farmer:
            raise HTTPException(status_code=404, detail="Farmer not found")

        db_transaction = Transaction(
            **transaction.dict(),
            date=datetime.now(),
            status="pending"
        )
        db.add(db_transaction)
        db.commit()
        db.refresh(db_transaction)
        return db_transaction
    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=f"Error creating transaction: {str(e)}")

@app.get("/transactions", response_model=list[TransactionResponse])
def list_transactions(db: Session = Depends(get_db)):
    try:
        transactions = db.query(Transaction).all()
        return transactions
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching transactions: {str(e)}")

@app.get("/transactions/{transaction_id}", response_model=TransactionResponse)
def get_transaction(transaction_id: int, db: Session = Depends(get_db)):
    try:
        transaction = db.query(Transaction).filter(Transaction.id == transaction_id).first()
        if not transaction:
            raise HTTPException(status_code=404, detail="Transaction not found")
        return transaction
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching transaction: {str(e)}")

@app.get("/transactions/farmer/{farmer_id}", response_model=list[TransactionResponse])
def get_transactions_by_farmer(farmer_id: int, db: Session = Depends(get_db)):
    try:
        farmer = db.query(Farmer).filter(Farmer.id == farmer_id).first()
        if not farmer:
            raise HTTPException(status_code=404, detail="Farmer not found")

        transactions = db.query(Transaction).filter(Transaction.farmer_id == farmer_id).all()
        return transactions
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching transactions: {str(e)}")

@app.patch("/transactions/{transaction_id}/status")
def update_transaction_status(transaction_id: int, status: str, db: Session = Depends(get_db)):
    try:
        valid_statuses = ["pending", "completed", "failed"]
        if status not in valid_statuses:
            raise HTTPException(status_code=400, detail=f"Status must be one of {valid_statuses}")

        transaction = db.query(Transaction).filter(Transaction.id == transaction_id).first()
        if not transaction:
            raise HTTPException(status_code=404, detail="Transaction not found")

        transaction.status = status
        db.commit()
        db.refresh(transaction)
        return {"id": transaction.id, "status": transaction.status}
    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=f"Error updating transaction: {str(e)}")

@app.post("/pens", response_model=PenResponse, status_code=201)
def create_pen(pen: PenCreate, db: Session = Depends(get_db)):
    try:
        farmer = db.query(Farmer).filter(Farmer.id == pen.farmer_id).first()
        if not farmer:
            raise HTTPException(status_code=404, detail="Farmer not found")
        db_pen = Pen(**pen.dict())
        db.add(db_pen)
        db.commit()
        db.refresh(db_pen)
        return db_pen
    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=f"Error creating pen: {str(e)}")

@app.get("/pens/farmer/{farmer_id}", response_model=list[PenResponse])
def get_pens_by_farmer(farmer_id: int, db: Session = Depends(get_db)):
    try:
        farmer = db.query(Farmer).filter(Farmer.id == farmer_id).first()
        if not farmer:
            raise HTTPException(status_code=404, detail="Farmer not found")
        pens = db.query(Pen).filter(Pen.farmer_id == farmer_id).all()
        return pens
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching pens: {str(e)}")

@app.get("/vaccination-schedule")
def get_vaccination_schedule():
    """Get standard vaccination schedule for poultry"""
    schedule = [
        {"vaccine_type": "Newcastle", "age_weeks_due": 1, "description": "First Newcastle vaccination (V4)"},
        {"vaccine_type": "Newcastle", "age_weeks_due": 3, "description": "Booster Newcastle vaccination"},
        {"vaccine_type": "IBD (Gumboro)", "age_weeks_due": 2, "description": "IBD vaccination"},
        {"vaccine_type": "Fowl Pox", "age_weeks_due": 6, "description": "Wing web pox vaccination"},
    ]
    return {"schedule": schedule}

class EggForecastResponse(BaseModel):
    mature_layers: int
    expected_weekly_eggs: int
    forecast_note: str

class VetAdviceRequest(BaseModel):
    symptoms: str = Field(..., min_length=3, max_length=500)
    age_months: int | None = None
    feed_type: str | None = None

class VetAdviceResponse(BaseModel):
    summary: str
    recommendation: str

@app.get("/feed-schedule")
def get_feed_schedule():
    """Get standard feed schedule for poultry"""
    schedule = [
        {"breed_type": "broiler", "age_weeks": 0, "feed_type": "Starter", "quantity_kg_per_day": 0.05, "notes": "High protein, 23%"},
        {"breed_type": "broiler", "age_weeks": 3, "feed_type": "Grower", "quantity_kg_per_day": 0.12, "notes": "Medium protein, 20%"},
        {"breed_type": "broiler", "age_weeks": 5, "feed_type": "Finisher", "quantity_kg_per_day": 0.18, "notes": "Lower protein, 18%"},
        {"breed_type": "layer", "age_weeks": 0, "feed_type": "Starter", "quantity_kg_per_day": 0.04, "notes": "High protein, 24%"},
        {"breed_type": "layer", "age_weeks": 8, "feed_type": "Grower", "quantity_kg_per_day": 0.10, "notes": "Medium protein, 16%"},
        {"breed_type": "layer", "age_weeks": 16, "feed_type": "Layer", "quantity_kg_per_day": 0.12, "notes": "Calcium enriched, 16% protein"},
    ]
    return {"schedule": schedule}

@app.get("/egg-forecast", response_model=EggForecastResponse)
def get_egg_forecast(db: Session = Depends(get_db)):
    livestock = db.query(Livestock).filter(Livestock.type == 'layer').all()
    mature_layers = sum(1 for item in livestock if item.age_months >= 18)
    expected_weekly_eggs = mature_layers * 4
    forecast_note = (
        "Mature layers are ready for regular laying." if mature_layers > 0
        else "No mature layers yet. Monitor for onset of peak lay." 
    )
    return {
        "mature_layers": mature_layers,
        "expected_weekly_eggs": expected_weekly_eggs,
        "forecast_note": forecast_note,
    }

@app.post("/vet-advice", response_model=VetAdviceResponse)
def get_vet_advice(request: VetAdviceRequest):
    symptoms = request.symptoms.lower()
    tips = []

    if "diarr" in symptoms or "runny" in symptoms:
        tips.append("Check water quality, clean feeders, and watch for coccidiosis or enteritis.")
    if "letharg" in symptoms or "weak" in symptoms or "low energy" in symptoms:
        tips.append("Review feed intake and temperature; this may signal stress or infection.")
    if "not eating" in symptoms or "loss of appetite" in symptoms:
        tips.append("Inspect feed freshness and litter quality; poor appetite often means illness.")
    if "cough" in symptoms or "sneez" in symptoms or "respir" in symptoms:
        tips.append("Isolate affected birds and monitor air quality; respiratory illness may be present.")
    if not tips:
        tips.append("Maintain clean water, balanced feed, and good ventilation; observe birds closely.")

    recommendation = " ".join(tips) + " If symptoms persist, contact a local vet for diagnosis."
    return {
        "summary": "AI-backed poultry health guidance.",
        "recommendation": recommendation,
    }

@app.get("/health")
def health_check():
    return {"status": "ok", "message": "Ghana Farm Manager API is running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
