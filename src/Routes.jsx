import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NoFound";
import RunHistory from './pages/run-history';
import Login from './pages/login/login';
import Dashboard from './pages/dashboard';
import ExecutionMonitor from './pages/execution-monitor';
import WorkflowBuilder from './pages/workflow-builder';
import StepConfiguration from './pages/steps-configuration';
import Settings from './pages/settings/Index';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/run-history" element={<RunHistory />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/execution-monitor" element={<ExecutionMonitor />} />
        <Route path="/workflow-builder" element={<WorkflowBuilder />} />
        <Route path="/step-configuration" element={<StepConfiguration />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
