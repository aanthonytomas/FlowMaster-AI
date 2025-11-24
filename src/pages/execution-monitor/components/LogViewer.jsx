import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const LogViewer = ({ logs }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [autoScroll, setAutoScroll] = useState(true);
  const logContainerRef = useRef(null);

  const logLevelOptions = [
    { value: 'all', label: 'All Levels' },
    { value: 'info', label: 'Info' },
    { value: 'warning', label: 'Warning' },
    { value: 'error', label: 'Error' },
    { value: 'debug', label: 'Debug' }
  ];

  const filteredLogs = logs?.filter(log => {
    const matchesSearch = searchTerm === '' || 
      log?.message?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      log?.stepName?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesLevel = selectedLevel === 'all' || log?.level === selectedLevel;
    return matchesSearch && matchesLevel;
  });

  useEffect(() => {
    if (autoScroll && logContainerRef?.current) {
      logContainerRef.current.scrollTop = logContainerRef?.current?.scrollHeight;
    }
  }, [logs, autoScroll]);

  const getLevelColor = (level) => {
    switch (level) {
      case 'error':
        return 'text-destructive';
      case 'warning':
        return 'text-warning';
      case 'info':
        return 'text-accent';
      case 'debug':
        return 'text-muted-foreground';
      default:
        return 'text-foreground';
    }
  };

  const getLevelIcon = (level) => {
    switch (level) {
      case 'error':
        return 'XCircle';
      case 'warning':
        return 'AlertTriangle';
      case 'info':
        return 'Info';
      case 'debug':
        return 'Bug';
      default:
        return 'Circle';
    }
  };

  const copyToClipboard = () => {
    const logText = filteredLogs?.map(log => 
      `[${new Date(log.timestamp)?.toLocaleTimeString()}] [${log?.level?.toUpperCase()}] ${log?.stepName}: ${log?.message}`
    )?.join('\n');
    navigator.clipboard?.writeText(logText);
  };

  const downloadLogs = () => {
    const logText = filteredLogs?.map(log => 
      `[${new Date(log.timestamp)?.toLocaleTimeString()}] [${log?.level?.toUpperCase()}] ${log?.stepName}: ${log?.message}`
    )?.join('\n');
    const blob = new Blob([logText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `execution-logs-${Date.now()}.txt`;
    document.body?.appendChild(a);
    a?.click();
    document.body?.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-card rounded-lg border border-border">
      <div className="p-4 border-b border-border">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <h2 className="text-lg font-semibold text-foreground">Execution Logs</h2>
          
          <div className="flex flex-wrap items-center gap-3">
            <div className="w-full sm:w-64">
              <Input
                type="search"
                placeholder="Search logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e?.target?.value)}
              />
            </div>
            
            <div className="w-full sm:w-40">
              <Select
                options={logLevelOptions}
                value={selectedLevel}
                onChange={setSelectedLevel}
                placeholder="Filter level"
              />
            </div>
            
            <button
              onClick={() => setAutoScroll(!autoScroll)}
              className={`p-2 rounded-md border transition-all duration-150 ${
                autoScroll 
                  ? 'bg-primary text-primary-foreground border-primary' 
                  : 'bg-background text-muted-foreground border-border hover:bg-muted'
              }`}
              title={autoScroll ? 'Auto-scroll enabled' : 'Auto-scroll disabled'}
            >
              <Icon name="ArrowDown" size={18} />
            </button>
            
            <button
              onClick={copyToClipboard}
              className="p-2 rounded-md border border-border bg-background text-muted-foreground hover:bg-muted transition-all duration-150"
              title="Copy logs"
            >
              <Icon name="Copy" size={18} />
            </button>
            
            <button
              onClick={downloadLogs}
              className="p-2 rounded-md border border-border bg-background text-muted-foreground hover:bg-muted transition-all duration-150"
              title="Download logs"
            >
              <Icon name="Download" size={18} />
            </button>
          </div>
        </div>
      </div>
      <div 
        ref={logContainerRef}
        className="p-4 h-96 overflow-y-auto font-mono text-sm bg-background"
      >
        {filteredLogs?.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
            <Icon name="FileText" size={48} className="mb-3 opacity-50" />
            <p>No logs to display</p>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredLogs?.map((log, index) => (
              <div key={index} className="flex items-start gap-3 py-2 border-b border-border last:border-0">
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {new Date(log.timestamp)?.toLocaleTimeString()}
                </span>
                
                <Icon 
                  name={getLevelIcon(log?.level)} 
                  size={16} 
                  className={`flex-shrink-0 mt-0.5 ${getLevelColor(log?.level)}`}
                />
                
                <span className={`text-xs font-medium ${getLevelColor(log?.level)} whitespace-nowrap`}>
                  [{log?.level?.toUpperCase()}]
                </span>
                
                <span className="text-xs text-accent font-medium whitespace-nowrap">
                  {log?.stepName}:
                </span>
                
                <span className="text-xs text-foreground flex-1">
                  {log?.message}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="p-3 border-t border-border bg-muted/30">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{filteredLogs?.length} log entries</span>
          <span className="flex items-center gap-1">
            <div className={`w-2 h-2 rounded-full ${logs?.length > 0 ? 'bg-success animate-pulse-subtle' : 'bg-muted-foreground'}`} />
            {logs?.length > 0 ? 'Live streaming' : 'No activity'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default LogViewer;