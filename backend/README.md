# Autoways Backend API

Backend API server for the Autoways website.

## Setup

### Prerequisites
- Node.js v18 or higher
- MongoDB instance
- npm or yarn

### Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
```
Edit `.env` with your configuration settings.

4. Start the server:

**Development:**
```bash
npm run dev
```

**Production (with PM2):**
```bash
npm run prod
```

## Environment Variables

Required environment variables in `.env`:
- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `NODE_ENV` - Environment (development/production)
- `LOG_LEVEL` - Logging level (debug/info/warn/error)

## API Endpoints

The API provides endpoints for:
- About Us management
- Contact form submissions
- Team members management
- Service offerings
- And more...

## Logging

The application uses Winston for logging. Logs are stored in the `backend/logs` directory:
- `application-YYYY-MM-DD.log` - General application logs
- `error-YYYY-MM-DD.log` - Error logs

Logs are automatically rotated daily and compressed.

## PM2 Commands

```bash
npm run pm2:start    # Start the application with PM2
npm run pm2:stop     # Stop the application
npm run pm2:restart  # Restart the application
npm run pm2:logs     # View logs
npm run pm2:status   # Check status
```

## Troubleshooting

### Module Not Found Errors

If you encounter "Cannot find module" errors, ensure all dependencies are installed:
```bash
cd backend
npm install
```

### MongoDB Connection Issues

Verify your `MONGODB_URI` in the `.env` file is correct and that your MongoDB instance is running.
