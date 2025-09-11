# Playground App

A React-based testing playground application with modern UI components and responsive design.

##  Quick Start

1. **Clone the repository**
```bash
git clone [your-repository-url]
cd playground-app
```

2. **Install dependencies**
```bash
cd frontend/playground-frontend
npm install
```

3. **Start the application**
```bash
npm start
```

The application will be available at `http://localhost:3000`

A React-based testing playground application with modern UI components and responsive design.

## Features

    User authentication
    Responsive design with mobile-first approach
    Interactive form elements
    Navigation sidebar with smooth transitions
    Breadcrumb navigation
    Mobile-friendly hamburger menu

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:
```bash
git clone [your-repository-url]
```

2. Navigate to the frontend directory:
```bash
cd playground-app/frontend/playground-frontend
```

3. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Project Structure

```
playground-app/
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

## Available Scripts

- `npm start`: Runs the app in development mode
- `npm test`: Launches the test runner
- `npm run build`: Builds the app for production
- `npm run eject`: Ejects from create-react-app

## Development

The application uses:
- React for UI components
- React Router for navigation
- CSS3 for styling with:
  - CSS Variables
  - Flexbox
  - Grid
  - Media Queries
  - Transitions and Animations

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
