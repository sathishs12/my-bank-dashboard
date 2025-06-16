// 'use client';

// import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
// import { useRouter } from 'next/navigation';

// interface AuthContextType {
//   isAuthenticated: boolean;
//   login: (cb?: () => void) => void;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextType | null>(null);

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [isLoading, setIsLoading] = useState(true); // To prevent flicker on load
//   const router = useRouter();

//   useEffect(() => {
//     // Check for login status in localStorage when the app loads
//     const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
//     setIsAuthenticated(loggedIn);
//     setIsLoading(false);
//   }, []);

//   const login = (callback?: () => void) => {
//     localStorage.setItem('isLoggedIn', 'true');
//     setIsAuthenticated(true);
//     if (callback) {
//         callback();
//     } else {
//         router.push('/dashboard');
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem('isLoggedIn');
//     setIsAuthenticated(false);
//     router.push('/login');
//   };

//   // While checking auth status, we can show a loader
//   if (isLoading) {
//     return <div className="flex justify-center items-center h-screen">Loading...</div>;
//   }

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Custom hook to use the AuthContext
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };



'use client';

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  name: string;
  email: string;
  avatar: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (cb?: () => void) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const mockUser: User = {
  name: 'Sathish Kumar',
  email: 'sathish.kumar@cbu-bank.com',
  avatar: 'https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/74.jpg', // A random avatar service
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (loggedIn) {
      setIsAuthenticated(true);
      setUser(mockUser);
    }
    setIsLoading(false);
  }, []);

  const login = (callback?: () => void) => {
    localStorage.setItem('isLoggedIn', 'true');
    setIsAuthenticated(true);
    setUser(mockUser);
    if (callback) {
      callback();
    } else {
      router.push('/dashboard');
    }
  };

  const logout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsAuthenticated(false);
    setUser(null);
    router.push('/login');
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen bg-gray-800 text-white">Loading Application...</div>;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};