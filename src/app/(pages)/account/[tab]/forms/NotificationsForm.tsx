"use client";

import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function NotificationsForm() {
    const [formData, setFormData] = useState({
        emailNotifications: false,
        smsNotifications: false,
        emailMarketing: false,
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await fetch("/api/user/getSettings", { credentials: "include" });
                const data = await res.json();

                if (res.ok && data?.settingData) {
                    setFormData({
                        emailNotifications: data.settingData.emailNotifications || false,
                        smsNotifications: data.settingData.smsNotifications || false,
                        emailMarketing: data.settingData.emailMarketing || false,
                    });
                }
            } catch (error) {
                console.error("Failed to fetch notification settings", error);
                toast.error("Failed to load settings.");
            } finally {
                setLoading(false);
            }
        };

        void fetchSettings();
    }, []);

    const handleToggle = async (key: keyof typeof formData) => {
        const updated = { ...formData, [key]: !formData[key] };

        try {
            const response = await fetch("/api/account/updateSettings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ [key]: updated[key] }),
            });

            const data = await response.json();

            if (response.ok &&  data?.success) {
                toast.success(data.message);

                const refresh = await fetch("/api/user/getSettings", { credentials: "include" });
                const refreshData = await refresh.json();

                if (refresh.ok && refreshData?.settingData) {
                    setFormData(refreshData.settingData);
                }
            } else {
                toast.error(data.error || "Failed to update setting");
            }
        } catch (error) {
            console.error("Failed to update setting", error);
            toast.error("An error occurred.");
        }
    };

    if (loading) {
        return (
            <div className="py-6 text-center text-gray-500">
                Loading notification settings...
            </div>
        );
    }

    return (
        <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-gray-200 space-y-8">
            <ToastContainer position="top-right" autoClose={3000} />

            <div>
                <h2 className="text-2xl font-bold text-gray-800">Notification Preferences</h2>
                <p className="text-sm text-gray-500 mt-1">Choose how you’d like us to contact you about your bookings and offers.</p>
            </div>

            <div className="space-y-6">
                <div className="flex items-center justify-between border-b pb-4">
                    <div>
                        <p className="font-medium text-gray-700">Email Notifications</p>
                        <p className="text-sm text-gray-500">Get booking updates and alerts by email.</p>
                    </div>
                    <label className="inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={formData.emailNotifications}
                            onChange={() => handleToggle("emailNotifications")}
                        />
                        <div
                            className="relative w-11 h-6 bg-gray-300 rounded-full peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300
                                transition-colors duration-300 peer-checked:bg-orange-500
                                after:content-[''] after:absolute after:top-[2px] after:left-[2px]
                                after:w-5 after:h-5 after:bg-white after:rounded-full after:border after:border-gray-300
                                after:transition-all after:duration-300 peer-checked:after:translate-x-5"
                        />
                    </label>
                </div>
                <div className="flex items-center justify-between border-b pb-4">
                    <div>
                        <p className="font-medium text-gray-700">SMS Notifications</p>
                        <p className="text-sm text-gray-500">Receive essential travel updates to your phone.</p>
                    </div>
                    <label className="inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={formData.smsNotifications}
                            onChange={() => handleToggle("smsNotifications")}
                        />
                        <div
                            className="relative w-11 h-6 bg-gray-300 rounded-full peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300
                                transition-colors duration-300 peer-checked:bg-orange-500
                                after:content-[''] after:absolute after:top-[2px] after:left-[2px]
                                after:w-5 after:h-5 after:bg-white after:rounded-full after:border after:border-gray-300
                                after:transition-all after:duration-300 peer-checked:after:translate-x-5"
                        />
                    </label>
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        <p className="font-medium text-gray-700">Marketing Emails</p>
                        <p className="text-sm text-gray-500">Get exclusive deals, promo codes, and travel inspiration.</p>
                    </div>
                    <label className="inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={formData.emailMarketing}
                            onChange={() => handleToggle("emailMarketing")}
                        />
                        <div
                            className="relative w-11 h-6 bg-gray-300 rounded-full peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300
                                transition-colors duration-300 peer-checked:bg-orange-500
                                after:content-[''] after:absolute after:top-[2px] after:left-[2px]
                                after:w-5 after:h-5 after:bg-white after:rounded-full after:border after:border-gray-300
                                after:transition-all after:duration-300 peer-checked:after:translate-x-5"
                        />
                    </label>
                </div>
            </div>

        </div>
    );
}
