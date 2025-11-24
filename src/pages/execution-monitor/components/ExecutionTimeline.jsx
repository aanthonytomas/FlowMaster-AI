import React from 'react';
import Icon from '../../../components/AppIcon';

const ExecutionTimeline = ({ steps, onStepClick, expandedStepId }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-success text-success-foreground';
      case 'running':
        return 'bg-accent text-accent-foreground';
      case 'error':
        return 'bg-destructive text-destructive-foreground';
      case 'pending':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return 'CheckCircle2';
      case 'running':
        return 'Loader2';
      case 'error':
        return 'XCircle';
      case 'pending':
        return 'Clock';
      default:
        return 'Circle';
    }
  };

  const formatDuration = (ms) => {
    if (!ms) return '0s';
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    if (minutes > 0) {
      return `${minutes}m ${seconds % 60}s`;
    }
    return `${seconds}s`;
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h2 className="text-lg font-semibold text-foreground mb-6">Execution Timeline</h2>
      <div className="space-y-4">
        {steps?.map((step, index) => (
          <div key={step?.id} className="relative">
            {index < steps?.length - 1 && (
              <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-border" />
            )}
            
            <button
              onClick={() => onStepClick(step?.id)}
              className="w-full text-left bg-background hover:bg-muted/50 rounded-lg border border-border p-4 transition-all duration-150"
            >
              <div className="flex items-start gap-4">
                <div className={`flex-shrink-0 w-12 h-12 rounded-lg ${getStatusColor(step?.status)} flex items-center justify-center relative z-10`}>
                  <Icon 
                    name={getStatusIcon(step?.status)} 
                    size={20}
                    className={step?.status === 'running' ? 'animate-spin' : ''}
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <h3 className="text-base font-semibold text-foreground truncate">
                      {step?.name}
                    </h3>
                    <span className="text-sm text-muted-foreground whitespace-nowrap">
                      {formatDuration(step?.duration)}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Icon name="Tag" size={14} />
                      {step?.type}
                    </span>
                    {step?.startTime && (
                      <span className="flex items-center gap-1">
                        <Icon name="Clock" size={14} />
                        {new Date(step.startTime)?.toLocaleTimeString()}
                      </span>
                    )}
                  </div>
                  
                  {step?.status === 'running' && step?.progress !== undefined && (
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                        <span>Progress</span>
                        <span>{step?.progress}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-accent transition-all duration-300"
                          style={{ width: `${step?.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
                
                <Icon 
                  name={expandedStepId === step?.id ? 'ChevronUp' : 'ChevronDown'} 
                  size={20}
                  className="flex-shrink-0 text-muted-foreground"
                />
              </div>
              
              {expandedStepId === step?.id && (
                <div className="mt-4 pt-4 border-t border-border space-y-3">
                  {step?.input && (
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-2">Input Variables</p>
                      <pre className="bg-muted p-3 rounded text-xs text-foreground overflow-x-auto">
                        {JSON.stringify(step?.input, null, 2)}
                      </pre>
                    </div>
                  )}
                  
                  {step?.output && (
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-2">Output Data</p>
                      <pre className="bg-muted p-3 rounded text-xs text-foreground overflow-x-auto">
                        {JSON.stringify(step?.output, null, 2)}
                      </pre>
                    </div>
                  )}
                  
                  {step?.error && (
                    <div>
                      <p className="text-xs font-medium text-destructive mb-2">Error Details</p>
                      <div className="bg-destructive/10 border border-destructive/20 p-3 rounded text-xs text-destructive">
                        {step?.error}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExecutionTimeline;