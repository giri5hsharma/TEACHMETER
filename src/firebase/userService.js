import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  getDoc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { db, auth } from './config';

// User Collection Reference
const usersCollection = collection(db, 'users');

// Auth Functions
export const registerUser = async (email, password, userData) => {
  try {
    // Create user account
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Store additional user data in Firestore
    const userDoc = await addDoc(usersCollection, {
      uid: user.uid,
      email: email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      major: userData.major,
      year: userData.year,
      userType: userData.userType,
      isFirstYear: userData.isFirstYear,
      university: 'Symbiosis Institute of Technology, Pune',
      createdAt: serverTimestamp(),
      lastLogin: serverTimestamp(),
      profileComplete: true
    });
    
    return {
      success: true,
      user: user,
      userDocId: userDoc.id,
      message: 'User registered successfully!'
    };
  } catch (error) {
    return {
      success: false,
      error: error.code,
      message: error.message
    };
  }
};

export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Update last login
    const userQuery = query(usersCollection, where('uid', '==', user.uid));
    const userDocs = await getDocs(userQuery);
    
    if (!userDocs.empty) {
      const userDocRef = doc(db, 'users', userDocs.docs[0].id);
      await updateDoc(userDocRef, {
        lastLogin: serverTimestamp()
      });
    }
    
    return {
      success: true,
      user: user,
      message: 'Logged in successfully!'
    };
  } catch (error) {
    return {
      success: false,
      error: error.code,
      message: error.message
    };
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
    return {
      success: true,
      message: 'Logged out successfully!'
    };
  } catch (error) {
    return {
      success: false,
      error: error.code,
      message: error.message
    };
  }
};

// User Data Functions
export const getUserData = async (uid) => {
  try {
    const userQuery = query(usersCollection, where('uid', '==', uid));
    const userDocs = await getDocs(userQuery);
    
    if (!userDocs.empty) {
      const userData = userDocs.docs[0].data();
      return {
        success: true,
        userData: {
          id: userDocs.docs[0].id,
          ...userData
        }
      };
    } else {
      return {
        success: false,
        message: 'User data not found'
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error.code,
      message: error.message
    };
  }
};

export const getAllUsers = async () => {
  try {
    const usersQuery = query(usersCollection, orderBy('createdAt', 'desc'));
    const userDocs = await getDocs(usersQuery);
    
    const users = userDocs.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    return {
      success: true,
      users: users
    };
  } catch (error) {
    return {
      success: false,
      error: error.code,
      message: error.message
    };
  }
};

export const updateUserData = async (uid, updateData) => {
  try {
    const userQuery = query(usersCollection, where('uid', '==', uid));
    const userDocs = await getDocs(userQuery);
    
    if (!userDocs.empty) {
      const userDocRef = doc(db, 'users', userDocs.docs[0].id);
      await updateDoc(userDocRef, {
        ...updateData,
        updatedAt: serverTimestamp()
      });
      
      return {
        success: true,
        message: 'User data updated successfully!'
      };
    } else {
      return {
        success: false,
        message: 'User not found'
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error.code,
      message: error.message
    };
  }
};

// Auth State Observer
export const onAuthStateChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};

// Analytics Functions (to replace localStorage)
export const saveAnalyticsData = async (analyticsData) => {
  try {
    const analyticsCollection = collection(db, 'analytics');
    await addDoc(analyticsCollection, {
      data: analyticsData,
      timestamp: serverTimestamp()
    });
    
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error.code,
      message: error.message
    };
  }
};

export const getAnalyticsData = async () => {
  try {
    const analyticsCollection = collection(db, 'analytics');
    const analyticsQuery = query(analyticsCollection, orderBy('timestamp', 'desc'));
    const analyticsDocs = await getDocs(analyticsQuery);
    
    const analytics = analyticsDocs.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    return {
      success: true,
      analytics: analytics
    };
  } catch (error) {
    return {
      success: false,
      error: error.code,
      message: error.message
    };
  }
};
