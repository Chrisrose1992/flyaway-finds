import {
    FaceSmileIcon,
    CameraIcon,
    GlobeAltIcon,
    PlayCircleIcon
} from "@heroicons/react/24/outline";
import Logo from './Logo'

const navigation = {
    planYourTrip: [
        { name: 'Flights', href: '/flights' },
        { name: 'Hotels', href: '/hotels' },
        { name: 'Car Rentals', href: '/car-rentals' },
        { name: 'Airport Transfers', href: '/airport-transfers' },
        { name: 'Holiday Packages', href: '/holiday-packages' },
    ],
    customerSupport: [
        { name: 'Help Center', href: '/help-center' },
        { name: 'Manage Booking', href: '/manage-booking' },
        { name: 'Refund & Cancellation', href: '/refunds-cancellations' },
        { name: 'Travel Insurance', href: '/travel-insurance' },
        { name: 'ATOL Protection', href: '/atol-protection' },
        { name: 'COVID-19 Updates', href: '/covid-updates' },
    ],
    about: [
        { name: 'About Us', href: '/about-us' },
        { name: 'Travel Blog', href: '/blog' },
        { name: 'Careers', href: '/careers' },
        { name: 'Travel Deals', href: '/travel-deals' },
    ],
    legal: [
        { name: 'Terms of Service', href: '/terms-of-service' },
        { name: 'Privacy Policy', href: '/privacy-policy' },
        { name: 'Cookie Policy', href: '/cookie-policy' },
    ],
    social: [
        { name: 'Facebook', href: '#', icon: FaceSmileIcon },
        { name: 'Instagram', href: '#', icon: CameraIcon },
        { name: 'X (Twitter)', href: '#', icon: GlobeAltIcon },
        { name: 'YouTube', href: '#', icon: PlayCircleIcon },
    ],
};

export default function Footer() {
    return (
        <footer className="bg-white w-full">
            <div className="mx-auto container">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                    <div className="space-y-6 text-center lg:text-left col-span-1">
                        <Logo />
                        <p className="text-sm text-gray-600 max-w-md mx-auto lg:mx-0">
                            Your trusted online travel agent for flights, hotels, and holiday packages.
                        </p>
                        <div className="flex justify-center lg:justify-start gap-x-6">
                            {navigation.social.map((item) => (
                                <a key={item.name} href={item.href} className="text-gray-600 hover:text-gray-800">
                                    <span className="sr-only">{item.name}</span>
                                    <item.icon aria-hidden="true" className="size-6" />
                                </a>
                            ))}
                        </div>
                    </div>
                    <div className="col-span-1 lg:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div>
                            <h3 className="text-sm font-semibold text-gray-900">Plan Your Trip</h3>
                            <ul className="mt-4 space-y-3">
                                {navigation.planYourTrip.map((item) => (
                                    <li key={item.name}>
                                        <a href={item.href} className="text-sm text-gray-600 hover:text-gray-900">
                                            {item.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-gray-900">Customer Support</h3>
                            <ul className="mt-4 space-y-3">
                                {navigation.customerSupport.map((item) => (
                                    <li key={item.name}>
                                        <a href={item.href} className="text-sm text-gray-600 hover:text-gray-900">
                                            {item.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-gray-900">About FlyAway Find</h3>
                            <ul className="mt-4 space-y-3">
                                {navigation.about.map((item) => (
                                    <li key={item.name}>
                                        <a href={item.href} className="text-sm text-gray-600 hover:text-gray-900">
                                            {item.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-gray-900">Legal</h3>
                            <ul className="mt-4 space-y-3">
                                {navigation.legal.map((item) => (
                                    <li key={item.name}>
                                        <a href={item.href} className="text-sm text-gray-600 hover:text-gray-900">
                                            {item.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="mt-12 border-t border-gray-300 pt-6 text-center">
                    <p className="text-sm text-gray-600">
                        &copy; 2024 FlyAway Find. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}