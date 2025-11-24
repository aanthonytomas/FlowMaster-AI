import React from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const FilterPanel = ({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  resultCount,
  isCollapsed,
  onToggleCollapse 
}) => {
  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'success', label: 'Success' },
    { value: 'failed', label: 'Failed' },
    { value: 'running', label: 'Running' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const triggerOptions = [
    { value: 'all', label: 'All Triggers' },
    { value: 'manual', label: 'Manual' },
    { value: 'scheduled', label: 'Scheduled' },
    { value: 'webhook', label: 'Webhook' }
  ];

  const workflowOptions = [
    { value: 'all', label: 'All Workflows' },
    { value: 'wf-001', label: 'Daily Market Analysis' },
    { value: 'wf-002', label: 'Competitor Price Monitor' },
    { value: 'wf-003', label: 'Customer Data Sync' },
    { value: 'wf-004', label: 'Social Media Tracker' },
    { value: 'wf-005', label: 'Inventory Update Pipeline' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-border lg:hidden">
        <div className="flex items-center gap-2">
          <Icon name="Filter" size={20} color="var(--color-primary)" />
          <span className="font-medium text-foreground">Filters</span>
          {resultCount > 0 && (
            <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-medium rounded-full">
              {resultCount} results
            </span>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          iconName={isCollapsed ? 'ChevronDown' : 'ChevronUp'}
          onClick={onToggleCollapse}
        >
          {isCollapsed ? 'Show' : 'Hide'}
        </Button>
      </div>
      <div className={`p-4 space-y-4 ${isCollapsed ? 'hidden lg:block' : 'block'}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Input
            type="date"
            label="Start Date"
            value={filters?.startDate}
            onChange={(e) => onFilterChange('startDate', e?.target?.value)}
            className="w-full"
          />

          <Input
            type="date"
            label="End Date"
            value={filters?.endDate}
            onChange={(e) => onFilterChange('endDate', e?.target?.value)}
            className="w-full"
          />

          <Select
            label="Workflow"
            options={workflowOptions}
            value={filters?.workflow}
            onChange={(value) => onFilterChange('workflow', value)}
          />

          <Select
            label="Status"
            options={statusOptions}
            value={filters?.status}
            onChange={(value) => onFilterChange('status', value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Trigger Type"
            options={triggerOptions}
            value={filters?.triggerType}
            onChange={(value) => onFilterChange('triggerType', value)}
          />

          <Input
            type="search"
            label="Search Logs"
            placeholder="Search execution logs and results..."
            value={filters?.searchQuery}
            onChange={(e) => onFilterChange('searchQuery', e?.target?.value)}
          />
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="text-sm text-muted-foreground">
            {resultCount > 0 ? (
              <span>Showing <span className="font-medium text-foreground">{resultCount}</span> execution{resultCount !== 1 ? 's' : ''}</span>
            ) : (
              <span>No executions found</span>
            )}
          </div>
          <Button
            variant="outline"
            size="sm"
            iconName="X"
            onClick={onClearFilters}
          >
            Clear Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;