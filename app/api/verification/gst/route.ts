import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const gst = searchParams.get('gst');

    if (!gst) {
        return NextResponse.json({ status: 'Failure', message: 'GST number is required' }, { status: 400 });
    }

    const username = process.env.EKYC_USERNAME;
    const token = process.env.EKYC_TOKEN;
    const orderid = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    if (!username || !token) {
        return NextResponse.json({ status: 'Failure', message: 'Server misconfiguration: Credentials missing' }, { status: 500 });
    }

    const apiUrl = `https://connect.ekychub.in/v3/verification/gst_verification?username=${username}&token=${token}&gst=${gst}&orderid=${orderid}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ status: 'Failure', message: 'GST Verification Service Error' }, { status: 500 });
    }
}
