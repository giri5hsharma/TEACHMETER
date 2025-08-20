


import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import GettingStartedPage from './GettingStartedPage';
import ReviewPostEditor from './ReviewPostEditor';

function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false);
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
    <div style={{ minHeight: '100vh', background: 'linear-gradient(120deg, #000 0%, #18122B 100%)', display: 'flex', flexDirection: 'column' }}>
      {/* Navbar - Always visible */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        background: isScrolled ? 'rgba(24,18,43,0.98)' : 'transparent',
        boxShadow: isScrolled ? '0 2px 12px #9929EA22' : 'none',
        backdropFilter: isScrolled ? 'blur(10px)' : 'none',
        zIndex: 100,
        padding: '1.1rem 1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: '#E0C3FC',
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
              background: 'linear-gradient(90deg, #9929EA 0%, #CC66DA 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              transition: 'all 0.3s ease',
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'linear-gradient(90deg, #CC66DA 0%, #FAEB92 100%)';
              e.target.style.WebkitBackgroundClip = 'text';
              e.target.style.WebkitTextFillColor = 'transparent';
              e.target.style.transform = 'translateY(-3px) scale(1.05)';
              e.target.style.boxShadow = '0 8px 25px rgba(153,41,234,0.4), 0 4px 12px rgba(204,102,218,0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'linear-gradient(90deg, #9929EA 0%, #CC66DA 100%)';
              e.target.style.WebkitBackgroundClip = 'text';
              e.target.style.WebkitTextFillColor = 'transparent';
              e.target.style.transform = 'translateY(0) scale(1)';
              e.target.style.boxShadow = 'none';
            }}
            onClick={() => navigate('/getting-started')}
          >
            Start Exploring!
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
                  color: '#E0C3FC',
                  fontSize: '0.9rem',
                  whiteSpace: 'nowrap',
                  minWidth: 'fit-content',
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(153,41,234,0.2)';
                  e.target.style.color = '#CC66DA';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.color = '#E0C3FC';
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
          background: 'linear-gradient(90deg, #FAEB92 0%, #CC66DA 40%, #9929EA 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textAlign: 'center',
          marginBottom: '1.2rem',
          textShadow: '0 0 18px #9929EA55',
        }}>
          TeachMeter
        </h1>
        <p style={{ color: '#E0C3FC', fontSize: '1.25rem', textAlign: 'center', maxWidth: 600, marginBottom: '2.5rem', fontWeight: 500 }}>
          The honest, actionable, no-BS guide to your college professors. Get real feedback, proven strategies, and ace your classes—stress free.
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '2.8rem',
          marginBottom: '2.5rem',
          width: '100%',
          maxWidth: 800,
        }}>
          {/* Mosaic Widget 1 - left */}
          <div style={{ display: 'flex', justifyContent: 'flex-start', marginLeft: 0, marginTop: 0 }}>
            <FeatureWidget icon={
              <svg width="60" height="60" fill="none" stroke="#E0C3FC" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M17 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"/><path d="M9 22V12h6v10"/></svg>
            } title="Community-Knit Feedback" text="Get honest, crowd-sourced feedback from real students in your department." widgetSize="xlarge" />
          </div>
          {/* Mosaic Widget 2 - right, overlap up */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-32px' }}>
            <FeatureWidget icon={
              <svg width="60" height="60" fill="none" stroke="#E0C3FC" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M8 12l2 2 4-4"/></svg>
            } title="No BS, Moderated Advice" text="Only actionable, moderated advice from seniors—no spam, no drama, just what works." widgetSize="xlarge" />
          </div>
          {/* Mosaic Widget 3 - left, overlap up */}
          <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '-32px' }}>
            <FeatureWidget icon={
              <svg width="60" height="60" fill="none" stroke="#E0C3FC" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            } title="Actionable Strategies" text="Learn exactly what to do for each teacher—tips, warnings, and proven strategies." widgetSize="xlarge" />
          </div>
          {/* Mosaic Widget 4 - right, overlap up */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-32px' }}>
            <FeatureWidget icon={
              <svg width="60" height="60" fill="none" stroke="#E0C3FC" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
            } title="Save Time & Stress" text="Be prepared, avoid surprises, and make the most of your college experience." widgetSize="xlarge" />
          </div>
        </div>
        <button 
          style={{ 
            background: 'linear-gradient(90deg, #9929EA 0%, #CC66DA 100%)', 
            color: '#18122B', 
            padding: '0.85rem 2.2rem', 
            borderRadius: '0.85rem', 
            fontWeight: 700, 
            fontSize: '1.15rem', 
            border: 'none', 
            cursor: 'pointer', 
            boxShadow: '0 2px 12px rgba(153,41,234,0.10)', 
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-3px) scale(1.05)';
            e.target.style.boxShadow = '0 8px 25px rgba(153,41,234,0.4), 0 4px 12px rgba(204,102,218,0.3)';
            e.target.style.background = 'linear-gradient(90deg, #CC66DA 0%, #FAEB92 100%)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0) scale(1)';
            e.target.style.boxShadow = '0 2px 12px rgba(153,41,234,0.10)';
            e.target.style.background = 'linear-gradient(90deg, #9929EA 0%, #CC66DA 100%)';
          }}
          onClick={() => navigate('/getting-started')}
        >
          Get Started
        </button>
      </main>
      <footer style={{ marginTop: 'auto', padding: '2.5rem 0 1.2rem', textAlign: 'center', color: '#CC66DA', fontSize: '1rem', letterSpacing: '0.01em' }}>
        &copy; {new Date().getFullYear()} TeachMeter
      </footer>
    </div>
  );
}

// FeatureWidget component
function FeatureWidget({ icon, title, text, widgetSize }) {
  const [hovered, setHovered] = useState(false);
  // Extra large size for mosaic
  const sizeStyles = widgetSize === 'xlarge' ? {
    padding: '2.8rem 2.5rem',
    minWidth: 340,
    maxWidth: 420,
    fontSize: '1.22rem',
  } : {};
  return (
    <div
      style={{
        background: hovered 
          ? 'linear-gradient(90deg, rgba(153,41,234,0.25) 0%, rgba(204,102,218,0.25) 100%)'
          : 'rgba(24,18,43,0.92)',
        borderRadius: '1.1rem',
        boxShadow: hovered
          ? '0 6px 20px rgba(153,41,234,0.3), 0 3px 10px rgba(204,102,218,0.25)'
          : '0 2px 8px rgba(153,41,234,0.10)',
        flex: '1 1 340px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        transform: hovered ? 'translateY(-2px) scale(1.03)' : 'translateY(0) scale(1)',
        border: hovered ? '1.5px solid #CC66DA' : '1.5px solid transparent',
        color: '#E0C3FC',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '0.2rem',
        overflow: 'visible',
        position: 'relative',
        zIndex: hovered ? 10 : 1,
        ...sizeStyles,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ marginBottom: 22 }}>{icon}</div>
      <div style={{ fontWeight: 700, fontSize: '1.35rem', color: '#E0C3FC', marginBottom: 14 }}>{title}</div>
      <div style={{ fontSize: '1.15rem', color: '#E0C3FC', opacity: 0.92 }}>{text}</div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/getting-started" element={<GettingStartedPage />} />
        <Route path="/review-editor" element={<ReviewPostEditor />} />
      </Routes>
    </Router>
  );
}

export default App;
