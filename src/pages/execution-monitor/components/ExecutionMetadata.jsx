import React from 'react';
import Icon from '../../../components/AppIcon';

const ExecutionMetadata = ({ metadata }) => {
  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes?.[i];
  };

  const metadataItems = [
    {
      icon: 'Cpu',
      label: 'CPU Usage',
      value: `${metadata?.cpuUsage}%`,
      color: metadata?.cpuUsage > 80 ? 'text-destructive' : 'text-foreground'
    },
    {
      icon: 'HardDrive',
      label: 'Memory',
      value: formatBytes(metadata?.memoryUsage),
      color: 'text-foreground'
    },
    {
      icon: 'Activity',
      label: 'Steps Completed',
      value: `${metadata?.completedSteps}/${metadata?.totalSteps}`,
      color: 'text-foreground'
    },
    {
      icon: 'AlertCircle',
      label: 'Errors',
      value: metadata?.errorCount,
      color: metadata?.errorCount > 0 ? 'text-destructive' : 'text-success'
    },
    {
      icon: 'Zap',
      label: 'Trigger Type',
      value: metadata?.triggerType,
      color: 'text-foreground'
    },
    {
      icon: 'User',
      label: 'Triggered By',
      value: metadata?.triggeredBy,
      color: 'text-foreground'
    }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h2 className="text-lg font-semibold text-foreground mb-6">Execution Metadata</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {metadataItems?.map((item, index) => (
          <div key={index} className="bg-background rounded-lg border border-border p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Icon name={item?.icon} size={20} color="var(--color-primary)" />
              </div>
              <span className="text-sm text-muted-foreground">{item?.label}</span>
            </div>
            <p className={`text-xl font-semibold ${item?.color}`}>{item?.value}</p>
          </div>
        ))}
      </div>
      {metadata?.variables && Object.keys(metadata?.variables)?.length > 0 && (
        <div className="mt-6">
          <h3 className="text-sm font-medium text-foreground mb-3">Context Variables</h3>
          <div className="bg-background rounded-lg border border-border p-4">
            <pre className="text-xs text-foreground overflow-x-auto">
              {JSON.stringify(metadata?.variables, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExecutionMetadata;