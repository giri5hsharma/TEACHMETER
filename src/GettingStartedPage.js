import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function GettingStartedPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showWizard, setShowWizard] = useState(false);
  const [showFirstYearMessage, setShowFirstYearMessage] = useState(false);
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [isFirstYear, setIsFirstYear] = useState(false);
  const [authType, setAuthType] = useState(null); // 'new' or 'returning'
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(120deg, #1A1A2E 0%, #2D1B69 100%)', display: 'flex', flexDirection: 'column' }}>
      {/* Navbar - Always visible */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        background: isScrolled ? 'rgba(42,32,78,0.98)' : 'transparent',
        boxShadow: isScrolled ? '0 2px 12px #A855F744' : 'none',
        backdropFilter: isScrolled ? 'blur(10px)' : 'none',
        zIndex: 100,
        padding: '1.1rem 1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: '#E8D5FF',
        fontWeight: 500,
        fontSize: '1rem',
        letterSpacing: '0.01em',
        boxSizing: 'border-box',
        transition: 'all 0.3s ease',
      }}>
          {/* Left Section */}
          <div 
            style={{
              cursor: 'pointer',
              fontWeight: 700,
              fontSize: '1.1rem',
              background: 'linear-gradient(90deg, #A855F7 0%, #D946EF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              transition: 'all 0.3s ease',
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
            }}
            onClick={() => navigate('/')}
            onMouseEnter={(e) => {
              e.target.style.background = 'linear-gradient(90deg, #D946EF 0%, #FDE047 100%)';
              e.target.style.WebkitBackgroundClip = 'text';
              e.target.style.WebkitTextFillColor = 'transparent';
              e.target.style.transform = 'translateY(-3px) scale(1.05)';
              e.target.style.boxShadow = '0 8px 25px rgba(168,85,247,0.4), 0 4px 12px rgba(217,70,239,0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'linear-gradient(90deg, #A855F7 0%, #D946EF 100%)';
              e.target.style.WebkitBackgroundClip = 'text';
              e.target.style.WebkitTextFillColor = 'transparent';
              e.target.style.transform = 'translateY(0) scale(1)';
              e.target.style.boxShadow = 'none';
            }}
          >
            ← Back to Home
          </div>
          
          {/* Right Section */}
          <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center', flexWrap: 'nowrap', overflow: 'hidden' }}>
            {['Best Teachers', 'Look Out', 'Contact', 'About'].map((item, index) => (
              <div
                key={index}
                style={{
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  padding: '0.5rem 0.6rem',
                  borderRadius: '0.5rem',
                  color: '#E8D5FF',
                  fontSize: '0.9rem',
                  whiteSpace: 'nowrap',
                  minWidth: 'fit-content',
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(168,85,247,0.2)';
                  e.target.style.color = '#D946EF';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.color = '#E8D5FF';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </nav>
      
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3.5rem 1.2rem 0 1.2rem' }}>
        <h1 style={{
          fontSize: '3.2rem',
          fontWeight: 900,
          background: 'linear-gradient(90deg, #FDE047 0%, #D946EF 40%, #A855F7 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textAlign: 'center',
          marginBottom: '1.2rem',
          textShadow: '0 0 18px #A855F755',
        }}>
          Welcome to TeachMeter
        </h1>
        
        <p style={{ color: '#E8D5FF', fontSize: '1.25rem', textAlign: 'center', maxWidth: 600, marginBottom: '2.5rem', fontWeight: 500 }}>
          Start exploring professor reviews, ratings, and insights from your fellow students. Find the perfect match for your academic journey.
        </p>

        {/* Main Action Widgets */}
        {!showWizard && !showFirstYearMessage && !showAuthForm && (
          <div style={{
            display: 'flex',
            gap: '4rem',
            marginBottom: '3rem',
            width: '100%',
            maxWidth: 1000,
            justifyContent: 'center',
            alignItems: 'stretch',
            flexWrap: 'nowrap',
          }}>
            {/* Looking for Reviews Widget */}
            <ActionWidget 
              icon={
                <svg width="60" height="60" fill="none" stroke="#E8D5FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="M21 21l-4.35-4.35"/>
                  <circle cx="11" cy="11" r="3"/>
                </svg>
              }
              title="Looking for Teacher Reviews?"
              text="Browse honest reviews and ratings from students who've taken classes with professors in your department."
              buttonText="Browse Reviews"
              onClick={() => {}}
              disabled={false}
            />
            
            {/* Post Review Widget */}
            <ActionWidget 
              icon={
                <svg width="60" height="60" fill="none" stroke="#E8D5FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14,2 14,8 20,8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                  <polyline points="10,9 9,9 8,9"/>
                </svg>
              }
              title="Looking to Post a Teacher Review?"
              text="Share your experience and help fellow students make informed decisions about their course selections."
              buttonText="Post Review"
              onClick={() => {
                setShowWizard(true);
              }}
              disabled={isFirstYear}
            />
          </div>
        )}

        {/* First Year Message */}
        {showFirstYearMessage && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '3rem',
            width: '100%',
          }}>
            <FirstYearMessageWidget 
              onContinue={() => {
                setShowFirstYearMessage(false);
                setIsFirstYear(true);
              }}
              onBack={() => {
                setShowFirstYearMessage(false);
                setShowWizard(true);
              }}
            />
          </div>
        )}

        {/* Setup Wizard */}
        {showWizard && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '3rem',
            width: '100%',
          }}>
            <WizardWidget 
              onFirstYear={() => {
                setShowWizard(false);
                setShowFirstYearMessage(true);
              }}
              onOlderYear={(userType) => {
                setShowWizard(false);
                setAuthType(userType);
                setShowAuthForm(true);
              }}
              onCancel={() => {
                setShowWizard(false);
              }}
            />
          </div>
        )}

        {/* Authentication Form */}
        {showAuthForm && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '3rem',
            width: '100%',
          }}>
            <AuthFormWidget 
              userType={authType}
              onBack={() => {
                setShowAuthForm(false);
                setShowWizard(true);
                setAuthType(null);
              }}
              onCancel={() => {
                setShowAuthForm(false);
                setAuthType(null);
              }}
              onComplete={(userData) => {
                setShowAuthForm(false);
                // Handle successful authentication
                console.log('User authenticated:', userData);
              }}
            />
          </div>
        )}
      </main>
      
      <footer style={{ marginTop: 'auto', padding: '2.5rem 0 1.2rem', textAlign: 'center', color: '#D946EF', fontSize: '1rem', letterSpacing: '0.01em' }}>
        &copy; {new Date().getFullYear()} TeachMeter
      </footer>
    </div>
  );
}

// ActionWidget component similar to FeatureWidget but for main actions
function ActionWidget({ icon, title, text, buttonText, onClick, disabled }) {
  const [hovered, setHovered] = useState(false);
  
  return (
    <div
      style={{
        background: disabled 
          ? 'rgba(42,32,78,0.5)' 
          : hovered 
            ? 'linear-gradient(90deg, rgba(168,85,247,0.25) 0%, rgba(217,70,239,0.25) 100%)'
            : 'rgba(42,32,78,0.92)',
        borderRadius: '1.1rem',
        boxShadow: disabled 
          ? '0 2px 8px rgba(168,85,247,0.05)'
          : hovered
            ? '0 6px 20px rgba(168,85,247,0.3), 0 3px 10px rgba(217,70,239,0.25)'
            : '0 2px 8px rgba(168,85,247,0.10)',
        padding: '2.8rem 2.5rem',
        minWidth: 380,
        maxWidth: 450,
        flex: '1 1 380px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'all 0.3s ease',
        transform: disabled 
          ? 'none' 
          : hovered 
            ? 'translateY(-2px) scale(1.03)' 
            : 'translateY(0) scale(1)',
        border: disabled 
          ? '1.5px solid rgba(168,85,247,0.2)' 
          : hovered 
            ? '1.5px solid #D946EF' 
            : '1.5px solid transparent',
        color: disabled ? 'rgba(232,213,255,0.5)' : '#E8D5FF',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '0.2rem',
        overflow: 'visible',
        position: 'relative',
        zIndex: hovered && !disabled ? 10 : 1,
        opacity: disabled ? 0.6 : 1,
      }}
      onMouseEnter={() => !disabled && setHovered(true)}
      onMouseLeave={() => !disabled && setHovered(false)}
    >
      <div style={{ marginBottom: 22, opacity: disabled ? 0.5 : 1 }}>{icon}</div>
      <div style={{ fontWeight: 700, fontSize: '1.35rem', color: disabled ? 'rgba(232,213,255,0.5)' : '#E8D5FF', marginBottom: 14, textAlign: 'center' }}>{title}</div>
      <div style={{ fontSize: '1.1rem', color: disabled ? 'rgba(232,213,255,0.4)' : '#E8D5FF', opacity: disabled ? 0.6 : 0.92, marginBottom: 24, textAlign: 'center', lineHeight: 1.5 }}>{text}</div>
      {disabled && (
        <div style={{ fontSize: '0.9rem', color: '#D946EF', marginBottom: 16, textAlign: 'center', fontStyle: 'italic' }}>
          Available for 2nd year+ students
        </div>
      )}
      <button 
        style={{
          background: disabled 
            ? 'rgba(168,85,247,0.3)' 
            : 'linear-gradient(90deg, #A855F7 0%, #D946EF 100%)',
          color: disabled ? 'rgba(26,26,46,0.7)' : '#1A1A2E',
          padding: '0.8rem 1.8rem',
          borderRadius: '0.6rem',
          fontWeight: 600,
          fontSize: '1rem',
          border: 'none',
          cursor: disabled ? 'not-allowed' : 'pointer',
          transition: 'all 0.3s ease',
          marginTop: 'auto',
          opacity: disabled ? 0.7 : 1,
        }}
        onMouseEnter={(e) => {
          if (!disabled) {
            e.target.style.transform = 'translateY(-2px) scale(1.05)';
            e.target.style.boxShadow = '0 6px 20px rgba(168,85,247,0.4), 0 3px 10px rgba(217,70,239,0.3)';
            e.target.style.background = 'linear-gradient(90deg, #D946EF 0%, #FDE047 100%)';
          }
        }}
        onMouseLeave={(e) => {
          if (!disabled) {
            e.target.style.transform = 'translateY(0) scale(1)';
            e.target.style.boxShadow = 'none';
            e.target.style.background = 'linear-gradient(90deg, #A855F7 0%, #D946EF 100%)';
          }
        }}
        onClick={disabled ? undefined : onClick}
      >
        {buttonText}
      </button>
    </div>
  );
}

// WizardWidget for the setup wizard
function WizardWidget({ onFirstYear, onOlderYear, onCancel }) {
  const [selectedYear, setSelectedYear] = useState(null);
  const [currentStep, setCurrentStep] = useState('year'); // 'year' or 'userType'
  const [selectedUserType, setSelectedUserType] = useState(null);
  
  useEffect(() => {
    // Component mounted
  }, []);
  
  const handleYearContinue = () => {
    if (selectedYear === '1st Year') {
      onFirstYear();
    } else if (selectedYear === '2nd Year or Above') {
      setCurrentStep('userType');
    }
  };
  
  const handleUserTypeContinue = () => {
    if (selectedUserType) {
      onOlderYear(selectedUserType);
    }
  };
  
  return (
    <div style={{
      background: 'rgba(42,32,78,0.92)',
      borderRadius: '1.1rem',
      boxShadow: '0 4px 16px rgba(168,85,247,0.15)',
      padding: '3rem 2.5rem',
      minWidth: 500,
      maxWidth: 600,
      border: '1.5px solid rgba(168,85,247,0.3)',
      color: '#E8D5FF',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      {currentStep === 'year' && (
        <>
          <div style={{ marginBottom: 20 }}>
            <svg width="60" height="60" fill="none" stroke="#A855F7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </div>
          
          <h3 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#E8D5FF', marginBottom: '1rem', textAlign: 'center' }}>
            What year are you in?
          </h3>
          
          <p style={{ fontSize: '1.1rem', color: '#E8D5FF', opacity: 0.9, marginBottom: '2rem', textAlign: 'center', lineHeight: 1.5 }}>
            This helps us tailor your review experience and show relevant information.
          </p>
          
          <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem' }}>
            {['1st Year', '2nd Year or Above'].map((year, index) => (
              <button
                key={index}
                style={{
                  background: selectedYear === year 
                    ? 'linear-gradient(90deg, #A855F7 0%, #D946EF 100%)' 
                    : 'rgba(168,85,247,0.1)',
                  color: selectedYear === year ? '#1A1A2E' : '#E8D5FF',
                  padding: '1rem 2rem',
                  borderRadius: '0.8rem',
                  fontWeight: 600,
                  fontSize: '1.1rem',
                  border: selectedYear === year ? 'none' : '2px solid rgba(168,85,247,0.3)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  minWidth: '140px',
                }}
                onMouseEnter={(e) => {
                  if (selectedYear !== year) {
                    e.target.style.background = 'rgba(168,85,247,0.2)';
                    e.target.style.borderColor = '#A855F7';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedYear !== year) {
                    e.target.style.background = 'rgba(168,85,247,0.1)';
                    e.target.style.borderColor = 'rgba(168,85,247,0.3)';
                  }
                }}
                onClick={() => setSelectedYear(year)}
              >
                {year}
              </button>
            ))}
          </div>
          
          {selectedYear && (
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <button 
                style={{
                  background: 'rgba(168,85,247,0.1)',
                  color: '#E8D5FF',
                  padding: '0.8rem 1.5rem',
                  borderRadius: '0.6rem',
                  fontWeight: 600,
                  fontSize: '1rem',
                  border: '2px solid rgba(168,85,247,0.3)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(168,85,247,0.2)';
                  e.target.style.borderColor = '#A855F7';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(168,85,247,0.1)';
                  e.target.style.borderColor = 'rgba(168,85,247,0.3)';
                }}
                onClick={onCancel}
              >
                Cancel
              </button>
              
              <button 
                style={{
                  background: 'linear-gradient(90deg, #D946EF 0%, #FDE047 100%)',
                  color: '#1A1A2E',
                  padding: '0.8rem 2rem',
                  borderRadius: '0.6rem',
                  fontWeight: 600,
                  fontSize: '1rem',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  opacity: selectedYear ? 1 : 0,
                  transform: selectedYear ? 'translateY(0)' : 'translateY(10px)',
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px) scale(1.05)';
                  e.target.style.boxShadow = '0 6px 20px rgba(217,70,239,0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0) scale(1)';
                  e.target.style.boxShadow = 'none';
                }}
                onClick={handleYearContinue}
              >
                Continue
              </button>
            </div>
          )}
        </>
      )}

      {currentStep === 'userType' && (
        <>
          <div style={{ marginBottom: 20 }}>
            <svg width="60" height="60" fill="none" stroke="#A855F7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M9 12l2 2 4-4"/>
              <path d="M21 12c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1z"/>
              <path d="M3 12c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1z"/>
              <path d="M12 21c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1z"/>
              <path d="M12 3c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1z"/>
            </svg>
          </div>
          
          <h3 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#E8D5FF', marginBottom: '1rem', textAlign: 'center' }}>
            Are you new to TeachMeter?
          </h3>
          
          <p style={{ fontSize: '1.1rem', color: '#E8D5FF', opacity: 0.9, marginBottom: '2rem', textAlign: 'center', lineHeight: 1.5 }}>
            This helps us customize your onboarding experience.
          </p>
          
          <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem', flexDirection: 'column', width: '100%', maxWidth: '400px' }}>
            {[
              { key: 'new', label: 'New User', desc: "I'm new to TeachMeter" },
              { key: 'returning', label: 'Returning User', desc: "I've used TeachMeter before" }
            ].map((userType, index) => (
              <button
                key={index}
                style={{
                  background: selectedUserType === userType.key 
                    ? 'linear-gradient(90deg, #A855F7 0%, #D946EF 100%)' 
                    : 'rgba(168,85,247,0.1)',
                  color: selectedUserType === userType.key ? '#1A1A2E' : '#E8D5FF',
                  padding: '1.2rem 1.5rem',
                  borderRadius: '0.8rem',
                  fontWeight: 600,
                  fontSize: '1.1rem',
                  border: selectedUserType === userType.key ? 'none' : '2px solid rgba(168,85,247,0.3)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textAlign: 'left',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                }}
                onMouseEnter={(e) => {
                  if (selectedUserType !== userType.key) {
                    e.target.style.background = 'rgba(168,85,247,0.2)';
                    e.target.style.borderColor = '#A855F7';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedUserType !== userType.key) {
                    e.target.style.background = 'rgba(168,85,247,0.1)';
                    e.target.style.borderColor = 'rgba(168,85,247,0.3)';
                  }
                }}
                onClick={() => setSelectedUserType(userType.key)}
              >
                <div style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                  {userType.label}
                </div>
                <div style={{ 
                  fontSize: '0.95rem', 
                  opacity: selectedUserType === userType.key ? 0.8 : 0.7,
                  fontWeight: 400
                }}>
                  {userType.desc}
                </div>
              </button>
            ))}
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <button 
              style={{
                background: 'rgba(168,85,247,0.1)',
                color: '#E8D5FF',
                padding: '0.8rem 1.5rem',
                borderRadius: '0.6rem',
                fontWeight: 600,
                fontSize: '1rem',
                border: '2px solid rgba(168,85,247,0.3)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(168,85,247,0.2)';
                e.target.style.borderColor = '#A855F7';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(168,85,247,0.1)';
                e.target.style.borderColor = 'rgba(168,85,247,0.3)';
              }}
              onClick={() => {
                setCurrentStep('year');
                setSelectedUserType(null);
              }}
            >
              Back
            </button>
            
            <button 
              style={{
                background: 'rgba(168,85,247,0.1)',
                color: '#E8D5FF',
                padding: '0.8rem 1.5rem',
                borderRadius: '0.6rem',
                fontWeight: 600,
                fontSize: '1rem',
                border: '2px solid rgba(168,85,247,0.3)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(168,85,247,0.2)';
                e.target.style.borderColor = '#A855F7';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(168,85,247,0.1)';
                e.target.style.borderColor = 'rgba(168,85,247,0.3)';
              }}
              onClick={onCancel}
            >
              Cancel
            </button>
            
            {selectedUserType && (
              <button 
                style={{
                  background: 'linear-gradient(90deg, #D946EF 0%, #FDE047 100%)',
                  color: '#1A1A2E',
                  padding: '0.8rem 2rem',
                  borderRadius: '0.6rem',
                  fontWeight: 600,
                  fontSize: '1rem',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  opacity: selectedUserType ? 1 : 0,
                  transform: selectedUserType ? 'translateY(0)' : 'translateY(10px)',
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px) scale(1.05)';
                  e.target.style.boxShadow = '0 6px 20px rgba(217,70,239,0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0) scale(1)';
                  e.target.style.boxShadow = 'none';
                }}
                onClick={handleUserTypeContinue}
              >
                Continue
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

// FirstYearMessageWidget for displaying first year restrictions
function FirstYearMessageWidget({ onContinue, onBack }) {
  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(168,85,247,0.1) 0%, rgba(217,70,239,0.1) 100%)',
      borderRadius: '1.2rem',
      boxShadow: '0 4px 20px rgba(168,85,247,0.2), 0 2px 10px rgba(217,70,239,0.15)',
      padding: '3rem 2.5rem',
      maxWidth: 550,
      width: '100%',
      border: '2px solid rgba(168,85,247,0.3)',
      color: '#E8D5FF',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
    }}>
      <div style={{ marginBottom: '1.5rem', fontSize: '3rem' }}>
        📚
      </div>
      
      <h3 style={{ 
        fontSize: '1.8rem', 
        fontWeight: 700, 
        color: '#E8D5FF', 
        marginBottom: '1.5rem',
        background: 'linear-gradient(90deg, #A855F7 0%, #D946EF 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}>
        Welcome, First Year!
      </h3>
      
      <div style={{ 
        fontSize: '1.2rem', 
        color: '#E8D5FF', 
        opacity: 0.9, 
        marginBottom: '1.5rem', 
        lineHeight: 1.6 
      }}>
        As a first-year student, you can browse and read all professor reviews to help with course planning.
      </div>
      
      <div style={{ 
        background: 'rgba(217,70,239,0.15)',
        borderRadius: '0.8rem',
        padding: '1.5rem',
        marginBottom: '2rem',
        border: '1px solid rgba(217,70,239,0.3)',
      }}>
        <div style={{ 
          fontSize: '1.1rem', 
          color: '#D946EF', 
          fontWeight: 600,
          marginBottom: '0.5rem'
        }}>
          📝 Posting Reviews
        </div>
        <div style={{ 
          fontSize: '1rem', 
          color: '#E8D5FF', 
          opacity: 0.8,
          lineHeight: 1.5
        }}>
          Review posting is available for 2nd year+ students who have completed courses and can provide valuable insights to fellow students.
        </div>
      </div>
      
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <button 
          style={{
            background: 'rgba(168,85,247,0.1)',
            color: '#E8D5FF',
            padding: '1rem 1.5rem',
            borderRadius: '0.8rem',
            fontWeight: 600,
            fontSize: '1.1rem',
            border: '2px solid rgba(168,85,247,0.3)',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(168,85,247,0.2)';
            e.target.style.borderColor = '#A855F7';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(168,85,247,0.1)';
            e.target.style.borderColor = 'rgba(168,85,247,0.3)';
          }}
          onClick={onBack}
        >
          Back
        </button>
        
        <button 
          style={{
            background: 'linear-gradient(90deg, #A855F7 0%, #D946EF 100%)',
            color: '#1A1A2E',
            padding: '1rem 2.5rem',
            borderRadius: '0.8rem',
            fontWeight: 600,
            fontSize: '1.1rem',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px) scale(1.05)';
            e.target.style.boxShadow = '0 6px 20px rgba(168,85,247,0.4), 0 3px 10px rgba(217,70,239,0.3)';
            e.target.style.background = 'linear-gradient(90deg, #D946EF 0%, #FDE047 100%)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0) scale(1)';
            e.target.style.boxShadow = 'none';
            e.target.style.background = 'linear-gradient(90deg, #A855F7 0%, #D946EF 100%)';
          }}
          onClick={onContinue}
        >
          Continue Browsing
        </button>
      </div>
    </div>
  );
}

// AuthFormWidget for login/signup
function AuthFormWidget({ userType, onBack, onCancel, onComplete }) {
  const [isSignUp, setIsSignUp] = useState(userType === 'new');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    university: 'SIT, Pune',
    major: '',
    year: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Component mounted
  }, []);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (isSignUp && formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    // Handle form submission
    onComplete(formData);
  };

  const handleGoogleAuth = () => {
    // Handle Google authentication
    console.log('Google auth for:', isSignUp ? 'Sign Up' : 'Sign In');
    onComplete({ method: 'google', userType });
  };

  return (
    <div style={{
      background: 'rgba(42,32,78,0.92)',
      borderRadius: '1.2rem',
      boxShadow: '0 4px 20px rgba(168,85,247,0.2)',
      padding: '3rem 2.5rem',
      maxWidth: 500,
      width: '100%',
      border: '2px solid rgba(168,85,247,0.3)',
      color: '#E8D5FF',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <div style={{ marginBottom: '1.5rem', fontSize: '2.5rem' }}>
        {isSignUp ? '🎯' : '👋'}
      </div>
      
      <h3 style={{ 
        fontSize: '1.8rem', 
        fontWeight: 700, 
        color: '#E8D5FF', 
        marginBottom: '0.5rem',
        textAlign: 'center'
      }}>
        {isSignUp ? 'Create Your Account' : 'Welcome Back'}
      </h3>
      
      <p style={{ 
        fontSize: '1rem', 
        color: '#E8D5FF', 
        opacity: 0.8, 
        marginBottom: '2rem', 
        textAlign: 'center' 
      }}>
        {isSignUp 
          ? 'Join TeachMeter to start posting and sharing your experiences' 
          : 'Sign in to access your account and continue where you left off'
        }
      </p>

      {/* Google Sign In/Up Button */}
      <button
        onClick={handleGoogleAuth}
        style={{
          background: '#fff',
          color: '#333',
          border: '2px solid #ddd',
          borderRadius: '0.8rem',
          padding: '0.9rem 1.5rem',
          fontSize: '1rem',
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          marginBottom: '1.5rem',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
        }}
        onMouseEnter={(e) => {
          e.target.style.background = '#f8f9fa';
          e.target.style.borderColor = '#A855F7';
        }}
        onMouseLeave={(e) => {
          e.target.style.background = '#fff';
          e.target.style.borderColor = '#ddd';
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        {isSignUp ? 'Sign up with Google' : 'Sign in with Google'}
      </button>

      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        width: '100%', 
        marginBottom: '1.5rem' 
      }}>
        <div style={{ flex: 1, height: '1px', background: 'rgba(168,85,247,0.3)' }}></div>
        <span style={{ margin: '0 1rem', fontSize: '0.9rem', opacity: 0.7 }}>or</span>
        <div style={{ flex: 1, height: '1px', background: 'rgba(168,85,247,0.3)' }}></div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        {isSignUp && (
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
            <input
              type="text"
              placeholder="First Name"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              required
              style={{
                flex: 1,
                padding: '0.8rem',
                borderRadius: '0.6rem',
                border: '2px solid rgba(168,85,247,0.3)',
                background: 'rgba(168,85,247,0.1)',
                color: '#E8D5FF',
                fontSize: '1rem',
                outline: 'none',
                transition: 'all 0.3s ease',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#A855F7';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(168,85,247,0.3)';
              }}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              required
              style={{
                flex: 1,
                padding: '0.8rem',
                borderRadius: '0.6rem',
                border: '2px solid rgba(168,85,247,0.3)',
                background: 'rgba(168,85,247,0.1)',
                color: '#E8D5FF',
                fontSize: '1rem',
                outline: 'none',
                transition: 'all 0.3s ease',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#A855F7';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(168,85,247,0.3)';
              }}
            />
          </div>
        )}

        <input
          type="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          required
          style={{
            width: '100%',
            padding: '0.8rem',
            borderRadius: '0.6rem',
            border: '2px solid rgba(168,85,247,0.3)',
            background: 'rgba(168,85,247,0.1)',
            color: '#E8D5FF',
            fontSize: '1rem',
            marginBottom: '1rem',
            outline: 'none',
            transition: 'all 0.3s ease',
            boxSizing: 'border-box',
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#A855F7';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = 'rgba(168,85,247,0.3)';
          }}
        />

        <div style={{ position: 'relative', marginBottom: '1rem' }}>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            required
            style={{
              width: '100%',
              padding: '0.8rem',
              paddingRight: '3rem',
              borderRadius: '0.6rem',
              border: '2px solid rgba(168,85,247,0.3)',
              background: 'rgba(168,85,247,0.1)',
              color: '#E8D5FF',
              fontSize: '1rem',
              outline: 'none',
              transition: 'all 0.3s ease',
              boxSizing: 'border-box',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#A855F7';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'rgba(168,85,247,0.3)';
            }}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: 'absolute',
              right: '0.8rem',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              color: '#A855F7',
              cursor: 'pointer',
              fontSize: '0.9rem',
            }}
          >
            {showPassword ? '👁️' : '👁️‍🗨️'}
          </button>
        </div>

        {isSignUp && (
          <>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.8rem',
                borderRadius: '0.6rem',
                border: '2px solid rgba(168,85,247,0.3)',
                background: 'rgba(168,85,247,0.1)',
                color: '#E8D5FF',
                fontSize: '1rem',
                marginBottom: '1rem',
                outline: 'none',
                transition: 'all 0.3s ease',
                boxSizing: 'border-box',
              }}
              onFocus={(e) => e.target.style.borderColor = '#A855F7'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(168,85,247,0.3)'}
            />

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
              <input
                type="text"
                placeholder="University"
                value={formData.university}
                readOnly
                style={{
                  flex: 1,
                  padding: '0.8rem',
                  borderRadius: '0.6rem',
                  border: '2px solid rgba(168,85,247,0.2)',
                  background: 'rgba(168,85,247,0.05)',
                  color: '#E8D5FF',
                  fontSize: '1rem',
                  outline: 'none',
                  opacity: 0.8,
                  cursor: 'not-allowed',
                }}
              />
              <select
                value={formData.major}
                onChange={(e) => handleInputChange('major', e.target.value)}
                required
                style={{
                  flex: 1,
                  padding: '0.8rem',
                  borderRadius: '0.6rem',
                  border: '2px solid rgba(168,85,247,0.3)',
                  background: 'rgba(168,85,247,0.1)',
                  color: '#E8D5FF',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#A855F7';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(168,85,247,0.3)';
                }}
              >
                <option value="" disabled style={{ background: '#1A1A2E', color: '#E8D5FF' }}>Select Major</option>
                <option value="AI & ML" style={{ background: '#1A1A2E', color: '#E8D5FF' }}>AI & ML</option>
                <option value="Civil" style={{ background: '#1A1A2E', color: '#E8D5FF' }}>Civil</option>
                <option value="Computer Science" style={{ background: '#1A1A2E', color: '#E8D5FF' }}>Computer Science</option>
                <option value="ENTC" style={{ background: '#1A1A2E', color: '#E8D5FF' }}>ENTC</option>
                <option value="Mechanical" style={{ background: '#1A1A2E', color: '#E8D5FF' }}>Mechanical</option>
                <option value="Natural Sciences" style={{ background: '#1A1A2E', color: '#E8D5FF' }}>Natural Sciences</option>
                <option value="Robotics & Automation" style={{ background: '#1A1A2E', color: '#E8D5FF' }}>Robotics & Automation</option>
              </select>
            </div>

            <select
              value={formData.year}
              onChange={(e) => handleInputChange('year', e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.8rem',
                borderRadius: '0.6rem',
                border: '2px solid rgba(168,85,247,0.3)',
                background: 'rgba(168,85,247,0.1)',
                color: '#E8D5FF',
                fontSize: '1rem',
                marginBottom: '1rem',
                outline: 'none',
                transition: 'all 0.3s ease',
                boxSizing: 'border-box',
              }}
              onFocus={(e) => e.target.style.borderColor = '#A855F7'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(168,85,247,0.3)'}
            >
              <option value="" disabled style={{ background: '#1A1A2E', color: '#E8D5FF' }}>Select Year</option>
              <option value="2nd Year" style={{ background: '#1A1A2E', color: '#E8D5FF' }}>2nd Year</option>
              <option value="3rd Year" style={{ background: '#1A1A2E', color: '#E8D5FF' }}>3rd Year</option>
              <option value="4th Year" style={{ background: '#1A1A2E', color: '#E8D5FF' }}>4th Year</option>
              <option value="Graduate" style={{ background: '#1A1A2E', color: '#E8D5FF' }}>Graduate</option>
            </select>
          </>
        )}

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '2rem' }}>
          <button 
            type="button"
            onClick={onBack}
            style={{
              background: 'rgba(168,85,247,0.1)',
              color: '#E8D5FF',
              padding: '0.8rem 1.5rem',
              borderRadius: '0.6rem',
              fontWeight: 600,
              fontSize: '1rem',
              border: '2px solid rgba(168,85,247,0.3)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(168,85,247,0.2)';
              e.target.style.borderColor = '#A855F7';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(168,85,247,0.1)';
              e.target.style.borderColor = 'rgba(168,85,247,0.3)';
            }}
          >
            Back
          </button>

          <button 
            type="button"
            onClick={onCancel}
            style={{
              background: 'rgba(168,85,247,0.1)',
              color: '#E8D5FF',
              padding: '0.8rem 1.5rem',
              borderRadius: '0.6rem',
              fontWeight: 600,
              fontSize: '1rem',
              border: '2px solid rgba(168,85,247,0.3)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(168,85,247,0.2)';
              e.target.style.borderColor = '#A855F7';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(168,85,247,0.1)';
              e.target.style.borderColor = 'rgba(168,85,247,0.3)';
            }}
          >
            Cancel
          </button>

          <button 
            type="submit"
            style={{
              background: 'linear-gradient(90deg, #D946EF 0%, #FDE047 100%)',
              color: '#1A1A2E',
              padding: '0.8rem 2rem',
              borderRadius: '0.6rem',
              fontWeight: 600,
              fontSize: '1rem',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              flex: 1,
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px) scale(1.02)';
              e.target.style.boxShadow = '0 4px 15px rgba(217,70,239,0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0) scale(1)';
              e.target.style.boxShadow = 'none';
            }}
          >
            {isSignUp ? 'Create Account' : 'Sign In'}
          </button>
        </div>
      </form>

      <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
        <span style={{ color: '#E8D5FF', opacity: 0.8, fontSize: '0.9rem' }}>
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}
        </span>
        <button
          onClick={() => setIsSignUp(!isSignUp)}
          style={{
            background: 'none',
            border: 'none',
            color: '#D946EF',
            fontWeight: 600,
            cursor: 'pointer',
            marginLeft: '0.5rem',
            fontSize: '0.9rem',
            textDecoration: 'underline',
          }}
        >
          {isSignUp ? 'Sign In' : 'Sign Up'}
        </button>
      </div>
    </div>
  );
}

export default GettingStartedPage;
