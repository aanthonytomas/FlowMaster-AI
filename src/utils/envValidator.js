/**
 * Environment Variable Validator
 * Validates required environment variables on app startup
 */

const ENV_VARS = {
  // Required variables
  required: [],
  
  // Optional but recommended variables
  optional: [
    'VITE_SUPABASE_URL',
    'VITE_SUPABASE_ANON_KEY',
    'VITE_OPENAI_API_KEY',
    'VITE_GEMINI_API_KEY',
    'VITE_ANTHROPIC_API_KEY',
    'VITE_PERPLEXITY_API_KEY',
    'VITE_STRIPE_PUBLISHABLE_KEY',
    'VITE_GOOGLE_ANALYTICS_ID',
    'VITE_ADSENSE_ID',
  ]
};

class EnvValidator {
  constructor() {
    this.errors = [];
    this.warnings = [];
  }

  validate() {
    // Check required variables
    ENV_VARS.required.forEach(varName => {
      if (!import.meta.env[varName]) {
        this.errors.push(`Missing required environment variable: ${varName}`);
      }
    });

    // Check optional variables
    ENV_VARS.optional.forEach(varName => {
      if (!import.meta.env[varName]) {
        this.warnings.push(`Optional environment variable not set: ${varName}`);
      }
    });

    return {
      isValid: this.errors.length === 0,
      errors: this.errors,
      warnings: this.warnings
    };
  }

  logResults() {
    const result = this.validate();

    if (result.errors.length > 0) {
      console.error('❌ Environment Validation Errors:');
      result.errors.forEach(error => console.error(`  - ${error}`));
    }

    if (result.warnings.length > 0 && import.meta.env.DEV) {
      console.warn('⚠️  Environment Warnings:');
      result.warnings.forEach(warning => console.warn(`  - ${warning}`));
    }

    if (result.isValid && import.meta.env.DEV) {
      console.log('✅ Environment validation passed');
    }

    return result;
  }

  getEnvInfo() {
    return {
      mode: import.meta.env.MODE,
      dev: import.meta.env.DEV,
      prod: import.meta.env.PROD,
      baseUrl: import.meta.env.BASE_URL,
    };
  }
}

export default new EnvValidator();
