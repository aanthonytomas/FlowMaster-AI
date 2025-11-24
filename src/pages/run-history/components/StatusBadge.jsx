import React from 'react';
import Icon from '../../../components/AppIcon';

const StatusBadge = ({ status }) => {
  const statusConfig = {
    success: {
      icon: 'CheckCircle2',
      bgColor: 'bg-success/10',
      textColor: 'text-success',
      label: 'Success'
    },
    failed: {
      icon: 'XCircle',
      bgColor: 'bg-error/10',
      textColor: 'text-error',
      label: 'Failed'
    },
    running: {
      icon: 'Loader2',
      bgColor: 'bg-accent/10',
      textColor: 'text-accent',
      label: 'Running',
      animate: true
    },
    cancelled: {
      icon: 'Ban',
      bgColor: 'bg-muted',
      textColor: 'text-muted-foreground',
      label: 'Cancelled'
    }
  };

  const config = statusConfig?.[status] || statusConfig?.failed;

  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${config?.bgColor} ${config?.textColor}`}>
      <Icon 
        name={config?.icon} 
        size={14} 
        className={config?.animate ? 'animate-spin' : ''} 
      />
      <span className="text-xs font-medium">{config?.label}</span>
    </div>
  );
};

export default StatusBadge;