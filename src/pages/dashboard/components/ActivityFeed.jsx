import React from 'react';
import Icon from '../../../components/AppIcon';

const ActivityFeed = ({ activities }) => {
  const getActivityIcon = (type) => {
    const icons = {
      success: 'CheckCircle',
      error: 'AlertCircle',
      started: 'Play',
      paused: 'Pause',
      created: 'Plus',
      updated: 'Edit'
    };
    return icons?.[type] || 'Activity';
  };

  const getActivityColor = (type) => {
    const colors = {
      success: 'var(--color-success)',
      error: 'var(--color-error)',
      started: 'var(--color-accent)',
      paused: 'var(--color-warning)',
      created: 'var(--color-primary)',
      updated: 'var(--color-primary)'
    };
    return colors?.[type] || 'var(--color-muted-foreground)';
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const activityDate = new Date(date);
    const diffInMinutes = Math.floor((now - activityDate) / 60000);
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
        <Icon name="Activity" size={20} color="var(--color-muted-foreground)" />
      </div>
      <div className="space-y-4">
        {activities?.map((activity) => (
          <div key={activity?.id} className="flex gap-3">
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: `${getActivityColor(activity?.type)}20` }}
            >
              <Icon 
                name={getActivityIcon(activity?.type)} 
                size={16} 
                color={getActivityColor(activity?.type)} 
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground font-medium">{activity?.title}</p>
              <p className="text-xs text-muted-foreground truncate">{activity?.description}</p>
              <p className="text-xs text-muted-foreground mt-1">{formatTimeAgo(activity?.timestamp)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;