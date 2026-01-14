import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const accountNumber = searchParams.get('account_number');
    const ifsc = searchParams.get('ifsc');

    if (!accountNumber || !ifsc) {
        return NextResponse.json({
            status: 'Failure',
            message: 'Account Number and IFSC Code are required'
        }, { status: 400 });
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock Logic
    // For DEMO: Allow any IFSC length
    /*
    if (ifsc.length !== 11) {
        return NextResponse.json({
            status: 'Failure',
            message: 'Invalid IFSC Code format'
        });
    }
    */

    // Success for standard test cases
    return NextResponse.json({
        status: 'Success',
        data: {
            beneficiary_name: "ABHILASH TITUS", // Mock name
            account_number: accountNumber,
            ifsc: ifsc,
            bank_status: "Active"
        }
    });
}
