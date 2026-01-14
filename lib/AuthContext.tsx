"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface User {
    name: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    purchasedCourses: string[]; // List of course IDs
    login: (name: string, email: string) => void;
    signup: (name: string, email: string) => void;
    logout: () => void;
    buyCourse: (courseId: string) => void;
    buyCourses: (courseIds: string[]) => void;
    hasPurchased: (courseId: string) => boolean;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    // ... existing state ...
    const [user, setUser] = useState<User | null>(null);
    const [purchasedCourses, setPurchasedCourses] = useState<string[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const router = useRouter();

    // ... existing useEffects ...

    // Load from localStorage on mount
    useEffect(() => {
        const savedUser = localStorage.getItem("skillverge-user");
        const savedPurchases = localStorage.getItem("skillverge-purchases");

        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser));
            } catch (e) {
                console.error("Failed to load user:", e);
            }
        }

        if (savedPurchases) {
            try {
                setPurchasedCourses(JSON.parse(savedPurchases));
            } catch (e) {
                console.error("Failed to load purchases:", e);
            }
        }
        setIsLoaded(true);
    }, []);

    // Save to localStorage whenever state changes
    useEffect(() => {
        if (isLoaded) {
            if (user) {
                localStorage.setItem("skillverge-user", JSON.stringify(user));
            } else {
                localStorage.removeItem("skillverge-user");
            }
        }
    }, [user, isLoaded]);

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("skillverge-purchases", JSON.stringify(purchasedCourses));
        }
    }, [purchasedCourses, isLoaded]);

    const login = (name: string, email: string) => {
        setUser({ name, email });
    };

    const signup = (name: string, email: string) => {
        setUser({ name, email });
        setPurchasedCourses([]);
    };

    const logout = () => {
        setUser(null);
        setPurchasedCourses([]);
        localStorage.removeItem("skillverge-user");
        localStorage.removeItem("skillverge-purchases");
        router.push("/");
    };

    const buyCourse = (courseId: string) => {
        setPurchasedCourses(prev => {
            if (prev.includes(courseId)) return prev;
            const updated = [...prev, courseId];
            if (typeof window !== 'undefined') {
                localStorage.setItem("skillverge-purchases", JSON.stringify(updated));
            }
            return updated;
        });
    };

    const buyCourses = (courseIds: string[]) => {
        setPurchasedCourses(prev => {
            // Filter out IDs that are already present
            const newIds = courseIds.filter(id => !prev.includes(id));
            if (newIds.length === 0) return prev;

            const updated = [...prev, ...newIds];
            if (typeof window !== 'undefined') {
                localStorage.setItem("skillverge-purchases", JSON.stringify(updated));
            }
            return updated;
        });
    };

    const hasPurchased = (courseId: string) => {
        return purchasedCourses.includes(courseId);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                purchasedCourses,
                login,
                signup,
                logout,
                buyCourse,
                buyCourses,
                hasPurchased,
                isAuthenticated: !!user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
