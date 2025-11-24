import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const ConfigurationPanel = ({ 
  selectedStep, 
  onStepUpdate, 
  onTestStep, 
  isCollapsed, 
  onToggleCollapse 
}) => {
  const [testResult, setTestResult] = useState(null);
  const [isTesting, setIsTesting] = useState(false);

  const handleTestStep = async () => {
    setIsTesting(true);
    setTestResult(null);

    setTimeout(() => {
      setTestResult({
        success: true,
        duration: 1.2,
        output: {
          status: 200,
          data: {
            message: "Test execution completed successfully",
            timestamp: new Date()?.toISOString(),
            records: 42
          }
        }
      });
      setIsTesting(false);
    }, 2000);
  };

  const renderConfigFields = () => {
    if (!selectedStep) return null;

    const commonFields = (
      <>
        <Input
          label="Step Name"
          type="text"
          value={selectedStep?.name}
          onChange={(e) => onStepUpdate({ ...selectedStep, name: e?.target?.value })}
          placeholder="Enter step name"
          className="mb-4"
        />
        <Input
          label="Description"
          type="text"
          value={selectedStep?.description}
          onChange={(e) => onStepUpdate({ ...selectedStep, description: e?.target?.value })}
          placeholder="Describe what this step does"
          className="mb-4"
        />
      </>
    );

    switch (selectedStep?.id) {
      case 'http-request':
        return (
          <>
            {commonFields}
            <Select
              label="Method"
              options={[
                { value: 'GET', label: 'GET' },
                { value: 'POST', label: 'POST' },
                { value: 'PUT', label: 'PUT' },
                { value: 'DELETE', label: 'DELETE' }
              ]}
              value={selectedStep?.config?.method || 'GET'}
              onChange={(value) => onStepUpdate({ 
                ...selectedStep, 
                config: { ...selectedStep?.config, method: value } 
              })}
              className="mb-4"
            />
            <Input
              label="URL"
              type="url"
              value={selectedStep?.config?.url || ''}
              onChange={(e) => onStepUpdate({ 
                ...selectedStep, 
                config: { ...selectedStep?.config, url: e?.target?.value } 
              })}
              placeholder="https://api.example.com/endpoint"
              className="mb-4"
            />
            <Input
              label="Headers (JSON)"
              type="text"
              value={selectedStep?.config?.headers || ''}
              onChange={(e) => onStepUpdate({ 
                ...selectedStep, 
                config: { ...selectedStep?.config, headers: e?.target?.value } 
              })}
              placeholder='{"Authorization": "Bearer token"}'
              className="mb-4"
            />
          </>
        );

      case 'web-scrape':
        return (
          <>
            {commonFields}
            <Input
              label="Target URL"
              type="url"
              value={selectedStep?.config?.url || ''}
              onChange={(e) => onStepUpdate({ 
                ...selectedStep, 
                config: { ...selectedStep?.config, url: e?.target?.value } 
              })}
              placeholder="https://example.com/page"
              className="mb-4"
            />
            <Input
              label="CSS Selector"
              type="text"
              value={selectedStep?.config?.selector || ''}
              onChange={(e) => onStepUpdate({ 
                ...selectedStep, 
                config: { ...selectedStep?.config, selector: e?.target?.value } 
              })}
              placeholder=".product-title, .price"
              className="mb-4"
            />
            <Checkbox
              label="Extract all matches"
              checked={selectedStep?.config?.extractAll || false}
              onChange={(e) => onStepUpdate({ 
                ...selectedStep, 
                config: { ...selectedStep?.config, extractAll: e?.target?.checked } 
              })}
              className="mb-4"
            />
          </>
        );

      case 'llm-analyze':
        return (
          <>
            {commonFields}
            <Select
              label="Model"
              options={[
                { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' },
                { value: 'gpt-4', label: 'GPT-4' },
                { value: 'llama-2', label: 'Llama 2' },
                { value: 'mistral', label: 'Mistral' }
              ]}
              value={selectedStep?.config?.model || 'gpt-3.5-turbo'}
              onChange={(value) => onStepUpdate({ 
                ...selectedStep, 
                config: { ...selectedStep?.config, model: value } 
              })}
              className="mb-4"
            />
            <Input
              label="Prompt Template"
              type="text"
              value={selectedStep?.config?.prompt || ''}
              onChange={(e) => onStepUpdate({ 
                ...selectedStep, 
                config: { ...selectedStep?.config, prompt: e?.target?.value } 
              })}
              placeholder="Analyze the following data: {{input}}"
              description="Use {{variable}} for dynamic values"
              className="mb-4"
            />
            <Input
              label="Max Tokens"
              type="number"
              value={selectedStep?.config?.maxTokens || 1000}
              onChange={(e) => onStepUpdate({ 
                ...selectedStep, 
                config: { ...selectedStep?.config, maxTokens: parseInt(e?.target?.value) } 
              })}
              className="mb-4"
            />
          </>
        );

      case 'condition':
        return (
          <>
            {commonFields}
            <Input
              label="Condition Expression"
              type="text"
              value={selectedStep?.config?.condition || ''}
              onChange={(e) => onStepUpdate({ 
                ...selectedStep, 
                config: { ...selectedStep?.config, condition: e?.target?.value } 
              })}
              placeholder="{{variable}} > 100"
              description="Use comparison operators: >, <, ==, !=, >=, <="
              className="mb-4"
            />
            <Select
              label="Operator"
              options={[
                { value: '>', label: 'Greater than (>)' },
                { value: '<', label: 'Less than (<)' },
                { value: '==', label: 'Equal to (==)' },
                { value: '!=', label: 'Not equal to (!=)' },
                { value: '>=', label: 'Greater or equal (>=)' },
                { value: '<=', label: 'Less or equal (<=)' }
              ]}
              value={selectedStep?.config?.operator || '>'}
              onChange={(value) => onStepUpdate({ 
                ...selectedStep, 
                config: { ...selectedStep?.config, operator: value } 
              })}
              className="mb-4"
            />
          </>
        );

      case 'email':
        return (
          <>
            {commonFields}
            <Input
              label="To Email"
              type="email"
              value={selectedStep?.config?.to || ''}
              onChange={(e) => onStepUpdate({ 
                ...selectedStep, 
                config: { ...selectedStep?.config, to: e?.target?.value } 
              })}
              placeholder="recipient@example.com"
              className="mb-4"
            />
            <Input
              label="Subject"
              type="text"
              value={selectedStep?.config?.subject || ''}
              onChange={(e) => onStepUpdate({ 
                ...selectedStep, 
                config: { ...selectedStep?.config, subject: e?.target?.value } 
              })}
              placeholder="Workflow notification"
              className="mb-4"
            />
            <Input
              label="Body Template"
              type="text"
              value={selectedStep?.config?.body || ''}
              onChange={(e) => onStepUpdate({ 
                ...selectedStep, 
                config: { ...selectedStep?.config, body: e?.target?.value } 
              })}
              placeholder="Results: {{output}}"
              description="Use {{variable}} for dynamic content"
              className="mb-4"
            />
          </>
        );

      default:
        return commonFields;
    }
  };

  if (isCollapsed) {
    return (
      <div className="w-16 bg-card border-l border-border flex flex-col items-center py-4">
        <button
          onClick={onToggleCollapse}
          className="p-2 rounded-lg hover:bg-muted transition-colors duration-150"
          title="Expand configuration"
        >
          <Icon name="ChevronLeft" size={20} />
        </button>
      </div>
    );
  }

  return (
    <div className="w-96 bg-card border-l border-border flex flex-col">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Configuration</h2>
          <button
            onClick={onToggleCollapse}
            className="p-1.5 rounded-lg hover:bg-muted transition-colors duration-150"
            title="Collapse panel"
          >
            <Icon name="ChevronRight" size={18} />
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {!selectedStep ? (
          <div className="text-center py-12">
            <Icon name="MousePointerClick" size={48} className="mx-auto mb-3 text-muted-foreground opacity-50" />
            <p className="text-sm text-muted-foreground">Select a step to configure</p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg mb-4">
                <div className={`p-2 rounded-md bg-background ${selectedStep?.color}`}>
                  <Icon name={selectedStep?.icon} size={24} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{selectedStep?.name}</h3>
                  <p className="text-xs text-muted-foreground">Step ID: {selectedStep?.instanceId}</p>
                </div>
              </div>

              {renderConfigFields()}
            </div>

            <div className="space-y-3">
              <Button
                variant="default"
                fullWidth
                onClick={handleTestStep}
                loading={isTesting}
                iconName="Play"
                iconPosition="left"
              >
                Test Step
              </Button>

              {testResult && (
                <div className={`p-4 rounded-lg border ${
                  testResult?.success 
                    ? 'bg-success/10 border-success/20' :'bg-destructive/10 border-destructive/20'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Icon 
                      name={testResult?.success ? 'CheckCircle2' : 'XCircle'} 
                      size={18}
                      className={testResult?.success ? 'text-success' : 'text-destructive'}
                    />
                    <span className={`text-sm font-medium ${
                      testResult?.success ? 'text-success' : 'text-destructive'
                    }`}>
                      {testResult?.success ? 'Test Passed' : 'Test Failed'}
                    </span>
                    <span className="text-xs text-muted-foreground ml-auto">
                      {testResult?.duration}s
                    </span>
                  </div>
                  <div className="bg-background rounded p-3 mt-2">
                    <pre className="text-xs text-foreground overflow-x-auto">
                      {JSON.stringify(testResult?.output, null, 2)}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
      {selectedStep && (
        <div className="p-4 border-t border-border bg-muted/30">
          <div className="flex items-start gap-2 text-xs text-muted-foreground">
            <Icon name="Info" size={14} className="mt-0.5 flex-shrink-0" />
            <p>Changes are saved automatically. Test your configuration before running the workflow.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfigurationPanel;