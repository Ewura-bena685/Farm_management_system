# Ghana Farm Manager

A premium full-stack farm management application focused on poultry operations. Features real-time climate monitoring, disease alerts, livestock tracking, health management, and mobile money (MoMo) payment integration.

##  Features

- **Poultry Dashboard** - Real-time inventory and capacity monitoring
- **Climate Monitoring** - Weather alerts, rainy season forecasts, dry spell warnings
- **Disease Management** - Regional disease alerts with biosecurity recommendations
- **Health Tracking** - Vaccination schedules, egg forecasts, veterinary advice
- **Financial Management** - MoMo payment integration and cash flow tracking
- **Responsive Design** - Premium AgTech UI with Tailwind CSS

##  Project Structure

```
GhanaFarmManager/
├── backend/              # Python FastAPI server
│   ├── main.py          # API entry point
│   ├── models.py        # SQLAlchemy ORM models
│   ├── init_db.py       # Database initialization
│   ├── requirements.txt  # Python dependencies
│   └── .env.example     # Environment template
├── frontend/            # React + Vite application
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── services/    # API integration
│   │   └── styles/      # Global styles
│   ├── package.json     # Node dependencies
│   └── vite.config.js   # Vite configuration
└── docs/               # Documentation & resources
```

## Quick Start

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ewura-bena685/Farm_management_system.git
   cd GhanaFarmManager
   ```

2. **Set up Python environment**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials
   ```

5. **Initialize database**
   ```bash
   python init_db.py
   ```

6. **Start backend server**
   ```bash
   python main.py
   ```
   Server runs on `http://localhost:8001`

### Frontend Setup

1. **Install dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```
   App runs on `http://localhost:5173`

3. **Build for production**
   ```bash
   npm run build
   ```

##  Security

- **.env files are never committed** - Use `.env.example` as a template
- **Database credentials** are stored locally in `.env`
- **API endpoints** are poultry-focused with proper validation
- See [.gitignore](.gitignore) for excluded files

## 📋 Environment Variables

See [backend/.env.example](backend/.env.example) for required configuration.

### Database Setup

Ensure MySQL is running and accessible:
```bash
mysql -u root -p
CREATE DATABASE ghana_farm_db;
```

##  Tech Stack

**Backend**
- Python 3.11+
- FastAPI
- SQLAlchemy 2.0
- Pydantic
- PyMySQL

**Frontend**
- React 19
- Vite 5
- Tailwind CSS 3
- Axios
- Lucide React (icons)



##  License

This project is open source and available under the MIT License.

##  Author

[Ewura-bena685](https://github.com/Ewura-bena685)

##  Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

---

**Built with love for Ghana's agricultural sector**
