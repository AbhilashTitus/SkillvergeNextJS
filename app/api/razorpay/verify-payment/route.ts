import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: Request) {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await request.json();

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
        }

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
            .update(body.toString())
            .digest('hex');

        if (expectedSignature === razorpay_signature) {
            return NextResponse.json({ success: true, message: "Payment verified" });
        } else {
            return NextResponse.json({ success: false, error: "Invalid signature" }, { status: 400 });
        }
    } catch (error) {
        console.error('Error verifying Razorpay payment:', error);
        return NextResponse.json({ error: 'Failed to verify payment' }, { status: 500 });
    }
}
