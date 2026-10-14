import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserRole } from '../types';

interface AuthContextType {
  role: UserRole;
  userName: string;
  setRole: (role: UserRole) => void;
  toggleRole: () => void;
  isReviewer: boolean;
  isReporter: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<UserRole>(() => {
    const saved = localStorage.getItem('js_user_role');
    return saved === 'reviewer' ? 'reviewer' : 'reporter';
  });

  useEffect(() => {
    localStorage.setItem('js_user_role', role);
  }, [role]);

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
  };

  const toggleRole = () => {
    setRoleState((prev) => (prev === 'reporter' ? 'reviewer' : 'reporter'));
  };

  const userName =
    role === 'reviewer'
      ? 'Er. K. Rao (Municipal Reviewer & Triage Lead)'
      : 'Ananya S. (Citizen Reporter)';

  return (
    <AuthContext.Provider
      value={{
        role,
        userName,
        setRole,
        toggleRole,
        isReviewer: role === 'reviewer',
        isReporter: role === 'reporter',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
