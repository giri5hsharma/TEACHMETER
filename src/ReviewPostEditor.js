import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';

function ReviewPostEditor() {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(120deg, #1A1A2E 0%, #2D1B69 100%)',
      display: 'flex',
      flexDirection: 'column',
      WebkitFontSmoothing: 'antialiased'
    }}>
      {/* Navigation Bar */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        background: 'transparent',
        backdropFilter: 'none',
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
        transition: 'all 0.3s ease'
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
            borderRadius: '0.5rem'
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
          TeachMeter
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

      {/* Main Content */}
      <main style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
        paddingTop: '6rem' // Account for fixed navbar
      }}>
        <div style={{
          background: 'rgba(42,32,78,0.85)',
          backdropFilter: 'blur(20px)',
          borderRadius: '20px',
          padding: '3rem',
          boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
          width: '100%',
          maxWidth: '800px',
          border: '2px solid rgba(168,85,247,0.3)',
          textAlign: 'center'
        }}>
          <h1 style={{
            color: '#E8D5FF',
            fontSize: '2.5rem',
            fontWeight: 'bold',
            marginBottom: '1rem',
            textShadow: '0 2px 10px rgba(0,0,0,0.3)'
          }}>
            Review Post Editor
          </h1>
          
          <p style={{
            color: '#E8D5FF',
            fontSize: '1.2rem',
            opacity: 0.8,
            marginBottom: '2rem'
          }}>
            Create and share your teaching review
          </p>

          {/* Placeholder content - will be filled based on your requirements */}
          <div style={{
            background: 'rgba(168,85,247,0.1)',
            borderRadius: '15px',
            padding: '2rem',
            border: '1px solid rgba(168,85,247,0.3)'
          }}>
            <p style={{
              color: '#E8D5FF',
              fontSize: '1.1rem',
              margin: 0
            }}>
              Content coming soon... Tell me what details you'd like to include!
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ReviewPostEditor;
