import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import StatusBadge from './StatusBadge';

const ExecutionCard = ({ execution, onRetry, onExport, isSelected, onSelect }) => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDuration = (seconds) => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTriggerIcon = (type) => {
    const icons = {
      manual: 'Hand',
      scheduled: 'Clock',
      webhook: 'Webhook'
    };
    return icons?.[type] || 'Play';
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={(e) => onSelect(execution?.id, e?.target?.checked)}
              className="mt-1 w-4 h-4 rounded border-border text-primary focus:ring-2 focus:ring-primary/20"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-foreground truncate">{execution?.workflowName}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">ID: {execution?.id}</p>
            </div>
          </div>
          <StatusBadge status={execution?.status} />
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Icon name="Calendar" size={16} />
            <span>{formatDate(execution?.startTime)}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Icon name="Clock" size={16} />
            <span>{formatDuration(execution?.duration)}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground col-span-2">
            <Icon name={getTriggerIcon(execution?.triggerType)} size={16} />
            <span className="capitalize">{execution?.triggerType} Trigger</span>
          </div>
        </div>

        <div className="pt-2 border-t border-border">
          <p className="text-sm text-muted-foreground line-clamp-2">{execution?.resultSummary}</p>
        </div>

        <div className="flex items-center gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Eye"
            onClick={() => navigate('/execution-monitor', { state: { executionId: execution?.id } })}
            fullWidth
          >
            View Details
          </Button>
          {execution?.status === 'failed' && (
            <Button
              variant="outline"
              size="sm"
              iconName="RotateCw"
              onClick={() => onRetry(execution?.id)}
              title="Retry"
            />
          )}
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            onClick={() => onExport([execution?.id])}
            title="Export"
          />
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-center gap-2 py-2 text-sm text-primary hover:bg-primary/5 rounded transition-colors duration-150"
        >
          <span>{isExpanded ? 'Hide' : 'Show'} Steps</span>
          <Icon name={isExpanded ? 'ChevronUp' : 'ChevronDown'} size={16} />
        </button>
      </div>
      {isExpanded && (
        <div className="px-4 pb-4 pt-2 border-t border-border bg-muted/30">
          <div className="space-y-2">
            {execution?.steps?.map((step, index) => (
              <div key={index} className="flex items-start gap-3 text-sm">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 ${
                  step?.status === 'success' ? 'bg-success/10 text-success' :
                  step?.status === 'failed'? 'bg-error/10 text-error' : 'bg-muted text-muted-foreground'
                }`}>
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-medium text-foreground">{step?.name}</span>
                    <span className="text-xs text-muted-foreground">{formatDuration(step?.duration)}</span>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">{step?.output}</p>
                </div>
                {step?.status === 'success' && (
                  <Icon name="CheckCircle2" size={16} className="text-success flex-shrink-0" />
                )}
                {step?.status === 'failed' && (
                  <Icon name="XCircle" size={16} className="text-error flex-shrink-0" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExecutionCard;