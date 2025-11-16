# MedSync - Healthcare Management Application

A modern healthcare management application built with React and Vite, featuring role-based authentication for users, doctors, and administrators.

## Features

- ✅ Role-based authentication (User, Doctor, Administrator)
- ✅ Bilingual support (English & Arabic)
- ✅ Responsive design with Tailwind CSS
- ✅ Sign-in modal with validation
- ✅ Dashboard with role-specific features
- ✅ Real-time form validation

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Elsaid-shreif7/medsync-app.git
cd medsync-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:5173/
```

### Building for Production

```bash
npm run build
```

The optimized build will be in the `dist` folder.

## Project Structure

```
src/
├── App.jsx              # Main application component
├── components/
│   └── SignInModal.jsx  # Sign-in modal component
├── main.jsx             # React entry point
├── App.css              # Application styles
└── index.css            # Global styles
```

## Technologies Used

- **React** - UI library
- **Vite** - Build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **ESLint** - Code quality tool

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## License

© 2025 MedSync. All rights reserved.
