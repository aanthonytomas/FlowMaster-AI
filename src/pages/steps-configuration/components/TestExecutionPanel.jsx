import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const TestExecutionPanel = ({ stepType, config, onTest }) => {
  const [testInput, setTestInput] = useState('');
  const [testResult, setTestResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleTest = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockResults = {
        http: {
          status: 200,
          headers: {
            'content-type': 'application/json',
            'x-response-time': '145ms'
          },
          body: {
            success: true,
            data: {
              id: 12345,
              name: 'Sample Response',
              items: ['item1', 'item2', 'item3']
            }
          }
        },
        scrape: {
          matches: 5,
          data: [
            'First extracted text content from the page',
            'Second extracted text content from the page',
            'Third extracted text content from the page'
          ]
        },
        parse: {
          extracted: {
            field1: 'AB12345',
            field2: 'CD67890',
            count: 2
          }
        },
        llm: {
          response: 'Based on the provided data, here are the key insights:\n\n1. The dataset shows a clear upward trend in user engagement\n2. Peak activity occurs during weekday afternoons\n3. Mobile users represent 65% of total traffic\n\nRecommendations:\n- Optimize mobile experience\n- Schedule content for peak hours\n- Focus on engagement metrics',
          tokens_used: 187,
          processing_time: '2.3s'
        },
        database: {
          rows_affected: 3,
          results: [
            { id: 1, name: 'John Doe', status: 'active' },
            { id: 2, name: 'Jane Smith', status: 'active' },
            { id: 3, name: 'Bob Johnson', status: 'pending' }
          ]
        },
        email: {
          status: 'sent',
          message_id: 'msg_abc123xyz',
          recipient: config?.recipient || 'user@example.com',
          timestamp: new Date()?.toISOString()
        },
        condition: {
          condition_met: true,
          next_step: config?.trueStep || 'step_5',
          evaluated_value: testInput || 'sample_value'
        },
        loop: {
          iterations: 3,
          results: [
            { iteration: 1, output: 'Processed item 1' },
            { iteration: 2, output: 'Processed item 2' },
            { iteration: 3, output: 'Processed item 3' }
          ]
        }
      };

      setTestResult(mockResults?.[stepType] || { message: 'Test completed successfully' });
      onTest?.(mockResults?.[stepType]);
    } catch (err) {
      setError('Test execution failed. Please check your configuration.');
    } finally {
      setIsLoading(false);
    }
  };

  const getPlaceholder = () => {
    const placeholders = {
      http: '{\n  "param1": "value1",\n  "param2": "value2"\n}',
      scrape: 'https://example.com/page-to-test',
      parse: 'Sample text to parse: AB12345 and CD67890',
      llm: 'Sample input data for LLM processing',
      database: '{\n  "status": "active"\n}',
      email: 'Test email content',
      condition: 'test_value',
      loop: '["item1", "item2", "item3"]'
    };
    return placeholders?.[stepType] || 'Enter test input data';
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden h-full flex flex-col">
      <div className="px-6 py-4 border-b border-border bg-muted/30">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Icon name="Play" size={20} />
          Test Execution
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          Test your step configuration with sample data
        </p>
      </div>
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Test Input
          </label>
          <textarea
            className="w-full min-h-[120px] px-3 py-2 bg-background border border-border rounded-md text-sm text-foreground font-mono focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            placeholder={getPlaceholder()}
            value={testInput}
            onChange={(e) => setTestInput(e?.target?.value)}
          />
        </div>

        <Button
          variant="default"
          fullWidth
          loading={isLoading}
          iconName="Play"
          iconPosition="left"
          onClick={handleTest}
        >
          Run Test
        </Button>

        {error && (
          <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
            <div className="flex items-start gap-3">
              <Icon name="AlertCircle" size={20} color="var(--color-destructive)" />
              <div className="flex-1">
                <p className="text-sm font-medium text-destructive">Test Failed</p>
                <p className="text-sm text-destructive/80 mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        {testResult && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-foreground">Test Results</h4>
              <div className="flex items-center gap-2 px-2 py-1 bg-success/10 text-success rounded text-xs font-medium">
                <Icon name="CheckCircle" size={14} />
                Success
              </div>
            </div>
            
            <div className="bg-background border border-border rounded-lg overflow-hidden">
              <div className="px-3 py-2 bg-muted/50 border-b border-border flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">JSON Output</span>
                <button
                  onClick={() => navigator.clipboard?.writeText(JSON.stringify(testResult, null, 2))}
                  className="text-xs text-primary hover:text-primary/80 flex items-center gap-1"
                >
                  <Icon name="Copy" size={12} />
                  Copy
                </button>
              </div>
              <pre className="p-4 text-xs text-foreground font-mono overflow-x-auto max-h-[400px] overflow-y-auto">
                {JSON.stringify(testResult, null, 2)}
              </pre>
            </div>
          </div>
        )}

        {!testResult && !error && !isLoading && (
          <div className="text-center py-12 text-muted-foreground">
            <Icon name="Zap" size={48} className="mx-auto mb-3 opacity-30" />
            <p className="text-sm">Run a test to see results</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestExecutionPanel;