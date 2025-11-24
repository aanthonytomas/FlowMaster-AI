import React from 'react';
import Icon from '../../../components/AppIcon';

const StepTypeSelector = ({ selectedType, onTypeChange }) => {
  const stepTypes = [
    {
      id: 'http',
      name: 'HTTP Request',
      icon: 'Globe',
      description: 'Make API calls and HTTP requests'
    },
    {
      id: 'scrape',
      name: 'Web Scraping',
      icon: 'Search',
      description: 'Extract data from web pages'
    },
    {
      id: 'parse',
      name: 'Data Parser',
      icon: 'Code',
      description: 'Parse data using regex or XPath'
    },
    {
      id: 'llm',
      name: 'LLM Processing',
      icon: 'Brain',
      description: 'Process data with local LLM'
    },
    {
      id: 'database',
      name: 'Database',
      icon: 'Database',
      description: 'Query or update database'
    },
    {
      id: 'email',
      name: 'Email',
      icon: 'Mail',
      description: 'Send email notifications'
    },
    {
      id: 'condition',
      name: 'Conditional',
      icon: 'GitBranch',
      description: 'Add conditional logic'
    },
    {
      id: 'loop',
      name: 'Loop',
      icon: 'Repeat',
      description: 'Iterate over data'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Step Type</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {stepTypes?.map((type) => (
          <button
            key={type?.id}
            onClick={() => onTypeChange(type?.id)}
            className={`flex flex-col items-start gap-2 p-4 rounded-lg border-2 transition-all duration-200 ${
              selectedType === type?.id
                ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 hover:bg-muted'
            }`}
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              selectedType === type?.id ? 'bg-primary/10' : 'bg-muted'
            }`}>
              <Icon 
                name={type?.icon} 
                size={20} 
                color={selectedType === type?.id ? 'var(--color-primary)' : 'var(--color-muted-foreground)'} 
              />
            </div>
            <div className="text-left">
              <p className={`text-sm font-medium ${
                selectedType === type?.id ? 'text-primary' : 'text-foreground'
              }`}>
                {type?.name}
              </p>
              <p className="text-xs text-muted-foreground mt-1">{type?.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default StepTypeSelector;