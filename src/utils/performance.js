/**
 * Performance Monitoring Utilities
 * Track and measure application performance
 */

import logger from './logger';

class PerformanceMonitor {
  constructor() {
    this.marks = new Map();
    this.measures = new Map();
  }

  // Mark a point in time
  mark(name) {
    if (typeof performance !== 'undefined') {
      performance.mark(name);
      this.marks.set(name, performance.now());
    }
  }

  // Measure duration between two marks
  measure(name, startMark, endMark) {
    if (typeof performance !== 'undefined') {
      try {
        performance.measure(name, startMark, endMark);
        const measure = performance.getEntriesByName(name)[0];
        this.measures.set(name, measure.duration);
        logger.performance(name, Math.round(measure.duration));
        return measure.duration;
      } catch (error) {
        logger.warn(`Performance measure failed: ${name}`, error);
      }
    }
    return 0;
  }

  // Measure function execution time
  async measureAsync(name, fn) {
    const startMark = `${name}-start`;
    const endMark = `${name}-end`;
    
    this.mark(startMark);
    try {
      const result = await fn();
      this.mark(endMark);
      this.measure(name, startMark, endMark);
      return result;
    } catch (error) {
      this.mark(endMark);
      this.measure(name, startMark, endMark);
      throw error;
    }
  }

  // Get all measures
  getMeasures() {
    return Object.fromEntries(this.measures);
  }

  // Clear all marks and measures
  clear() {
    if (typeof performance !== 'undefined') {
      performance.clearMarks();
      performance.clearMeasures();
    }
    this.marks.clear();
    this.measures.clear();
  }

  // Report Core Web Vitals
  reportWebVitals(metric) {
    logger.info(`Web Vital: ${metric.name}`, {
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
    });
  }
}

export default new PerformanceMonitor();

// Helper function to measure component render time
export const measureRender = (componentName) => {
  const startTime = performance.now();
  
  return () => {
    const endTime = performance.now();
    const duration = endTime - startTime;
    logger.performance(`${componentName} render`, Math.round(duration));
  };
};
