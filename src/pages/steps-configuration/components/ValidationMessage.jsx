import React from 'react';
import Icon from '../../../components/AppIcon';

const ValidationMessages = ({ stepType, config }) => {
  const getValidationIssues = () => {
    const issues = [];

    switch (stepType) {
      case 'http':
        if (!config.url) issues.push('URL is required');
        if (config.url && !config.url.startsWith('http')) {
          issues.push('URL must start with http:// or https://');
        }
        if (config.headers) {
          try {
            JSON.parse(config.headers);
          } catch {
            issues.push('Headers must be valid JSON');
          }
        }
        break;

      case 'scrape':
        if (!config.targetUrl) issues.push('Target URL is required');
        if (!config.selector) issues.push('Selector/pattern is required');
        break;

      case 'parse':
        if (!config.inputVariable) issues.push('Input variable is required');
        if (!config.pattern) issues.push('Pattern is required');
        if (!config.outputVariable) issues.push('Output variable name is required');
        break;

      case 'llm':
        if (!config.prompt) issues.push('Prompt template is required');
        if (config.temperature && (parseFloat(config.temperature) < 0 || parseFloat(config.temperature) > 2)) {
          issues.push('Temperature must be between 0 and 2');
        }
        break;

      case 'database':
        if (!config.connectionString) issues.push('Connection string is required');
        if (!config.query) issues.push('Query/command is required');
        break;

      case 'email':
        if (!config.recipient) issues.push('Recipient email is required');
        if (!config.subject) issues.push('Subject is required');
        if (!config.body) issues.push('Email body is required');
        break;

      case 'condition':
        if (!config.variable) issues.push('Variable to check is required');
        if (!config.value) issues.push('Comparison value is required');
        break;

      case 'loop':
        if (!config.arrayVariable) issues.push('Array variable is required');
        if (!config.iteratorName) issues.push('Iterator variable name is required');
        break;

      default:
        break;
    }

    return issues;
  };

  const issues = getValidationIssues();

  if (issues.length === 0) {
    return (
      <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
        <div className="flex items-start gap-3">
          <Icon name="CheckCircle" size={20} color="var(--color-success)" />
          <div>
            <p className="text-sm font-medium text-success">Configuration Valid</p>
            <p className="text-sm text-success/80 mt-1">
              All required fields are properly configured
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
      <div className="flex items-start gap-3">
        <Icon name="AlertTriangle" size={20} color="var(--color-warning)" />
        <div className="flex-1">
          <p className="text-sm font-medium text-warning">Configuration Issues</p>
          <ul className="mt-2 space-y-1">
            {issues.map((issue, index) => (
              <li key={index} className="text-sm text-warning/80 flex items-start gap-2">
                <span className="text-warning mt-0.5">•</span>
                <span>{issue}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ValidationMessages;