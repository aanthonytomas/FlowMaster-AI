import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import StatusBadge from './StatusBadge';

const TaskTableMobile = ({ tasks, onRun, onPause, onDelete }) => {
  const navigate = useNavigate();
  const [expandedTask, setExpandedTask] = useState(null);

  const formatDate = (date) => {
    if (!date) return 'Not scheduled';
    const d = new Date(date);
    return d?.toLocaleString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const handleEdit = (taskId) => {
    navigate('/workflow-builder', { state: { taskId } });
  };

  return (
    <div className="space-y-3">
      {tasks?.map((task) => (
        <div 
          key={task?.id} 
          className="bg-card border border-border rounded-lg overflow-hidden"
        >
          <div className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name={task?.icon} size={20} color="var(--color-primary)" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground truncate">{task?.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{task?.description}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                iconName={expandedTask === task?.id ? 'ChevronUp' : 'ChevronDown'}
                iconSize={16}
                onClick={() => setExpandedTask(expandedTask === task?.id ? null : task?.id)}
              />
            </div>

            <div className="flex items-center justify-between mb-3">
              <StatusBadge status={task?.status} />
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="xs"
                  iconName="Play"
                  iconSize={14}
                  onClick={() => onRun(task?.id)}
                  disabled={task?.status === 'running'}
                />
                <Button
                  variant="ghost"
                  size="xs"
                  iconName={task?.status === 'paused' ? 'Play' : 'Pause'}
                  iconSize={14}
                  onClick={() => onPause(task?.id)}
                  disabled={task?.status === 'running'}
                />
                <Button
                  variant="ghost"
                  size="xs"
                  iconName="Edit"
                  iconSize={14}
                  onClick={() => handleEdit(task?.id)}
                />
              </div>
            </div>

            {expandedTask === task?.id && (
              <div className="pt-3 border-t border-border space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Last Run:</span>
                  <span className="text-foreground font-medium">{formatDate(task?.lastRun)}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Next Run:</span>
                  <span className="text-foreground font-medium">{formatDate(task?.nextRun)}</span>
                </div>
                {task?.schedule && (
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Schedule:</span>
                    <span className="text-foreground font-medium">{task?.schedule}</span>
                  </div>
                )}
                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="xs"
                    iconName="History"
                    iconPosition="left"
                    iconSize={14}
                    fullWidth
                    onClick={() => navigate('/run-history', { state: { taskId: task?.id } })}
                  >
                    History
                  </Button>
                  <Button
                    variant="outline"
                    size="xs"
                    iconName="Activity"
                    iconPosition="left"
                    iconSize={14}
                    fullWidth
                    onClick={() => navigate('/execution-monitor', { state: { taskId: task?.id } })}
                  >
                    Monitor
                  </Button>
                  <Button
                    variant="destructive"
                    size="xs"
                    iconName="Trash2"
                    iconSize={14}
                    onClick={() => onDelete(task?.id)}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskTableMobile;