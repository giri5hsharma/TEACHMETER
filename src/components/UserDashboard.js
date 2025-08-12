import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { logoutUser, getAllUsers } from '../firebase/userService';
import { useNavigate } from 'react-router-dom';

function UserDashboard() {
  const { currentUser, userData } = useAuth();
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAllUsers, setShowAllUsers] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/');
      return;
    }

    // Load all users for admin view
    const loadAllUsers = async () => {
      const result = await getAllUsers();
      if (result.success) {
        setAllUsers(result.users);
      }
      setLoading(false);
    };

    loadAllUsers();
  }, [currentUser, navigate]);

  const handleLogout = async () => {
    const result = await logoutUser();
    if (result.success) {
      navigate('/');
    }
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1A1A2E 0%, #16213E 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#E8D5FF'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🔄</div>
          <div>Loading user data...</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1A1A2E 0%, #16213E 100%)',
      padding: '2rem',
      color: '#E8D5FF'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
        padding: '1.5rem',
        background: 'rgba(42,32,78,0.6)',
        borderRadius: '1rem',
        border: '2px solid rgba(168,85,247,0.3)'
      }}>
        <div>
          <h1 style={{ margin: 0, color: '#D946EF', fontSize: '2.5rem' }}>
            📊 TeachMeter Dashboard
          </h1>
          <p style={{ margin: '0.5rem 0 0 0', opacity: 0.8 }}>
            Welcome back, {userData?.firstName || 'User'}!
          </p>
        </div>
        <button
          onClick={handleLogout}
          style={{
            background: 'linear-gradient(45deg, #EF4444, #DC2626)',
            color: 'white',
            border: 'none',
            padding: '0.8rem 1.5rem',
            borderRadius: '0.8rem',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: 'bold',
            transition: 'transform 0.3s ease'
          }}
          onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
        >
          🚪 Logout
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        {/* User Profile Card */}
        <div style={{
          background: 'rgba(42,32,78,0.8)',
          borderRadius: '1.2rem',
          padding: '2rem',
          border: '2px solid rgba(168,85,247,0.3)',
          boxShadow: '0 8px 32px rgba(168,85,247,0.1)'
        }}>
          <h2 style={{ color: '#FDE047', marginBottom: '1.5rem', fontSize: '1.8rem' }}>
            👤 Your Profile
          </h2>
          
          {userData ? (
            <div style={{ display: 'grid', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 'bold', color: '#A855F7' }}>Name:</span>
                <span>{userData.firstName} {userData.lastName}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 'bold', color: '#A855F7' }}>Email:</span>
                <span>{userData.email}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 'bold', color: '#A855F7' }}>Major:</span>
                <span>{userData.major}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 'bold', color: '#A855F7' }}>Year:</span>
                <span>{userData.year}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 'bold', color: '#A855F7' }}>User Type:</span>
                <span>{userData.userType}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 'bold', color: '#A855F7' }}>University:</span>
                <span>{userData.university}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 'bold', color: '#A855F7' }}>First Year:</span>
                <span>{userData.isFirstYear ? 'Yes' : 'No'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 'bold', color: '#A855F7' }}>Joined:</span>
                <span>{userData.createdAt?.toDate().toLocaleDateString()}</span>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', color: '#EF4444' }}>
              No user data available
            </div>
          )}
        </div>

        {/* All Users Section */}
        <div style={{
          background: 'rgba(42,32,78,0.8)',
          borderRadius: '1.2rem',
          padding: '2rem',
          border: '2px solid rgba(168,85,247,0.3)',
          boxShadow: '0 8px 32px rgba(168,85,247,0.1)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ color: '#FDE047', margin: 0, fontSize: '1.8rem' }}>
              👥 All Users ({allUsers.length})
            </h2>
            <button
              onClick={() => setShowAllUsers(!showAllUsers)}
              style={{
                background: showAllUsers ? '#EF4444' : '#A855F7',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                fontSize: '0.9rem'
              }}
            >
              {showAllUsers ? 'Hide' : 'Show'}
            </button>
          </div>

          {showAllUsers && (
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {allUsers.map((user, index) => (
                <div key={user.id} style={{
                  background: 'rgba(168,85,247,0.1)',
                  borderRadius: '0.8rem',
                  padding: '1rem',
                  marginBottom: '1rem',
                  border: '1px solid rgba(168,85,247,0.3)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontWeight: 'bold', color: '#D946EF' }}>
                      {user.firstName} {user.lastName}
                    </span>
                    <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>
                      {user.major}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                    {user.email} • {user.year} • {user.userType}
                  </div>
                  <div style={{ fontSize: '0.8rem', opacity: 0.6, marginTop: '0.5rem' }}>
                    Joined: {user.createdAt?.toDate().toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div style={{
        background: 'rgba(42,32,78,0.6)',
        borderRadius: '1rem',
        padding: '1.5rem',
        marginTop: '2rem',
        border: '2px solid rgba(168,85,247,0.3)',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', color: '#FDE047' }}>👥</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#D946EF' }}>
            {allUsers.length}
          </div>
          <div style={{ opacity: 0.8 }}>Total Users</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', color: '#FDE047' }}>🆕</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#D946EF' }}>
            {allUsers.filter(user => user.userType === 'New User').length}
          </div>
          <div style={{ opacity: 0.8 }}>New Users</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', color: '#FDE047' }}>🔄</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#D946EF' }}>
            {allUsers.filter(user => user.userType === 'Returning User').length}
          </div>
          <div style={{ opacity: 0.8 }}>Returning Users</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', color: '#FDE047' }}>🏫</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#D946EF' }}>
            {allUsers.filter(user => user.isFirstYear).length}
          </div>
          <div style={{ opacity: 0.8 }}>First Years</div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
