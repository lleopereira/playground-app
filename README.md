# Playground App

A modern full-stack playground application featuring a React frontend with UI components and an Express backend, designed for practicing automation testing.

## Quick Start Guide

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/lleopereira/playground-app.git
cd playground-app
```

### 2. Backend Setup
```bash
# Navigate to backend directory and install dependencies
cd backend && npm install

# Start the backend server
npm start
```

Your backend API will be running at `http://localhost:5000`

### 3. Frontend Setup
```bash
# Open a new terminal, navigate to frontend directory and install dependencies
cd frontend/playground-frontend && npm install

# Start the frontend application
npm start
```

Your application will be available at:
- 🌐 Main URL: `http://localhost:3000`
- 🔄 Alternate port: `http://localhost:3001` (if port 3000 is in use)

## Features

### Core Features
- User authentication (mock auth for testing)
- Responsive design with mobile-first approach
- Modern UI components:
  - Navigation sidebar with smooth transitions
  - Breadcrumb navigation
  - Mobile-friendly hamburger menu
  - Form inputs with animations

### Testing Pages
- `/` - Login page
- `/playground` - Main playground
- `/inputs` - Input fields testing page with various input elements
- More testing pages coming soon...

### Technical Features
- React 19.1.1 with hooks
- React Router DOM 7.8.2 for navigation
- Axios for API calls
- Testing utilities (@testing-library)
- Modern CSS with responsive design

## Browser Support

The application supports:
- Latest versions of Chrome, Firefox, and Edge
- Mobile-responsive design for tablets and phones

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Project Structure

```
playground-app/
├── backend/
│   ├── package.json
│   └── server.js
├── frontend/
│   └── playground-frontend/
│       ├── public/
│       │   ├── favicon.ico
│       │   ├── index.html
│       │   └── manifest.json
│       └── src/
│           ├── assets/
│           │   ├── night-sky.png
│           │   ├── robot-8-bit.png
│           │   └── robot-gif.gif
│           ├── components/
│           │   ├── Breadcrumb.js
│           │   ├── Breadcrumb.css
│           │   ├── Layout.js
│           │   └── Layout.css
│           ├── pages/
│           │   ├── Login.js
│           │   ├── Login.css
│           │   ├── Inputs.js
│           │   ├── Inputs.css
│           │   ├── Playground.js
│           │   └── Playground.css
│           ├── App.js
│           └── index.js
```

##  Available Scripts

### Frontend (`/frontend/playground-frontend`)
- `npm start`: Runs the app in development mode (port 3000)
- `npm test`: Launches the test runner
- `npm run build`: Builds the app for production
- `npm run eject`: Ejects from create-react-app

### Backend (`/backend`)
- `npm start`: Runs the server using Node.js
- `npm run dev`: Runs the server with nodemon for development

### Common Issues
1. **Ports**: 
   - Frontend runs on port 3000 (fallbacks to 3001 if 3000 is in use)
   - Backend runs on port 5000
2. **CORS Issues**: Ensure the backend is running and CORS is properly configured in `server.js`
3. **Module not found**: Run `npm install` in both frontend and backend directories

## Technologies Used

### Frontend
- **React 18**: Modern UI library
- **React Router 6**: For navigation
- **Modern CSS**:
  - CSS Variables for theming
  - Flexbox & Grid for layouts
  - Media Queries for responsiveness
  - Transitions & Animations
  - Mobile-first approach

### Backend
- **Express**: Web framework for Node.js
- **CORS**: For cross-origin resource sharing
- **Body Parser**: For parsing incoming request bodies

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
