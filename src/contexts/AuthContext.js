import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChange, getUserData } from '../firebase/userService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChange(async (user) => {
      setCurrentUser(user);
      
      if (user) {
        // Fetch user data from Firestore
        const result = await getUserData(user.uid);
        if (result.success) {
          setUserData(result.userData);
        }
      } else {
        setUserData(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userData,
    loading,
    refreshUserData: async () => {
      if (currentUser) {
        const result = await getUserData(currentUser.uid);
        if (result.success) {
          setUserData(result.userData);
        }
      }
    }
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
