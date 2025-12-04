"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { CourseProps } from "@/components/CourseCard";

interface CartContextType {
    cartItems: CourseProps[];
    wishlistItems: CourseProps[];
    addToCart: (course: CourseProps) => void;
    removeFromCart: (courseId: string) => void;
    addToWishlist: (course: CourseProps) => void;
    removeFromWishlist: (courseId: string) => void;
    isInCart: (courseId: string) => boolean;
    isInWishlist: (courseId: string) => boolean;
    clearCart: () => void;
    cartTotal: number;
    cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cartItems, setCartItems] = useState<CourseProps[]>([]);
    const [wishlistItems, setWishlistItems] = useState<CourseProps[]>([]);

    // Load from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem("skillverge-cart");
        const savedWishlist = localStorage.getItem("skillverge-wishlist");

        if (savedCart) {
            try {
                setCartItems(JSON.parse(savedCart));
            } catch (e) {
                console.error("Failed to load cart:", e);
            }
        }

        if (savedWishlist) {
            try {
                setWishlistItems(JSON.parse(savedWishlist));
            } catch (e) {
                console.error("Failed to load wishlist:", e);
            }
        }
    }, []);

    // Save to localStorage whenever cart changes
    useEffect(() => {
        localStorage.setItem("skillverge-cart", JSON.stringify(cartItems));
    }, [cartItems]);

    // Save to localStorage whenever wishlist changes
    useEffect(() => {
        localStorage.setItem("skillverge-wishlist", JSON.stringify(wishlistItems));
    }, [wishlistItems]);

    const addToCart = (course: CourseProps) => {
        setCartItems((prev) => {
            if (prev.find((item) => item.id === course.id)) {
                return prev; // Already in cart
            }
            return [...prev, course];
        });
    };

    const removeFromCart = (courseId: string) => {
        setCartItems((prev) => prev.filter((item) => item.id !== courseId));
    };

    const addToWishlist = (course: CourseProps) => {
        setWishlistItems((prev) => {
            if (prev.find((item) => item.id === course.id)) {
                return prev; // Already in wishlist
            }
            return [...prev, course];
        });
    };

    const removeFromWishlist = (courseId: string) => {
        setWishlistItems((prev) => prev.filter((item) => item.id !== courseId));
    };

    const isInCart = (courseId: string) => {
        return cartItems.some((item) => item.id === courseId);
    };

    const isInWishlist = (courseId: string) => {
        return wishlistItems.some((item) => item.id === courseId);
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const cartTotal = cartItems.reduce((sum, item) => sum + item.price, 0);
    const cartCount = cartItems.length;

    return (
        <CartContext.Provider
            value={{
                cartItems,
                wishlistItems,
                addToCart,
                removeFromCart,
                addToWishlist,
                removeFromWishlist,
                isInCart,
                isInWishlist,
                clearCart,
                cartTotal,
                cartCount,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
