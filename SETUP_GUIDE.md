# Playground App - Detailed Setup Guide

This guide provides step-by-step instructions for creating the Playground App from scratch.

## Table of Contents
1. [Project Overview](#project-overview)
2. [Initial Setup](#initial-setup)
3. [Backend Setup](#backend-setup)
4. [Frontend Setup](#frontend-setup)
5. [Authentication System](#authentication-system)
6. [Component Structure](#component-structure)
7. [Styling Guide](#styling-guide)
8. [Testing Components](#testing-components)

## Project Overview

The Playground App is a full-stack application designed for practicing automation testing. It consists of:
- A React frontend with various UI components
- An Express backend for authentication
- A comprehensive testing environment

### Key Features
- User authentication
- Protected routes
- Various input types for testing
- Responsive design
- Modular component structure

### Technology Stack
- Frontend: React 19.1.1
- Routing: React Router DOM 7.8.2
- HTTP Client: Axios
- Backend: Express.js
- CSS: Modern CSS with CSS Variables

## Initial Setup

1. Create Project Structure
```bash
mkdir playground-app
cd playground-app
```

2. Initialize Git Repository
```bash
git init
git remote add origin https://github.com/your-username/playground-app.git
```

## Backend Setup

1. Create Backend Directory
```bash
mkdir backend
cd backend
npm init -y
```

2. Install Dependencies
```bash
npm install express cors body-parser
```

3. Create server.js
```javascript
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// Mock authentication endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  // Simple mock authentication
  if (username && password) {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false });
  }
});

app.listen(port, () => {
  console.log(\`Server running on port \${port}\`);
});
```

## Frontend Setup

1. Create React App
```bash
npx create-react-app playground-frontend
cd playground-frontend
```

2. Install Dependencies
```bash
npm install react-router-dom axios
```

3. Setup Project Structure
```
src/
├── assets/
├── components/
├── context/
├── pages/
└── App.js
```

4. Create Authentication Context (src/context/AuthContext.js)
```javascript
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = localStorage.getItem('auth_token');
    return !!token;
  });

  const login = (username, password) => {
    if (username && password) {
      setIsAuthenticated(true);
      localStorage.setItem('auth_token', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('auth_token');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
```

5. Create Protected Route Component (src/components/ProtectedRoute.js)
```javascript
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
```

## Component Structure

### 1. Layout Component
The Layout component serves as the main wrapper for all authenticated pages:

```javascript
// src/components/Layout.js
import React, { useState, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Layout.css';

export default function Layout({ children }) {
  // Component implementation
}
```

### 2. CSS Variables (src/index.css)
```css
:root {
  --sidebar-width: 250px;
  --primary-color: #2c3e50;
  --secondary-color: #34495e;
  --background-color: #f5f5f5;
}
```

### 3. Page Components

#### Login Page (src/pages/Login.js)
- Implements authentication form
- Handles user login
- Redirects to playground on success

#### Playground Page (src/pages/Playground.js)
- Landing page after authentication
- Displays welcome message and robot image
- Implements responsive design

#### Inputs Page (src/pages/Inputs.js)
- Demonstrates various form inputs
- Implements form validation
- Shows form submission overlay

## Styling Guide

### 1. Global Styles
- Use CSS variables for consistent theming
- Implement responsive breakpoints
- Mobile-first approach

### 2. Component-Specific Styles
Each component has its own CSS file with:
- Scoped class names
- Responsive media queries
- Animation definitions

### 3. Layout System
```css
.layout-container {
  display: flex;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  margin-left: var(--sidebar-width);
  padding: 20px;
  width: calc(100% - var(--sidebar-width));
}
```

### 4. Form Styling
```css
.input-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 1536px;
  margin: 0 auto;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
```

## Testing Components

### 1. Data Test IDs
All interactive elements include data-test-id attributes:
```javascript
<button 
  data-test-id="login-button"
  onClick={handleLogin}
>
  Login
</button>
```

### 2. Form Testing
- Input validation testing
- Form submission testing
- Error handling testing

### 3. Authentication Testing
- Protected route testing
- Login/logout flow testing
- Session management testing

## Responsive Design Implementation

### 1. Breakpoints
```css
/* Mobile */
@media (max-width: 768px) {
  .main-content {
    margin-left: 0;
    width: 100%;
  }
}

/* Tablet */
@media (max-width: 1024px) {
  .sidebar {
    width: var(--sidebar-width-tablet);
  }
}
```

### 2. Mobile Menu
- Hamburger menu implementation
- Slide-in sidebar
- Touch-friendly interactions

## Development Workflow

1. Start Backend
```bash
cd backend
npm start
```

2. Start Frontend
```bash
cd frontend/playground-frontend
npm start
```

3. Access Application
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Testing Guidelines

1. Component Testing
- Use data-test-id attributes
- Test user interactions
- Validate form submissions

2. Authentication Testing
- Test protected routes
- Verify login/logout flows
- Check session management

3. Responsive Testing
- Test on different screen sizes
- Verify mobile menu functionality
- Check form responsiveness

## Deployment Considerations

1. Environment Variables
- Backend URL configuration
- Authentication settings
- Port configurations

2. Build Process
```bash
cd frontend/playground-frontend
npm run build
```

3. Server Configuration
- CORS settings
- Security headers
- Error handling

## Maintenance and Updates

1. Dependencies
- Regular updates of React and other packages
- Security patches
- Compatibility testing

2. Code Organization
- Maintain component structure
- Update documentation
- Follow coding standards

## Common Issues and Solutions

1. CORS Issues
- Verify backend CORS configuration
- Check request headers
- Validate API endpoints

2. Authentication Problems
- Clear local storage
- Check token management
- Verify API responses

3. Styling Issues
- Check CSS specificity
- Verify media queries
- Test cross-browser compatibility
