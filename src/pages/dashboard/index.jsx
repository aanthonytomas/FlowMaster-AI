import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import MetricCard from './components/MetricCard';
import TaskTableRow from './components/TaskTableRow';
import TaskTableMobile from './components/TaskTableMobile';
import ActivityFeed from './components/ActivityFeed';
import FilterToolbar from './components/FilterToolbar';
import Icon from '../../components/AppIcon';


const Dashboard = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    schedule: 'all',
    sort: 'name'
  });
  const [selectedTasks, setSelectedTasks] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const metrics = [
    {
      title: 'Total Tasks',
      value: '24',
      trend: 'up',
      trendValue: '+3',
      icon: 'Workflow',
      iconColor: 'var(--color-primary)',
      iconBg: 'bg-primary/10'
    },
    {
      title: 'Active Workflows',
      value: '8',
      trend: 'up',
      trendValue: '+2',
      icon: 'Play',
      iconColor: 'var(--color-accent)',
      iconBg: 'bg-accent/10'
    },
    {
      title: 'Successful Runs',
      value: '156',
      trend: 'up',
      trendValue: '+12',
      icon: 'CheckCircle',
      iconColor: 'var(--color-success)',
      iconBg: 'bg-success/10'
    },
    {
      title: 'Error Count',
      value: '3',
      trend: 'down',
      trendValue: '-2',
      icon: 'AlertCircle',
      iconColor: 'var(--color-error)',
      iconBg: 'bg-error/10'
    }
  ];

  const tasks = [
    {
      id: 1,
      name: 'Daily Price Monitoring',
      description: 'Scrape competitor prices and send alerts',
      status: 'running',
      icon: 'DollarSign',
      lastRun: new Date(Date.now() - 3600000),
      lastRunDuration: '2m 34s',
      nextRun: new Date(Date.now() + 82800000),
      schedule: 'Every 6 hours'
    },
    {
      id: 2,
      name: 'Customer Feedback Analysis',
      description: 'Analyze reviews using LLM and generate reports',
      status: 'scheduled',
      icon: 'MessageSquare',
      lastRun: new Date(Date.now() - 86400000),
      lastRunDuration: '5m 12s',
      nextRun: new Date(Date.now() + 3600000),
      schedule: 'Daily at 9:00 AM'
    },
    {
      id: 3,
      name: 'Inventory Stock Check',
      description: 'Monitor stock levels and trigger reorder alerts',
      status: 'scheduled',
      icon: 'Package',
      lastRun: new Date(Date.now() - 7200000),
      lastRunDuration: '1m 45s',
      nextRun: new Date(Date.now() + 10800000),
      schedule: 'Every 3 hours'
    },
    {
      id: 4,
      name: 'Social Media Monitoring',
      description: 'Track brand mentions and sentiment analysis',
      status: 'paused',
      icon: 'Hash',
      lastRun: new Date(Date.now() - 172800000),
      lastRunDuration: '3m 28s',
      nextRun: null,
      schedule: 'Paused'
    },
    {
      id: 5,
      name: 'Lead Qualification Pipeline',
      description: 'Score and route leads based on engagement data',
      status: 'error',
      icon: 'Users',
      lastRun: new Date(Date.now() - 1800000),
      lastRunDuration: 'Failed at 1m 12s',
      nextRun: new Date(Date.now() + 1800000),
      schedule: 'Every 30 minutes'
    },
    {
      id: 6,
      name: 'Weekly Performance Report',
      description: 'Aggregate metrics and email stakeholders',
      status: 'scheduled',
      icon: 'BarChart3',
      lastRun: new Date(Date.now() - 604800000),
      lastRunDuration: '8m 56s',
      nextRun: new Date(Date.now() + 86400000),
      schedule: 'Weekly on Monday'
    },
    {
      id: 7,
      name: 'API Health Monitor',
      description: 'Check endpoint availability and response times',
      status: 'running',
      icon: 'Activity',
      lastRun: new Date(Date.now() - 300000),
      lastRunDuration: '45s',
      nextRun: new Date(Date.now() + 300000),
      schedule: 'Every 5 minutes'
    },
    {
      id: 8,
      name: 'Content Backup Workflow',
      description: 'Export and archive database snapshots',
      status: 'scheduled',
      icon: 'Database',
      lastRun: new Date(Date.now() - 259200000),
      lastRunDuration: '12m 34s',
      nextRun: new Date(Date.now() + 345600000),
      schedule: 'Weekly on Sunday'
    }
  ];

  const activities = [
    {
      id: 1,
      type: 'success',
      title: 'Daily Price Monitoring completed',
      description: 'Workflow executed successfully in 2m 34s',
      timestamp: new Date(Date.now() - 3600000)
    },
    {
      id: 2,
      type: 'error',
      title: 'Lead Qualification Pipeline failed',
      description: 'API timeout error at step 3',
      timestamp: new Date(Date.now() - 1800000)
    },
    {
      id: 3,
      type: 'started',
      title: 'API Health Monitor started',
      description: 'Scheduled execution initiated',
      timestamp: new Date(Date.now() - 300000)
    },
    {
      id: 4,
      type: 'paused',
      title: 'Social Media Monitoring paused',
      description: 'Manually paused by user',
      timestamp: new Date(Date.now() - 172800000)
    },
    {
      id: 5,
      type: 'created',
      title: 'New workflow created',
      description: 'Email Campaign Automation workflow added',
      timestamp: new Date(Date.now() - 259200000)
    },
    {
      id: 6,
      type: 'updated',
      title: 'Inventory Stock Check updated',
      description: 'Schedule changed to every 3 hours',
      timestamp: new Date(Date.now() - 345600000)
    }
  ];

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleSearch = (value) => {
    setFilters(prev => ({ ...prev, search: value }));
  };

  const handleRunTask = (taskId) => {
    console.log('Running task:', taskId);
  };

  const handlePauseTask = (taskId) => {
    console.log('Pausing task:', taskId);
  };

  const handleDeleteTask = (taskId) => {
    console.log('Deleting task:', taskId);
  };

  const handleSelectAll = (e) => {
    if (e?.target?.checked) {
      setSelectedTasks(tasks?.map(t => t?.id));
    } else {
      setSelectedTasks([]);
    }
  };

  const handleSelectTask = (taskId) => {
    setSelectedTasks(prev => 
      prev?.includes(taskId) 
        ? prev?.filter(id => id !== taskId)
        : [...prev, taskId]
    );
  };

  const filteredTasks = tasks?.filter(task => {
    const matchesSearch = task?.name?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
                         task?.description?.toLowerCase()?.includes(filters?.search?.toLowerCase());
    const matchesStatus = filters?.status === 'all' || task?.status === filters?.status;
    return matchesSearch && matchesStatus;
  });

  return (
    <>
      <Helmet>
        <title>Dashboard - AI Task Automation Agent</title>
        <meta name="description" content="Manage and monitor your automation workflows with real-time status updates and performance metrics" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
                <p className="text-muted-foreground">Monitor and manage your automation workflows</p>
              </div>
              <Button
                variant="default"
                iconName="Plus"
                iconPosition="left"
                onClick={() => navigate('/workflow-builder')}
              >
                Create New Task
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {metrics?.map((metric, index) => (
                <MetricCard key={index} {...metric} />
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2">
                <FilterToolbar
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onSearch={handleSearch}
                />
              </div>
              <div className="flex items-center gap-2">
                {selectedTasks?.length > 0 && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Play"
                      iconPosition="left"
                      fullWidth
                    >
                      Run Selected ({selectedTasks?.length})
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Pause"
                      iconPosition="left"
                      fullWidth
                    >
                      Pause Selected
                    </Button>
                  </>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="bg-card border border-border rounded-lg overflow-hidden">
                  {isMobile ? (
                    <div className="p-4">
                      <TaskTableMobile
                        tasks={filteredTasks}
                        onRun={handleRunTask}
                        onPause={handlePauseTask}
                        onDelete={handleDeleteTask}
                      />
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-muted/50 border-b border-border">
                          <tr>
                            <th className="px-6 py-3 text-left">
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={selectedTasks?.length === filteredTasks?.length}
                                  onChange={handleSelectAll}
                                  className="w-4 h-4 rounded border-border"
                                />
                                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                  Workflow Name
                                </span>
                              </div>
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                              Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                              Last Run
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                              Next Run
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredTasks?.map((task) => (
                            <TaskTableRow
                              key={task?.id}
                              task={task}
                              onRun={handleRunTask}
                              onPause={handlePauseTask}
                              onDelete={handleDeleteTask}
                            />
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {filteredTasks?.length === 0 && (
                    <div className="p-12 text-center">
                      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon name="Search" size={32} color="var(--color-muted-foreground)" />
                      </div>
                      <p className="text-muted-foreground mb-2">No workflows found</p>
                      <p className="text-sm text-muted-foreground">Try adjusting your filters or create a new workflow</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="lg:col-span-1">
                <ActivityFeed activities={activities} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;