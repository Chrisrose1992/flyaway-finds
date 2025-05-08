'use client';

import React, { useState, useEffect  } from "react";
import Image from 'next/image';
import Link from 'next/link';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from '@/components/Logo';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';


export default function LoginPage() {
    const router = useRouter();
    const { setUser } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        remember: false,
    });

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch("/api/auth/getRemembered");
                const data = await response.json();

                if (data.email) {
                    setFormData((prevData) => ({
                        ...prevData,
                        email: data.email,
                        remember: true,
                    }));
                }
            } catch (error) {
                console.error("Failed to fetch rememberedMe cookie:", error);
            }
        })();
    }, []);

    const [loading, setLoading] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, type, checked, value } = event.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
                credentials: "include",
            });

            const data = await response.json();
            setLoading(false);

            if (response.ok) {
                if (data.error) {
                    toast.error(data.error || "Login failed. Please try again.");
                    if (data.redirect) {
                        router.push(data.redirect);
                    }
                } else {
                    const userResponse = await fetch("/api/getUser", { credentials: "include" });
                    const data = await userResponse.json();

                    const userData = data.userData.user;

                    if (userResponse.ok && userData) {
                        console.log("Updated user data:", userData);
                        setUser(userData);
                    } else {
                        console.warn("Failed to fetch updated user data", userData);
                    }

                    toast.success(data.message);
                    router.push(data.redirect || '/');
                }
            }
        } catch (error) {
            setLoading(false);
            toast.error("An error occurred. Please try again later.");
        }
    };


    return (
        <div className="flex h-screen">
            <ToastContainer position="top-right" autoClose={ 3000 }/>
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
                    <h2 className="text-center text-2xl font-bold text-gray-800">Login to Your Account</h2>
                    <p className="text-center text-gray-500">Manage your bookings and saved holidays</p>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                name="email"
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                name="password"
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="remember"
                                    className="mr-2"
                                    checked={formData.remember}
                                    onChange={handleChange}
                                />
                                <span>Remember Me</span>
                            </div>
                            <Link href="/auth/forgot-password" className="text-orange-500 hover:underline">Forgot Password?</Link>
                        </div>
                        <button
                            className="w-full bg-orange-500 text-white p-2 rounded-md hover:bg-orange-600 transition"
                            disabled={loading}
                            type="submit"
                        >
                            Log In
                        </button>
                    </form>
                    <div className="flex items-center my-6 mt-6">
                        <hr className="flex-grow border-gray-300"/>
                        <span className="px-4 text-gray-500 text-sm">OR LOGIN WITH</span>
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
                        Don’t have an account? <Link href="/auth/signup" className="text-orange-500 hover:underline">Create an account</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
