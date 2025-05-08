"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import Logo from "@/components/Logo";

export default function ResetPassword() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match.");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch("/api/auth/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password: formData.password }),
            });

            const data = await response.json();
            setLoading(false);

            if (response.ok) {
                toast.success("Password reset successfully!");
                router.push("/auth/login");
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
                    alt="Reset Password"
                    layout="fill"
                    objectFit="cover"
                />
            </div>
            <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white">
                <div className="w-full max-w-md space-y-6">
                    <div className="flex justify-center">
                        <Logo />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800 text-center">Reset Password</h1>
                    <p className="text-center text-gray-500">Enter your new password below.</p>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-gray-700">New Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
                                required
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700">Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-orange-500 text-white p-3 rounded-md hover:bg-orange-600 transition"
                            disabled={loading}
                        >
                            {loading ? "Resetting..." : "Reset Password"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}