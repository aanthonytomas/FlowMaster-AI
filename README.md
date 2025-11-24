# 🚀 FlowMaster AI

**Master your workflows with intelligent automation.** FlowMaster AI is a powerful task automation platform that transforms complex workflows into seamless, intelligent processes. Design, deploy, and monitor automated workflows with an intuitive visual interface while AI handles the execution with precision and reliability.

![React](https://img.shields.io/badge/React-18.2-61DAFB?style=flat&logo=react)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=flat&logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=flat&logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6?style=flat&logo=typescript)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=flat&logo=docker)
![License](https://img.shields.io/badge/License-MIT-green.svg)

<p align="center">
  <a href="#-key-features">Features</a> •
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-demo">Demo</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-deployment">Deployment</a>
</p>

---

## 🎬 Demo

![FlowMaster AI Dashboard](https://via.placeholder.com/800x400/667eea/ffffff?text=FlowMaster+AI+Dashboard)

> **Live Demo**: [Coming Soon]
> 
> **Screenshots**: Check out the [Screenshots](#-screenshots) section below

## ✨ Key Features

### 🎯 **Visual Workflow Builder**
Create powerful automation workflows with an intuitive drag-and-drop interface. No coding required—just connect the blocks and watch your automation come to life.

- **Drag & Drop Interface** - Intuitive visual workflow design
- **Pre-built Templates** - Start fast with ready-made workflow templates
- **Step Library** - Extensive collection of automation steps
- **Real-time Validation** - Instant feedback as you build

### 📊 **Real-time Monitoring**
Track every execution with comprehensive monitoring and detailed analytics.

- **Live Dashboard** - Monitor active workflows in real-time
- **Execution History** - Complete audit trail with advanced filtering
- **Performance Metrics** - Success rates, execution times, and trends
- **Detailed Logs** - Syntax-highlighted logs with search and filtering

### 🔧 **Step Configuration**
Configure each step with precision using our powerful configuration system.

- **HTTP Requests** - API calls with full customization
- **Data Transformations** - Transform and manipulate data on the fly
- **AI Integrations** - Connect with OpenAI, Gemini, Claude, and more
- **Conditional Logic** - Smart branching based on conditions
- **Error Handling** - Robust error handling and retry mechanisms

### 🎨 **Modern UI/UX**
Beautiful, responsive interface that works seamlessly across all devices.

- **Responsive Design** - Perfect on desktop, tablet, and mobile
- **Dark Mode Ready** - Easy theme customization
- **Smooth Animations** - Delightful micro-interactions
- **Accessibility** - Built with a11y best practices

### 🚀 **Production Ready**
Enterprise-grade features for reliability and scalability.

- **Docker Support** - One-command deployment
- **Environment Validation** - Automatic configuration checks
- **Error Tracking** - Comprehensive logging system
- **Performance Monitoring** - Built-in performance tracking
- **TypeScript Ready** - Optional type safety

---

## 🛠️ Tech Stack

FlowMaster AI is built with modern, production-ready technologies:

### **Frontend**
- **React 18.2** - Latest React with concurrent features
- **Vite 5.0** - Lightning-fast build tool and HMR
- **TailwindCSS 3.4** - Utility-first CSS with custom design system
- **Redux Toolkit** - Efficient state management
- **React Router v6** - Declarative routing

### **UI & Visualization**
- **Lucide Icons** - Beautiful, consistent iconography
- **Recharts & D3.js** - Advanced data visualization
- **Framer Motion** - Smooth animations and transitions
- **React Hook Form** - Performant form handling

### **Development Tools**
- **TypeScript** - Optional type safety
- **ESLint & Prettier** - Code quality and formatting
- **Docker** - Containerized deployment
- **Axios** - HTTP client with interceptors

### **Architecture**
- **Custom Hooks** - Reusable logic (useAsync, useLocalStorage, useDebounce)
- **API Service Layer** - Centralized API management
- **Performance Monitoring** - Built-in performance tracking
- **Environment Validation** - Automatic config validation

---

## 📋 Prerequisites

- **Node.js** v18.x or higher
- **npm** v9.x or higher (or yarn)
- **Docker** (optional, for containerized deployment)

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

## 📸 Screenshots

### Dashboard
![Dashboard](https://via.placeholder.com/600x400/667eea/ffffff?text=Dashboard+View)
*Monitor all your workflows and executions at a glance*

### Workflow Builder
![Workflow Builder](https://via.placeholder.com/600x400/667eea/ffffff?text=Workflow+Builder)
*Visual drag-and-drop workflow creation*

### Execution Monitor
![Execution Monitor](https://via.placeholder.com/600x400/667eea/ffffff?text=Execution+Monitor)
*Real-time execution tracking with detailed logs*

### Step Configuration
![Step Configuration](https://via.placeholder.com/600x400/667eea/ffffff?text=Step+Configuration)
*Configure each step with precision*

---

## 📁 Project Structure

```
flowmaster-ai/
├── public/                 # Static assets
├── src/                    # Source code (see below)
├── .env.example            # Environment template
├── docker-compose.yml      # Docker orchestration
├── Dockerfile              # Production Docker image
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind customization
└── README.md               # This file
```

<details>
<summary><b>📂 Source Code Structure</b> (Click to expand)</summary>

```
src/
├── components/             # Reusable UI components
│   ├── ui/                # Base components (Button, Input, Select, etc.)
│   ├── AppIcon.jsx        # Icon wrapper
│   └── ErrorBoundary.jsx  # Error handling
├── pages/                 # Page components
│   ├── dashboard/         # Dashboard with metrics
│   ├── workflow-builder/  # Visual workflow editor
│   ├── execution-monitor/ # Real-time tracking
│   ├── run-history/       # Execution history
│   ├── steps-configuration/ # Step configuration
│   ├── settings/          # App settings
│   └── login/             # Authentication
├── hooks/                 # Custom React hooks
│   ├── useAsync.js        # Async operations
│   ├── useLocalStorage.js # Persistent state
│   ├── useDebounce.js     # Debounced values
│   └── useMediaQuery.js   # Responsive design
├── services/              # API services
│   └── api.js             # Centralized API client
├── utils/                 # Utility functions
│   ├── logger.js          # Logging system
│   ├── performance.js     # Performance monitoring
│   └── envValidator.js    # Environment validation
├── styles/                # Global styles
├── App.jsx                # Main app component
├── Routes.jsx             # Route configuration
└── Index.jsx              # Application entry point
```
</details>

## 🎨 Design System

FlowMaster AI features a custom design system built on TailwindCSS:

- **🎨 Custom Color Palette** - Semantic colors for consistent theming
- **📱 Fully Responsive** - Mobile-first design approach
- **🌙 Dark Mode Ready** - Easy theme customization
- **✨ Smooth Animations** - Framer Motion powered transitions
- **♿ Accessible** - WCAG compliant components
- **🎯 Component Library** - Reusable, type-safe components

## 🐳 Deployment

### Docker (Recommended)

Deploy with a single command:

```bash
# Production
./deploy.sh prod

# Development
./deploy.sh dev
```

Or using Docker Compose:

```bash
docker-compose up -d --build
```

### Cloud Platforms

<details>
<summary><b>Deploy to AWS, GCP, or DigitalOcean</b></summary>

#### AWS ECS/Fargate
```bash
docker build -t flowmaster-ai .
docker tag flowmaster-ai:latest <account>.dkr.ecr.<region>.amazonaws.com/flowmaster-ai:latest
docker push <account>.dkr.ecr.<region>.amazonaws.com/flowmaster-ai:latest
```

#### Google Cloud Run
```bash
gcloud builds submit --tag gcr.io/<project>/flowmaster-ai
gcloud run deploy --image gcr.io/<project>/flowmaster-ai --platform managed
```

#### DigitalOcean App Platform
- Connect your GitHub repository
- App Platform auto-detects Dockerfile
- Configure environment variables in dashboard

</details>

### Manual Deployment

```bash
npm run build        # Build for production
npm run preview      # Preview production build
```

The build output will be in the `/build` directory.

## 📜 Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run start:all` | Start all services |
| `make help` | View all Make commands |
| `./deploy.sh prod` | Deploy with Docker |

## 🔧 Configuration

### Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
# Backend API (when you add a backend)
VITE_API_BASE_URL=http://localhost:8080

# Development
VITE_DEBUG=true
VITE_USE_MOCK_DATA=true

# AI Providers (optional - add when needed)
VITE_OPENAI_API_KEY=your-key
VITE_GEMINI_API_KEY=your-key
```

### Path Aliases

Clean imports are configured:

```javascript
// ✅ Use absolute imports
import Button from 'components/ui/Button';
import { useAsync } from 'hooks';
import logger from 'utils/logger';

// ❌ Instead of relative paths
import Button from '../../../components/ui/Button';
```

## 🎯 Roadmap

- [ ] **Backend Integration** - REST API with Node.js/Express
- [ ] **Database Support** - PostgreSQL with Supabase
- [ ] **User Authentication** - OAuth and JWT
- [ ] **AI Provider Integration** - OpenAI, Gemini, Claude
- [ ] **Workflow Scheduling** - Cron-based scheduling
- [ ] **Webhook Support** - Trigger workflows via webhooks
- [ ] **Team Collaboration** - Multi-user support
- [ ] **Workflow Marketplace** - Share and discover workflows
- [ ] **Mobile App** - React Native mobile client
- [ ] **Analytics Dashboard** - Advanced analytics and insights

## 📚 Documentation

- **[GIT_COMMANDS.md](./GIT_COMMANDS.md)** - Git workflow reference
- **[QUICK_START.md](./QUICK_START.md)** - Quick start guide
- **[PROJECT_ANALYSIS.md](./PROJECT_ANALYSIS.md)** - Technical analysis

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - see [LICENSE](./LICENSE) file for details.

## 🙏 Credits

- **Built with** [Rocket.new](https://rocket.new)
- **Icons** by [Lucide](https://lucide.dev)
- **UI** inspired by [shadcn/ui](https://ui.shadcn.com)

## 📞 Connect

- **GitHub**: [@aanthonytomas](https://github.com/aanthonytomas)
- **Repository**: [FlowMaster-AI](https://github.com/aanthonytomas/FlowMaster-AI)
- **Issues**: [Report a bug](https://github.com/aanthonytomas/FlowMaster-AI/issues)

---

<p align="center">
  <b>Built with ❤️ by Anthony Tomas</b><br>
  <sub>Master your productivity with FlowMaster AI</sub>
</p>
