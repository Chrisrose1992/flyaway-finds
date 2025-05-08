"use client";

import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SecurityForm() {
    const [formData, setFormData] = useState({
        emailVerified: false,
        twoFactorEnabled: false,
    });

    const [activities, setActivities] = useState<ActivityType[]>([]);

    type ActivityType = {
        ip: string;
        device: string;
        browser: string;
        os: string;
        location: string;
        lastLoginAt: string;
    };

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSecurityData = async () => {
            try {
                const [settingsRes, activityRes] = await Promise.all([
                    fetch("/api/user/getSettings", { credentials: "include" }),
                    fetch("/api/user/getActivity", { credentials: "include" })
                ]);

                const settingsData = await settingsRes.json();
                const activityJson = await activityRes.json();

                if (settingsRes.ok && settingsData?.settingData) {
                    setFormData({
                        emailVerified: settingsData.settingData.emailVerified,
                        twoFactorEnabled: settingsData.settingData.twoFactorEnabled
                    });
                }

                if (activityRes.ok && Array.isArray(activityJson.activityData)) {
                    const formatted = activityJson.activityData.map((item: any) => ({
                        ip: item.ipAddress,
                        device: item.device,
                        browser: item.browser,
                        os: item.os,
                        location: item.location,
                        lastLoginAt: item.lastLoginAt,
                    }));

                    setActivities(formatted);
                }
            } catch (err) {
                console.error("Failed to fetch security data", err);
            } finally {
                setLoading(false);
            }
        };

        void fetchSecurityData();
    }, []);

    const handleToggle = async (key: keyof typeof formData) => {
        const updated = { ...formData, [key]: !formData[key] };

        try {
            const response = await fetch("/api/account/update2fa", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ [key]: updated[key] }),
            });

            const data = await response.json();

            if (response.ok && data?.success) {
                toast.success(`${key === "twoFactorEnabled" ? "2FA" : "Setting"} updated!`);

                const refresh = await fetch("/api/user/getSettings", { credentials: "include" });
                const refreshData = await refresh.json();

                if (refresh.ok && refreshData?.settingData) {
                    setFormData(refreshData.settingData);
                }
            } else {
                toast.error(data.error || "Failed to update setting");
            }
        } catch (error) {
            console.error("Update setting failed:", error);
            toast.error("An error occurred.");
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center py-8">
                <p className="text-gray-500">Loading security settings...</p>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-gray-200 space-y-8">
            <ToastContainer position="top-right" autoClose={3000} />

            <div>
                <h2 className="text-2xl font-bold text-gray-800">Security</h2>
                <p className="text-sm text-gray-500 mt-1">Manage your account protection and verification preferences.</p>
            </div>

            <div className="space-y-6">
                <div className="flex items-center justify-between border-b pb-4">
                    <div>
                        <p className="font-medium text-gray-700">Email Verified</p>
                        <p className="text-sm text-gray-500">Your email must be verified to secure your account.</p>
                    </div>
                    <span className={`text-sm font-semibold px-3 py-1 rounded-full ${
                        formData.emailVerified ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
                    }`}>
            {formData.emailVerified ? "Verified" : "Not Verified"}
          </span>
                </div>
                <div className="flex items-center justify-between border-b pb-4">
                    <div>
                        <p className="font-medium text-gray-700">Two-Factor Authentication</p>
                        <p className="text-sm text-gray-500">Add an extra layer of protection to your login process.</p>
                    </div>
                    <label className="inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={formData.twoFactorEnabled}
                            onChange={() => handleToggle("twoFactorEnabled")}
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
            <div className="pt-2">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h3>
                {activities.length > 0 ? (
                    <div className="space-y-4">
                        {activities.map((activity, index) => (
                            <div
                                key={index}
                                className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm text-gray-700 space-y-1"
                            >
                                <div className="flex justify-between"><span className="font-medium">IP:</span> <span>{activity.ip}</span></div>
                                <div className="flex justify-between"><span className="font-medium">Device:</span> <span>{activity.device} <span className="text-gray-500">({activity.os})</span></span></div>
                                <div className="flex justify-between"><span className="font-medium">Browser:</span> <span>{activity.browser}</span></div>
                                <div className="flex justify-between"><span className="font-medium">Location:</span> <span>{activity.location}</span></div>
                                <div className="flex justify-between"><span className="font-medium">Login Time:</span> <span>{new Date(activity.lastLoginAt).toLocaleString()}</span></div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-gray-500">No recent activity found.</p>
                )}
            </div>
        </div>
    );
}
