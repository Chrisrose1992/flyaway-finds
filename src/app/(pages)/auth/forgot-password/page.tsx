"use client";

import React, { useState } from "react";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import Logo from "@/components/Logo";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

        try {
            const response = await fetch("/api/auth/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();
            setLoading(false);

            if (response.ok) {
                toast.success("Password reset link sent successfully!");
                setEmail("");
            } else {
                toast.error(data.error || "Something went wrong. Please try again.");
            }
        } catch (error) {
            setLoading(false);
            toast.error("An error occurred. Please try again later.");
        }
    };

    return (
        <div className="flex h-screen">
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="hidden md:flex w-1/2 relative">
                <Image
                    src="/images/wooden-bridge.jpg"
                    alt="Forgot Password"
                    layout="fill"
                    objectFit="cover"
                />
            </div>
            <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white">
                <div className="w-full max-w-md space-y-6">
                    <div className="flex justify-center">
                        <Logo />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800 text-center">Forgot Password?</h1>
                    <p className="text-center text-gray-500">
                        Enter your email address below to receive a password reset link.
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-gray-700">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-orange-500 text-white p-3 rounded-md hover:bg-orange-600 transition"
                            disabled={loading}
                        >
                            {loading ? "Sending..." : "Send Reset Link"}
                        </button>
                    </form>
                    <div className="text-center text-sm text-gray-500">
                        Remembered your password?
                        <Link href="/auth/login" className="text-orange-500 hover:underline"> Log In</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
