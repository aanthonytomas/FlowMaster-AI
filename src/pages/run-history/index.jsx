import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import FilterPanel from './components/FilterPanel';
import ExecutionRow from './components/ExecutionRow';
import ExecutionCard from './components/ExecutionCard';
import BulkActions from './components/BulkActions';
import Pagination from './components/Pagination';

const RunHistory = () => {
  const navigate = useNavigate();
  const [isFilterCollapsed, setIsFilterCollapsed] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: 'startTime', direction: 'desc' });
  const [selectedExecutions, setSelectedExecutions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    workflow: 'all',
    status: 'all',
    triggerType: 'all',
    searchQuery: ''
  });

  const mockExecutions = [
    {
      id: 'exec-001',
      workflowId: 'wf-001',
      workflowName: 'Daily Market Analysis',
      startTime: new Date(Date.now() - 3600000),
      duration: 245,
      status: 'success',
      triggerType: 'scheduled',
      resultSummary: 'Successfully analyzed 150 market data points and generated comprehensive report',
      steps: [
        { name: 'Fetch Market Data', duration: 45, status: 'success', output: 'Retrieved 150 data points from API' },
        { name: 'Process Data', duration: 120, status: 'success', output: 'Cleaned and normalized market data' },
        { name: 'LLM Analysis', duration: 60, status: 'success', output: 'Generated insights using GPT-4' },
        { name: 'Send Report', duration: 20, status: 'success', output: 'Email sent to 5 recipients' }
      ]
    },
    {
      id: 'exec-002',
      workflowId: 'wf-002',
      workflowName: 'Competitor Price Monitor',
      startTime: new Date(Date.now() - 7200000),
      duration: 180,
      status: 'success',
      triggerType: 'scheduled',
      resultSummary: 'Monitored 25 competitor products and detected 3 price changes',
      steps: [
        { name: 'Scrape Competitor Sites', duration: 90, status: 'success', output: 'Scraped 25 product pages' },
        { name: 'Extract Prices', duration: 45, status: 'success', output: 'Extracted pricing data using XPath' },
        { name: 'Compare Prices', duration: 30, status: 'success', output: 'Detected 3 price changes' },
        { name: 'Send Alert', duration: 15, status: 'success', output: 'Slack notification sent' }
      ]
    },
    {
      id: 'exec-003',
      workflowId: 'wf-003',
      workflowName: 'Customer Data Sync',
      startTime: new Date(Date.now() - 10800000),
      duration: 156,
      status: 'failed',
      triggerType: 'webhook',
      resultSummary: 'Failed at database update step due to connection timeout',
      steps: [
        { name: 'Fetch Customer Data', duration: 60, status: 'success', output: 'Retrieved 500 customer records' },
        { name: 'Transform Data', duration: 45, status: 'success', output: 'Applied data transformation rules' },
        { name: 'Update Database', duration: 51, status: 'failed', output: 'Connection timeout after 50 seconds' }
      ]
    },
    {
      id: 'exec-004',
      workflowId: 'wf-004',
      workflowName: 'Social Media Tracker',
      startTime: new Date(Date.now() - 14400000),
      duration: 320,
      status: 'success',
      triggerType: 'manual',
      resultSummary: 'Tracked 200 social media mentions and generated sentiment analysis',
      steps: [
        { name: 'Fetch Social Posts', duration: 120, status: 'success', output: 'Retrieved 200 posts from Twitter and LinkedIn' },
        { name: 'Sentiment Analysis', duration: 150, status: 'success', output: 'Analyzed sentiment using local LLM' },
        { name: 'Generate Report', duration: 35, status: 'success', output: 'Created visualization dashboard' },
        { name: 'Email Report', duration: 15, status: 'success', output: 'Report sent to marketing team' }
      ]
    },
    {
      id: 'exec-005',
      workflowId: 'wf-005',
      workflowName: 'Inventory Update Pipeline',
      startTime: new Date(Date.now() - 18000000),
      duration: 95,
      status: 'success',
      triggerType: 'scheduled',
      resultSummary: 'Updated inventory levels for 350 products across 3 warehouses',
      steps: [
        { name: 'Fetch Inventory Data', duration: 30, status: 'success', output: 'Retrieved data from 3 warehouse systems' },
        { name: 'Reconcile Quantities', duration: 40, status: 'success', output: 'Reconciled 350 product quantities' },
        { name: 'Update Central DB', duration: 25, status: 'success', output: 'Updated central inventory database' }
      ]
    },
    {
      id: 'exec-006',
      workflowId: 'wf-001',
      workflowName: 'Daily Market Analysis',
      startTime: new Date(Date.now() - 86400000),
      duration: 238,
      status: 'success',
      triggerType: 'scheduled',
      resultSummary: 'Successfully analyzed 145 market data points and generated report',
      steps: [
        { name: 'Fetch Market Data', duration: 42, status: 'success', output: 'Retrieved 145 data points from API' },
        { name: 'Process Data', duration: 115, status: 'success', output: 'Cleaned and normalized market data' },
        { name: 'LLM Analysis', duration: 62, status: 'success', output: 'Generated insights using GPT-4' },
        { name: 'Send Report', duration: 19, status: 'success', output: 'Email sent to 5 recipients' }
      ]
    },
    {
      id: 'exec-007',
      workflowId: 'wf-002',
      workflowName: 'Competitor Price Monitor',
      startTime: new Date(Date.now() - 90000000),
      duration: 175,
      status: 'success',
      triggerType: 'scheduled',
      resultSummary: 'Monitored 25 competitor products with no price changes detected',
      steps: [
        { name: 'Scrape Competitor Sites', duration: 88, status: 'success', output: 'Scraped 25 product pages' },
        { name: 'Extract Prices', duration: 43, status: 'success', output: 'Extracted pricing data using XPath' },
        { name: 'Compare Prices', duration: 29, status: 'success', output: 'No price changes detected' },
        { name: 'Send Alert', duration: 15, status: 'success', output: 'Status update sent to Slack' }
      ]
    },
    {
      id: 'exec-008',
      workflowId: 'wf-004',
      workflowName: 'Social Media Tracker',
      startTime: new Date(Date.now() - 172800000),
      duration: 0,
      status: 'cancelled',
      triggerType: 'manual',
      resultSummary: 'Execution cancelled by user after 2 minutes',
      steps: [
        { name: 'Fetch Social Posts', duration: 120, status: 'success', output: 'Retrieved 180 posts from Twitter and LinkedIn' }
      ]
    }
  ];

  useEffect(() => {
    const user = sessionStorage.getItem('user');
    if (!user) {
      navigate('/login');
    }
  }, [navigate]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setFilters({
      startDate: '',
      endDate: '',
      workflow: 'all',
      status: 'all',
      triggerType: 'all',
      searchQuery: ''
    });
    setCurrentPage(1);
  };

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev?.key === key && prev?.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleRetry = (executionId) => {
    console.log('Retrying execution:', executionId);
  };

  const handleExport = (executionIds) => {
    console.log('Exporting executions:', executionIds);
  };

  const handleBulkExport = (format, fields) => {
    console.log('Bulk export:', { format, fields, executionIds: selectedExecutions });
    setSelectedExecutions([]);
  };

  const filteredExecutions = mockExecutions?.filter(exec => {
    if (filters?.workflow !== 'all' && exec?.workflowId !== filters?.workflow) return false;
    if (filters?.status !== 'all' && exec?.status !== filters?.status) return false;
    if (filters?.triggerType !== 'all' && exec?.triggerType !== filters?.triggerType) return false;
    if (filters?.startDate && new Date(exec.startTime) < new Date(filters.startDate)) return false;
    if (filters?.endDate && new Date(exec.startTime) > new Date(filters.endDate)) return false;
    if (filters?.searchQuery) {
      const query = filters?.searchQuery?.toLowerCase();
      return (exec?.workflowName?.toLowerCase()?.includes(query) ||
      exec?.resultSummary?.toLowerCase()?.includes(query) || exec?.steps?.some(step => step?.output?.toLowerCase()?.includes(query)));
    }
    return true;
  });

  const handleSelectExecution = (id, checked) => {
    setSelectedExecutions(prev =>
      checked ? [...prev, id] : prev?.filter(execId => execId !== id)
    );
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedExecutions(filteredExecutions?.map(exec => exec?.id));
    } else {
      setSelectedExecutions([]);
    }
  };

  const sortedExecutions = [...filteredExecutions]?.sort((a, b) => {
    const aValue = a?.[sortConfig?.key];
    const bValue = b?.[sortConfig?.key];
    
    if (sortConfig?.key === 'startTime') {
      return sortConfig?.direction === 'asc'
        ? new Date(aValue) - new Date(bValue)
        : new Date(bValue) - new Date(aValue);
    }
    
    if (typeof aValue === 'string') {
      return sortConfig?.direction === 'asc'
        ? aValue?.localeCompare(bValue)
        : bValue?.localeCompare(aValue);
    }
    
    return sortConfig?.direction === 'asc' ? aValue - bValue : bValue - aValue;
  });

  const totalPages = Math.ceil(sortedExecutions?.length / pageSize);
  const paginatedExecutions = sortedExecutions?.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const getSortIcon = (key) => {
    if (sortConfig?.key !== key) return 'ChevronsUpDown';
    return sortConfig?.direction === 'asc' ? 'ChevronUp' : 'ChevronDown';
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-[1600px] mx-auto p-6 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Run History</h1>
              <p className="text-muted-foreground mt-1">Review and analyze past workflow executions</p>
            </div>
            <Button
              variant="default"
              iconName="RefreshCw"
              onClick={() => window.location?.reload()}
            >
              Refresh
            </Button>
          </div>

          <FilterPanel
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            resultCount={filteredExecutions?.length}
            isCollapsed={isFilterCollapsed}
            onToggleCollapse={() => setIsFilterCollapsed(!isFilterCollapsed)}
          />

          <div className="hidden lg:block bg-card border border-border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50 border-b border-border">
                  <tr>
                    <th className="px-4 py-3 text-left w-12">
                      <input
                        type="checkbox"
                        checked={selectedExecutions?.length === paginatedExecutions?.length && paginatedExecutions?.length > 0}
                        onChange={(e) => handleSelectAll(e?.target?.checked)}
                        className="w-4 h-4 rounded border-border text-primary focus:ring-2 focus:ring-primary/20"
                      />
                    </th>
                    <th className="px-4 py-3 text-left">
                      <button
                        onClick={() => handleSort('workflowName')}
                        className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors duration-150"
                      >
                        <span>Workflow</span>
                        <Icon name={getSortIcon('workflowName')} size={16} />
                      </button>
                    </th>
                    <th className="px-4 py-3 text-left">
                      <button
                        onClick={() => handleSort('startTime')}
                        className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors duration-150"
                      >
                        <span>Start Time</span>
                        <Icon name={getSortIcon('startTime')} size={16} />
                      </button>
                    </th>
                    <th className="px-4 py-3 text-left">
                      <button
                        onClick={() => handleSort('duration')}
                        className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors duration-150"
                      >
                        <span>Duration</span>
                        <Icon name={getSortIcon('duration')} size={16} />
                      </button>
                    </th>
                    <th className="px-4 py-3 text-left">
                      <button
                        onClick={() => handleSort('status')}
                        className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors duration-150"
                      >
                        <span>Status</span>
                        <Icon name={getSortIcon('status')} size={16} />
                      </button>
                    </th>
                    <th className="px-4 py-3 text-left">
                      <span className="text-sm font-medium text-foreground">Trigger</span>
                    </th>
                    <th className="px-4 py-3 text-left">
                      <span className="text-sm font-medium text-foreground">Result</span>
                    </th>
                    <th className="px-4 py-3 text-left">
                      <span className="text-sm font-medium text-foreground">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedExecutions?.length > 0 ? (
                    paginatedExecutions?.map(execution => (
                      <ExecutionRow
                        key={execution?.id}
                        execution={execution}
                        onRetry={handleRetry}
                        onExport={handleExport}
                        isSelected={selectedExecutions?.includes(execution?.id)}
                        onSelect={handleSelectExecution}
                      />
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="px-4 py-12 text-center">
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                            <Icon name="Search" size={32} className="text-muted-foreground" />
                          </div>
                          <div>
                            <p className="text-foreground font-medium">No executions found</p>
                            <p className="text-sm text-muted-foreground mt-1">Try adjusting your filters</p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {paginatedExecutions?.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                pageSize={pageSize}
                onPageChange={setCurrentPage}
                onPageSizeChange={setPageSize}
                totalItems={sortedExecutions?.length}
              />
            )}
          </div>

          <div className="lg:hidden space-y-4">
            {paginatedExecutions?.length > 0 ? (
              <>
                {paginatedExecutions?.map(execution => (
                  <ExecutionCard
                    key={execution?.id}
                    execution={execution}
                    onRetry={handleRetry}
                    onExport={handleExport}
                    isSelected={selectedExecutions?.includes(execution?.id)}
                    onSelect={handleSelectExecution}
                  />
                ))}
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  pageSize={pageSize}
                  onPageChange={setCurrentPage}
                  onPageSizeChange={setPageSize}
                  totalItems={sortedExecutions?.length}
                />
              </>
            ) : (
              <div className="bg-card border border-border rounded-lg p-12">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                    <Icon name="Search" size={32} className="text-muted-foreground" />
                  </div>
                  <div className="text-center">
                    <p className="text-foreground font-medium">No executions found</p>
                    <p className="text-sm text-muted-foreground mt-1">Try adjusting your filters</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <BulkActions
        selectedCount={selectedExecutions?.length}
        onExport={handleBulkExport}
        onClearSelection={() => setSelectedExecutions([])}
      />
    </div>
  );
};

export default RunHistory;