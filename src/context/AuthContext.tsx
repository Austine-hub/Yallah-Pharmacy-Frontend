import React, { 
    createContext, 
    useContext, 
    useState, 
    useEffect, 
    useCallback 
} from "react";
import { toast } from "sonner";
import { loginUser, registerUser } from "../api/authApi"; // runtime functions
import type { LoginPayload, RegisterPayload, AuthResponse, UserData } from "../api/authApi"; // type-only
import axiosClient from "../api/axiosClient"; // For setting default headers

/* ============================================================
 * 📦 Type Definitions
 * ============================================================ */

interface AuthContextType {
  user: UserData | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (payload: LoginPayload) => Promise<AuthResponse>;
  register: (payload: RegisterPayload) => Promise<AuthResponse>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/* ============================================================
 * 🔑 Utility Functions (Token Storage)
 * ============================================================ */

const TOKEN_KEY = "jwtToken";

/**
 * Stores the token and sets the default Authorization header for Axios.
 */
const setAuthToken = (token: string | null) => {
    if (token) {
        localStorage.setItem(TOKEN_KEY, token);
        // Set the token as a default header for all subsequent secured requests
        axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        localStorage.removeItem(TOKEN_KEY);
        // Remove the default header
        delete axiosClient.defaults.headers.common['Authorization'];
    }
};

/**
 * Retrieves the token from local storage.
 */
const getStoredToken = (): string | null => {
    const token = localStorage.getItem(TOKEN_KEY);
    // Immediately set the default Axios header if a token is found
    if (token) {
        axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    return token;
};

/* ============================================================
 * ⚛️ Auth Provider Component
 * ============================================================ */

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserData | null>(null);
    const [token, setToken] = useState<string | null>(getStoredToken());
    const [isLoading, setIsLoading] = useState(true);

    const isAuthenticated = !!token && !!user;

    // Hydration: Check local storage on mount
    useEffect(() => {
        // If a token exists in local storage, we assume the user is authenticated.
        // In a real-world app, you would also call a backend '/auth/me' endpoint to validate the token 
        // and fetch fresh user data here.
        if (token) {
            // For this implementation, we skip the '/auth/me' call and rely on the token/storage for initial state.
            // A placeholder user object would typically be retrieved here if available.
            
            // To prevent initial flashing, we set isLoading to false after a slight delay
            // or after an actual token validation request completes.
            setTimeout(() => {
                // If a token is present, we need a user object. Since we don't have a /me endpoint, 
                // we assume we can reconstruct basic user info or mark as authenticated.
                // In a proper flow, the 'user' object from localStorage/session is loaded here.
                if (token && !user) {
                    // Placeholder for when you implement user persistence outside of the token.
                    // For now, let's assume we proceed as authenticated if a token exists.
                    // This can be improved by storing user info alongside the token.
                    setUser({ id: 0, email: "persisted@user.com", username: "Authenticated User" });
                }
                setIsLoading(false);
            }, 50); 
        } else {
            setIsLoading(false);
        }
    }, [token, user]);


    const login = useCallback(async (payload: LoginPayload): Promise<AuthResponse> => {
        setIsLoading(true);
        try {
            const response = await loginUser(payload);

            if (response.success && response.token && response.user) {
                setAuthToken(response.token);
                setToken(response.token);
                setUser(response.user);
                toast.success(response.message || "Login successful!");
                return response;
            }

            toast.error(response.message || "Login failed.");
            return response;
        } catch (error: any) {
            console.error("Login Context Error:", error);
            const message = error.response?.data?.error || error.message || "An unknown error occurred.";
            toast.error(message);
            return { success: false, message, error: message } as AuthResponse;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const register = useCallback(async (payload: RegisterPayload): Promise<AuthResponse> => {
        setIsLoading(true);
        try {
            const response = await registerUser(payload);

            if (response.success) {
                toast.success(response.message || "Registration successful! Please log in.");
            } else {
                toast.error(response.message || "Registration failed.");
            }
            return response;
        } catch (error: any) {
            console.error("Register Context Error:", error);
            const message = error.response?.data?.error || error.message || "An unknown error occurred.";
            toast.error(message);
            return { success: false, message, error: message } as AuthResponse;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const logout = useCallback(() => {
        setAuthToken(null);
        setToken(null);
        setUser(null);
        toast.info("You have been logged out.");
    }, []);


    const contextValue: AuthContextType = {
        user,
        token,
        isAuthenticated,
        isLoading,
        login,
        register,
        logout,
    };

    // Optional: Return a loading spinner while hydrating the state
    if (isLoading) {
        return <div>Loading Authentication...</div>;
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

/* ============================================================
 * 🪝 Custom Hook
 * ============================================================ */

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};