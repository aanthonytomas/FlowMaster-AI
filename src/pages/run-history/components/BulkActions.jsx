import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const BulkActions = ({ selectedCount, onExport, onClearSelection }) => {
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportFormat, setExportFormat] = useState('csv');
  const [exportFields, setExportFields] = useState({
    workflowName: true,
    startTime: true,
    duration: true,
    status: true,
    triggerType: true,
    resultSummary: true,
    steps: true,
    logs: false
  });

  const handleExport = () => {
    onExport(exportFormat, exportFields);
    setShowExportModal(false);
  };

  const toggleField = (field) => {
    setExportFields(prev => ({
      ...prev,
      [field]: !prev?.[field]
    }));
  };

  if (selectedCount === 0) return null;

  return (
    <>
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-slide-up">
        <div className="bg-card border border-border rounded-lg shadow-lg px-6 py-4 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-primary">{selectedCount}</span>
            </div>
            <span className="text-sm font-medium text-foreground">
              {selectedCount} execution{selectedCount !== 1 ? 's' : ''} selected
            </span>
          </div>

          <div className="h-6 w-px bg-border" />

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Download"
              onClick={() => setShowExportModal(true)}
            >
              Export
            </Button>
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              onClick={onClearSelection}
            >
              Clear
            </Button>
          </div>
        </div>
      </div>
      {showExportModal && (
        <>
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[60]"
            onClick={() => setShowExportModal(false)}
          />
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
            <div className="bg-card border border-border rounded-lg shadow-xl w-full max-w-md animate-scale-in">
              <div className="flex items-center justify-between p-6 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="Download" size={20} color="var(--color-primary)" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Export Executions</h3>
                    <p className="text-sm text-muted-foreground">{selectedCount} execution{selectedCount !== 1 ? 's' : ''} selected</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowExportModal(false)}
                  className="p-2 hover:bg-muted rounded-lg transition-colors duration-150"
                >
                  <Icon name="X" size={20} />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">Export Format</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setExportFormat('csv')}
                      className={`p-4 border rounded-lg text-left transition-all duration-150 ${
                        exportFormat === 'csv' ?'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Icon name="FileText" size={18} color={exportFormat === 'csv' ? 'var(--color-primary)' : 'currentColor'} />
                        <span className="font-medium text-foreground">CSV</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Spreadsheet format</p>
                    </button>
                    <button
                      onClick={() => setExportFormat('json')}
                      className={`p-4 border rounded-lg text-left transition-all duration-150 ${
                        exportFormat === 'json' ?'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Icon name="Code" size={18} color={exportFormat === 'json' ? 'var(--color-primary)' : 'currentColor'} />
                        <span className="font-medium text-foreground">JSON</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Structured data</p>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">Include Fields</label>
                  <div className="space-y-2">
                    <Checkbox
                      label="Workflow Name"
                      checked={exportFields?.workflowName}
                      onChange={() => toggleField('workflowName')}
                    />
                    <Checkbox
                      label="Start Time"
                      checked={exportFields?.startTime}
                      onChange={() => toggleField('startTime')}
                    />
                    <Checkbox
                      label="Duration"
                      checked={exportFields?.duration}
                      onChange={() => toggleField('duration')}
                    />
                    <Checkbox
                      label="Status"
                      checked={exportFields?.status}
                      onChange={() => toggleField('status')}
                    />
                    <Checkbox
                      label="Trigger Type"
                      checked={exportFields?.triggerType}
                      onChange={() => toggleField('triggerType')}
                    />
                    <Checkbox
                      label="Result Summary"
                      checked={exportFields?.resultSummary}
                      onChange={() => toggleField('resultSummary')}
                    />
                    <Checkbox
                      label="Step Details"
                      checked={exportFields?.steps}
                      onChange={() => toggleField('steps')}
                    />
                    <Checkbox
                      label="Full Logs"
                      description="May increase file size significantly"
                      checked={exportFields?.logs}
                      onChange={() => toggleField('logs')}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 p-6 border-t border-border">
                <Button
                  variant="outline"
                  onClick={() => setShowExportModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="default"
                  iconName="Download"
                  onClick={handleExport}
                >
                  Export {exportFormat?.toUpperCase()}
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default BulkActions;