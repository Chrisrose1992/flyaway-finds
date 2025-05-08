"use client";

import { useState } from "react";

export default function FamilyForm() {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const closeModals = () => {
        setIsAddModalOpen(false);
        setIsEditModalOpen(false);
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Friends and Family</h2>
            <p className="mb-4">
                Make booking easier by adding friends and family to your account. Please get permission
                from the passenger before entering their details.
            </p>
            <div className="flex justify-end">
                <button
                    className="bg-cyan-500 text-white py-2 px-4 rounded-md shadow hover:bg-cyan-600"
                    onClick={() => setIsAddModalOpen(true)}
                >
                    Add New Passenger
                </button>
            </div>

            {/* Add Passenger Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <h3 className="text-2xl font-semibold mb-2 text-gray-800">Add a New Passenger</h3>
                        <p className="text-sm text-gray-500 mb-6">
                            Please ensure the details entered match the passport of the passenger.
                        </p>
                        <form className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Title</label>
                                <select className="w-full p-2 border border-gray-300 rounded">
                                    <option>Please select...</option>
                                    <option>Mr</option>
                                    <option>Mrs</option>
                                    <option>Miss</option>
                                    <option>Ms</option>
                                    <option>Dr</option>
                                </select>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700">First Name</label>
                                    <input type="text" className="w-full p-2 border border-gray-300 rounded" />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700">Last Name</label>
                                    <input type="text" className="w-full p-2 border border-gray-300 rounded" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                                <div className="flex gap-2">
                                    <input type="text" placeholder="DD" className="w-1/3 p-2 border border-gray-300 rounded" />
                                    <input type="text" placeholder="MM" className="w-1/3 p-2 border border-gray-300 rounded" />
                                    <input type="text" placeholder="YYYY" className="w-1/3 p-2 border border-gray-300 rounded" />
                                </div>
                            </div>
                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    className="bg-gray-500 text-white py-2 px-4 rounded-md shadow hover:bg-gray-600"
                                    onClick={closeModals}
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="bg-cyan-500 text-white py-2 px-4 rounded-md shadow hover:bg-cyan-600">
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Passenger Modal */}
            {isEditModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <h3 className="text-2xl font-semibold mb-2 text-gray-800">Edit Passenger</h3>
                        <form className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Title</label>
                                <select className="w-full p-2 border border-gray-300 rounded">
                                    <option>Mr</option>
                                    <option>Mrs</option>
                                    <option>Miss</option>
                                    <option>Ms</option>
                                    <option>Dr</option>
                                </select>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700">First Name</label>
                                    <input type="text" className="w-full p-2 border border-gray-300 rounded" />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700">Last Name</label>
                                    <input type="text" className="w-full p-2 border border-gray-300 rounded" />
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <input type="text" placeholder="DD" className="w-1/3 p-2 border border-gray-300 rounded" />
                                <input type="text" placeholder="MM" className="w-1/3 p-2 border border-gray-300 rounded" />
                                <input type="text" placeholder="YYYY" className="w-1/3 p-2 border border-gray-300 rounded" />
                            </div>
                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    className="bg-gray-500 text-white py-2 px-4 rounded-md shadow hover:bg-gray-600"
                                    onClick={closeModals}
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md shadow hover:bg-blue-600">
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
