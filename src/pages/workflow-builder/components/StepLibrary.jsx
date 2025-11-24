import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const StepLibrary = ({ onStepDragStart, isCollapsed, onToggleCollapse }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const stepCategories = [
    {
      id: 'triggers',
      name: 'Triggers',
      icon: 'Zap',
      steps: [
        {
          id: 'schedule',
          name: 'Schedule',
          icon: 'Clock',
          description: 'Run workflow on a schedule using cron expressions',
          color: 'text-blue-500'
        },
        {
          id: 'webhook',
          name: 'Webhook',
          icon: 'Webhook',
          description: 'Trigger workflow via HTTP webhook endpoint',
          color: 'text-blue-500'
        },
        {
          id: 'manual',
          name: 'Manual',
          icon: 'Play',
          description: 'Start workflow manually from dashboard',
          color: 'text-blue-500'
        }
      ]
    },
    {
      id: 'data',
      name: 'Data Operations',
      icon: 'Database',
      steps: [
        {
          id: 'http-request',
          name: 'HTTP Request',
          icon: 'Globe',
          description: 'Make GET/POST/PUT/DELETE requests to APIs',
          color: 'text-green-500'
        },
        {
          id: 'web-scrape',
          name: 'Web Scraper',
          icon: 'Search',
          description: 'Extract data from websites using CSS selectors',
          color: 'text-green-500'
        },
        {
          id: 'parse-data',
          name: 'Parse Data',
          icon: 'FileText',
          description: 'Extract data using regex or XPath patterns',
          color: 'text-green-500'
        },
        {
          id: 'transform',
          name: 'Transform',
          icon: 'Shuffle',
          description: 'Transform and manipulate data structures',
          color: 'text-green-500'
        }
      ]
    },
    {
      id: 'ai',
      name: 'AI Processing',
      icon: 'Brain',
      steps: [
        {
          id: 'llm-analyze',
          name: 'LLM Analysis',
          icon: 'MessageSquare',
          description: 'Process data with local language models',
          color: 'text-purple-500'
        },
        {
          id: 'sentiment',
          name: 'Sentiment Analysis',
          icon: 'Heart',
          description: 'Analyze text sentiment and emotions',
          color: 'text-purple-500'
        },
        {
          id: 'summarize',
          name: 'Summarize',
          icon: 'FileText',
          description: 'Generate summaries of long text content',
          color: 'text-purple-500'
        }
      ]
    },
    {
      id: 'logic',
      name: 'Logic & Control',
      icon: 'GitBranch',
      steps: [
        {
          id: 'condition',
          name: 'Condition',
          icon: 'GitBranch',
          description: 'Branch workflow based on conditions',
          color: 'text-yellow-500'
        },
        {
          id: 'loop',
          name: 'Loop',
          icon: 'Repeat',
          description: 'Iterate over arrays or repeat actions',
          color: 'text-yellow-500'
        },
        {
          id: 'delay',
          name: 'Delay',
          icon: 'Timer',
          description: 'Wait for specified duration before continuing',
          color: 'text-yellow-500'
        },
        {
          id: 'filter',
          name: 'Filter',
          icon: 'Filter',
          description: 'Filter data based on conditions',
          color: 'text-yellow-500'
        }
      ]
    },
    {
      id: 'storage',
      name: 'Storage',
      icon: 'HardDrive',
      steps: [
        {
          id: 'save-data',
          name: 'Save Data',
          icon: 'Save',
          description: 'Store data in database or file system',
          color: 'text-orange-500'
        },
        {
          id: 'load-data',
          name: 'Load Data',
          icon: 'Download',
          description: 'Retrieve stored data from previous runs',
          color: 'text-orange-500'
        },
        {
          id: 'cache',
          name: 'Cache',
          icon: 'Archive',
          description: 'Cache data for faster subsequent access',
          color: 'text-orange-500'
        }
      ]
    },
    {
      id: 'notifications',
      name: 'Notifications',
      icon: 'Bell',
      steps: [
        {
          id: 'email',
          name: 'Send Email',
          icon: 'Mail',
          description: 'Send email notifications with custom content',
          color: 'text-red-500'
        },
        {
          id: 'slack',
          name: 'Slack Message',
          icon: 'MessageCircle',
          description: 'Post messages to Slack channels',
          color: 'text-red-500'
        },
        {
          id: 'webhook-notify',
          name: 'Webhook Notify',
          icon: 'Send',
          description: 'Send data to external webhook endpoints',
          color: 'text-red-500'
        }
      ]
    }
  ];

  const filteredCategories = useMemo(() => {
    if (!searchQuery?.trim()) return stepCategories;

    const query = searchQuery?.toLowerCase();
    return stepCategories?.map(category => ({
        ...category,
        steps: category?.steps?.filter(
          step =>
            step?.name?.toLowerCase()?.includes(query) ||
            step?.description?.toLowerCase()?.includes(query)
        )
      }))?.filter(category => category?.steps?.length > 0);
  }, [searchQuery]);

  const handleDragStart = (e, step) => {
    e.dataTransfer.effectAllowed = 'copy';
    onStepDragStart(step);
  };

  if (isCollapsed) {
    return (
      <div className="w-16 bg-card border-r border-border flex flex-col items-center py-4 gap-4">
        <button
          onClick={onToggleCollapse}
          className="p-2 rounded-lg hover:bg-muted transition-colors duration-150"
          title="Expand step library"
        >
          <Icon name="ChevronRight" size={20} />
        </button>
        {stepCategories?.map(category => (
          <button
            key={category?.id}
            className="p-2 rounded-lg hover:bg-muted transition-colors duration-150"
            title={category?.name}
          >
            <Icon name={category?.icon} size={20} className="text-muted-foreground" />
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="w-80 bg-card border-r border-border flex flex-col">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-foreground">Step Library</h2>
          <button
            onClick={onToggleCollapse}
            className="p-1.5 rounded-lg hover:bg-muted transition-colors duration-150"
            title="Collapse library"
          >
            <Icon name="ChevronLeft" size={18} />
          </button>
        </div>
        <Input
          type="search"
          placeholder="Search steps..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e?.target?.value)}
          className="w-full"
        />
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {filteredCategories?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Search" size={48} className="mx-auto mb-3 text-muted-foreground opacity-50" />
            <p className="text-sm text-muted-foreground">No steps found matching "{searchQuery}"</p>
          </div>
        ) : (
          filteredCategories?.map(category => (
            <div key={category?.id}>
              <div className="flex items-center gap-2 mb-3">
                <Icon name={category?.icon} size={16} className="text-muted-foreground" />
                <h3 className="text-sm font-medium text-foreground">{category?.name}</h3>
              </div>
              <div className="space-y-2">
                {category?.steps?.map(step => (
                  <div
                    key={step?.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, step)}
                    className="p-3 bg-muted/50 rounded-lg border border-border hover:border-primary/50 hover:bg-muted cursor-move transition-all duration-150 group"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-md bg-background ${step?.color}`}>
                        <Icon name={step?.icon} size={18} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-foreground mb-1">{step?.name}</h4>
                        <p className="text-xs text-muted-foreground line-clamp-2">{step?.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
      <div className="p-4 border-t border-border bg-muted/30">
        <div className="flex items-start gap-2 text-xs text-muted-foreground">
          <Icon name="Info" size={14} className="mt-0.5 flex-shrink-0" />
          <p>Drag and drop steps onto the canvas to build your workflow</p>
        </div>
      </div>
    </div>
  );
};

export default StepLibrary;