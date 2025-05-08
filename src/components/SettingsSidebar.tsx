'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { FaUser, FaLock, FaBell, FaUsers, FaMapMarkerAlt, FaCreditCard, FaFileAlt, FaTrash } from 'react-icons/fa';

const tabs = [
    { key: 'my-profile', label: 'My Profile', icon: <FaUser /> },
    { key: 'security', label: 'Security', icon: <FaLock /> },
    { key: 'notifications', label: 'Notifications', icon: <FaBell /> },
    { key: 'friends-and-family', label: 'Friends & Family', icon: <FaUsers /> },
    { key: 'address', label: 'Address', icon: <FaMapMarkerAlt /> },
    { key: 'billing', label: 'Billing', icon: <FaCreditCard /> },
    { key: 'documents', label: 'Documents', icon: <FaFileAlt /> },
    { key: 'delete-account', label: 'Delete Account', icon: <FaTrash /> },
];

export default function SettingsSidebar() {
    const { tab } = useParams();

    return (
        <nav className="md:w-64 bg-white border border-gray-200 rounded-xl p-6">
            <ul className="space-y-2">
                {tabs.map(({ key, label, icon }) => (
                    <li key={key}>
                        <Link
                            href={`/account/${key}`}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition duration-300 ${
                                tab === key
                                    ? 'bg-orange-600 text-white'
                                    : 'text-gray-700 hover:bg-orange-50'
                            }`}
                        >
                            <span className="text-lg">{icon}</span>
                            {label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
