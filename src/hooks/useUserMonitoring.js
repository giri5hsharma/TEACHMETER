import { useEffect, useCallback } from 'react';
import userMonitoring from '../utils/userMonitoring';

// Custom hook for user monitoring in React components
export const useUserMonitoring = () => {
  
  // Track component mount
  useEffect(() => {
    userMonitoring.trackWizardEvent('component_mounted', {
      component: 'UserMonitoringHook'
    });
    
    return () => {
      userMonitoring.trackWizardEvent('component_unmounted', {
        component: 'UserMonitoringHook'
      });
    };
  }, []);

  // Wizard tracking functions
  const trackStep = useCallback((stepName, stepData = {}) => {
    userMonitoring.trackWizardStep(stepName, stepData);
  }, []);

  const trackSelection = useCallback((selectionType, value) => {
    userMonitoring.trackUserSelection(selectionType, value);
  }, []);

  const trackFormField = useCallback((action, fieldName, value = null) => {
    userMonitoring.trackFormInteraction(action, fieldName, value);
  }, []);

  const trackError = useCallback((errorType, errorMessage, additionalData = {}) => {
    userMonitoring.trackError(errorType, errorMessage, additionalData);
  }, []);

  const trackCompletion = useCallback((completionData) => {
    userMonitoring.trackWizardCompletion(completionData);
  }, []);

  const trackAbandonment = useCallback((step, reason = 'unknown') => {
    userMonitoring.trackWizardAbandonment(step, reason);
  }, []);

  const trackCustomEvent = useCallback((eventType, data = {}) => {
    userMonitoring.trackWizardEvent(eventType, data);
  }, []);

  const trackPerformance = useCallback((metricName, value, unit = 'ms') => {
    userMonitoring.trackPerformance(metricName, value, unit);
  }, []);

  return {
    trackStep,
    trackSelection,
    trackFormField,
    trackError,
    trackCompletion,
    trackAbandonment,
    trackCustomEvent,
    trackPerformance,
    getSessionSummary: () => userMonitoring.getSessionSummary(),
    exportData: () => userMonitoring.exportData()
  };
};

// Higher-order component for automatic tracking
export const withUserMonitoring = (WrappedComponent, componentName) => {
  return function MonitoredComponent(props) {
    const monitoring = useUserMonitoring();
    
    useEffect(() => {
      monitoring.trackCustomEvent('component_viewed', {
        componentName
      });
    }, [monitoring]);

    return <WrappedComponent {...props} monitoring={monitoring} />;
  };
};

export default useUserMonitoring;
