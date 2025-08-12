import React, { useState, useEffect } from 'react';
import { useUserMonitoring } from '../hooks/useUserMonitoring';

function UserMonitoringDashboard() {
  const [analyticsData, setAnalyticsData] = useState([]);
  const [sessionSummary, setSessionSummary] = useState(null);
  const monitoring = useUserMonitoring();

  useEffect(() => {
    // Load data from localStorage
    const loadAnalyticsData = () => {
      try {
        const data = JSON.parse(localStorage.getItem('teachmeter_analytics') || '[]');
        setAnalyticsData(data);
        setSessionSummary(monitoring.getSessionSummary());
      } catch (error) {
        console.error('Failed to load analytics data:', error);
      }
    };

    loadAnalyticsData();
    
    // Refresh data every 5 seconds
    const interval = setInterval(loadAnalyticsData, 5000);
    return () => clearInterval(interval);
  }, [monitoring]);

  const getEventCounts = () => {
    const counts = {};
    analyticsData.forEach(event => {
      counts[event.eventType] = (counts[event.eventType] || 0) + 1;
    });
    return counts;
  };

  const getWizardFunnel = () => {
    const funnelSteps = [
      'getting_started_page_loaded',
      'wizard_year_selection', 
      'wizard_user_type_selection',
      'auth_form_loaded',
      'wizard_completed'
    ];
    
    const stepCounts = {};
    funnelSteps.forEach(step => {
      stepCounts[step] = analyticsData.filter(event => 
        event.eventType === 'wizard_step_entered' && event.data.step === step
      ).length;
    });
    
    return stepCounts;
  };

  const clearData = () => {
    localStorage.removeItem('teachmeter_analytics');
    setAnalyticsData([]);
  };

  const exportData = () => {
    const dataStr = JSON.stringify(monitoring.exportData(), null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `teachmeter_analytics_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  const eventCounts = getEventCounts();
  const funnelData = getWizardFunnel();

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      width: '350px',
      maxHeight: '600px',
      background: 'rgba(26,26,46,0.95)',
      border: '2px solid #A855F7',
      borderRadius: '12px',
      padding: '20px',
      color: '#E8D5FF',
      fontSize: '0.9rem',
      zIndex: 1000,
      overflow: 'auto'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <h3 style={{ margin: 0, color: '#D946EF' }}>📊 User Analytics</h3>
        <div style={{ display: 'flex', gap: '5px' }}>
          <button 
            onClick={exportData}
            style={{
              background: '#A855F7',
              color: 'white',
              border: 'none',
              padding: '5px 10px',
              borderRadius: '5px',
              fontSize: '0.8rem',
              cursor: 'pointer'
            }}
          >
            Export
          </button>
          <button 
            onClick={clearData}
            style={{
              background: '#EF4444',
              color: 'white',
              border: 'none',
              padding: '5px 10px',
              borderRadius: '5px',
              fontSize: '0.8rem',
              cursor: 'pointer'
            }}
          >
            Clear
          </button>
        </div>
      </div>

      {sessionSummary && (
        <div style={{ marginBottom: '15px', padding: '10px', background: 'rgba(168,85,247,0.1)', borderRadius: '8px' }}>
          <h4 style={{ margin: '0 0 8px 0', color: '#FDE047' }}>Current Session</h4>
          <div>Duration: {Math.floor(sessionSummary.duration / 1000)}s</div>
          <div>Events: {sessionSummary.eventCount}</div>
          <div>Steps: {sessionSummary.uniqueSteps}</div>
          <div>Status: {sessionSummary.completed ? '✅ Completed' : sessionSummary.abandoned ? '❌ Abandoned' : '🔄 In Progress'}</div>
        </div>
      )}

      <div style={{ marginBottom: '15px' }}>
        <h4 style={{ margin: '0 0 8px 0', color: '#FDE047' }}>Event Counts</h4>
        {Object.entries(eventCounts).map(([event, count]) => (
          <div key={event} style={{ display: 'flex', justifyContent: 'space-between', padding: '2px 0' }}>
            <span>{event.replace(/_/g, ' ')}</span>
            <span style={{ color: '#D946EF', fontWeight: 'bold' }}>{count}</span>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: '15px' }}>
        <h4 style={{ margin: '0 0 8px 0', color: '#FDE047' }}>Wizard Funnel</h4>
        {Object.entries(funnelData).map(([step, count]) => (
          <div key={step} style={{ display: 'flex', justifyContent: 'space-between', padding: '2px 0' }}>
            <span>{step.replace(/_/g, ' ')}</span>
            <span style={{ color: '#D946EF', fontWeight: 'bold' }}>{count}</span>
          </div>
        ))}
      </div>

      <div>
        <h4 style={{ margin: '0 0 8px 0', color: '#FDE047' }}>Recent Events</h4>
        <div style={{ maxHeight: '200px', overflow: 'auto' }}>
          {analyticsData.slice(-10).reverse().map((event, index) => (
            <div key={index} style={{ 
              padding: '8px', 
              margin: '4px 0', 
              background: 'rgba(168,85,247,0.05)', 
              borderRadius: '6px',
              borderLeft: '3px solid #A855F7'
            }}>
              <div style={{ fontWeight: 'bold', color: '#D946EF' }}>
                {event.eventType.replace(/_/g, ' ')}
              </div>
              <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>
                {new Date(event.timestamp).toLocaleTimeString()}
              </div>
              {event.data.step && (
                <div style={{ fontSize: '0.8rem', color: '#FDE047' }}>
                  Step: {event.data.step}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserMonitoringDashboard;
