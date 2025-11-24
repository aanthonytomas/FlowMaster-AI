/**
 * Enhanced Logger Utility
 * Provides structured logging with different levels
 */

const LOG_LEVELS = {
  ERROR: 'error',
  WARN: 'warn',
  INFO: 'info',
  DEBUG: 'debug',
};

class Logger {
  constructor() {
    this.isDevelopment = import.meta.env.DEV;
    this.isProduction = import.meta.env.PROD;
  }

  _log(level, message, data = null) {
    if (!this.isDevelopment && level === LOG_LEVELS.DEBUG) {
      return; // Skip debug logs in production
    }

    const timestamp = new Date().toISOString();
    const prefix = `[${timestamp}] [${level.toUpperCase()}]`;

    switch (level) {
      case LOG_LEVELS.ERROR:
        console.error(prefix, message, data || '');
        break;
      case LOG_LEVELS.WARN:
        console.warn(prefix, message, data || '');
        break;
      case LOG_LEVELS.INFO:
        console.info(prefix, message, data || '');
        break;
      case LOG_LEVELS.DEBUG:
        console.log(prefix, message, data || '');
        break;
      default:
        console.log(prefix, message, data || '');
    }
  }

  error(message, error = null) {
    this._log(LOG_LEVELS.ERROR, message, error);
    
    // In production, you might want to send errors to a service
    if (this.isProduction && error) {
      // TODO: Send to error tracking service (Sentry, LogRocket, etc.)
    }
  }

  warn(message, data = null) {
    this._log(LOG_LEVELS.WARN, message, data);
  }

  info(message, data = null) {
    this._log(LOG_LEVELS.INFO, message, data);
  }

  debug(message, data = null) {
    this._log(LOG_LEVELS.DEBUG, message, data);
  }

  // API request logging
  apiRequest(method, url, data = null) {
    this.debug(`API Request: ${method} ${url}`, data);
  }

  apiResponse(method, url, status, data = null) {
    this.debug(`API Response: ${method} ${url} - ${status}`, data);
  }

  apiError(method, url, error) {
    this.error(`API Error: ${method} ${url}`, error);
  }

  // Performance logging
  performance(label, duration) {
    this.debug(`Performance: ${label} took ${duration}ms`);
  }

  // User action logging
  userAction(action, details = null) {
    this.info(`User Action: ${action}`, details);
  }
}

export default new Logger();
