import React from 'react';
import Icon from '../../../components/AppIcon';

const StatusBadge = ({ status }) => {
  const statusConfig = {
    running: {
      label: 'Running',
      icon: 'Play',
      bgColor: 'bg-accent/10',
      textColor: 'text-accent',
      iconColor: 'var(--color-accent)'
    },
    scheduled: {
      label: 'Scheduled',
      icon: 'Clock',
      bgColor: 'bg-primary/10',
      textColor: 'text-primary',
      iconColor: 'var(--color-primary)'
    },
    paused: {
      label: 'Paused',
      icon: 'Pause',
      bgColor: 'bg-warning/10',
      textColor: 'text-warning',
      iconColor: 'var(--color-warning)'
    },
    error: {
      label: 'Error',
      icon: 'AlertCircle',
      bgColor: 'bg-error/10',
      textColor: 'text-error',
      iconColor: 'var(--color-error)'
    },
    success: {
      label: 'Success',
      icon: 'CheckCircle',
      bgColor: 'bg-success/10',
      textColor: 'text-success',
      iconColor: 'var(--color-success)'
    },
    idle: {
      label: 'Idle',
      icon: 'Circle',
      bgColor: 'bg-muted',
      textColor: 'text-muted-foreground',
      iconColor: 'var(--color-muted-foreground)'
    }
  };

  const config = statusConfig?.[status] || statusConfig?.idle;

  return (
    <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md ${config?.bgColor} ${config?.textColor}`}>
      <Icon name={config?.icon} size={14} color={config?.iconColor} />
      <span className="text-xs font-medium">{config?.label}</span>
    </div>
  );
};

export default StatusBadge;