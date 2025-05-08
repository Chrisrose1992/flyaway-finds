import React, {useState, useEffect} from 'react';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProfileForm() {
    const [formData, setFormData] = useState({
        title: '',
        firstname: '',
        lastname: '',
        email: '',
        phoneNumber: '',
        birthYear: '',
        birthMonth: '',
        birthDay: '',
        gender: '',
    });

    const [loading, setLoading] = useState(true);

    function parseUserToForm(user: any) {
        let birthYear = '', birthMonth = '', birthDay = '';

        if (user.dob) {
            const dob = new Date(user.dob);
            [birthYear, birthMonth, birthDay] = dob.toISOString().split('T')[0].split('-');
        }

        return {
            title: user.title || '',
            firstname: user.firstname || '',
            lastname: user.lastname || '',
            email: user.email || '',
            phoneNumber: user.phoneNumber || '',
            gender: user.gender || '',
            birthYear,
            birthMonth,
            birthDay,
        };
    }

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await fetch("/api/user/getUser", { credentials: "include" });
                const data = await res.json();

                if (res.ok && data?.userData) {
                    setFormData(parseUserToForm(data.userData));
                }
            } catch (error) {
                console.error("Failed to load profile", error);
            } finally {
                setLoading(false);
            }
        };

        void fetchProfile();
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await fetch("/api/account/updateUser", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok && data?.success) {
                toast.success("Profile updated successfully!");

                const refresh = await fetch("/api/user/getUser", { credentials: "include" });
                const refreshData = await refresh.json();

                if (refresh.ok && refreshData?.userData) {
                    setFormData(parseUserToForm(refreshData.userData));
                }
            } else {
                toast.error(data.error || "Failed to update profile.");
            }
        } catch (error) {
            console.error("Profile update error:", error);
            toast.error("An error occurred. Please try again.");
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center py-10">
                <p className="text-gray-500 text-lg">Loading your profile...</p>
            </div>
        );
    }

    return (
        <div className="tab-content">
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-gray-200">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">My Profile</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="h-full grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                            <select
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm shadow-sm focus:ring-orange-500 focus:border-orange-500"
                            >
                                <option value="">Please select...</option>
                                <option value="mr">Mr</option>
                                <option value="mrs">Mrs</option>
                                <option value="miss">Miss</option>
                                <option value="dr">Dr</option>
                                <option value="ms">Ms</option>
                                <option value="mx">Mx</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                            <select
                                id="gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm shadow-sm focus:ring-orange-500 focus:border-orange-500"
                            >
                                <option value="">Please select...</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="firstname" className="block text-sm font-medium text-gray-700 mb-1">Firstname</label>
                            <input
                                type="text"
                                name="firstname"
                                value={formData.firstname}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm shadow-sm focus:ring-orange-500 focus:border-orange-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="lastname" className="block text-sm font-medium text-gray-700 mb-1">Surname</label>
                            <input
                                type="text"
                                name="lastname"
                                value={formData.lastname}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm shadow-sm focus:ring-orange-500 focus:border-orange-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm shadow-sm focus:ring-orange-500 focus:border-orange-500"
                            />
                        </div>
                        <div className="relative">
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                            <input
                                type="tel"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm shadow-sm focus:ring-orange-500 focus:border-orange-500"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                            <div className="flex gap-3">
                                <input
                                    type="text"
                                    name="birthDay"
                                    value={formData.birthDay}
                                    onChange={handleChange}
                                    placeholder="DD"
                                    maxLength={2}
                                    className="flex-1 border border-gray-300 rounded-xl px-4 py-3 text-sm shadow-sm focus:ring-orange-500 focus:border-orange-500"
                                />
                                <input
                                    type="text"
                                    name="birthMonth"
                                    value={formData.birthMonth}
                                    onChange={handleChange}
                                    placeholder="MM"
                                    maxLength={2}
                                    className="flex-1 border border-gray-300 rounded-xl px-4 py-3 text-sm shadow-sm focus:ring-orange-500 focus:border-orange-500"
                                />
                                <input
                                    type="text"
                                    name="birthYear"
                                    value={formData.birthYear}
                                    onChange={handleChange}
                                    placeholder="YYYY"
                                    maxLength={4}
                                    className="flex-1 border border-gray-300 rounded-xl px-4 py-3 text-sm shadow-sm focus:ring-orange-500 focus:border-orange-500"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="pt-4 flex justify-end">
                        <button
                            type="submit"
                            className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-full text-sm font-semibold transition shadow-sm"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}