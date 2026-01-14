import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const gst = searchParams.get('gst');

    if (!gst) {
        return NextResponse.json({ status: 'Failure', message: 'GST Number is required' }, { status: 400 });
    }

    // Mock Verification Logic
    // In production, call actual third-party API here

    // Pattern check: 2 alphanum, 5 chars, 4 nums, 1 char, 1 num, 1 char, 1 num
    // Simple mock: If it starts with '29' (Karnataka) or 'DEV' succeed.

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // For DEMO/TESTING pursposes: Always return success for any GST input
    if (gst) {
        return NextResponse.json({
            status: 'Success',
            data: {
                legal_name_of_business: "SKILLVERGE DEMO SELLER LLC",
                trade_name: "Skillverge Learning",
                status: "Active",
                gstin: gst,
                registration_date: new Date().toISOString().split('T')[0]
            }
        });
    }

    /* 
    // Original Logic preserved for reference:
    if (gst.startsWith('29') || gst.startsWith('DEV')) { ... }
    */

    return NextResponse.json({
        status: 'Failure',
        message: 'Invalid GST Number or verification failed'
    });
}
