import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import StatusBadge from './StatusBadge';

const TaskTableRow = ({ task, onRun, onPause, onDelete }) => {
  const navigate = useNavigate();
  const [showActions, setShowActions] = useState(false);

  const formatDate = (date) => {
    if (!date) return 'Not scheduled';
    const d = new Date(date);
    return d?.toLocaleString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const handleEdit = () => {
    navigate('/workflow-builder', { state: { taskId: task?.id } });
  };

  return (
    <tr className="border-b border-border hover:bg-muted/50 transition-colors duration-150">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <Icon name={task?.icon} size={20} color="var(--color-primary)" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-foreground truncate">{task?.name}</p>
            <p className="text-xs text-muted-foreground truncate">{task?.description}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <StatusBadge status={task?.status} />
      </td>
      <td className="px-6 py-4">
        <div className="text-sm">
          <p className="text-foreground">{formatDate(task?.lastRun)}</p>
          {task?.lastRunDuration && (
            <p className="text-xs text-muted-foreground">{task?.lastRunDuration}</p>
          )}
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="text-sm">
          <p className="text-foreground">{formatDate(task?.nextRun)}</p>
          {task?.schedule && (
            <p className="text-xs text-muted-foreground">{task?.schedule}</p>
          )}
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            iconName="Play"
            iconSize={16}
            onClick={() => onRun(task?.id)}
            disabled={task?.status === 'running'}
          />
          <Button
            variant="ghost"
            size="icon"
            iconName={task?.status === 'paused' ? 'Play' : 'Pause'}
            iconSize={16}
            onClick={() => onPause(task?.id)}
            disabled={task?.status === 'running'}
          />
          <Button
            variant="ghost"
            size="icon"
            iconName="Edit"
            iconSize={16}
            onClick={handleEdit}
          />
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              iconName="MoreVertical"
              iconSize={16}
              onClick={() => setShowActions(!showActions)}
            />
            {showActions && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setShowActions(false)}
                />
                <div className="absolute right-0 top-full mt-1 w-48 bg-popover border border-border rounded-lg shadow-lg z-20">
                  <button
                    onClick={() => {
                      navigate('/run-history', { state: { taskId: task?.id } });
                      setShowActions(false);
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors duration-150"
                  >
                    <Icon name="History" size={16} />
                    <span>View History</span>
                  </button>
                  <button
                    onClick={() => {
                      navigate('/execution-monitor', { state: { taskId: task?.id } });
                      setShowActions(false);
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors duration-150"
                  >
                    <Icon name="Activity" size={16} />
                    <span>Monitor</span>
                  </button>
                  <button
                    onClick={() => {
                      onDelete(task?.id);
                      setShowActions(false);
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors duration-150 border-t border-border"
                  >
                    <Icon name="Trash2" size={16} />
                    <span>Delete</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </td>
    </tr>
  );
};

export default TaskTableRow;