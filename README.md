# Sales Outreach Application

A full-stack application for managing sales contacts built with FastAPI (Python) and React (TypeScript).

## Prerequisites

- Python 3.8 or higher
- Node.js 16 or higher
- PostgreSQL 12 or higher
- Git

## Project Structure

.
├── backend/ # FastAPI backend
└── frontend/ # React frontend

## Backend Setup

### One-time Setup

These steps are only needed when first setting up the project:

1. Create a virtual environment and activate it:

```bash
cd backend
python -m venv venv
# On Windows
.\venv\Scripts\activate
# On macOS/Linux
source venv/bin/activate
```

2. Install dependencies:

```bash
pip install -r requirements.txt
```

3. Create a PostgreSQL database named `sales_outreach`

4. Create a `.env` file in the `backend` directory:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/sales_outreach
SECRET_KEY=your-super-secret-key-here
DEBUG=True
API_V1_PREFIX=/api/v1
```

The API will be available at `http://localhost:8000`

- API documentation: `http://localhost:8000/docs`
- Alternative API documentation: `http://localhost:8000/redoc`

### Running the Backend

Every time you want to work on the project:

1. Activate the virtual environment (required for each new terminal session):

```bash
cd backend
# On Windows
.\venv\Scripts\activate
# On macOS/Linux
source venv/bin/activate
```

2. Start the server:

```bash
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`

## Frontend Setup

1. Install dependencies:

```bash
cd frontend
npm install
```

2. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Features

- Create, read, update, and delete contacts
- Contact information includes:
  - First and last name
  - Email
  - Company
  - Position
  - LinkedIn URL
  - Notes
  - Status tracking
- Real-time form validation
- Toast notifications for actions
- Optimistic updates for better UX
- Responsive design

## Tech Stack

### Backend

- FastAPI (Python web framework)
- SQLAlchemy (ORM)
- Pydantic (Data validation)
- PostgreSQL (Database)
- Alembic (Database migrations)

### Frontend

- React 18
- TypeScript
- Vite (Build tool)
- TanStack Query (Data fetching)
- React Hook Form (Form handling)
- Zod (Schema validation)
- Tailwind CSS (Styling)
- Headless UI (UI components)
- React Hot Toast (Notifications)

## Development Notes

- The backend uses dependency injection for better testability
- Frontend implements optimistic updates for better UX
- Form validation is handled both client and server-side
- The project follows a service-based architecture

## Common Issues

1. **Database Connection**: Ensure PostgreSQL is running and the credentials in `.env` match your setup
2. **CORS Issues**: The backend is configured to accept requests from `http://localhost:5173`
3. **Node Modules**: If you encounter issues, try deleting `node_modules` and running `npm install` again

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.
