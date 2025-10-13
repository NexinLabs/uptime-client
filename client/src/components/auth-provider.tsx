import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { authAPI } from '@/lib/api';

interface User {
  id: string;
  name: string;
  email: string;
  [key: string]: any; // Allow additional properties from API response
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
  requireAuth?: boolean;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ 
  children, 
  requireAuth = false 
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthenticated = !!user;

  const checkAuth = async () => {
    try {
      setIsLoading(true);
      const response = await authAPI.authenticate();
      
      if (response.success && response.data) {
        setUser(response.data as User);
      } else {
        setUser(null);
        if (requireAuth && location.pathname !== '/login') {
          navigate('/login', { 
            replace: true, 
            state: { from: location.pathname } 
          });
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setUser(null);
      if (requireAuth && location.pathname !== '/login') {
        navigate('/login', { 
          replace: true, 
          state: { from: location.pathname } 
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await authAPI.login(email, password);
      
      console.log('Login API response:', response); // Debug log
      
      if (response.success) {
        // After successful login, get user data from auth endpoint
        try {
          const authResponse = await authAPI.authenticate();
          if (authResponse.success && authResponse.data) {
            const userData = (authResponse.data as any)?.user || authResponse.data;
            setUser(userData as User);
            
            console.log('User authenticated, navigating to dashboard'); // Debug log
            
            // Redirect to the page they were trying to access or dashboard
            const from = location.state?.from || '/dashboard';
            navigate(from, { replace: true });
          } else {
            throw new Error('Failed to authenticate after login');
          }
        } catch (authError) {
          console.error('Authentication failed after login:', authError);
          throw authError;
        }
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await authAPI.logout();
      setUser(null);
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Logout failed:', error);
      // Even if logout fails on server, clear local state
      setUser(null);
      navigate('/login', { replace: true });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  // If authentication is required and user is not authenticated, don't render children
  if (requireAuth && !isLoading && !isAuthenticated) {
    return null; // Navigation will happen in checkAuth
  }

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    login,
    logout,
    checkAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;