import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  SignedIn, 
  SignedOut, 
  SignInButton, 
  SignUpButton, 
  UserButton,
  useUser
} from '@clerk/clerk-react';

function GettingStartedPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showWizard, setShowWizard] = useState(false);
  const [showFirstYearMessage, setShowFirstYearMessage] = useState(false);
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [isFirstYear, setIsFirstYear] = useState(false);
  const [authType, setAuthType] = useState(null); // 'new' or 'returning'
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const navigate = useNavigate();
  const { user } = useUser();

  const handleDisclaimerAccept = () => {
    setShowDisclaimer(false);
  };

  useEffect(() => {
    // If user is signed in, redirect to a dashboard or show welcome message
    if (user) {
      setShowAuthForm(false);
      setShowWizard(false);
      // For now, just log the user info
      console.log('User signed in:', user);
    }
  }, [user]);

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
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(120deg, #1A1A2E 0%, #2D1B69 100%)', 
      display: 'flex', 
      flexDirection: 'column',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale'
    }}>
      {/* Disclaimer Modal */}
      {showDisclaimer && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999,
          padding: '2rem'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #1A1A2E 0%, #2D1B69 100%)',
            borderRadius: '20px',
            padding: '3rem',
            maxWidth: '600px',
            width: '100%',
            textAlign: 'center',
            border: '2px solid rgba(168,85,247,0.3)',
            boxShadow: '0 25px 50px rgba(0,0,0,0.5)'
          }}>
            <div style={{
              fontSize: '3rem',
              marginBottom: '1.5rem'
            }}>
              ⚠️
            </div>
            
            <h2 style={{
              color: '#E8D5FF',
              fontSize: '2rem',
              fontWeight: 'bold',
              marginBottom: '1.5rem',
              textShadow: '0 2px 10px rgba(0,0,0,0.3)'
            }}>
              Community Guidelines
            </h2>
            
            <p style={{
              color: '#E8D5FF',
              fontSize: '1.1rem',
              lineHeight: '1.6',
              marginBottom: '2rem',
              opacity: 0.9
            }}>
              TeachMeter is committed to maintaining a respectful learning environment. 
              <strong style={{ color: '#A855F7' }}> This platform does not condone posting demeaning, hateful, or inappropriate messages towards teachers.</strong>
              <br /><br />
              Reviews should be constructive and focused on teaching quality, course content, and learning experience. 
              <strong style={{ color: '#EF4444' }}> Accounts found violating these guidelines will be permanently banned.</strong>
            </p>
            
            <button
              onClick={handleDisclaimerAccept}
              style={{
                background: 'linear-gradient(135deg, #A855F7 0%, #D946EF 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                padding: '1rem 2rem',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 8px 25px rgba(168,85,247,0.4)'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 12px 35px rgba(168,85,247,0.6)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 8px 25px rgba(168,85,247,0.4)';
              }}
            >
              I Understand & Agree
            </button>
          </div>
        </div>
      )}
      
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
              color: '#A855F7',
              transition: 'all 0.3s ease',
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
            }}
            onClick={() => navigate('/')}
            onMouseEnter={(e) => {
              e.target.style.color = '#D946EF';
              e.target.style.boxShadow = '0 8px 25px rgba(168,85,247,0.4), 0 4px 12px rgba(217,70,239,0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = '#A855F7';
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
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.color = '#E8D5FF';
                }}
              >
                {item}
              </div>
            ))}
            
            {/* User Profile Picture - Only show when signed in */}
            <SignedIn>
              <div style={{ marginLeft: '0.5rem' }}>
                <UserButton 
                  appearance={{
                    elements: {
                      avatarBox: {
                        width: '2.5rem',
                        height: '2.5rem'
                      }
                    }
                  }}
                />
              </div>
            </SignedIn>
          </div>
        </nav>
      
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3.5rem 1.2rem 0 1.2rem' }}>
        {/* Main Action Widgets */}
        {!showWizard && !showFirstYearMessage && !showAuthForm && (
          <>
            <h1 style={{
              fontSize: '3.2rem',
              fontWeight: 900,
              background: 'linear-gradient(135deg, #FF8A65 0%, #F06292 25%, #BA68C8 50%, #9C27B0 75%, #7B1FA2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textAlign: 'center',
              marginBottom: '1.2rem',
              textShadow: 'none',
            }}>
              Welcome to TeachMeter
            </h1>
            
            <p style={{ color: '#E8D5FF', fontSize: '1.25rem', textAlign: 'center', maxWidth: 600, marginBottom: '2.5rem', fontWeight: 500 }}>
              Start exploring professor reviews, ratings, and insights from your fellow students. Find the perfect match for your academic journey.
            </p>

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
                if (user) {
                  // User is signed in, redirect to review editor
                  navigate('/review-editor');
                } else {
                  // User is not signed in, show wizard
                  setShowWizard(true);
                }
              }}
              disabled={isFirstYear}
            />
            </div>
          </>
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
            <ClerkAuthWidget 
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
            />
          </div>
        )}

      </main>
    </div>
  );
}

// ActionWidget for the main action cards
function ActionWidget({ icon, title, text, buttonText, onClick, disabled }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        background: hovered 
          ? 'rgba(168,85,247,0.18)' 
          : 'rgba(42,32,78,0.85)',
        borderRadius: '1.1rem',
        padding: '3rem 2.5rem',
        textAlign: 'center',
        cursor: disabled ? 'not-allowed' : 'pointer',
        border: hovered && !disabled 
          ? '1.5px solid rgba(168,85,247,0.5)' 
          : '1.5px solid rgba(168,85,247,0.2)',
        transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        boxShadow: hovered && !disabled 
          ? '0 12px 30px rgba(168,85,247,0.25), 0 0 20px rgba(217,70,239,0.15)' 
          : '0 6px 20px rgba(0, 0, 0, 0.25)',
        flex: 1,
        maxWidth: 400,
        minHeight: 320,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        opacity: disabled ? 0.5 : 1,
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={() => !disabled && setHovered(true)}
      onMouseLeave={() => !disabled && setHovered(false)}
    >
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
        <div>
          <div style={{ marginBottom: '1.5rem' }}>
            {icon}
          </div>
          <h3 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#E8D5FF', marginBottom: '1rem' }}>
            {title}
          </h3>
          <p style={{ fontSize: '1.1rem', color: '#E8D5FF', opacity: 0.9, marginBottom: '2rem', lineHeight: 1.5 }}>
            {text}
          </p>
        </div>
        
        <button
          style={{
            background: disabled
              ? 'rgba(100,100,100,0.3)'
              : hovered
              ? 'linear-gradient(90deg, #D946EF 0%, #FDE047 100%)'
              : 'linear-gradient(90deg, #A855F7 0%, #D946EF 100%)',
            color: disabled ? 'rgba(255,255,255,0.5)' : '#1A1A2E',
            padding: '1rem 2rem',
            borderRadius: '0.8rem',
            border: 'none',
            fontWeight: 700,
            fontSize: '1.1rem',
            cursor: disabled ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s ease',
            width: '100%',
            boxShadow: disabled ? 'none' : hovered 
              ? '0 6px 20px rgba(168,85,247,0.4)' 
              : '0 4px 15px rgba(168,85,247,0.25)',
          }}
          onMouseEnter={(e) => {
            if (!disabled) {
              e.target.style.boxShadow = '0 8px 25px rgba(168,85,247,0.5)';
              e.target.style.background = 'linear-gradient(90deg, #D946EF 0%, #FDE047 100%)';
            }
          }}
          onMouseLeave={(e) => {
            if (!disabled) {
              e.target.style.boxShadow = 'none';
              e.target.style.background = 'linear-gradient(90deg, #A855F7 0%, #D946EF 100%)';
            }
          }}
          onClick={disabled ? undefined : onClick}
        >
          {buttonText}
        </button>
      </div>
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
          
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button
              style={{
                background: selectedYear 
                  ? 'linear-gradient(90deg, #A855F7 0%, #D946EF 100%)' 
                  : 'rgba(168,85,247,0.3)',
                color: selectedYear ? '#1A1A2E' : '#E8D5FF',
                padding: '0.8rem 2rem',
                borderRadius: '0.6rem',
                border: 'none',
                fontWeight: 600,
                fontSize: '1rem',
                cursor: selectedYear ? 'pointer' : 'not-allowed',
                transition: 'all 0.3s ease',
                opacity: selectedYear ? 1 : 0.6,
              }}
              onClick={selectedYear ? handleYearContinue : undefined}
              disabled={!selectedYear}
            >
              Continue
            </button>
            
            <button
              style={{
                background: 'rgba(239,68,68,0.2)',
                color: '#FCA5A5',
                padding: '0.8rem 2rem',
                borderRadius: '0.6rem',
                border: '2px solid rgba(239,68,68,0.3)',
                fontWeight: 600,
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(239,68,68,0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(239,68,68,0.2)';
              }}
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </>
      )}
      
      {currentStep === 'userType' && (
        <>
          <div style={{ marginBottom: 20 }}>
            <svg width="60" height="60" fill="none" stroke="#A855F7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="8.5" cy="7" r="4"/>
              <path d="M20 8v6"/>
              <path d="M23 11h-6"/>
            </svg>
          </div>
          
          <h3 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#E8D5FF', marginBottom: '1rem', textAlign: 'center' }}>
            Are you new to TeachMeter?
          </h3>
          
          <p style={{ fontSize: '1.1rem', color: '#E8D5FF', opacity: 0.9, marginBottom: '2rem', textAlign: 'center', lineHeight: 1.5 }}>
            This helps us provide the right authentication flow for you.
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem', width: '100%' }}>
            {[
              { value: 'new', label: 'New User', desc: 'Create a new account on TeachMeter' },
              { value: 'returning', label: 'Returning User', desc: 'Already have an account' }
            ].map((userType, index) => (
              <button
                key={index}
                style={{
                  background: selectedUserType === userType.value 
                    ? 'linear-gradient(90deg, #A855F7 0%, #D946EF 100%)' 
                    : 'rgba(168,85,247,0.1)',
                  color: selectedUserType === userType.value ? '#1A1A2E' : '#E8D5FF',
                  padding: '1.2rem',
                  borderRadius: '0.8rem',
                  fontWeight: 600,
                  fontSize: '1.1rem',
                  border: selectedUserType === userType.value ? 'none' : '2px solid rgba(168,85,247,0.3)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textAlign: 'left',
                  width: '100%',
                }}
                onMouseOver={(e) => {
                  if (selectedUserType !== userType.value) {
                    e.currentTarget.style.background = 'rgba(168,85,247,0.2)';
                    e.currentTarget.style.borderColor = '#A855F7';
                  }
                }}
                onMouseOut={(e) => {
                  if (selectedUserType !== userType.value) {
                    e.currentTarget.style.background = 'rgba(168,85,247,0.1)';
                    e.currentTarget.style.borderColor = 'rgba(168,85,247,0.3)';
                  }
                }}
                onClick={() => setSelectedUserType(userType.value)}
              >
                <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>{userType.label}</div>
                <div style={{ fontSize: '0.9rem', opacity: selectedUserType === userType.value ? 0.8 : 0.7 }}>
                  {userType.desc}
                </div>
              </button>
            ))}
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button
              style={{
                background: 'rgba(168,85,247,0.2)',
                color: '#E8D5FF',
                padding: '0.8rem 2rem',
                borderRadius: '0.6rem',
                border: '2px solid rgba(168,85,247,0.3)',
                fontWeight: 600,
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(168,85,247,0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(168,85,247,0.2)';
              }}
              onClick={() => setCurrentStep('year')}
            >
              ← Back
            </button>
            
            <button
              style={{
                background: selectedUserType 
                  ? 'linear-gradient(90deg, #A855F7 0%, #D946EF 100%)' 
                  : 'rgba(168,85,247,0.3)',
                color: selectedUserType ? '#1A1A2E' : '#E8D5FF',
                padding: '0.8rem 2rem',
                borderRadius: '0.6rem',
                border: 'none',
                fontWeight: 600,
                fontSize: '1rem',
                cursor: selectedUserType ? 'pointer' : 'not-allowed',
                transition: 'all 0.3s ease',
                opacity: selectedUserType ? 1 : 0.6,
              }}
              onClick={selectedUserType ? handleUserTypeContinue : undefined}
              disabled={!selectedUserType}
            >
              Continue
            </button>
            
            <button
              style={{
                background: 'rgba(239,68,68,0.2)',
                color: '#FCA5A5',
                padding: '0.8rem 2rem',
                borderRadius: '0.6rem',
                border: '2px solid rgba(239,68,68,0.3)',
                fontWeight: 600,
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(239,68,68,0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(239,68,68,0.2)';
              }}
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </>
      )}
    </div>
  );
}

// FirstYearMessageWidget for first-year students
function FirstYearMessageWidget({ onContinue, onBack }) {
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
      textAlign: 'center',
    }}>
      <div style={{ marginBottom: '2rem' }}>
        <svg width="80" height="80" fill="none" stroke="#FDE047" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
          <path d="M6 12v5c3 3 9 3 12 0v-5"/>
        </svg>
      </div>
      
      <h3 style={{ fontSize: '2rem', fontWeight: 700, color: '#FDE047', marginBottom: '1.5rem' }}>
        Welcome to College! 🎓
      </h3>
      
      <p style={{ fontSize: '1.2rem', color: '#E8D5FF', opacity: 0.95, marginBottom: '2rem', lineHeight: 1.6 }}>
        As a first-year student, we recommend <strong>exploring reviews first</strong> to get familiar with different teaching styles and course expectations before posting your own reviews.
      </p>
      
      <div style={{
        background: 'rgba(253,224,71,0.1)',
        border: '2px solid rgba(253,224,71,0.3)',
        borderRadius: '0.8rem',
        padding: '1.5rem',
        marginBottom: '2rem'
      }}>
        <p style={{ color: '#FDE047', margin: 0, fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
          💡 Pro Tips for First Years:
        </p>
        <ul style={{ color: '#E8D5FF', margin: 0, fontSize: '1rem', textAlign: 'left', paddingLeft: '1.2rem' }}>
          <li style={{ marginBottom: '0.5rem' }}>Read reviews to understand professor expectations</li>
          <li style={{ marginBottom: '0.5rem' }}>Look for teaching style preferences that match yours</li>
          <li style={{ marginBottom: '0.5rem' }}>Note course difficulty and workload insights</li>
          <li>Come back to share your experiences later!</li>
        </ul>
      </div>
      
      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <button
          style={{
            background: 'rgba(168,85,247,0.2)',
            color: '#E8D5FF',
            padding: '0.8rem 2rem',
            borderRadius: '0.6rem',
            border: '2px solid rgba(168,85,247,0.3)',
            fontWeight: 600,
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(168,85,247,0.3)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(168,85,247,0.2)';
          }}
          onClick={onBack}
        >
          ← Back
        </button>
        
        <button
          style={{
            background: 'linear-gradient(90deg, #FDE047 0%, #D946EF 100%)',
            color: '#1A1A2E',
            padding: '0.8rem 2rem',
            borderRadius: '0.6rem',
            border: 'none',
            fontWeight: 700,
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.target.style.boxShadow = '0 6px 20px rgba(253,224,71,0.4)';
          }}
          onMouseLeave={(e) => {
            e.target.style.boxShadow = 'none';
          }}
          onClick={onContinue}
        >
          Explore Reviews 🔍
        </button>
      </div>
    </div>
  );
}

// ClerkAuthWidget using Clerk authentication
function ClerkAuthWidget({ userType, onBack, onCancel }) {
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      console.log('User authenticated:', user);
      console.log('ClerkAuthWidget: User is signed in, should show signed-in version');
    } else {
      console.log('ClerkAuthWidget: User is NOT signed in, should show sign-in forms');
    }
  }, [user]);

  return (
    <div style={{
      background: 'rgba(42,32,78,0.92)',
      borderRadius: '1.2rem',
      boxShadow: '0 4px 20px rgba(168,85,247,0.2)',
      padding: '2.5rem',
      width: '100%',
      maxWidth: '500px',
      border: '2px solid rgba(168,85,247,0.3)',
      textAlign: 'center'
    }}>
      <SignedOut>
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ 
            color: '#FDE047', 
            marginBottom: '0.5rem', 
            fontSize: '1.8rem',
            fontWeight: 'bold'
          }}>
            {userType === 'new' ? '🎓 Create Your Account' : '🔑 Welcome Back'}
          </h2>
          <p style={{ color: '#E8D5FF', margin: 0, fontSize: '1rem', opacity: 0.9 }}>
            {userType === 'new' 
              ? 'Join TeachMeter and start your academic journey' 
              : 'Sign in to continue where you left off'
            }
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Main action buttons with Back and Cancel in same row */}
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <button
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

            {userType === 'new' ? (
              <SignUpButton mode="modal" forceRedirectUrl="/getting-started">
                <button style={{
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
                }}>
                  Create Account
                </button>
              </SignUpButton>
            ) : (
              <SignInButton mode="modal" forceRedirectUrl="/getting-started">
                <button style={{
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
                }}>
                  Sign In
                </button>
              </SignInButton>
            )}
          </div>
        </div>

        {/* Toggle between sign in and sign up - moved to bottom */}
        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <span style={{ color: '#E8D5FF', opacity: 0.8, fontSize: '0.9rem' }}>
            {userType === 'new' ? 'Already have an account?' : "Don't have an account?"}
          </span>
          {userType === 'new' ? (
            <SignInButton mode="modal" forceRedirectUrl="/getting-started">
              <button style={{
                background: 'none',
                border: 'none',
                color: '#D946EF',
                fontWeight: 600,
                cursor: 'pointer',
                marginLeft: '0.5rem',
                fontSize: '0.9rem',
                textDecoration: 'underline',
              }}>
                Sign In
              </button>
            </SignInButton>
          ) : (
            <SignUpButton mode="modal" forceRedirectUrl="/getting-started">
              <button style={{
                background: 'none',
                border: 'none',
                color: '#D946EF',
                fontWeight: 600,
                cursor: 'pointer',
                marginLeft: '0.5rem',
                fontSize: '0.9rem',
                textDecoration: 'underline',
              }}>
                Sign Up
              </button>
            </SignUpButton>
          )}
        </div>
      </SignedOut>

      {/* Show UserButton when already signed in */}
      <SignedIn>
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ 
            color: '#10B981', 
            marginBottom: '1rem', 
            fontSize: '1.8rem',
            fontWeight: 'bold'
          }}>
            ✅ You're Already Signed In!
          </h2>
          <p style={{ color: '#E8D5FF', margin: 0, fontSize: '1rem', opacity: 0.9, marginBottom: '2rem' }}>
            You're already authenticated. You can manage your account or continue exploring.
          </p>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <UserButton 
            appearance={{
              elements: {
                avatarBox: {
                  width: '4rem',
                  height: '4rem'
                }
              }
            }}
          />
        </div>

        {/* Navigation buttons */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button
            onClick={onBack}
            style={{
              background: 'rgba(168,85,247,0.2)',
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
              e.target.style.background = 'rgba(168,85,247,0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(168,85,247,0.2)';
            }}
          >
            ← Back to Wizard
          </button>
          
          <button
            onClick={onCancel}
            style={{
              background: 'rgba(239,68,68,0.2)',
              color: '#FCA5A5',
              padding: '0.8rem 1.5rem',
              borderRadius: '0.6rem',
              fontWeight: 600,
              fontSize: '1rem',
              border: '2px solid rgba(239,68,68,0.3)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(239,68,68,0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(239,68,68,0.2)';
            }}
          >
            Cancel
          </button>
        </div>
      </SignedIn>
    </div>
  );
}

export default GettingStartedPage;
