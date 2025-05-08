"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import ProfileForm from "./forms/ProfileForm";
import AddressForm from "./forms/AddressForm";
import DocumentForm from "./forms/DocumentsForm";
import FamilyForm from "./forms/FamilyForm";
import BillingForm from "./forms/BillingForm";
import DeleteAccountForm from "./forms/DeleteAccountForm";
import SecurityForm from "./forms/SecurityForm";
import NotificationsForm from "./forms/NotificationsForm";
import SettingsSidebar from "@/components/SettingsSidebar";

const tabComponents = {
    "my-profile": ProfileForm,
    "address": AddressForm,
    "documents": DocumentForm,
    "friends-and-family": FamilyForm,
    "billing": BillingForm,
    "security": SecurityForm,
    "delete-account": DeleteAccountForm,
    "notifications": NotificationsForm,
};

export default function SettingsPage() {
    const { tab } = useParams();
    const router = useRouter();

    // Redirect to 404 if tab is invalid
    // useEffect(() => {
    //     if (!tab || !tabComponents[tab]) {
    //         router.replace("/404");
    //     }
    // }, [tab, router]);

    const ActiveComponent = tabComponents[tab];

    return (
        <div className="container mx-auto flex gap-6 p-6 items-stretch justify-self-start mb-16">
            <SettingsSidebar />
            <div className="flex-1 ">
                <div>
                    {ActiveComponent ? <ActiveComponent /> : <p className="text-gray-600">Select a setting option.</p>}
                </div>
            </div>
        </div>
    );
}
