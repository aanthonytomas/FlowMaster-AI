import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricCard = ({ title, value, trend, trendValue, icon, iconColor, iconBg }) => {
  const isPositiveTrend = trend === 'up';
  
  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 ${iconBg} rounded-lg flex items-center justify-center`}>
          <Icon name={icon} size={24} color={iconColor} />
        </div>
        {trendValue && (
          <div className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${
            isPositiveTrend 
              ? 'bg-success/10 text-success' :'bg-error/10 text-error'
          }`}>
            <Icon 
              name={isPositiveTrend ? 'TrendingUp' : 'TrendingDown'} 
              size={14} 
            />
            <span>{trendValue}</span>
          </div>
        )}
      </div>
      
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground font-medium">{title}</p>
        <p className="text-3xl font-bold text-foreground">{value}</p>
      </div>
    </div>
  );
};

export default MetricCard;