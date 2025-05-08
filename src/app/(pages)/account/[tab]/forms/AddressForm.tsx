import React, {useState, useEffect} from 'react';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddressForm() {
     const [formData, setFormData] = useState({
        name: '',
        address1: '',
        address2: '',
        city: '',
        zip: '',
        country: '',
    });

     const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAddress = async () => {
            try {
                const res = await fetch("/api/user/getAddress");
                const data = await res.json();

                if (res.ok && data?.addressData) {
                    setFormData(data.addressData);
                }
            } catch (error) {
                console.error("Failed to load address", error);
            } finally {
                setLoading(false);
            }
        };

        void fetchAddress();
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
            const response = await fetch("/api/account/updateAddress", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success("Address updated successfully!");

                const refresh = await fetch("/api/user/getAddress");
                const refreshData = await refresh.json();

                if (refresh.ok && refreshData.addressData) {
                    setFormData(refreshData.addressData);
                }

            } else {
                toast.error(data.error || "Failed to update address.");
            }
        } catch (error) {
            console.error("Address update error:", error);
            toast.error("An unexpected error occurred. Please try again.");
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center py-10">
                <p className="text-gray-500 text-lg">Loading your Address...</p>
            </div>
        );
    }


    return (
        <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-gray-200 space-y-6">
            <ToastContainer position="top-right" autoClose={3000} />

            <div>
                <h2 className="text-2xl font-bold text-gray-800">Address Details</h2>
                <p className="text-sm text-gray-500 mt-1">Update the address linked to your account and future bookings.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="h-full grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">House Number / Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-orange-500 focus:border-orange-500 text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="address1" className="block text-sm font-medium text-gray-700 mb-1">Address Line 1</label>
                        <input
                            type="text"
                            name="address1"
                            value={formData.address1}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-orange-500 focus:border-orange-500 text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="address2" className="block text-sm font-medium text-gray-700 mb-1">Address Line 2</label>
                        <input
                            type="text"
                            name="address2"
                            value={formData.address2}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-orange-500 focus:border-orange-500 text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City / Town</label>
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-orange-500 focus:border-orange-500 text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                        <input
                            type="text"
                            name="zip"
                            value={formData.zip}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-orange-500 focus:border-orange-500 text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                        <select
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-orange-500 focus:border-orange-500 text-sm"
                        >
                            <option value="UK">United Kingdom</option>
                        </select>
                    </div>
                </div>
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-full text-sm font-semibold transition shadow-sm"
                    >
                        Save Address
                    </button>
                </div>
            </form>
        </div>
    );
}