import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WorkflowCanvas = ({ 
  steps, 
  connections, 
  selectedStepId, 
  onStepSelect, 
  onStepDelete,
  onStepDrop,
  onConnectionCreate,
  onConnectionDelete,
  draggedStep 
}) => {
  const canvasRef = useRef(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [isDragOver, setIsDragOver] = useState(false);
  const [connectingFrom, setConnectingFrom] = useState(null);
  const [connectionPreview, setConnectionPreview] = useState(null);

  const handleWheel = (e) => {
    if (e?.ctrlKey || e?.metaKey) {
      e?.preventDefault();
      const delta = e?.deltaY > 0 ? 0.9 : 1.1;
      setZoom(prev => Math.min(Math.max(prev * delta, 0.5), 2));
    }
  };

  const handleMouseDown = (e) => {
    if (e?.button === 1 || (e?.button === 0 && e?.target === canvasRef?.current)) {
      setIsPanning(true);
      setPanStart({ x: e?.clientX - pan?.x, y: e?.clientY - pan?.y });
    }
  };

  const handleMouseMove = (e) => {
    if (isPanning) {
      setPan({
        x: e?.clientX - panStart?.x,
        y: e?.clientY - panStart?.y
      });
    }

    if (connectingFrom) {
      const rect = canvasRef?.current?.getBoundingClientRect();
      setConnectionPreview({
        x: (e?.clientX - rect?.left - pan?.x) / zoom,
        y: (e?.clientY - rect?.top - pan?.y) / zoom
      });
    }
  };

  const handleMouseUp = () => {
    setIsPanning(false);
    if (connectingFrom) {
      setConnectingFrom(null);
      setConnectionPreview(null);
    }
  };

  const handleDragOver = (e) => {
    e?.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    setIsDragOver(false);

    if (draggedStep) {
      const rect = canvasRef?.current?.getBoundingClientRect();
      const x = (e?.clientX - rect?.left - pan?.x) / zoom;
      const y = (e?.clientY - rect?.top - pan?.y) / zoom;
      onStepDrop(draggedStep, { x, y });
    }
  };

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.1, 2));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.1, 0.5));
  const handleZoomReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const handleConnectionStart = (stepId) => {
    setConnectingFrom(stepId);
  };

  const handleConnectionEnd = (targetStepId) => {
    if (connectingFrom && connectingFrom !== targetStepId) {
      onConnectionCreate(connectingFrom, targetStepId);
    }
    setConnectingFrom(null);
    setConnectionPreview(null);
  };

  const getStepColor = (step) => {
    const colors = {
      'text-blue-500': 'border-blue-500 bg-blue-500/10',
      'text-green-500': 'border-green-500 bg-green-500/10',
      'text-purple-500': 'border-purple-500 bg-purple-500/10',
      'text-yellow-500': 'border-yellow-500 bg-yellow-500/10',
      'text-orange-500': 'border-orange-500 bg-orange-500/10',
      'text-red-500': 'border-red-500 bg-red-500/10'
    };
    return colors?.[step?.color] || 'border-primary bg-primary/10';
  };

  const renderConnection = (connection) => {
    const fromStep = steps?.find(s => s?.instanceId === connection?.from);
    const toStep = steps?.find(s => s?.instanceId === connection?.to);

    if (!fromStep || !toStep) return null;

    const x1 = fromStep?.position?.x + 120;
    const y1 = fromStep?.position?.y + 40;
    const x2 = toStep?.position?.x;
    const y2 = toStep?.position?.y + 40;

    const midX = (x1 + x2) / 2;

    return (
      <g key={connection?.id}>
        <path
          d={`M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`}
          stroke="var(--color-border)"
          strokeWidth="2"
          fill="none"
          className="hover:stroke-primary transition-colors duration-150"
        />
        <circle
          cx={(x1 + x2) / 2}
          cy={(y1 + y2) / 2}
          r="8"
          fill="var(--color-background)"
          stroke="var(--color-border)"
          strokeWidth="2"
          className="cursor-pointer hover:fill-destructive hover:stroke-destructive transition-colors duration-150"
          onClick={() => onConnectionDelete(connection?.id)}
        />
        <Icon 
          name="X" 
          size={10}
          className="pointer-events-none"
          style={{
            position: 'absolute',
            left: `${(x1 + x2) / 2 - 5}px`,
            top: `${(y1 + y2) / 2 - 5}px`
          }}
        />
      </g>
    );
  };

  return (
    <div className="flex-1 relative bg-background overflow-hidden">
      <div className="absolute top-4 right-4 z-10 flex items-center gap-2 bg-card border border-border rounded-lg p-2 shadow-lg">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleZoomOut}
          iconName="ZoomOut"
          iconSize={18}
        />
        <span className="text-sm font-medium text-foreground min-w-[60px] text-center">
          {Math.round(zoom * 100)}%
        </span>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleZoomIn}
          iconName="ZoomIn"
          iconSize={18}
        />
        <div className="w-px h-6 bg-border mx-1" />
        <Button
          variant="ghost"
          size="icon"
          onClick={handleZoomReset}
          iconName="Maximize2"
          iconSize={18}
        />
      </div>
      <div
        ref={canvasRef}
        className={`w-full h-full cursor-grab active:cursor-grabbing ${isDragOver ? 'bg-primary/5' : ''}`}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div
          style={{
            transform: `translate(${pan?.x}px, ${pan?.y}px) scale(${zoom})`,
            transformOrigin: '0 0',
            width: '100%',
            height: '100%',
            position: 'relative'
          }}
        >
          <svg
            className="absolute inset-0 pointer-events-none"
            style={{ width: '100%', height: '100%' }}
          >
            {connections?.map(renderConnection)}
            {connectingFrom && connectionPreview && (
              <path
                d={`M ${steps?.find(s => s?.instanceId === connectingFrom)?.position?.x + 120} ${steps?.find(s => s?.instanceId === connectingFrom)?.position?.y + 40} L ${connectionPreview?.x} ${connectionPreview?.y}`}
                stroke="var(--color-primary)"
                strokeWidth="2"
                strokeDasharray="5,5"
                fill="none"
              />
            )}
          </svg>

          {steps?.length === 0 && !isDragOver && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <Icon name="Workflow" size={64} className="mx-auto mb-4 text-muted-foreground opacity-30" />
                <p className="text-lg font-medium text-muted-foreground mb-2">Start Building Your Workflow</p>
                <p className="text-sm text-muted-foreground">Drag steps from the library to begin</p>
              </div>
            </div>
          )}

          {steps?.map(step => (
            <div
              key={step?.instanceId}
              className={`absolute w-60 bg-card border-2 rounded-lg shadow-lg transition-all duration-150 cursor-pointer ${
                selectedStepId === step?.instanceId
                  ? 'border-primary shadow-xl'
                  : getStepColor(step)
              } ${connectingFrom === step?.instanceId ? 'ring-2 ring-primary' : ''}`}
              style={{
                left: `${step?.position?.x}px`,
                top: `${step?.position?.y}px`
              }}
              onClick={() => onStepSelect(step?.instanceId)}
            >
              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3 flex-1">
                    <div className={`p-2 rounded-md bg-background ${step?.color}`}>
                      <Icon name={step?.icon} size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-foreground truncate">{step?.name}</h3>
                      <p className="text-xs text-muted-foreground truncate">{step?.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e?.stopPropagation();
                      onStepDelete(step?.instanceId);
                    }}
                    className="p-1 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors duration-150"
                  >
                    <Icon name="Trash2" size={14} />
                  </button>
                </div>

                {step?.status && (
                  <div className={`flex items-center gap-2 px-2 py-1 rounded text-xs ${
                    step?.status === 'success' ? 'bg-success/10 text-success' :
                    step?.status === 'error' ? 'bg-destructive/10 text-destructive' :
                    step?.status === 'running'? 'bg-accent/10 text-accent' : 'bg-muted text-muted-foreground'
                  }`}>
                    <Icon 
                      name={
                        step?.status === 'success' ? 'CheckCircle2' :
                        step?.status === 'error' ? 'XCircle' :
                        step?.status === 'running'? 'Loader2' : 'Circle'
                      } 
                      size={12}
                      className={step?.status === 'running' ? 'animate-spin' : ''}
                    />
                    <span className="capitalize">{step?.status}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between px-4 py-2 border-t border-border bg-muted/30">
                <button
                  onClick={(e) => {
                    e?.stopPropagation();
                    handleConnectionStart(step?.instanceId);
                  }}
                  className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors duration-150"
                >
                  <Icon name="Plus" size={12} />
                  <span>Connect</span>
                </button>
                <button
                  onClick={(e) => {
                    e?.stopPropagation();
                    onStepSelect(step?.instanceId);
                  }}
                  className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors duration-150"
                >
                  <Icon name="Settings" size={12} />
                  <span>Configure</span>
                </button>
              </div>

              {connectingFrom && connectingFrom !== step?.instanceId && (
                <div
                  className="absolute inset-0 bg-primary/10 rounded-lg border-2 border-primary border-dashed flex items-center justify-center"
                  onClick={(e) => {
                    e?.stopPropagation();
                    handleConnectionEnd(step?.instanceId);
                  }}
                >
                  <span className="text-sm font-medium text-primary">Click to connect</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkflowCanvas;