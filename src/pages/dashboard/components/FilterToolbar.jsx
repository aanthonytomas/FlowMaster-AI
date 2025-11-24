import React from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const FilterToolbar = ({ filters, onFilterChange, onSearch }) => {
  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'running', label: 'Running' },
    { value: 'scheduled', label: 'Scheduled' },
    { value: 'paused', label: 'Paused' },
    { value: 'error', label: 'Error' },
    { value: 'idle', label: 'Idle' }
  ];

  const scheduleOptions = [
    { value: 'all', label: 'All Schedules' },
    { value: 'cron', label: 'Cron Schedule' },
    { value: 'webhook', label: 'Webhook Trigger' },
    { value: 'manual', label: 'Manual Only' }
  ];

  const sortOptions = [
    { value: 'name', label: 'Name' },
    { value: 'lastRun', label: 'Last Run' },
    { value: 'nextRun', label: 'Next Run' },
    { value: 'created', label: 'Date Created' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="relative">
          <Input
            type="search"
            placeholder="Search workflows..."
            value={filters?.search}
            onChange={(e) => onSearch(e?.target?.value)}
            className="pl-10"
          />
          <Icon 
            name="Search" 
            size={18} 
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" 
          />
        </div>

        <Select
          options={statusOptions}
          value={filters?.status}
          onChange={(value) => onFilterChange('status', value)}
          placeholder="Filter by status"
        />

        <Select
          options={scheduleOptions}
          value={filters?.schedule}
          onChange={(value) => onFilterChange('schedule', value)}
          placeholder="Filter by schedule"
        />

        <Select
          options={sortOptions}
          value={filters?.sort}
          onChange={(value) => onFilterChange('sort', value)}
          placeholder="Sort by"
        />
      </div>
    </div>
  );
};

export default FilterToolbar;