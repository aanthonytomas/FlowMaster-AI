/**
 * Suppress React DevTools warnings in development
 * These warnings are harmless and come from React DevTools extension
 */

if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  // Suppress React DevTools hook warnings
  const originalConsoleError = console.error;
  const originalConsoleWarn = console.warn;
  
  console.error = (...args) => {
    // Filter out React DevTools warnings
    const message = args[0]?.toString() || '';
    if (
      message.includes('Unknown message type') ||
      message.includes('react-devtools') ||
      message.includes('installHook')
    ) {
      return;
    }
    originalConsoleError.apply(console, args);
  };
  
  console.warn = (...args) => {
    // Filter out React DevTools warnings
    const message = args[0]?.toString() || '';
    if (
      message.includes('Unknown message type') ||
      message.includes('react-devtools') ||
      message.includes('installHook')
    ) {
      return;
    }
    originalConsoleWarn.apply(console, args);
  };
}

export default {};
