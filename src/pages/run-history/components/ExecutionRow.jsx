import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import StatusBadge from './StatusBadge';

const ExecutionRow = ({ execution, onRetry, onExport, isSelected, onSelect }) => {
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
      year: 'numeric',
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
    <>
      <tr className="border-b border-border hover:bg-muted/50 transition-colors duration-150">
        <td className="px-4 py-3">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => onSelect(execution?.id, e?.target?.checked)}
            className="w-4 h-4 rounded border-border text-primary focus:ring-2 focus:ring-primary/20"
          />
        </td>
        <td className="px-4 py-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 hover:bg-muted rounded transition-colors duration-150"
            >
              <Icon 
                name={isExpanded ? 'ChevronDown' : 'ChevronRight'} 
                size={16} 
                className="text-muted-foreground"
              />
            </button>
            <div>
              <div className="font-medium text-foreground">{execution?.workflowName}</div>
              <div className="text-xs text-muted-foreground">ID: {execution?.id}</div>
            </div>
          </div>
        </td>
        <td className="px-4 py-3 text-sm text-foreground">
          {formatDate(execution?.startTime)}
        </td>
        <td className="px-4 py-3 text-sm text-foreground">
          {formatDuration(execution?.duration)}
        </td>
        <td className="px-4 py-3">
          <StatusBadge status={execution?.status} />
        </td>
        <td className="px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Icon name={getTriggerIcon(execution?.triggerType)} size={16} />
            <span className="capitalize">{execution?.triggerType}</span>
          </div>
        </td>
        <td className="px-4 py-3 text-sm text-muted-foreground max-w-xs truncate">
          {execution?.resultSummary}
        </td>
        <td className="px-4 py-3">
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              iconName="Eye"
              onClick={() => navigate('/execution-monitor', { state: { executionId: execution?.id } })}
              title="View Details"
            />
            {execution?.status === 'failed' && (
              <Button
                variant="ghost"
                size="sm"
                iconName="RotateCw"
                onClick={() => onRetry(execution?.id)}
                title="Retry Execution"
              />
            )}
            <Button
              variant="ghost"
              size="sm"
              iconName="Edit"
              onClick={() => navigate('/workflow-builder', { state: { workflowId: execution?.workflowId } })}
              title="Edit Workflow"
            />
            <Button
              variant="ghost"
              size="sm"
              iconName="Download"
              onClick={() => onExport([execution?.id])}
              title="Export"
            />
          </div>
        </td>
      </tr>
      {isExpanded && (
        <tr className="border-b border-border bg-muted/30">
          <td colSpan="8" className="px-4 py-4">
            <div className="space-y-3">
              <div className="font-medium text-foreground mb-2">Step Execution Summary</div>
              <div className="space-y-2">
                {execution?.steps?.map((step, index) => (
                  <div key={index} className="flex items-center gap-3 text-sm">
                    <div className="flex items-center gap-2 min-w-[200px]">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                        step?.status === 'success' ? 'bg-success/10 text-success' :
                        step?.status === 'failed'? 'bg-error/10 text-error' : 'bg-muted text-muted-foreground'
                      }`}>
                        {index + 1}
                      </div>
                      <span className="text-foreground">{step?.name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Icon name="Clock" size={14} />
                      <span>{formatDuration(step?.duration)}</span>
                    </div>
                    <div className="flex-1 text-muted-foreground truncate">
                      {step?.output}
                    </div>
                    {step?.status === 'success' && (
                      <Icon name="CheckCircle2" size={16} className="text-success" />
                    )}
                    {step?.status === 'failed' && (
                      <Icon name="XCircle" size={16} className="text-error" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export default ExecutionRow;