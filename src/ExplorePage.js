import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ExplorePage() {
  const [showNavbar, setShowNavbar] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setShowNavbar(true);
      } else {
        setShowNavbar(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(120deg, #1A1A2E 0%, #2D1B69 100%)', display: 'flex', flexDirection: 'column' }}>
      {/* Navbar */}
      {showNavbar && (
        <nav style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          background: 'rgba(42,32,78,0.98)',
          boxShadow: '0 2px 12px #A855F744',
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
      )}
      
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

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          marginBottom: '2.5rem',
          width: '100%',
          maxWidth: 900,
        }}>
          {/* Search Section */}
          <div style={{
            background: 'rgba(42,32,78,0.92)',
            borderRadius: '1.1rem',
            padding: '2.5rem 2rem',
            border: '1.5px solid rgba(168,85,247,0.3)',
            boxShadow: '0 4px 16px rgba(168,85,247,0.15)',
          }}>
            <h3 style={{ color: '#E8D5FF', fontSize: '1.4rem', fontWeight: 700, marginBottom: '1rem' }}>
              Search Professors
            </h3>
            <input 
              type="text" 
              placeholder="Enter professor name or course..."
              style={{
                width: '100%',
                padding: '0.8rem 1rem',
                borderRadius: '0.5rem',
                border: '2px solid rgba(168,85,247,0.3)',
                background: 'rgba(26,26,46,0.8)',
                color: '#E8D5FF',
                fontSize: '1rem',
                marginBottom: '1rem',
                transition: 'border-color 0.2s ease',
              }}
              onFocus={(e) => e.target.style.borderColor = '#A855F7'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(168,85,247,0.3)'}
            />
            <button style={{
              background: 'linear-gradient(90deg, #A855F7 0%, #D946EF 100%)',
              color: '#1A1A2E',
              padding: '0.8rem 1.5rem',
              borderRadius: '0.5rem',
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              width: '100%',
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px) scale(1.02)';
              e.target.style.boxShadow = '0 6px 20px rgba(168,85,247,0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0) scale(1)';
              e.target.style.boxShadow = 'none';
            }}>
              Search
            </button>
          </div>

          {/* Categories Section */}
          <div style={{
            background: 'rgba(42,32,78,0.92)',
            borderRadius: '1.1rem',
            padding: '2.5rem 2rem',
            border: '1.5px solid rgba(217,70,239,0.3)',
            boxShadow: '0 4px 16px rgba(217,70,239,0.15)',
          }}>
            <h3 style={{ color: '#E8D5FF', fontSize: '1.4rem', fontWeight: 700, marginBottom: '1rem' }}>
              Browse by Department
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              {['Computer Science', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Economics'].map((dept, index) => (
                <div
                  key={index}
                  style={{
                    padding: '0.6rem 0.8rem',
                    background: 'rgba(168,85,247,0.1)',
                    borderRadius: '0.4rem',
                    color: '#E8D5FF',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    textAlign: 'center',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'rgba(217,70,239,0.2)';
                    e.target.style.color = '#D946EF';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'rgba(168,85,247,0.1)';
                    e.target.style.color = '#E8D5FF';
                  }}
                >
                  {dept}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <footer style={{ marginTop: 'auto', padding: '2.5rem 0 1.2rem', textAlign: 'center', color: '#D946EF', fontSize: '1rem', letterSpacing: '0.01em' }}>
        &copy; {new Date().getFullYear()} TeachMeter
      </footer>
    </div>
  );
}

export default ExplorePage;
