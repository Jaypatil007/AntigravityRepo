# Gemini Agent Chat

A modern, containerized chat interface for interacting with a Gemini-powered Agent.

## Features
- **Premium UI**: Glassmorphism design, smooth animations, and gradient backgrounds.
- **Agent Integration**: Backend Python agent using Google ADK.
- **SAP CPI Support**: Specialized for generating SAP CPI Groovy scripts.
- **Pretty Print**: Dedicated feature to format and beautify agent responses.
- **Containerized**: Easy to run with Docker.

## Prerequisites
- Docker & Docker Compose
- (Optional) Python 3.11+ if running backend locally without Docker.
- (Optional) Node.js 18+ if running frontend locally without Docker.

## Quick Start (Recommended)

1. **Set up Environment**
   Ensure you have your Google API Key ready if the agent requires it.

2. **Run with Docker**
   ```bash
   docker-compose up --build
   ```

3. **Access the App**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development

### Backend
The backend is located in `/backend`. It uses the Google ADK.
To run locally:
```bash
cd backend
pip install -r requirements.txt
# Run your agent (command depends on ADK setup)
```

### Frontend
The frontend is located in `/frontend`. It uses React + Vite.
To run locally:
```bash
cd frontend
npm install
npm run dev
```

## Project Structure
- `backend/`: Python agent code and Dockerfile.
- `frontend/`: React application and Dockerfile.
- `docker-compose.yml`: Orchestration for both services.
