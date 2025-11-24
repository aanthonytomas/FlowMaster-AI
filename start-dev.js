#!/usr/bin/env node

/**
 * AI Task Automation Agent - Cross-platform Auto Start Script
 * This Node.js script works on Windows, macOS, and Linux
 */

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const http = require('http');

// Configuration
const CONFIG = {
  frontend: {
    dir: '.',
    command: 'npm',
    args: ['run', 'dev'],
    port: 4028,
    name: 'Frontend',
    color: '\x1b[36m', // Cyan
  },
  backend: {
    dir: './backend',
    command: 'npm',
    args: ['run', 'dev'],
    port: 3000,
    name: 'Backend',
    color: '\x1b[35m', // Magenta
  },
};

// Colors
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
};

// Store child processes
const processes = {};

// Utility functions
function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function logInfo(message) {
  log(`[INFO] ${message}`, colors.green);
}

function logWarning(message) {
  log(`[WARNING] ${message}`, colors.yellow);
}

function logError(message) {
  log(`[ERROR] ${message}`, colors.red);
}

function logSuccess(message) {
  log(`[SUCCESS] ${message}`, colors.bright + colors.green);
}

// Check if port is in use
function checkPort(port) {
  return new Promise((resolve) => {
    const server = http.createServer();
    server.once('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        resolve(true); // Port is in use
      } else {
        resolve(false);
      }
    });
    server.once('listening', () => {
      server.close();
      resolve(false); // Port is available
    });
    server.listen(port);
  });
}

// Wait for port to be available
async function waitForPort(port, maxAttempts = 30) {
  for (let i = 0; i < maxAttempts; i++) {
    const inUse = await checkPort(port);
    if (inUse) {
      return true;
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  return false;
}

// Check if directory exists
function directoryExists(dir) {
  try {
    return fs.statSync(dir).isDirectory();
  } catch (err) {
    return false;
  }
}

// Start a service
async function startService(serviceName) {
  const config = CONFIG[serviceName];
  
  logInfo(`Starting ${config.name}...`);
  
  // Check if directory exists (for backend)
  if (config.dir !== '.' && !directoryExists(config.dir)) {
    logWarning(`${config.name} directory not found. Skipping.`);
    return false;
  }
  
  // Check if port is already in use
  const portInUse = await checkPort(config.port);
  if (portInUse) {
    logError(`Port ${config.port} is already in use!`);
    logInfo(`Run 'npm run stop' or kill the process using port ${config.port}`);
    return false;
  }
  
  // Spawn the process
  const isWindows = process.platform === 'win32';
  const command = isWindows ? `${config.command}.cmd` : config.command;
  
  const child = spawn(command, config.args, {
    cwd: path.resolve(config.dir),
    stdio: 'pipe',
    shell: isWindows,
  });
  
  processes[serviceName] = child;
  
  // Handle stdout
  child.stdout.on('data', (data) => {
    const lines = data.toString().split('\n');
    lines.forEach((line) => {
      if (line.trim()) {
        log(`[${config.name}] ${line}`, config.color);
      }
    });
  });
  
  // Handle stderr
  child.stderr.on('data', (data) => {
    const lines = data.toString().split('\n');
    lines.forEach((line) => {
      if (line.trim()) {
        log(`[${config.name}] ${line}`, colors.red);
      }
    });
  });
  
  // Handle process exit
  child.on('exit', (code) => {
    if (code !== 0 && code !== null) {
      logError(`${config.name} exited with code ${code}`);
    }
    delete processes[serviceName];
  });
  
  // Wait for service to start
  logInfo(`Waiting for ${config.name} to start on port ${config.port}...`);
  const started = await waitForPort(config.port);
  
  if (started) {
    logSuccess(`${config.name} started successfully on port ${config.port}`);
    return true;
  } else {
    logError(`${config.name} failed to start`);
    return false;
  }
}

// Stop all services
function stopServices() {
  logInfo('Stopping all services...');
  
  Object.keys(processes).forEach((serviceName) => {
    const child = processes[serviceName];
    if (child && !child.killed) {
      logInfo(`Stopping ${CONFIG[serviceName].name}...`);
      child.kill();
    }
  });
  
  logSuccess('All services stopped.');
}

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n');
  stopServices();
  process.exit(0);
});

process.on('SIGTERM', () => {
  stopServices();
  process.exit(0);
});

// Main function
async function main() {
  console.log('\n');
  log('═══════════════════════════════════════════════════', colors.bright);
  log('  AI Task Automation Agent - Auto Start', colors.bright + colors.blue);
  log('═══════════════════════════════════════════════════', colors.bright);
  console.log('\n');
  
  // Start frontend
  const frontendStarted = await startService('frontend');
  
  // Start backend (if exists)
  const backendExists = directoryExists(CONFIG.backend.dir);
  let backendStarted = false;
  
  if (backendExists) {
    backendStarted = await startService('backend');
  } else {
    logInfo('No backend directory found. Running frontend only.');
  }
  
  console.log('\n');
  log('═══════════════════════════════════════════════════', colors.bright);
  log('  Services Status', colors.bright + colors.green);
  log('═══════════════════════════════════════════════════', colors.bright);
  console.log('\n');
  
  if (frontendStarted) {
    logSuccess(`Frontend: http://localhost:${CONFIG.frontend.port}`);
  }
  
  if (backendStarted) {
    logSuccess(`Backend:  http://localhost:${CONFIG.backend.port}`);
  }
  
  console.log('\n');
  logInfo('Press Ctrl+C to stop all services');
  console.log('\n');
}

// Run main function
main().catch((err) => {
  logError(`Failed to start services: ${err.message}`);
  process.exit(1);
});
