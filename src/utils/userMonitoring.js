// User Monitoring System for TeachMeter
class UserMonitoringService {
  constructor() {
    this.sessionId = this.generateSessionId();
    this.events = [];
    this.startTime = Date.now();
    this.isEnabled = true;
  }

  generateSessionId() {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  // Track wizard events
  trackWizardEvent(eventType, data = {}) {
    if (!this.isEnabled) return;

    const event = {
      sessionId: this.sessionId,
      timestamp: Date.now(),
      eventType,
      data: {
        ...data,
        userAgent: navigator.userAgent,
        url: window.location.href,
        timeOnPage: Date.now() - this.startTime
      }
    };

    this.events.push(event);
    this.logEvent(event);
    
    // Send to analytics service (implement based on your backend)
    this.sendToAnalytics(event);
  }

  // Track wizard step progression
  trackWizardStep(stepName, stepData = {}) {
    this.trackWizardEvent('wizard_step_entered', {
      step: stepName,
      ...stepData
    });
  }

  // Track form interactions
  trackFormInteraction(action, fieldName, value = null) {
    this.trackWizardEvent('form_interaction', {
      action, // 'focus', 'blur', 'change', 'submit', 'error'
      fieldName,
      value: value ? this.sanitizeValue(value) : null
    });
  }

  // Track user selections
  trackUserSelection(selectionType, value) {
    this.trackWizardEvent('user_selection', {
      selectionType, // 'year', 'userType', 'major', etc.
      value
    });
  }

  // Track wizard completion
  trackWizardCompletion(completionData) {
    const completionTime = Date.now() - this.startTime;
    this.trackWizardEvent('wizard_completed', {
      ...completionData,
      completionTimeMs: completionTime,
      completionTimeReadable: this.formatDuration(completionTime),
      totalSteps: this.getUniqueStepsCount()
    });
  }

  // Track wizard abandonment
  trackWizardAbandonment(step, reason = 'unknown') {
    const abandonmentTime = Date.now() - this.startTime;
    this.trackWizardEvent('wizard_abandoned', {
      step,
      reason,
      abandonmentTimeMs: abandonmentTime,
      stepsCompleted: this.getUniqueStepsCount(),
      lastInteractionTime: this.getLastInteractionTime()
    });
  }

  // Track errors
  trackError(errorType, errorMessage, additionalData = {}) {
    this.trackWizardEvent('error_occurred', {
      errorType, // 'validation', 'network', 'system', etc.
      errorMessage,
      ...additionalData
    });
  }

  // Track performance metrics
  trackPerformance(metricName, value, unit = 'ms') {
    this.trackWizardEvent('performance_metric', {
      metricName,
      value,
      unit
    });
  }

  // Track A/B test variations
  trackABTest(testName, variation) {
    this.trackWizardEvent('ab_test', {
      testName,
      variation
    });
  }

  // Helper methods
  sanitizeValue(value) {
    // Remove sensitive information
    if (typeof value === 'string') {
      // Don't log passwords or sensitive data
      if (value.includes('password') || value.includes('@')) {
        return '[SANITIZED]';
      }
    }
    return value;
  }

  formatDuration(ms) {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  }

  getUniqueStepsCount() {
    const steps = this.events
      .filter(event => event.eventType === 'wizard_step_entered')
      .map(event => event.data.step);
    return new Set(steps).size;
  }

  getLastInteractionTime() {
    const interactions = this.events.filter(event => 
      ['form_interaction', 'user_selection', 'wizard_step_entered'].includes(event.eventType)
    );
    return interactions.length > 0 ? interactions[interactions.length - 1].timestamp : null;
  }

  logEvent(event) {
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 User Monitoring:', event);
    }
  }

  // Send data to analytics service
  sendToAnalytics(event) {
    // Implementation depends on your analytics service
    // Examples: Google Analytics, Mixpanel, Amplitude, custom backend
    
    // For now, store in localStorage for demo purposes
    try {
      const existingData = JSON.parse(localStorage.getItem('teachmeter_analytics') || '[]');
      existingData.push(event);
      
      // Keep only last 100 events to avoid storage issues
      if (existingData.length > 100) {
        existingData.splice(0, existingData.length - 100);
      }
      
      localStorage.setItem('teachmeter_analytics', JSON.stringify(existingData));
    } catch (error) {
      console.error('Failed to store analytics data:', error);
    }

    // Example: Send to Google Analytics
    // if (window.gtag) {
    //   window.gtag('event', event.eventType, {
    //     custom_parameter: event.data,
    //     session_id: this.sessionId
    //   });
    // }

    // Example: Send to custom backend
    // fetch('/api/analytics', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(event)
    // }).catch(error => console.error('Analytics error:', error));
  }

  // Get session summary
  getSessionSummary() {
    const summary = {
      sessionId: this.sessionId,
      startTime: this.startTime,
      duration: Date.now() - this.startTime,
      eventCount: this.events.length,
      uniqueSteps: this.getUniqueStepsCount(),
      errors: this.events.filter(e => e.eventType === 'error_occurred').length,
      completed: this.events.some(e => e.eventType === 'wizard_completed'),
      abandoned: this.events.some(e => e.eventType === 'wizard_abandoned')
    };

    return summary;
  }

  // Export data for analysis
  exportData() {
    return {
      sessionSummary: this.getSessionSummary(),
      events: this.events
    };
  }

  // Clean up and finalize session
  endSession() {
    const summary = this.getSessionSummary();
    this.trackWizardEvent('session_ended', summary);
    
    if (process.env.NODE_ENV === 'development') {
      console.log('📈 Session Summary:', summary);
    }
  }
}

// Create singleton instance
const userMonitoring = new UserMonitoringService();

// Auto-track page unload
window.addEventListener('beforeunload', () => {
  userMonitoring.endSession();
});

export default userMonitoring;
