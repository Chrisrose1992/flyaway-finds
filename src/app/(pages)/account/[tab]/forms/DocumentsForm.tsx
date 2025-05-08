"use client";

import { useState } from 'react';

export default function Document () {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const closeModals = () => {
        setIsAddModalOpen(false);
    };

    return (
        <div>
            <div data-tab="Documents" className="tab-content">
                <h2 className="text-2xl font-bold mb-6">Travel Documents</h2>
                <p className="text-gray-600 mb-4">
                    Store your travel documents securely. Ensure that the details match the official identification
                    documents required for your bookings.
                </p>
                <div className="flex justify-end mb-4">
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="modalButton bg-cyan-500 text-white py-2 px-4 rounded-md shadow hover:bg-cyan-600"

                    >
                        Add New Document
                    </button>
                </div>
            </div>
            {isAddModalOpen && (
                <div className="modal fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-xl w-full">
                        <h3 className="text-2xl font-semibold mb-2 text-gray-800">Add a New Document</h3>
                        <p className="text-sm text-gray-500 mb-6">
                            Please provide valid document details. Required fields are marked with *.
                        </p>
                        <form id="addDocumentForm" action="/account/api/add-document" method="post"
                              className="space-y-4">
                            <input type="hidden" name="_csrf" value="<%= csrfToken %>"/>
                            <div>
                                <label htmlFor="documentType" className="block text-sm font-medium text-gray-700">Document
                                    Type *</label>
                                <select id="documentType" name="documentType" required
                                        className="w-full p-2 border border-gray-300 rounded focus:ring-cyan-500 focus:border-cyan-500">
                                    <option value="" selected disabled>Please select...</option>
                                    <option value="passport">Passport</option>
                                    <option value="identity_card_a">Identity Card (A - Adult)</option>
                                    <option value="identity_card_c">Identity Card (C - Child)</option>
                                    <option value="identity_card_l">Identity Card (L - Infant)</option>
                                    <option value="group_passport">Group Passport</option>
                                    <option value="military_passport">Military Passport</option>
                                    <option value="diplomatic_passport">Diplomatic Passport</option>
                                    <option value="passport_card">Passport Card</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="documentNumber" className="block text-sm font-medium text-gray-700">Document
                                    Number *</label>
                                <input type="text" id="documentNumber" name="documentNumber" required
                                       className="w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500"/>
                            </div>
                            <div>
                                <label htmlFor="nationality" className="block text-sm font-medium text-gray-700">Nationality
                                    *</label>
                                <select id="nationality" name="nationality" required
                                        className="w-full p-2 border border-gray-300 rounded focus:ring-cyan-500 focus:border-cyan-500">
                                    <option value="" selected disabled>Please select...</option>
                                    <option value="US">United States</option>
                                    <option value="UK">United Kingdom</option>
                                    <option value="CA">Canada</option>
                                    <option value="AU">Australia</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="countryOfIssue" className="block text-sm font-medium text-gray-700">Country
                                    of Issue *</label>
                                <select id="countryOfIssue" name="countryOfIssue" required
                                        className="w-full p-2 border border-gray-300 rounded focus:ring-cyan-500 focus:border-cyan-500">
                                    <option value="" selected disabled>Please select...</option>
                                    <option value="US">United States</option>
                                    <option value="UK">United Kingdom</option>
                                    <option value="CA">Canada</option>
                                    <option value="AU">Australia</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">Expiry
                                    Date *</label>
                                <input type="date" id="expiryDate" name="expiryDate" required
                                       className="w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500"/>
                            </div>
                            <div className="flex justify-end space-x-4">
                                <button type="button"
                                        onClick={closeModals}
                                        className="bg-gray-500 text-white py-2 px-4 rounded-md shadow hover:bg-gray-600 closeButton"
                                >
                                    Cancel
                                </button>
                                <button type="submit"
                                        className="bg-cyan-500 text-white py-2 px-4 rounded-md shadow hover:bg-cyan-600">
                                    Add Document
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>

    )
}