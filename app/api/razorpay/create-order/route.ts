import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'test_key_id',
    key_secret: process.env.RAZORPAY_KEY_SECRET || 'test_key_secret',
});

export async function POST(request: Request) {
    try {
        const { amount } = await request.json();

        if (!amount) {
            return NextResponse.json({ error: 'Amount is required' }, { status: 400 });
        }

        const options = {
            amount: amount * 100, // Amount in paise
            currency: 'INR',
            receipt: `receipt_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);

        return NextResponse.json(order);
    } catch (error) {
        console.error('Error creating Razorpay order:', error);
        return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
    }
}
