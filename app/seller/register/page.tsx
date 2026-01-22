"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CheckCircle, AlertCircle, Loader2, Building2, User, MapPin, CreditCard, ChevronRight, Check } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";

export default function SellerRegistration() {
    const router = useRouter();
    const { user } = useAuth();
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [isGstVerified, setIsGstVerified] = useState(false);
    const [isBankVerified, setIsBankVerified] = useState(false);
    const [verifyingGst, setVerifyingGst] = useState(false);
    const [verifyingBank, setVerifyingBank] = useState(false);
    const [verificationErrors, setVerificationErrors] = useState({ gst: "", bank: "" });
    const [gstDetails, setGstDetails] = useState<any>(null);
    const [bankDetails, setBankDetails] = useState<any>(null);

    // Form State
    const [formData, setFormData] = useState({
        // Basic
        fullName: "",
        email: "",
        mobile: "",
        password: "",
        // Business
        storeName: "",
        businessType: "individual",
        gstNumber: "",
        panNumber: "",
        // Address
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        pincode: "",
        // Bank
        accountHolderName: "",
        bankName: "",
        accountNumber: "",
        ifscCode: "",
        // Terms
        termsAccepted: false,
        accuracyConfirmed: false
    });

    // Mock States for Dropdown
    const states = [
        "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat",
        "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh",
        "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
        "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
        "Uttarakhand", "West Bengal", "Delhi", "Jammu and Kashmir"
    ];

    // Pre-fill user data if logged in
    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                fullName: user.name || "",
                email: user.email || ""
            }));
        }
    }, [user]);

    // Developer Bypass
    useEffect(() => {
        if (formData.storeName === "DEV_SKIP") {
            setIsGstVerified(true);
            setIsBankVerified(true);
        }
    }, [formData.storeName]);

    const handleInputChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    // Verification Handlers
    const verifyGst = async () => {
        if (!formData.gstNumber) return;
        setVerifyingGst(true);
        setVerificationErrors(prev => ({ ...prev, gst: "" }));

        try {
            const res = await fetch(`/api/verification/gst?gst=${formData.gstNumber}`);
            const data = await res.json();
            if (data.status === 'Success') {
                setIsGstVerified(true);
                setGstDetails(data);
                // Auto-fill Store Name if available and empty
                if (data.trade_name_of_business && !formData.storeName) {
                    handleInputChange('storeName', data.trade_name_of_business);
                }
            } else {
                setIsGstVerified(false);
                setVerificationErrors(prev => ({ ...prev, gst: data.message || "GST Verification Failed" }));
            }
        } catch (error) {
            console.error("GST Verify Error", error);
            setVerificationErrors(prev => ({ ...prev, gst: "Verification service unavailable" }));
        } finally {
            setVerifyingGst(false);
        }
    };

    const verifyBank = async () => {
        if (!formData.accountNumber || !formData.ifscCode) return;
        setVerifyingBank(true);
        setVerificationErrors(prev => ({ ...prev, bank: "" }));

        try {
            const res = await fetch(`/api/verification/bank?account_number=${formData.accountNumber}&ifsc=${formData.ifscCode}`);
            const data = await res.json();
            if (data.status === 'Success') {
                setIsBankVerified(true);
                setBankDetails(data);
                // Use 'nameAtBank' from the API response
                if (data.nameAtBank) {
                    handleInputChange('accountHolderName', data.nameAtBank);
                }
            } else {
                setIsBankVerified(false);
                setVerificationErrors(prev => ({ ...prev, bank: data.message || "Bank Verification Failed" }));
            }
        } catch (error) {
            console.error("Bank Verify Error", error);
            setVerificationErrors(prev => ({ ...prev, bank: "Verification service unavailable" }));
        } finally {
            setVerifyingBank(false);
        }
    };

    const scrollToTop = () => {
        const element = document.getElementById("registration");
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    const [errors, setErrors] = useState({ email: "", mobile: "" });

    const validateStep1 = () => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const mobileRegex = /^[6-9]\d{9}$/;
        let isValid = true;
        const newErrors = { email: "", mobile: "" };

        if (formData.email && !emailRegex.test(formData.email)) {
            newErrors.email = "Please enter a valid email address.";
            isValid = false;
        }
        if (formData.mobile && !mobileRegex.test(formData.mobile)) {
            newErrors.mobile = "Please enter a valid 10-digit mobile number.";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleNext = () => {
        if (step === 1) {
            if (!validateStep1()) return;
        }
        setStep(prev => prev + 1);
        setTimeout(scrollToTop, 100);
    };

    const handleBack = () => {
        setStep(prev => prev - 1);
        setTimeout(scrollToTop, 100);
    };

    const handleSubmit = async () => {
        setIsLoading(true);

        // Simulate API Call
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Save to LocalStorage
        const sellerData = {
            ...formData,
            id: `SKVER-${Math.floor(100000 + Math.random() * 900000)}`,
            registeredAt: new Date().toISOString()
        };
        localStorage.setItem("sm_new_seller", JSON.stringify(sellerData));

        setIsLoading(false);
        setStep(5); // Success Step
        setTimeout(scrollToTop, 100);
    };

    // Render Steps
    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <div className="space-y-6 animate-[fadeIn_0.5s_ease-out]">
                        <h2 className="text-2xl font-bold text-[#1A1F36]">Basic Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-[#1A1F36] mb-2">Full Name</label>
                                <input
                                    type="text"
                                    value={formData.fullName}
                                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                                    // Auto-focus first input
                                    autoFocus
                                    className="w-full py-3 px-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2D6DF6] focus:border-transparent outline-none transition-all"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-[#1A1F36] mb-2">Email Address</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => {
                                        handleInputChange('email', e.target.value);
                                        if (errors.email) setErrors(prev => ({ ...prev, email: "" }));
                                    }}
                                    className={`w-full py-3 px-4 border ${errors.email ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:ring-[#2D6DF6]'} rounded-lg focus:ring-2 focus:border-transparent outline-none transition-all`}
                                    placeholder="john@example.com"
                                />
                                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-[#1A1F36] mb-2">Mobile Number</label>
                                <input
                                    type="tel"
                                    value={formData.mobile}
                                    onChange={(e) => {
                                        const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                                        handleInputChange('mobile', val);
                                        if (errors.mobile) setErrors(prev => ({ ...prev, mobile: "" }));
                                    }}
                                    className={`w-full py-3 px-4 border ${errors.mobile ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:ring-[#2D6DF6]'} rounded-lg focus:ring-2 focus:border-transparent outline-none transition-all`}
                                    placeholder="9876543210"
                                />
                                {errors.mobile && <p className="text-xs text-red-500 mt-1">{errors.mobile}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-[#1A1F36] mb-2">Password</label>
                                <input
                                    type="password"
                                    value={formData.password}
                                    onChange={(e) => handleInputChange('password', e.target.value)}
                                    className="w-full py-3 px-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2D6DF6] focus:border-transparent outline-none transition-all"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="space-y-6 animate-[fadeIn_0.5s_ease-out]">
                        <h2 className="text-2xl font-bold text-[#1A1F36]">Business Information</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-[#1A1F36] mb-2">Institute / Creator Name</label>
                                <input
                                    type="text"
                                    value={formData.storeName}
                                    onChange={(e) => handleInputChange('storeName', e.target.value)}
                                    autoFocus
                                    className="w-full py-3 px-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2D6DF6] focus:border-transparent outline-none transition-all"
                                    placeholder="e.g. CodeMaster Academy"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-[#1A1F36] mb-2">Teaching Profile</label>
                                <select
                                    value={formData.businessType}
                                    onChange={(e) => handleInputChange('businessType', e.target.value)}
                                    className="w-full py-3 px-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2D6DF6] focus:border-transparent outline-none transition-all bg-white"
                                >
                                    <option value="individual">Individual Instructor</option>
                                    <option value="institute">Training Institute</option>
                                    <option value="company">EdTech Company</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-[#1A1F36] mb-2">GST Number</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={formData.gstNumber}
                                            onChange={(e) => handleInputChange('gstNumber', e.target.value.toUpperCase())}
                                            disabled={isGstVerified}
                                            className={`flex-grow py-3 px-4 border ${isGstVerified ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-200'} rounded-lg focus:ring-2 focus:ring-[#2D6DF6] focus:border-transparent outline-none transition-all`}
                                            placeholder="22AAAAA0000A1Z5"
                                        />
                                        {!isGstVerified ? (
                                            <button
                                                onClick={verifyGst}
                                                disabled={verifyingGst || !formData.gstNumber}
                                                className="px-6 py-3 bg-[#1A1F36] text-white rounded-lg font-medium hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                                            >
                                                {verifyingGst ? <Loader2 className="w-5 h-5 animate-spin" /> : "Verify"}
                                            </button>
                                        ) : (
                                            <div className="px-4 py-3 bg-green-100 text-green-700 rounded-lg font-medium flex items-center gap-2">
                                                <CheckCircle className="w-5 h-5" />
                                                Verified
                                            </div>
                                        )}
                                    </div>
                                    {verificationErrors.gst && (
                                        <div className="mt-2 flex items-start gap-2 text-red-500 text-xs">
                                            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                                            <span>{verificationErrors.gst}</span>
                                        </div>
                                    )}
                                    {isGstVerified && gstDetails && (
                                        <div className="mt-6 p-5 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl shadow-sm animate-[fadeIn_0.5s_ease-out]">
                                            <h4 className="font-bold text-green-900 mb-3 flex items-center gap-2 text-sm uppercase tracking-wide">
                                                <Building2 className="w-4 h-4" /> GSTIN Verified Details
                                            </h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 text-sm">
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-semibold text-green-700/70 uppercase tracking-wider mb-0.5">Legal Name</span>
                                                    <span className="font-medium text-green-900">{gstDetails.legal_name_of_business || "N/A"}</span>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-semibold text-green-700/70 uppercase tracking-wider mb-0.5">Trade Name</span>
                                                    <span className="font-medium text-green-900">{gstDetails.trade_name_of_business || "N/A"}</span>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-semibold text-green-700/70 uppercase tracking-wider mb-0.5">Taxpayer Type</span>
                                                    <span className="font-medium text-green-900">{gstDetails.taxpayer_type || "N/A"}</span>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-semibold text-green-700/70 uppercase tracking-wider mb-0.5">Status</span>
                                                    <div className="flex items-center gap-1.5">
                                                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                                        <span className="font-bold text-green-700">{gstDetails.gst_in_status || "Active"}</span>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col md:col-span-2 pt-2 border-t border-green-200/50 mt-1">
                                                    <span className="text-xs font-semibold text-green-700/70 uppercase tracking-wider mb-0.5">Registered Address</span>
                                                    <span className="font-medium text-green-900">{gstDetails.principal_place_address || "N/A"}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-[#1A1F36] mb-2">PAN Number (Optional)</label>
                                    <input
                                        type="text"
                                        value={formData.panNumber}
                                        onChange={(e) => handleInputChange('panNumber', e.target.value.toUpperCase())}
                                        className="w-full py-3 px-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2D6DF6] focus:border-transparent outline-none transition-all"
                                        placeholder="ABCDE1234F"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="space-y-6 animate-[fadeIn_0.5s_ease-out]">
                        <h2 className="text-2xl font-bold text-[#1A1F36]">Pickup Address</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-[#1A1F36] mb-2">Address Line 1</label>
                                <input
                                    type="text"
                                    value={formData.addressLine1}
                                    onChange={(e) => handleInputChange('addressLine1', e.target.value)}
                                    autoFocus
                                    className="w-full py-3 px-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2D6DF6] focus:border-transparent outline-none transition-all"
                                    placeholder="Shop No, Building Name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-[#1A1F36] mb-2">Address Line 2</label>
                                <input
                                    type="text"
                                    value={formData.addressLine2}
                                    onChange={(e) => handleInputChange('addressLine2', e.target.value)}
                                    className="w-full py-3 px-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2D6DF6] focus:border-transparent outline-none transition-all"
                                    placeholder="Street, Area"
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-[#1A1F36] mb-2">City</label>
                                    <input
                                        type="text"
                                        value={formData.city}
                                        onChange={(e) => handleInputChange('city', e.target.value)}
                                        className="w-full py-3 px-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2D6DF6] focus:border-transparent outline-none transition-all"
                                        placeholder="City"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-[#1A1F36] mb-2">State</label>
                                    <select
                                        value={formData.state}
                                        onChange={(e) => handleInputChange('state', e.target.value)}
                                        className="w-full py-3 px-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2D6DF6] focus:border-transparent outline-none transition-all bg-white"
                                    >
                                        <option value="">Select State</option>
                                        {states.map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-[#1A1F36] mb-2">Pincode</label>
                                    <input
                                        type="text"
                                        value={formData.pincode}
                                        onChange={(e) => handleInputChange('pincode', e.target.value)}
                                        className="w-full py-3 px-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2D6DF6] focus:border-transparent outline-none transition-all"
                                        placeholder="560001"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div className="space-y-6 animate-[fadeIn_0.5s_ease-out]">
                        <h2 className="text-2xl font-bold text-[#1A1F36]">Bank Details</h2>
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-[#1A1F36] mb-2">Account Number</label>
                                    <input
                                        type="text"
                                        value={formData.accountNumber}
                                        onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                                        autoFocus
                                        className="w-full py-3 px-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2D6DF6] focus:border-transparent outline-none transition-all"
                                        placeholder="Account No."
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-[#1A1F36] mb-2">IFSC Code</label>
                                    <input
                                        type="text"
                                        value={formData.ifscCode}
                                        onChange={(e) => handleInputChange('ifscCode', e.target.value.toUpperCase())}
                                        className="w-full py-3 px-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2D6DF6] focus:border-transparent outline-none transition-all"
                                        placeholder="ABCD0001234"
                                        maxLength={11}
                                    />
                                </div>
                            </div>

                            {/* Verification Button for Bank */}
                            <div>
                                {!isBankVerified ? (
                                    <button
                                        onClick={verifyBank}
                                        disabled={verifyingBank || !formData.accountNumber || !formData.ifscCode}
                                        className="w-full py-3 bg-[#1A1F36] text-white rounded-lg font-medium hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                                    >
                                        {verifyingBank && <Loader2 className="w-5 h-5 animate-spin" />}
                                        Verify Bank Account
                                    </button>
                                ) : (
                                    <div className="w-full py-3 bg-green-100 text-green-700 rounded-lg font-medium flex justify-center items-center gap-2 border border-green-200">
                                        <CheckCircle className="w-5 h-5" />
                                        Bank Account Verified
                                    </div>
                                )}
                                {verificationErrors.bank && (
                                    <div className="mt-2 flex items-start gap-2 text-red-500 text-sm justify-center">
                                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                                        <span>{verificationErrors.bank}</span>
                                    </div>
                                )}
                                {isBankVerified && bankDetails && (
                                    <div className="mt-6 p-5 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl shadow-sm animate-[fadeIn_0.5s_ease-out]">
                                        <h4 className="font-bold text-blue-900 mb-3 flex items-center gap-2 text-sm uppercase tracking-wide">
                                            <CreditCard className="w-4 h-4" /> Bank Account Verified
                                        </h4>
                                        <div className="grid grid-cols-1 gap-y-3 text-sm">
                                            <div className="flex flex-col">
                                                <span className="text-xs font-semibold text-blue-700/70 uppercase tracking-wider mb-0.5">Account Holder Name</span>
                                                <div className="flex items-center gap-2">
                                                    <span className="font-bold text-blue-900 text-lg">{bankDetails.nameAtBank || "N/A"}</span>
                                                    <span className="px-2 py-0.5 bg-blue-200 text-blue-800 text-[10px] uppercase font-bold rounded-full">MATCHED</span>
                                                </div>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-xs font-semibold text-blue-700/70 uppercase tracking-wider mb-0.5">Account Number</span>
                                                <span className="font-medium text-blue-900 tracking-widest font-mono">
                                                    •••• •••• {formData.accountNumber ? formData.accountNumber.slice(-4) : "XXXX"}
                                                </span>
                                            </div>
                                            {bankDetails.utr && (
                                                <div className="flex flex-col pt-2 border-t border-blue-200/50 mt-1">
                                                    <span className="text-xs font-semibold text-blue-700/70 uppercase tracking-wider mb-0.5">Verification Reference (UTR)</span>
                                                    <span className="font-mono text-xs text-blue-800">{bankDetails.utr}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
                                <div>
                                    <label className="block text-sm font-semibold text-[#1A1F36] mb-2">Account Holder Name</label>
                                    <input
                                        type="text"
                                        value={formData.accountHolderName}
                                        onChange={(e) => handleInputChange('accountHolderName', e.target.value)}
                                        className="w-full py-3 px-4 border border-gray-200 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
                                        readOnly
                                        placeholder="Auto-filled after verification"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-[#1A1F36] mb-2">Bank Name</label>
                                    <input
                                        type="text"
                                        value={formData.bankName}
                                        onChange={(e) => handleInputChange('bankName', e.target.value)}
                                        className="w-full py-3 px-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2D6DF6] focus:border-transparent outline-none transition-all"
                                        placeholder="Bank Name"
                                    />
                                </div>
                            </div>

                            <div className="pt-6 border-t border-gray-100 space-y-4">
                                <label className="flex items-start gap-3 cursor-pointer group">
                                    <div className="relative flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={formData.termsAccepted}
                                            onChange={(e) => handleInputChange('termsAccepted', e.target.checked)}
                                            className="w-5 h-5 border-gray-300 rounded text-[#2D6DF6] focus:ring-[#2D6DF6] cursor-pointer"
                                        />
                                    </div>
                                    <span className="text-sm text-gray-600 group-hover:text-[#1A1F36] transition-colors">
                                        I accept the Terms & Conditions and Seller Agreement
                                    </span>
                                </label>
                                <label className="flex items-start gap-3 cursor-pointer group">
                                    <div className="relative flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={formData.accuracyConfirmed}
                                            onChange={(e) => handleInputChange('accuracyConfirmed', e.target.checked)}
                                            className="w-5 h-5 border-gray-300 rounded text-[#2D6DF6] focus:ring-[#2D6DF6] cursor-pointer"
                                        />
                                    </div>
                                    <span className="text-sm text-gray-600 group-hover:text-[#1A1F36] transition-colors">
                                        I confirm that the details provided are accurate and belong to me/my business
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div >
                );
            case 5:
                const sellerId = JSON.parse(localStorage.getItem("sm_new_seller") || "{}").id;
                return (
                    <div className="text-center py-12 animate-[fadeInUp_0.5s_ease-out]">
                        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 animate-[bounce_1s_infinite]">
                            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg">
                                <Check className="w-8 h-8" strokeWidth={3} />
                            </div>
                        </div>
                        <h2 className="text-3xl font-bold text-[#1A1F36] mb-4">Registration Successful!</h2>
                        <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto">
                            Welcome aboard! Your seller account has been created successfully.
                        </p>

                        <div className="bg-[#F8F9FB] p-6 rounded-xl max-w-md mx-auto mb-10 border border-gray-200">
                            <p className="text-sm text-gray-500 mb-2">Your Seller ID</p>
                            <div className="text-2xl font-mono font-bold text-[#2D6DF6] tracking-wider select-all">
                                {sellerId || "SHOMTX-IND-PENDING"}
                            </div>
                        </div>

                        <button
                            onClick={() => router.push('/seller-dashboard')}
                            className="inline-flex items-center gap-2 py-4 px-8 bg-[#2D6DF6] text-white rounded-lg font-bold text-lg hover:bg-[#1a4fd6] transition-all shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-1"
                        >
                            Go to Seller Dashboard
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                );
            default:
                return null;
        }
    };

    const isStepValid = () => {
        if (formData.storeName === "DEV_SKIP") return true;

        switch (step) {
            case 1:
                return formData.fullName && formData.email && formData.mobile && formData.password;
            case 2:
                return formData.storeName && isGstVerified;
            case 3:
                return formData.addressLine1 && formData.city && formData.state && formData.pincode;
            case 4:
                return isBankVerified && formData.termsAccepted && formData.accuracyConfirmed;
            default:
                return false;
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-white to-blue-50">
            <Navbar />

            <main className="flex-grow">
                {/* Seller Hero */}
                <section className="bg-gradient-to-br from-[#2D6DF6] to-[#1a4fd6] text-white py-24">
                    <div className="max-w-[1280px] mx-auto px-4 md:px-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h1 className="text-4xl text-white mb-6">Sell Your Courses on Skillverge</h1>
                                <p className="text-lg text-white/90 mb-12">
                                    Join India's growing EdTech marketplace and earn instantly. Share your knowledge with thousands of eager learners.
                                </p>
                                <a href="#registration" className="inline-block py-4 px-8 text-lg font-medium text-center rounded-lg transition-all duration-[300ms] cursor-pointer no-underline leading-[1.5] bg-white text-[#2D6DF6] hover:bg-[#00B894] hover:text-white">
                                    Start Onboarding
                                </a>
                            </div>
                            <div className="flex items-center justify-center min-h-[300px]">
                                <img
                                    src="/assets/seller_hero_illustration.png"
                                    alt="Become a Seller"
                                    className="w-full max-w-[500px] h-auto object-contain drop-shadow-2xl animate-[float_6s_ease-in-out_infinite]"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Benefits */}
                <section className="py-16 bg-white">
                    <div className="max-w-[1280px] mx-auto px-4 md:px-6">
                        <h2 className="text-3xl font-bold text-center mb-8 text-[#1A1F36]">Why Sell on Skillverge?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                            {[
                                {
                                    icon: "bi-lightning-charge",
                                    title: "Fast Approval",
                                    description: "Get approved within 48 hours and start selling your courses immediately."
                                },
                                {
                                    icon: "bi-currency-dollar",
                                    title: "Weekly Payments",
                                    description: "Receive your earnings every week directly to your bank account."
                                },
                                {
                                    icon: "bi-graph-up-arrow",
                                    title: "Marketplace Reach",
                                    description: "Access thousands of learners actively searching for courses like yours."
                                }
                            ].map((benefit, index) => (
                                <div key={index} className="text-center p-12 bg-[#F8F9FB] rounded-2xl transition-all duration-[300ms] hover:-translate-y-2 hover:shadow-[0_8px_16px_rgba(0,0,0,0.15)]">
                                    <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[#2D6DF6] to-[#1a4fd6] rounded-full flex items-center justify-center">
                                        <i className={`bi ${benefit.icon} text-[2.5rem] text-white`}></i>
                                    </div>
                                    <h3 className="text-xl mb-4 text-[#1A1F36]">{benefit.title}</h3>
                                    <p className="text-base text-gray-600">{benefit.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Metrics */}
                <section className="py-16 bg-gradient-to-br from-[#1A1F36] to-[#0f1420] text-white">
                    <div className="max-w-[1280px] mx-auto px-4 md:px-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            {[
                                { number: "10,000+", label: "Monthly Learners" },
                                { number: "2,000+", label: "Active Sellers" },
                                { number: "500+", label: "Quality Courses" }
                            ].map((metric, index) => (
                                <div key={index} className="text-center p-12 bg-white/10 rounded-2xl backdrop-blur-[10px]">
                                    <div className="text-5xl font-bold text-[#00B894] mb-4">{metric.number}</div>
                                    <div className="text-lg text-white/90">{metric.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <div id="registration" className="max-w-[1000px] mx-auto py-16 px-4 md:px-6">
                    {step < 5 && (
                        /* Progress Header */
                        <div className="mb-12">
                            <h1 className="text-3xl font-bold text-[#1A1F36] mb-8 text-center">Seller Registration</h1>
                            <div className="relative">
                                {/* Track */}
                                <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2 rounded-full z-0"></div>
                                {/* Progress */}
                                <div
                                    className="absolute top-1/2 left-0 h-1 bg-[#2D6DF6] -translate-y-1/2 rounded-full z-0 transition-all duration-500"
                                    style={{ width: `${((step - 1) / 3) * 100}%` }}
                                ></div>

                                {/* Steps */}
                                <div className="relative z-10 flex justify-between">
                                    {[
                                        { num: 1, label: "Basic", icon: User },
                                        { num: 2, label: "Business", icon: Building2 },
                                        { num: 3, label: "Address", icon: MapPin },
                                        { num: 4, label: "Bank", icon: CreditCard }
                                    ].map((s) => (
                                        <div key={s.num} className="flex flex-col items-center">
                                            <div
                                                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300 ${step >= s.num
                                                    ? 'bg-[#2D6DF6] border-[#2D6DF6] text-white shadow-lg scale-110'
                                                    : 'bg-white border-gray-300 text-gray-400'
                                                    }`}
                                            >
                                                {step > s.num ? <Check className="w-5 h-5" /> : <s.icon className="w-5 h-5" />}
                                            </div>
                                            <span className={`mt-2 text-sm font-medium transition-colors ${step >= s.num ? 'text-[#2D6DF6]' : 'text-gray-400'}`}>
                                                {s.label}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Form Card */}
                    <div className="bg-white rounded-[2rem] shadow-2xl p-8 md:p-12 relative overflow-hidden">
                        {/* Decorative background blob */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-bl-[10rem] -z-0 opacity-50" />

                        <div className="relative z-10">
                            {renderStep()}

                            {step < 5 && (
                                <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-100">
                                    <button
                                        onClick={handleBack}
                                        disabled={step === 1 || isLoading}
                                        className={`px-8 py-3 rounded-lg font-medium transition-colors ${step === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-50'
                                            }`}
                                    >
                                        Back
                                    </button>

                                    <button
                                        onClick={step === 4 ? handleSubmit : handleNext}
                                        disabled={!isStepValid() || isLoading}
                                        className={`px-10 py-3 bg-gradient-to-r from-[#2D6DF6] to-[#1a4fd6] text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-blue-500/30 transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none min-w-[160px] flex justify-center items-center`}
                                    >
                                        {isLoading ? (
                                            <Loader2 className="w-6 h-6 animate-spin" />
                                        ) : (
                                            step === 4 ? "Complete Registration" : "Next Step"
                                        )}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
