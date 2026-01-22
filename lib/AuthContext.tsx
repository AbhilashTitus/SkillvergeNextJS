"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export interface User {
    name: string;
    email: string;
    membershipTier: 'Free' | 'Silver' | 'Gold';
    coins: number;
    subscriptionExpiry?: string;
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
    upgradeMembership: (tier: 'Silver' | 'Gold') => void;
    redeemCoins: (amount: number) => void;
    addCoins: (amount: number) => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [purchasedCourses, setPurchasedCourses] = useState<string[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const router = useRouter();

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
        // In a real app, you'd fetch the user's data from the backend.
        // For this mock, we'll see if there's a stored user or just create a default one.
        // To preserve state across logins in this mock (if user re-logs in with same email), 
        // we might check localStorage, but here we just reset or set default.
        // Let's assume a fresh login gets default values if not persisted? 
        // Or better yet, check if the user is already set.

        // Since we don't have a real backend DB, we'll just set defaults
        // If we wanted to "persist" between hard refreshes we use existing localStorage logic.
        // If we want to simulate "fetching" user data:
        setUser({
            name,
            email,
            membershipTier: 'Free',
            coins: 0,
            subscriptionExpiry: undefined
        });
    };

    const signup = (name: string, email: string) => {
        setUser({
            name,
            email,
            membershipTier: 'Free',
            coins: 0
        });
        setPurchasedCourses([]);
    };

    const upgradeMembership = (tier: 'Silver' | 'Gold') => {
        if (!user) return;

        let bonusCoins = 0;
        if (tier === 'Silver') bonusCoins = 100;
        if (tier === 'Gold') bonusCoins = 200;

        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 30); // 30 days from now

        setUser(prev => {
            if (!prev) return null;
            return {
                ...prev,
                membershipTier: tier,
                coins: (prev.coins || 0) + bonusCoins,
                subscriptionExpiry: expiryDate.toISOString()
            };
        });
    };

    const redeemCoins = (amount: number) => {
        if (!user) return;
        setUser(prev => {
            if (!prev) return null;
            return {
                ...prev,
                coins: Math.max(0, (prev.coins || 0) - amount)
            };
        });
    };

    const addCoins = (amount: number) => {
        if (!user) return;
        setUser(prev => {
            if (!prev) return null;
            return {
                ...prev,
                coins: (prev.coins || 0) + amount
            };
        });
    };

    const logout = () => {
        setUser(null);
        setPurchasedCourses([]);
        // We persist data in localStorage but for "logout" we clear it to simulate session end.
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
                upgradeMembership,
                redeemCoins,
                addCoins,
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
