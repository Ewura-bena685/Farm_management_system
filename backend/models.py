from sqlalchemy import CheckConstraint, Integer, String, DateTime, Float, ForeignKey, Text
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship

class Base(DeclarativeBase):
    pass

class Farmer(Base):
    __tablename__ = 'farmers'
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    location: Mapped[str] = mapped_column(String(100))  # e.g., Bono East, Northern Region
    phone: Mapped[str] = mapped_column(String(20))
    email: Mapped[str] = mapped_column(String(100))

    pens: Mapped[list["Pen"]] = relationship("Pen", back_populates="farmer")
    transactions: Mapped[list["Transaction"]] = relationship("Transaction", back_populates="farmer")

class Pen(Base):
    __tablename__ = 'pens'
    __table_args__ = (
        CheckConstraint("type = 'poultry'", name='ck_pen_type_poultry'),
    )
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    farmer_id: Mapped[int] = mapped_column(Integer, ForeignKey('farmers.id'), nullable=False)
    type: Mapped[str] = mapped_column(String(50), nullable=False)  # poultry only
    capacity: Mapped[int] = mapped_column(Integer, nullable=False)
    current_count: Mapped[int] = mapped_column(Integer, nullable=False, default=0)

    farmer: Mapped["Farmer"] = relationship("Farmer", back_populates="pens")
    livestock: Mapped[list["Livestock"]] = relationship("Livestock", back_populates="pen")

class Livestock(Base):
    __tablename__ = 'livestock'
    __table_args__ = (
        CheckConstraint("type IN ('broiler','layer')", name='ck_livestock_type'),
    )
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    pen_id: Mapped[int] = mapped_column(Integer, ForeignKey('pens.id'), nullable=False)
    type: Mapped[str] = mapped_column(String(50), nullable=False)  # broiler, layer
    breed: Mapped[str] = mapped_column(String(50), nullable=False)
    age_months: Mapped[int] = mapped_column(Integer, nullable=False)
    weight_kg: Mapped[float] = mapped_column(Float, nullable=False)
    rfj_compliance: Mapped[str] = mapped_column(String(100), nullable=False)  # RFJ tracking metrics

    pen: Mapped["Pen"] = relationship("Pen", back_populates="livestock")
    vaccinations: Mapped[list["Vaccination"]] = relationship("Vaccination", back_populates="livestock")

class Vaccination(Base):
    __tablename__ = 'vaccinations'
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    livestock_id: Mapped[int] = mapped_column(Integer, ForeignKey('livestock.id'), nullable=False)
    vaccine_type: Mapped[str] = mapped_column(String(100), nullable=False)
    date_administered: Mapped[DateTime] = mapped_column(DateTime, nullable=False)
    next_due: Mapped[DateTime] = mapped_column(DateTime, nullable=False)
    administered_by: Mapped[str] = mapped_column(String(100), nullable=False)  # vet name

    livestock: Mapped["Livestock"] = relationship("Livestock", back_populates="vaccinations")

class Feed(Base):
    __tablename__ = 'feeds'
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    type: Mapped[str] = mapped_column(String(100), nullable=False)  # BSF, Cocoa Pod Husk
    conversion_ratio: Mapped[float] = mapped_column(Float, nullable=False)  # feed conversion ratio
    fda_standard: Mapped[str] = mapped_column(Text, nullable=False)  # FDA Ghana standards reference
    supplier: Mapped[str] = mapped_column(String(100), nullable=False)

class Transaction(Base):
    __tablename__ = 'transactions'
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    farmer_id: Mapped[int] = mapped_column(Integer, ForeignKey('farmers.id'), nullable=False)
    type: Mapped[str] = mapped_column(String(50))  # MTN MoMo, Vodafone Cash
    amount: Mapped[float] = mapped_column(Float)
    date: Mapped[DateTime] = mapped_column(DateTime)
    status: Mapped[str] = mapped_column(String(50))  # pending, completed, failed
    reference: Mapped[str] = mapped_column(String(100))  # transaction reference

    farmer: Mapped["Farmer"] = relationship("Farmer", back_populates="transactions")

class DiseaseAlert(Base):
    __tablename__ = 'disease_alerts'
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    region: Mapped[str] = mapped_column(String(100))
    disease: Mapped[str] = mapped_column(String(100))  # PPR, etc.
    date: Mapped[DateTime] = mapped_column(DateTime)
    description: Mapped[str] = mapped_column(Text)
    severity: Mapped[str] = mapped_column(String(50))  # low, medium, high

class WeatherForecast(Base):
    __tablename__ = 'weather_forecasts'
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    region: Mapped[str] = mapped_column(String(100))
    forecast_date: Mapped[DateTime] = mapped_column(DateTime)
    rainy_season_onset: Mapped[DateTime] = mapped_column(DateTime)
    dry_spell_alert: Mapped[str] = mapped_column(String(100))  # water conservation protocol trigger