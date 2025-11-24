import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = ({ workflowName, stepName }) => {
  const location = useLocation();

  if (location?.pathname !== '/step-configuration') {
    return null;
  }

  const truncateText = (text, maxLength = 30) => {
    if (!text || text?.length <= maxLength) return text;
    return `${text?.substring(0, maxLength)}...`;
  };

  return (
    <nav className="flex items-center gap-2 px-6 py-3 bg-muted/50 border-b border-border text-sm">
      <Link
        to="/workflow-builder"
        className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors duration-150"
      >
        <span>Workflows</span>
      </Link>
      
      <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
      
      <Link
        to="/workflow-builder"
        className="text-muted-foreground hover:text-foreground transition-colors duration-150"
        title={workflowName}
      >
        <span>{truncateText(workflowName || 'Untitled Workflow')}</span>
      </Link>
      
      <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
      
      <span className="text-foreground font-medium" title={stepName}>
        {truncateText(stepName || 'Step Configuration')}
      </span>
    </nav>
  );
};

export default Breadcrumb;