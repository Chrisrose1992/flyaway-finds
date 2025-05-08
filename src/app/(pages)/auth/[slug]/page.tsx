"use client";

import {useParams, useRouter} from 'next/navigation';
import React, {useState, useEffect} from "react";
import Image from "next/image";
import Logo from "@/components/Logo";
import {toast, ToastContainer} from "react-toastify";
import { handleChange, handlePaste, handleKeyDown } from '@/utils/otpHandlers'

export default function Auth() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
   const { slug } = useParams<{ slug: string}>();

    const authData = new Map([
        ["verify-email", {
            apiUrl: "/api/auth/verify-email",
            resendEmailType: "verifyEmail",
            title: "Verify Your Email",
        }],
        ["unlock-account", {
            apiUrl: "/api/auth/unlock-account",
            resendEmailType: "unlockAccount",
            title: "Unlock Account",
        }],
        ["2fa", {
            apiUrl: "/api/auth/2fa",
            resendEmailType: "securityCode",
            title: "Two Factor",
        }],
    ]);

   if (!slug || !authData.has(slug)) {
       return router.push('/auth/login');
   }

    const { apiUrl, resendEmailType, title } = authData.get(slug)!;

    useEffect(() => {
        const fetchAndSetEmail = async () => {
            try {
                const response = await fetch(`/api/getCookie?cookieName=verifyEmail`);

                const data = await response.json();
                const emailString = data?.verifyEmail;

                if (!emailString) {
                    return router.push("/auth/login");
                }

                try {
                    const parsedData = JSON.parse(emailString);
                    if (parsedData?.email) {
                        setEmail(parsedData.email);
                    } else {
                        console.error("Email field missing in parsed data:", parsedData);
                    }
                } catch (error) {
                    console.error("Error parsing cookie:", error);
                    toast.error("Invalid email data received.");
                }

            } catch (error) {
                console.error("Error fetching cookie:", error);
                toast.error("Something went wrong. Please try again.");
            }
        };

        fetchAndSetEmail();
    }, []);


    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const otpCode = otp.join("");

        try {
            const response = await fetch(`${apiUrl}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ otpCode }),
                credentials: "include",
            });

            const data = await response.json();

            if (response.ok) {
                toast.success("Email verified successfully!");
                router.push("/auth/email-verified");
            } else {
                toast.error(data.error || "Invalid OTP, please try again.");
                if (data.redirect) {
                    router.push(data.redirect);
                }
            }
        } catch (error: any) {
            console.error("Verification error:", error);
            toast.error(error.message || "Something went wrong. Please try again.");
        }
    };

    const handleResendEmail = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await fetch(`/api/auth/resend-email`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ type: resendEmailType }),
                credentials: "include",
            });

            const data = await response.json();

            if (response.ok) {
                toast.success("Email verified Sent!");
            }

        } catch (error) {
            console.error("Re0send verification error:", error);
            toast.error("Something went wrong. Please try again.");
        }
    }

    return (
        <div className="flex h-screen">
            <div className="hidden md:flex w-1/2 relative">
                <Image
                    src="/images/email-banner.jpg"
                    alt="Email Verification"
                    layout="fill"
                    objectFit="cover"
                />
            </div>
            <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white">
                <div className="w-full max-w-md space-y-6">
                    <div className="flex justify-center">
                        <Logo />
                    </div>
                    <h2 className="text-center text-2xl font-bold text-gray-800">{title}</h2>
                    <p className="text-center text-gray-500">
                        We've sent a verification code to:
                    </p>
                    <p className="text-lg font-bold text-gray-900 text-center">
                        {email || "No email found"}
                    </p>
                    <ToastContainer position="top-right" autoClose={3000} />
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="flex justify-center gap-2 mt-4">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    id={`otp-${index}`}
                                    name={`otp-${index}`}
                                    className="p-3 rounded-md text-center border border-gray-300 focus:ring-orange-500 focus:border-orange-500 h-14 w-14 text-lg"
                                    type="text"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleChange(index, e, otp, setOtp)}
                                    onKeyDown={(e) => handleKeyDown(index, e, otp, setOtp)}
                                    onPaste={index === 0 ? (e) => handlePaste(e, setOtp) : undefined}
                                />
                            ))}
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-orange-500 text-white p-2 rounded-md hover:bg-orange-600 transition"
                        >
                            Verify Email
                        </button>
                    </form>
                    <div className="text-center text-gray-600">
                        <p>Didn't receive a code?</p>
                        <button
                            onClick={handleResendEmail}
                            className="text-orange-500 font-semibold hover:underline cursor-pointer"
                        >
                            Resend Verification Code
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}