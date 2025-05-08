'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Logo from '@/components/Logo';

export default function Signup() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        firstname: "",
        lastname: "",
        marketing: false,
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, type, checked, value } = event.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`/api/auth/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            setLoading(false);

            if (response.ok) {
                if(data.success) {
                    toast.success("Sign up successful!");
                    setFormData({ email: "", password: "", firstname: "", lastname: "", marketing: false });
                    router.push("/auth/verify-email");
                } else {
                    toast.error(data.error);
                }
            }
        } catch (error) {
            setLoading(false);
            toast.error("An error occurred. Please try again.");
        }
    };

    return (
        <div className="flex h-screen">
            <div className="hidden md:flex w-1/2 relative">
                <Image
                    src="/images/wooden-bridge.jpg"
                    alt="Holiday Destination"
                    layout="fill"
                    objectFit="cover"
                />
            </div>
            <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white">
                <div className="w-full max-w-md space-y-6">
                    <div className="flex justify-center">
                        <Logo />
                    </div>
                    <h2 className="text-center text-2xl font-bold text-gray-800">Create Your Account</h2>
                    <p className="text-center text-gray-500">Join us to enjoy a personalized travel experience.</p>
                    <ToastContainer position="top-right" autoClose={3000} />
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium text-gray-700">First Name</label>
                                <input
                                    type="text"
                                    name="firstname"
                                    value={formData.firstname}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500" required />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700">Last Name</label>
                                <input
                                    type="text"
                                    name="lastname"
                                    value={formData.lastname}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500" required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500" required
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500" required
                            />
                        </div>

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="marketing"
                                checked={formData.marketing}
                                onChange={handleChange}
                                className="mr-2"
                            />
                            <span className="text-sm text-gray-700">I agree to receive marketing emails.</span>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-orange-500 text-white p-2 rounded-md hover:bg-orange-600 transition"
                            disabled={loading}
                        >
                            {loading ? "Signing up..." : "Sign Up"}
                        </button>
                    </form>
                    <div className="flex items-center my-6 mt-6">
                        <hr className="flex-grow border-gray-300"/>
                        <span className="px-4 text-gray-500 text-sm">OR SIGNUP WITH</span>
                        <hr className="flex-grow border-gray-300"/>
                    </div>

                    <div className="flex justify-center space-x-4">
                        <button className="flex items-center space-x-2 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100">
                            <Image src="/images/google.png" width={20} height={20} alt="Google" />
                            <span>Google</span>
                        </button>
                        <button className="flex items-center space-x-2 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100">
                            <Image src="/images/facebook.png" width={20} height={20} alt="Facebook" />
                            <span>Facebook</span>
                        </button>
                    </div>
                    <div className="text-center text-sm text-gray-500">
                        Already have an account? <Link href="/auth/login" className="text-orange-500 hover:underline">Log in</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
