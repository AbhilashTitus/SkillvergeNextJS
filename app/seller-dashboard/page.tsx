"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
    LayoutDashboard,
    Building2,
    MapPin,
    CreditCard,
    BadgeCheck,
    Wallet,
    Users,
    BookOpen,
    Star,
    Edit3,
    Settings,
    LogOut,
    CheckCircle
} from "lucide-react";

export default function SellerDashboard() {
    const router = useRouter();
    const [sellerData, setSellerData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [gstDetails, setGstDetails] = useState<any>(null);

    useEffect(() => {
        // Load seller data from local storage
        const storedData = localStorage.getItem("sm_new_seller");
        if (storedData) {
            const data = JSON.parse(storedData);
            setSellerData(data);

            // Fetch GST details if GST Number exists
            if (data.gstNumber) {
                fetch(`/api/verification/gst?gst=${data.gstNumber}`)
                    .then(res => res.json())
                    .then(resData => {
                        if (resData.status === 'Success') {
                            setGstDetails(resData);
                        }
                    })
                    .catch(err => console.error("Failed to load GST details", err));
            }
        } else {
            // Redirect to register if no data found
            router.push("/seller/register");
        }
        setLoading(false);
    }, [router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2D6DF6]"></div>
            </div>
        );
    }

    if (!sellerData) return null;

    return (
        <div className="min-h-screen flex flex-col bg-[#F8F9FB]">
            <Navbar />

            <main className="flex-grow">
                {/* Dashboard Header */}
                <section className="bg-gradient-to-br from-[#1A1F36] to-[#0f1420] text-white pt-12 pb-32 px-4 md:px-8 relative overflow-hidden">
                    {/* Decorative Blobs */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-[#2D6DF6] rounded-full filter blur-[100px] opacity-20 -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#00B894] rounded-full filter blur-[80px] opacity-10 translate-y-1/2 -translate-x-1/4"></div>

                    <div className="max-w-7xl mx-auto relative z-10">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-medium backdrop-blur-sm border border-white/10 text-blue-200">
                                        Seller Dashboard
                                    </span>
                                    {sellerData.id && (
                                        <span className="px-3 py-1 bg-[#00B894]/20 rounded-full text-xs font-medium backdrop-blur-sm border border-[#00B894]/30 text-[#00B894]">
                                            ID: {sellerData.id}
                                        </span>
                                    )}
                                </div>
                                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                                    Welcome, {sellerData.storeName || sellerData.fullName}
                                </h1>
                                <p className="text-gray-400 flex items-center gap-2">
                                    <BadgeCheck className="w-5 h-5 text-[#2D6DF6]" />
                                    Verified {sellerData.businessType === 'institute' ? 'Institute' : sellerData.businessType === 'company' ? 'Company' : 'Instructor'} Account
                                </p>
                            </div>


                            {/* Buttons Removed */}

                        </div>
                    </div>
                </section>

                {/* Main Content Info */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-16 pb-20 relative z-20">

                    {/* Stats Grid - Mock Data */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {[
                            { label: "Total Revenue", value: "₹0.00", icon: Wallet, color: "text-green-500", bg: "bg-green-50" },
                            { label: "Active Courses", value: "0", icon: BookOpen, color: "text-blue-500", bg: "bg-blue-50" },
                            { label: "Total Students", value: "0", icon: Users, color: "text-purple-500", bg: "bg-purple-50" },
                            { label: "Average Rating", value: "N/A", icon: Star, color: "text-orange-500", bg: "bg-orange-50" },
                        ].map((stat, idx) => (
                            <div key={idx} className="bg-white rounded-2xl p-6 shadow-lg shadow-gray-200/50 border border-gray-100 flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
                                    <stat.icon className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                                    <p className="text-xl font-bold text-[#1A1F36]">{stat.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column: Profile Card */}
                        <div className="lg:col-span-1 space-y-8">
                            <div className="bg-white rounded-[2rem] shadow-xl p-8 border border-gray-100 relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-blue-50 to-indigo-50"></div>
                                <div className="relative">
                                    <div className="w-24 h-24 rounded-full bg-white p-1 shadow-lg mx-auto mb-4">
                                        <div className="w-full h-full rounded-full bg-gradient-to-br from-[#2D6DF6] to-[#00B894] flex items-center justify-center text-3xl font-bold text-white uppercase">
                                            {sellerData.storeName?.[0] || sellerData.fullName?.[0]}
                                        </div>
                                    </div>

                                    <div className="text-center mb-8">
                                        <h2 className="text-xl font-bold text-[#1A1F36]">{sellerData.fullName}</h2>
                                        <p className="text-sm text-gray-500">{sellerData.email}</p>
                                        <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-full border border-green-200">
                                            <CheckCircle className="w-3 h-3" />
                                            Active Seller
                                        </div>
                                    </div>

                                    <div className="space-y-4 pt-6 border-t border-gray-100">
                                        <div className="flex items-center gap-3 text-sm text-gray-600">
                                            <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">
                                                <Building2 className="w-4 h-4 text-gray-400" />
                                            </div>
                                            <div className="truncate">
                                                <p className="text-xs text-gray-400">Business Type</p>
                                                <p className="font-medium text-[#1A1F36] capitalize">{sellerData.businessType}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-gray-600">
                                            <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">
                                                <MapPin className="w-4 h-4 text-gray-400" />
                                            </div>
                                            <div className="truncate">
                                                <p className="text-xs text-gray-400">Location</p>
                                                <p className="font-medium text-[#1A1F36]">{sellerData.city}, {sellerData.state}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-gray-600">
                                            <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">
                                                <CreditCard className="w-4 h-4 text-gray-400" />
                                            </div>
                                            <div className="truncate">
                                                <p className="text-xs text-gray-400">Bank Status</p>
                                                <p className="font-medium text-green-600">Verified</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Detailed Info Sections */}
                        <div className="lg:col-span-2 space-y-8">

                            {/* Business Info */}
                            <div className="bg-white rounded-[2rem] shadow-xl p-8 border border-gray-100">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#2D6DF6]">
                                            <Building2 className="w-5 h-5" />
                                        </div>
                                        <h3 className="text-xl font-bold text-[#1A1F36]">Business Information</h3>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <DetailItem label="Institute / Creator Name" value={sellerData.storeName} />
                                    <DetailItem label="GST Number" value={sellerData.gstNumber} />
                                    <DetailItem label="PAN Number" value={sellerData.panNumber || "Not Provided"} />
                                    <DetailItem label="Registration Date" value={new Date(sellerData.registeredAt).toLocaleDateString()} />
                                </div>

                                {gstDetails && (
                                    <div className="mt-6 pt-6 border-t border-gray-100">
                                        <h4 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider flex items-center gap-2">
                                            <CheckCircle className="w-4 h-4 text-green-500" />
                                            Official GST Registry Details
                                        </h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-xl border border-gray-100">
                                            <DetailItem label="Legal Name" value={gstDetails.legal_name_of_business} />
                                            <DetailItem label="Trade Name" value={gstDetails.trade_name_of_business} />
                                            <DetailItem label="Taxpayer Type" value={gstDetails.taxpayer_type} />
                                            <DetailItem label="Status" value={gstDetails.gst_in_status} />
                                            <div className="md:col-span-2">
                                                <DetailItem label="Registered Address" value={gstDetails.principal_place_address} />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Address & Contact */}
                            <div className="bg-white rounded-[2rem] shadow-xl p-8 border border-gray-100">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
                                            <MapPin className="w-5 h-5" />
                                        </div>
                                        <h3 className="text-xl font-bold text-[#1A1F36]">Address & Contact</h3>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <DetailItem label="Full Name" value={sellerData.fullName} />
                                    <DetailItem label="Phone Number" value={sellerData.mobile} />
                                    <DetailItem label="Email Address" value={sellerData.email} />
                                    <div className="md:col-span-2">
                                        <DetailItem
                                            label="Pickup Address"
                                            value={`${sellerData.addressLine1}, ${sellerData.addressLine2 ? sellerData.addressLine2 + ', ' : ''}${sellerData.city}, ${sellerData.state} - ${sellerData.pincode}`}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Bank Account */}
                            <div className="bg-white rounded-[2rem] shadow-xl p-8 border border-gray-100">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                                            <CreditCard className="w-5 h-5" />
                                        </div>
                                        <h3 className="text-xl font-bold text-[#1A1F36]">Payout Details</h3>
                                    </div>
                                    <div className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-md border border-green-200 uppercase tracking-wide">
                                        Verified
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-xl border border-gray-100">
                                    <DetailItem label="Account Holder" value={sellerData.accountHolderName} />
                                    <DetailItem label="Bank Name" value={sellerData.bankName} />
                                    <DetailItem label="Account Number" value={maskAccountNumber(sellerData.accountNumber)} />
                                    <DetailItem label="IFSC Code" value={sellerData.ifscCode} />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

function DetailItem({ label, value }: { label: string, value: string }) {
    return (
        <div>
            <p className="text-xs text-gray-400 font-medium mb-1 uppercase tracking-wide">{label}</p>
            <p className="text-[#1A1F36] font-medium text-base break-words">{value}</p>
        </div>
    );
}

function maskAccountNumber(accNum: string) {
    if (!accNum) return "****";
    const last4 = accNum.slice(-4);
    return `**** **** **** ${last4}`;
}
