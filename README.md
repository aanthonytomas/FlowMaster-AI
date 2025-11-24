# 🤖 AI Task Automation Agent

A modern, full-featured AI-powered task automation platform built with React. Create, manage, and monitor automated workflows with an intuitive visual interface and real-time execution tracking.

![React](https://img.shields.io/badge/React-18.2-61DAFB?style=flat&logo=react)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=flat&logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=flat&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green.svg)

## 📑 Table of Contents

- [Key Features](#-key-features)
- [Prerequisites](#-prerequisites)
- [Quick Start](#-quick-start)
- [Project Structure](#-project-structure)
- [Styling & Theming](#-styling--theming)
- [Docker Deployment](#-docker-deployment)
- [Available Scripts](#-available-scripts)
- [Development](#-development)
- [Troubleshooting](#-troubleshooting)
- [Documentation](#-documentation)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Key Features

### 🎯 Workflow Management
- **Visual Workflow Builder** - Drag-and-drop interface for creating automation workflows
- **Step Configuration** - Configure HTTP requests, data transformations, and AI integrations
- **Real-time Validation** - Instant feedback on workflow configuration
- **Template Library** - Pre-built workflow templates for common tasks

### 📊 Monitoring & Analytics
- **Live Execution Monitor** - Real-time tracking of running workflows
- **Execution History** - Complete audit trail with filtering and search
- **Performance Metrics** - Dashboard with success rates and execution times
- **Log Viewer** - Detailed logs with syntax highlighting and filtering

### 🔧 Technical Stack
- **React 18.2** - Latest React with concurrent features
- **Vite 5.0** - Lightning-fast build tool and HMR
- **Redux Toolkit** - Efficient state management
- **TailwindCSS 3.4** - Utility-first styling with custom design system
- **React Router v6** - Client-side routing
- **Lucide Icons** - Beautiful, consistent iconography
- **Recharts & D3.js** - Advanced data visualization
- **Framer Motion** - Smooth animations and transitions
- **React Hook Form** - Performant form handling

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18.x or higher recommended)
- **npm** (v9.x or higher) or **yarn**
- **Git** (for cloning the repository)

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/ai-task-automation-agent.git
cd ai-task-automation-agent
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
```bash
# Copy the example env file
cp .env.example .env

# Edit .env with your API keys
nano .env
```

Required environment variables:
- `VITE_SUPABASE_URL` - Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Supabase anonymous key
- `VITE_OPENAI_API_KEY` - OpenAI API key (optional)
- `VITE_GEMINI_API_KEY` - Google Gemini API key (optional)

### 4. Start Development Server

**Option 1: Using npm scripts**
```bash
npm run dev          # Start frontend (port 4028)
npm run start:all    # Start all services (if backend exists)
```

**Option 2: Using startup scripts**
```bash
./start.sh start     # Linux/macOS
start.bat            # Windows
```

**Option 3: Using Make**
```bash
make start-all       # Start all services
make help            # View all commands
```

The application will be available at **http://localhost:4028**

### 5. Build for Production
```bash
npm run build        # Creates optimized build in /build
npm run preview      # Preview production build
```

## 📁 Project Structure

```
ai-task-automation-agent/
├── public/
│   └── assets/              # Static assets (images, icons, manifest)
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # Base UI components (Button, Input, etc.)
│   │   ├── AppIcon.jsx     # Icon wrapper component
│   │   └── ErrorBoundary.jsx
│   ├── pages/              # Page components
│   │   ├── dashboard/      # Dashboard with metrics and task list
│   │   ├── workflow-builder/ # Visual workflow editor
│   │   ├── execution-monitor/ # Real-time execution tracking
│   │   ├── run-history/    # Execution history and logs
│   │   ├── steps-configuration/ # Step configuration forms
│   │   ├── settings/       # Application settings
│   │   ├── login/          # Authentication page
│   │   └── NoFound.jsx     # 404 page
│   ├── utils/              # Utility functions
│   │   ├── cn.js          # Class name utilities
│   │   └── suppressDevToolsWarnings.js
│   ├── styles/             # Global styles
│   │   ├── tailwind.css   # Tailwind imports
│   │   └── index.css      # Custom CSS
│   ├── App.jsx             # Main app component
│   ├── Routes.jsx          # Route configuration
│   └── Index.jsx           # Application entry point
├── .env                    # Environment variables (gitignored)
├── .env.example            # Environment template
├── index.html              # HTML template
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite configuration with aliases
├── jsconfig.json           # JavaScript configuration
├── tailwind.config.js      # Tailwind customization
├── postcss.config.js       # PostCSS configuration
├── Dockerfile              # Production Docker image
├── docker-compose.yml      # Docker orchestration
├── start.sh                # Startup script (Linux/macOS)
├── start.bat               # Startup script (Windows)
├── Makefile                # Make commands
└── README.md               # This file
```

## 🎨 Styling & Theming

This project uses a custom design system built on TailwindCSS:

### Design System Features
- **Custom Color Palette** - Semantic color variables for consistent theming
- **Fluid Typography** - Responsive text sizing
- **Custom Animations** - Smooth transitions and micro-interactions
- **Dark Mode Ready** - CSS variables for easy theme switching
- **Component Variants** - Using `class-variance-authority` for type-safe variants

### TailwindCSS Plugins
- `@tailwindcss/forms` - Beautiful form styling
- `@tailwindcss/typography` - Rich text formatting
- `@tailwindcss/aspect-ratio` - Responsive aspect ratios
- `@tailwindcss/container-queries` - Container-based responsive design
- `tailwindcss-animate` - Animation utilities
- `tailwindcss-fluid-type` - Fluid typography

### Using Path Aliases
The project is configured with path aliases for clean imports:

```javascript
// Instead of relative paths:
import Button from '../../../components/ui/Button';

// Use clean absolute imports:
import Button from 'components/ui/Button';
import Icon from 'components/AppIcon';
import { cn } from 'utils/cn';
```

## 🐳 Docker Deployment

### Quick Deploy with Docker

```bash
# Production deployment
./deploy.sh prod

# Development with hot reload
./deploy.sh dev

# Using Docker Compose directly
docker-compose up -d --build
```

### Docker Commands
```bash
make prod          # Build and start production container
make dev           # Build and start development container
make stop          # Stop all containers
make logs          # View logs
make clean         # Clean up containers and images
```

See [DOCKER_DEPLOYMENT.md](./DOCKER_DEPLOYMENT.md) for complete Docker documentation.

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (port 4028) |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run start:all` | Start all services (frontend + backend) |
| `./start.sh start` | Auto-start script (Linux/macOS) |
| `start.bat` | Auto-start script (Windows) |
| `make help` | View all Make commands |

## 🧪 Development

### Code Organization
- **Components** - Reusable UI components in `src/components/`
- **Pages** - Route-based page components in `src/pages/`
- **Utils** - Helper functions in `src/utils/`
- **Styles** - Global styles in `src/styles/`

### Adding New Pages
1. Create page component in `src/pages/your-page/`
2. Add route in `src/Routes.jsx`:
```javascript
<Route path="/your-page" element={<YourPage />} />
```

### Component Development
Use the established patterns:
```javascript
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';

const MyComponent = () => {
  return (
    <div className="p-4">
      <Button variant="primary" iconName="Plus">
        Add Item
      </Button>
    </div>
  );
};
```

## 🐛 Troubleshooting

### Common Issues

**Port 4028 already in use:**
```bash
# Find and kill the process
lsof -ti:4028 | xargs kill -9

# Or change port in vite.config.js
```

**Import errors:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**TypeScript errors:**
```bash
# Clear TypeScript cache
rm -rf ~/.cache/typescript
```

See [FIXES.md](./FIXES.md) for detailed troubleshooting and all fixes applied.

## 📚 Documentation

- **[QUICK_START.md](./QUICK_START.md)** - Docker quick start guide
- **[DOCKER_DEPLOYMENT.md](./DOCKER_DEPLOYMENT.md)** - Complete Docker deployment guide
- **[STARTUP_GUIDE.md](./STARTUP_GUIDE.md)** - Auto-start scripts documentation
- **[FIXES.md](./FIXES.md)** - All bug fixes and solutions
- **[PROJECT_ANALYSIS.md](./PROJECT_ANALYSIS.md)** - Complete project analysis

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Built with** [Rocket.new](https://rocket.new)
- **Powered by** React, Vite, and TailwindCSS
- **Icons by** [Lucide](https://lucide.dev)
- **UI Components** inspired by [shadcn/ui](https://ui.shadcn.com)

## 📞 Support

For issues and questions:
- Check [FIXES.md](./FIXES.md) for common solutions
- Review [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
- Open an issue on GitHub

---

**Built with ❤️ using modern web technologies**
