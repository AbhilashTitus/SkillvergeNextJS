"use client";

import { useEffect, useState } from 'react';

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: any) => void;
  prefill: {
    name: string;
    email: string;
  };
  theme: {
    color: string;
  };
  modal: {
    ondismiss: () => void;
  };
}

export const useRazorpay = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // 1. Check if Razorpay is already available on window
    if (typeof window !== 'undefined' && window.Razorpay) {
      setIsLoaded(true);
      return;
    }

    // 2. Check if script is already in document
    const scriptSrc = 'https://checkout.razorpay.com/v1/checkout.js';
    let script = document.querySelector(`script[src="${scriptSrc}"]`) as HTMLScriptElement;

    if (!script) {
      // 3. Create script if not found
      script = document.createElement('script');
      script.src = scriptSrc;
      script.async = true;
      document.body.appendChild(script);
    }

    // 4. Attach load listener
    const handleLoad = () => setIsLoaded(true);
    script.addEventListener('load', handleLoad);

    // 5. Cleanup listener only (do NOT remove script)
    return () => {
      script.removeEventListener('load', handleLoad);
    };
  }, []);

  const createOrder = async (amount: number, receipt: string) => {
    try {
      const response = await fetch('/api/razorpay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          receipt,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  };

  const openCheckout = (options: RazorpayOptions) => {
    if (!isLoaded || !window.Razorpay) {
      console.error('Razorpay SDK not loaded');
      return;
    }

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return {
    isLoaded,
    createOrder,
    openCheckout,
  };
};