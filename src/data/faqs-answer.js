export const faqAnswers = [
    {
        slug: "updating-payment-method",
        headerImg: "/images/update-payment.jpg",
        title: "How do I update my payment method?",
        intro: "Quick and simple instructions to update your payment details for ongoing or future bookings.",
        text: "You can easily update your payment details by logging into your account and navigating to the payment section. Select 'Update Payment Method' and follow the instructions provided to enter new payment details. Ensure that your new method is saved successfully to prevent any disruption in your booking.",
        bulletPoints: [
            "Log into your account",
            "Navigate to the 'Payment Options' section",
            "Enter and confirm your new payment details"
        ],
        relatedQuestions: [
            { question: "What payment options are available?", slug: "payment-options" },
            { question: "Missed payment advice", slug: "missed-payment-advice" }
        ],
        videoLink: "https://www.youtube.com/embed/update-payment-video",
        ctaButton: { text: "Update Now", link: "/account/payments" },
        footerNote: "For further assistance, please contact customer support."
    },

    {
        slug: "missed-payment-advice",
        headerImg: "/images/missed-payment.jpg",
        title: "What should I do if I miss a payment?",
        intro: "Steps to take if you've missed a scheduled payment to keep your booking secure.",
        text: "If you've missed a payment, it's important to address the issue promptly to avoid cancellation. Immediately log into your account and attempt to make the missed payment manually. If you encounter difficulties or have concerns, contact our support team immediately for assistance and guidance.",
        bulletPoints: [
            "Log into your account to make a manual payment",
            "Check your email for payment reminders and links",
            "Contact customer support if you're unable to make a payment"
        ],
        relatedQuestions: [
            { question: "Updating payment method", slug: "updating-payment-method" },
            { question: "What payment options are available?", slug: "payment-options" }
        ],
        videoLink: "https://www.youtube.com/embed/missed-payment-advice",
        ctaButton: { text: "Make Payment", link: "/account/payments" },
        footerNote: "Reach out immediately to avoid booking cancellation."
    },

    {
        slug: "holiday-assistance",
        headerImg: "/images/holiday-assistance.jpg",
        title: "What assistance is available while on holiday?",
        intro: "Details about the support provided during your holiday for a stress-free experience.",
        text: "Our in-resort team is available 24/7 to help you with any issue you may face, including medical emergencies, lost documents, or accommodation concerns. You can contact our team via phone or the in-app live chat.",
        bulletPoints: [
            "24/7 in-resort assistance",
            "Medical and emergency support",
            "Help with lost items or documents"
        ],
        relatedQuestions: [
            { question: "Airport support", slug: "airport-support" },
            { question: "Missing transfers", slug: "missing-transfers" }
        ],
        videoLink: "https://www.youtube.com/embed/holiday-assistance-video",
        ctaButton: { text: "Contact In-Resort Support", link: "/support/in-resort" },
        footerNote: "We are here to ensure your holiday runs smoothly."
    },

    {
        slug: "airport-support",
        headerImg: "/images/airport-support.jpg",
        title: "What support is available at the airport?",
        intro: "Information on airport assistance to ensure your journey starts smoothly.",
        text: "Our airport representatives can assist with check-in, baggage issues, boarding passes, and other travel-related queries. Look out for our representatives at designated meeting points or customer service desks at the airport.",
        bulletPoints: [
            "Check-in assistance",
            "Baggage queries",
            "Support with boarding and flight information"
        ],
        relatedQuestions: [
            { question: "Assistance while on holiday", slug: "holiday-assistance" },
            { question: "Missing transfers", slug: "missing-transfers" }
        ],
        videoLink: "https://www.youtube.com/embed/airport-support-video",
        ctaButton: { text: "Learn More", link: "/support/airport" },
        footerNote: "Airport support is available to all travelers."
    },

    {
        slug: "missing-transfers",
        headerImg: "/images/missing-transfers.jpg",
        title: "What if my transfer doesn't arrive?",
        intro: "What to do if your arranged transfer service is late or missing.",
        text: "If your transfer has not arrived, first double-check the transfer confirmation details provided. If the issue persists, immediately contact our transfer service hotline or our customer support for swift assistance and alternative arrangements.",
        bulletPoints: [
            "Confirm your transfer booking details",
            "Contact the transfer service hotline",
            "Reach out to customer support for immediate assistance"
        ],
        relatedQuestions: [
            { question: "Airport support", slug: "airport-support" },
            { question: "Assistance while on holiday", slug: "holiday-assistance" }
        ],
        videoLink: "https://www.youtube.com/embed/missing-transfer-video",
        ctaButton: { text: "Get Immediate Help", link: "/support/transfers" },
        footerNote: "Our team is ready to ensure you reach your destination safely."
    },

    {
        slug: "holiday-checklist",
        headerImg: "/images/holiday-checklist.jpg",
        title: "What's included in my holiday checklist?",
        intro: "Ensure you're prepared for your trip with our comprehensive holiday checklist.",
        text: "Your holiday checklist includes travel documents, packing essentials, health requirements, and other key items to ensure a smooth journey.",
        bulletPoints: ["Travel documents", "Packing essentials", "Health requirements"],
        relatedQuestions: [{ question: "Passport validity", slug: "passport-validity" }, { question: "Viewing booking details", slug: "viewing-booking-details" }],
        videoLink: "https://www.youtube.com/embed/holiday-checklist",
        ctaButton: { text: "View Checklist", link: "/booking/checklist" },
        footerNote: "Prepare for a worry-free trip."
    },

    {
        slug: "baggage-allowance",
        headerImg: "/images/baggage-allowance.jpg",
        title: "What's my baggage allowance?",
        intro: "Understand the baggage policies and limits for your travel.",
        text: "Baggage allowances vary depending on airline and travel class. Confirm details via your booking or airline directly.",
        bulletPoints: ["Check airline guidelines", "Cabin vs. checked baggage", "Additional baggage fees"],
        relatedQuestions: [{ question: "Purchasing additional baggage", slug: "additional-baggage" }, { question: "Lost or delayed baggage", slug: "lost-delayed-baggage" }],
        videoLink: "https://www.youtube.com/embed/baggage-allowance",
        ctaButton: { text: "Check Allowance", link: "/booking/baggage" },
        footerNote: "Plan ahead to avoid surprises."
    },

    {
        slug: "additional-baggage",
        headerImg: "/images/additional-baggage.jpg",
        title: "How can I purchase additional baggage?",
        intro: "Add more baggage allowance easily.",
        text: "You can purchase additional baggage through your account or directly with the airline.",
        bulletPoints: ["Log into your booking", "Select additional baggage", "Complete payment"],
        relatedQuestions: [{ question: "What's my baggage allowance?", slug: "baggage-allowance" }, { question: "Lost or delayed baggage", slug: "lost-delayed-baggage" }],
        videoLink: "https://www.youtube.com/embed/additional-baggage",
        ctaButton: { text: "Buy Baggage", link: "/booking/additional-baggage" },
        footerNote: "Easily manage your baggage needs."
    },

    {
        slug: "lost-delayed-baggage",
        headerImg: "/images/lost-delayed-baggage.jpg",
        title: "What should I do if my baggage is lost or delayed?",
        intro: "Immediate steps to take if your baggage doesn't arrive as expected.",
        text: "If your baggage is lost or delayed, immediately report it at the airline's baggage service desk in the airport. Keep your baggage receipt and reference number provided by the airline for tracking your luggage status.",
        bulletPoints: [
            "Report at the airline baggage desk",
            "Keep baggage receipt and tracking details",
            "Follow up with the airline regularly"
        ],
        relatedQuestions: [
            { question: "What's my baggage allowance?", slug: "baggage-allowance" },
            { question: "How can I purchase additional baggage?", slug: "additional-baggage" }
        ],
        videoLink: "https://www.youtube.com/embed/lost-delayed-baggage",
        ctaButton: { text: "Contact Airline", link: "/support/baggage-issues" },
        footerNote: "Act quickly for faster resolution."
    },

    {
        slug: "check-visa-requirements",
        headerImg: "/images/check-visa-requirements.jpg",
        title: "How do I check visa requirements for my destination?",
        intro: "Ensure you're fully informed about visa requirements before your trip.",
        text: "Visa requirements can vary based on your destination, nationality, and travel purpose. Visit the official embassy or consulate website of your destination country, or use an online visa-check tool to confirm entry requirements well in advance of your travel.",
        bulletPoints: [
            "Check official embassy websites",
            "Use trusted online visa-check services",
            "Verify requirements early to avoid delays"
        ],
        relatedQuestions: [
            { question: "Can you assist with visa applications?", slug: "visa-applications-assistance" },
            { question: "What if my visa application is rejected?", slug: "visa-application-rejection" }
        ],
        videoLink: "https://www.youtube.com/embed/check-visa-requirements",
        ctaButton: { text: "Check Requirements", link: "/travel/visa-check" },
        footerNote: "Early checks help ensure smooth travel plans."
    },

    {
        slug: "visa-applications-assistance",
        headerImg: "/images/visa-assistance.jpg",
        title: "Can you assist with visa applications?",
        intro: "Find out how we can help you navigate your visa application process.",
        text: "We offer guidance and support for your visa applications, providing you with necessary information, documentation guidance, and steps required. For detailed assistance, reach out to our customer support team or visit our visa assistance page.",
        bulletPoints: [
            "Personalized application advice",
            "Documentation guidance",
            "Support throughout the process"
        ],
        relatedQuestions: [
            { question: "How do I check visa requirements?", slug: "check-visa-requirements" },
            { question: "What if my visa application is rejected?", slug: "visa-application-rejection" }
        ],
        videoLink: "https://www.youtube.com/embed/visa-applications-assistance",
        ctaButton: { text: "Get Visa Help", link: "/travel/visa-assistance" },
        footerNote: "Simplifying your visa application experience."
    },

    {
        slug: "visa-application-rejection",
        headerImg: "/images/visa-application-rejection.jpg",
        title: "What happens if my visa application is rejected?",
        intro: "Steps to take if your visa application has been denied.",
        text: "If your visa application is rejected, first review the provided reasons carefully. Depending on these reasons, you might be eligible to reapply with additional documentation or clarifications. Contact our support team to discuss your booking options or alternative travel plans.",
        bulletPoints: [
            "Review reasons for rejection",
            "Check possibility for reapplication",
            "Contact customer support immediately"
        ],
        relatedQuestions: [
            { question: "Visa applications assistance", slug: "visa-applications-assistance" },
            { question: "Check visa requirements", slug: "check-visa-requirements" }
        ],
        videoLink: "https://www.youtube.com/embed/visa-application-rejection",
        ctaButton: { text: "Contact Support", link: "/support/visa-issues" },
        footerNote: "We're here to guide your next steps."
    },

    {
        slug: "create-delete-account",
        headerImg: "/images/create-delete-account.jpg",
        title: "How do I create or delete my account?",
        intro: "Easy instructions on managing your account creation and deletion.",
        text: "To create an account, visit our registration page, provide the required information, and follow the prompts. To delete your account, navigate to your account settings and select 'Delete Account,' then confirm your choice. Contact support if you encounter any issues.",
        bulletPoints: [
            "Simple registration process",
            "Easily delete your account",
            "Secure personal information handling"
        ],
        relatedQuestions: [
            { question: "Benefits of being a registered user", slug: "user-benefits" },
            { question: "Update personal details", slug: "update-personal-details" }
        ],
        videoLink: "https://www.youtube.com/embed/create-delete-account",
        ctaButton: { text: "Manage Account", link: "/account/settings" },
        footerNote: "Your account, your control."
    },

    {
        slug: "user-benefits",
        headerImg: "/images/user-benefits.jpg",
        title: "What benefits do registered users receive?",
        intro: "Discover exclusive advantages available to registered users.",
        text: "As a registered user, you'll enjoy faster bookings, personalized offers, easy access to booking history, and priority customer support. You'll also receive exclusive promotional deals and updates.",
        bulletPoints: [
            "Faster and easier bookings",
            "Exclusive promotional offers",
            "Priority customer support"
        ],
        relatedQuestions: [
            { question: "How do I create or delete my account?", slug: "create-delete-account" },
            { question: "Update personal details", slug: "update-personal-details" }
        ],
        videoLink: "https://www.youtube.com/embed/user-benefits",
        ctaButton: { text: "Register Now", link: "/account/register" },
        footerNote: "Join today for a personalized experience."
    },
    {
        slug: "update-personal-details",
        headerImg: "/images/update-personal-details.jpg",
        title: "How do I update my personal details?",
        intro: "Keep your information accurate to ensure a smooth travel experience.",
        text: "To update your personal details, log into your account, navigate to the profile section, and edit your information. Always verify changes to avoid issues during your travel.",
        bulletPoints: [
            "Log in to your account",
            "Navigate to your profile",
            "Edit and save your details"
        ],
        relatedQuestions: [
            { question: "User benefits", slug: "user-benefits" },
            { question: "Create or delete my account", slug: "create-delete-account" }
        ],
        videoLink: "https://www.youtube.com/embed/update-personal-details",
        ctaButton: { text: "Update Details", link: "/account/profile" },
        footerNote: "Ensure your profile stays current."
    },

    {
        slug: "holiday-assistance",
        headerImg: "/images/holiday-assistance.jpg",
        title: "What assistance is available while on holiday?",
        intro: "Learn how we support you during your holiday.",
        text: "Our dedicated in-resort support team is available 24/7 for assistance during your holiday. Whether you need medical help, local information, or have any issues with your accommodation, we’re just a call away.",
        bulletPoints: [
            "24/7 emergency support",
            "Local advice and guidance",
            "Accommodation assistance"
        ],
        relatedQuestions: [
            { question: "Airport support", slug: "airport-support" },
            { question: "Missing transfers", slug: "missing-transfers" }
        ],
        videoLink: "https://www.youtube.com/embed/holiday-assistance",
        ctaButton: { text: "Contact Support", link: "/support/in-resort" },
        footerNote: "Your peace of mind matters to us."
    },
    {
        slug: "airport-support",
        headerImg: "/images/airport-support.jpg",
        title: "What airport support do you offer?",
        intro: "Ensuring your journey begins smoothly at the airport.",
        text: "Our airport support includes assistance with check-in, boarding, baggage inquiries, and any travel-related questions. Look out for our representatives at the designated meeting points.",
        bulletPoints: [
            "Check-in assistance",
            "Baggage inquiries",
            "Help with boarding procedures"
        ],
        relatedQuestions: [
            { question: "Holiday assistance", slug: "holiday-assistance" },
            { question: "Missing transfers", slug: "missing-transfers" }
        ],
        videoLink: "https://www.youtube.com/embed/airport-support",
        ctaButton: { text: "Get Airport Help", link: "/support/airport" },
        footerNote: "Travel confidently with our airport support."
    },

    {
        slug: "missing-transfers",
        headerImg: "/images/missing-transfers.jpg",
        title: "What should I do if my transfer doesn't arrive?",
        intro: "Immediate steps to take if your booked transfer is missing or delayed.",
        text: "If your transfer hasn't arrived, first check your booking confirmation for details. Then, contact our transfer hotline or customer support immediately to arrange alternative transportation.",
        bulletPoints: [
            "Check your transfer booking details",
            "Call the transfer hotline",
            "Contact customer support"
        ],
        relatedQuestions: [
            { question: "Airport support", slug: "airport-support" },
            { question: "Holiday assistance", slug: "holiday-assistance" }
        ],
        videoLink: "https://www.youtube.com/embed/missing-transfers",
        ctaButton: { text: "Contact Support", link: "/support/transfers" },
        footerNote: "We're here to get you moving swiftly."
    },
    {
        slug: "special-requests",
        headerImg: "/images/special-requests.jpg",
        title: "How do I make special requests?",
        intro: "Guidance on requesting special accommodations for your holiday.",
        text: "You can make special requests such as dietary requirements, accessibility needs, or specific room types directly from your booking management page or by contacting our customer support team.",
        bulletPoints: [
            "Dietary preferences",
            "Accessibility requirements",
            "Specific room requests"
        ],
        relatedQuestions: [
            { question: "Changing holiday dates", slug: "changing-holiday-dates" },
            { question: "Correcting passenger details", slug: "correcting-passenger-details" }
        ],
        videoLink: "https://www.youtube.com/embed/special-requests",
        ctaButton: { text: "Make a Request", link: "/booking/special-requests" },
        footerNote: "Helping you personalize your holiday experience."
    },

    {
        slug: "changing-holiday-dates",
        headerImg: "/images/changing-holiday-dates.jpg",
        title: "Can I change my holiday dates?",
        intro: "Understand how to modify your booked travel dates.",
        text: "You can request a change of holiday dates by accessing your booking online or contacting customer support. Date changes may depend on availability and could involve additional charges.",
        bulletPoints: [
            "Check availability online",
            "Possible change fees",
            "Confirm new travel dates"
        ],
        relatedQuestions: [
            { question: "Special requests", slug: "special-requests" },
            { question: "Correcting passenger details", slug: "correcting-passenger-details" }
        ],
        videoLink: "https://www.youtube.com/embed/changing-holiday-dates",
        ctaButton: { text: "Change Dates", link: "/booking/change-dates" },
        footerNote: "Flexibility for your convenience."
    },
    {
        slug: "correcting-passenger-details",
        headerImg: "/images/correcting-passenger-details.jpg",
        title: "How do I correct passenger details?",
        intro: "Ensure your passenger information is accurate to avoid travel disruptions.",
        text: "Corrections to passenger details, such as names or passport information, can be done via your online booking account or by contacting customer support. Changes may require verification documents.",
        bulletPoints: [
            "Update names and passport info",
            "Submit supporting documents if needed",
            "Confirm changes promptly"
        ],
        relatedQuestions: [
            { question: "Special requests", slug: "special-requests" },
            { question: "Changing holiday dates", slug: "changing-holiday-dates" }
        ],
        videoLink: "https://www.youtube.com/embed/correcting-passenger-details",
        ctaButton: { text: "Correct Details", link: "/booking/passenger-details" },
        footerNote: "Accuracy ensures hassle-free travel."
    },

    {
        slug: "viewing-booking-details",
        headerImg: "/images/viewing-booking-details.jpg",
        title: "How can I view my booking details?",
        intro: "Access your complete booking information quickly and easily.",
        text: "You can view all your booking details, including itineraries, payments, and special requests, by logging into your online account or using our mobile app.",
        bulletPoints: [
            "Log into your account",
            "View itinerary and payment details",
            "Check special requests and extras"
        ],
        relatedQuestions: [
            { question: "Holiday checklist", slug: "holiday-checklist" },
            { question: "Passport validity", slug: "passport-validity" }
        ],
        videoLink: "https://www.youtube.com/embed/viewing-booking-details",
        ctaButton: { text: "View Booking", link: "/account/bookings" },
        footerNote: "Stay informed and prepared for your trip."
    },
    {
        slug: "passport-validity",
        headerImg: "/images/passport-validity.jpg",
        title: "How long does my passport need to be valid?",
        intro: "Check passport validity requirements for your destination.",
        text: "Passport validity requirements vary by country, but generally, passports should be valid for at least six months from your return date. Always confirm specific entry requirements for your destination country.",
        bulletPoints: [
            "Minimum six months validity recommended",
            "Check specific destination rules",
            "Renew passport if necessary"
        ],
        relatedQuestions: [
            { question: "Viewing booking details", slug: "viewing-booking-details" },
            { question: "Holiday checklist", slug: "holiday-checklist" }
        ],
        videoLink: "https://www.youtube.com/embed/passport-validity",
        ctaButton: { text: "Check Requirements", link: "/travel/passport-validity" },
        footerNote: "Ensure smooth entry at your destination."
    },

    {
        slug: "adding-transfer",
        headerImg: "/images/adding-transfer.jpg",
        title: "How can I add a transfer to my booking?",
        intro: "Easily add transfer services to your existing booking.",
        text: "You can add transfer services by logging into your account and selecting your booking. Follow the prompts to include transfers, and confirm your details and payment.",
        bulletPoints: [
            "Log into your account",
            "Select your booking",
            "Add and confirm transfer details"
        ],
        relatedQuestions: [
            { question: "Upgrading transfers", slug: "upgrading-transfers" },
            { question: "Canceling a transfer", slug: "canceling-transfer" }
        ],
        videoLink: "https://www.youtube.com/embed/adding-transfer",
        ctaButton: { text: "Add Transfer", link: "/booking/transfers" },
        footerNote: "Convenience from arrival to departure."
    },
    {
        slug: "upgrading-transfers",
        headerImg: "/images/upgrading-transfers.jpg",
        title: "Can I upgrade my transfer service?",
        intro: "Enhance your transfer experience with upgraded options.",
        text: "Upgrade your existing transfer by accessing your booking details online or contacting our support team. Options include private transfers, luxury vehicles, and faster service.",
        bulletPoints: [
            "Log into your booking",
            "Choose upgrade options",
            "Confirm additional payment if required"
        ],
        relatedQuestions: [
            { question: "Adding a transfer", slug: "adding-transfer" },
            { question: "Canceling a transfer", slug: "canceling-transfer" }
        ],
        videoLink: "https://www.youtube.com/embed/upgrading-transfers",
        ctaButton: { text: "Upgrade Transfer", link: "/booking/transfers" },
        footerNote: "Arrive in comfort and style."
    },
    {
        slug: "canceling-transfer",
        headerImg: "/images/canceling-transfer.jpg",
        title: "How do I cancel a transfer?",
        intro: "Guidance on canceling your pre-arranged transfer services.",
        text: "Transfers can be canceled by accessing your booking online or contacting customer support directly. Please be aware of cancellation policies and potential fees.",
        bulletPoints: [
            "Log into your booking",
            "Select transfer cancellation",
            "Review cancellation terms"
        ],
        relatedQuestions: [
            { question: "Adding a transfer", slug: "adding-transfer" },
            { question: "Upgrading transfers", slug: "upgrading-transfers" }
        ],
        videoLink: "https://www.youtube.com/embed/canceling-transfer",
        ctaButton: { text: "Cancel Transfer", link: "/booking/transfers" },
        footerNote: "Check cancellation terms carefully."
    },
    {
        slug: "submitting-complaint",
        headerImg: "/images/submitting-complaint.jpg",
        title: "How do I submit a complaint?",
        intro: "Process for submitting feedback or complaints regarding your experience.",
        text: "Complaints can be submitted via our online feedback form, email, or by contacting customer support directly. Provide as much detail as possible to facilitate prompt resolution.",
        bulletPoints: [
            "Use the online feedback form",
            "Provide detailed information",
            "Expect prompt follow-up"
        ],
        relatedQuestions: [
            { question: "Complaint follow-up", slug: "complaint-follow-up" },
            { question: "Dissatisfaction with accommodation", slug: "dissatisfaction-accommodation" }
        ],
        videoLink: "https://www.youtube.com/embed/submitting-complaint",
        ctaButton: { text: "Submit Complaint", link: "/support/complaints" },
        footerNote: "Your feedback helps us improve."
    },

    {
        slug: "complaint-follow-up",
        headerImg: "/images/complaint-follow-up.jpg",
        title: "How do I follow up on my complaint?",
        intro: "Track the status of your submitted complaint.",
        text: "You can follow up on your complaint by logging into your account or directly contacting our customer service team. Be sure to have your complaint reference number ready.",
        bulletPoints: [
            "Log into your account for updates",
            "Use your complaint reference number",
            "Contact support if further assistance is needed"
        ],
        relatedQuestions: [
            { question: "Submitting a complaint", slug: "submitting-complaint" },
            { question: "Dissatisfaction with accommodation", slug: "dissatisfaction-accommodation" }
        ],
        videoLink: "https://www.youtube.com/embed/complaint-follow-up",
        ctaButton: { text: "Check Complaint Status", link: "/support/complaints-status" },
        footerNote: "Committed to resolving your concerns."
    },
    {
        slug: "dissatisfaction-accommodation",
        headerImg: "/images/dissatisfaction-accommodation.jpg",
        title: "What should I do if I'm dissatisfied with my accommodation?",
        intro: "Steps to address issues with your accommodation promptly.",
        text: "If you're dissatisfied with your accommodation, contact our in-resort support team immediately to address and resolve the issue. Early reporting helps us provide quick and effective solutions.",
        bulletPoints: [
            "Contact in-resort support promptly",
            "Document the issues clearly",
            "Seek immediate resolution"
        ],
        relatedQuestions: [
            { question: "Submitting a complaint", slug: "submitting-complaint" },
            { question: "Complaint follow-up", slug: "complaint-follow-up" }
        ],
        videoLink: "https://www.youtube.com/embed/dissatisfaction-accommodation",
        ctaButton: { text: "Report Issue", link: "/support/accommodation-issues" },
        footerNote: "Your comfort is our priority."
    },
    {
        slug: "holiday-protection",
        headerImg: "/images/holiday-protection.jpg",
        title: "What holiday protection do you offer?",
        intro: "Learn about the protection available for your holiday booking.",
        text: "We provide comprehensive holiday protection options including financial safeguards, booking flexibility, and assistance in unforeseen situations. Check your booking details or contact support for specifics.",
        bulletPoints: [
            "Financial protection schemes",
            "Flexible booking policies",
            "Emergency travel assistance"
        ],
        relatedQuestions: [
            { question: "Travel insurance", slug: "travel-insurance" },
            { question: "ABTA membership", slug: "abta-membership" }
        ],
        videoLink: "https://www.youtube.com/embed/holiday-protection",
        ctaButton: { text: "View Protection Details", link: "/booking/protection" },
        footerNote: "Protecting your peace of mind."
    },
    {
        slug: "travel-insurance",
        headerImg: "/images/travel-insurance.jpg",
        title: "Do you offer travel insurance?",
        intro: "Details about our available travel insurance options.",
        text: "We offer comprehensive travel insurance policies covering medical expenses, cancellations, lost baggage, and more. You can easily add insurance during booking or by contacting our customer support.",
        bulletPoints: [
            "Comprehensive medical cover",
            "Trip cancellation protection",
            "Lost or stolen baggage coverage"
        ],
        relatedQuestions: [
            { question: "Holiday protection", slug: "holiday-protection" },
            { question: "ABTA membership", slug: "abta-membership" }
        ],
        videoLink: "https://www.youtube.com/embed/travel-insurance",
        ctaButton: { text: "Get Insured", link: "/booking/travel-insurance" },
        footerNote: "Travel with confidence and security."
    },
    {
        slug: "abta-membership",
        headerImg: "/images/abta-membership.jpg",
        title: "What is ABTA membership?",
        intro: "Understand the benefits of booking with an ABTA member.",
        text: "Our ABTA membership ensures you receive high standards of service, fair terms of trading, and protection in the event of financial failure. Book with confidence knowing you're protected.",
        bulletPoints: [
            "Financial protection",
            "Fair service standards",
            "Independent dispute resolution"
        ],
        relatedQuestions: [
            { question: "Holiday protection", slug: "holiday-protection" },
            { question: "Travel insurance", slug: "travel-insurance" }
        ],
        videoLink: "https://www.youtube.com/embed/abta-membership",
        ctaButton: { text: "Learn More", link: "/abta-membership" },
        footerNote: "ABTA membership means peace of mind."
    },
    {
        slug: "check-in-options",
        headerImg: "/images/check-in-options.jpg",
        title: "What are my check-in options?",
        intro: "Explore convenient check-in methods for your flights.",
        text: "We offer several check-in options including online check-in, mobile check-in, and traditional airport check-in. Online check-in usually opens 24 hours before your flight departure.",
        bulletPoints: [
            "Online check-in available 24 hours prior",
            "Mobile app check-in convenience",
            "Airport desk check-in options"
        ],
        relatedQuestions: [
            { question: "Booking flight seats", slug: "booking-flight-seats" },
            { question: "Getting boarding passes", slug: "boarding-passes" }
        ],
        videoLink: "https://www.youtube.com/embed/check-in-options",
        ctaButton: { text: "Check-in Now", link: "/flights/check-in" },
        footerNote: "Choose the easiest option for your travel."
    },
    {
        slug: "booking-flight-seats",
        headerImg: "/images/booking-flight-seats.jpg",
        title: "How can I book my flight seats?",
        intro: "Secure your preferred seat before you fly.",
        text: "You can book or change your flight seats during the booking process, or later through the 'Manage Booking' section online. Charges may apply depending on your airline and seat choice.",
        bulletPoints: [
            "Book seats during initial reservation",
            "Modify seats via Manage Booking",
            "Check seat charges with your airline"
        ],
        relatedQuestions: [
            { question: "Check-in options", slug: "check-in-options" },
            { question: "Getting boarding passes", slug: "boarding-passes" }
        ],
        videoLink: "https://www.youtube.com/embed/booking-flight-seats",
        ctaButton: { text: "Book Seats", link: "/flights/seats" },
        footerNote: "Sit comfortably where you prefer."
    },
    {
        slug: "boarding-passes",
        headerImg: "/images/boarding-passes.jpg",
        title: "How do I get my boarding passes?",
        intro: "Convenient ways to obtain your boarding passes.",
        text: "Boarding passes can be obtained via online check-in, through the airline's mobile app, or printed at airport kiosks or check-in desks. Online and mobile check-in usually become available 24 hours prior to departure.",
        bulletPoints: [
            "Online or mobile check-in",
            "Print at airport kiosks",
            "Check-in desks available"
        ],
        relatedQuestions: [
            { question: "Check-in options", slug: "check-in-options" },
            { question: "Booking flight seats", slug: "booking-flight-seats" }
        ],
        videoLink: "https://www.youtube.com/embed/boarding-passes",
        ctaButton: { text: "Get Boarding Pass", link: "/flights/boarding-passes" },
        footerNote: "Easy and quick check-in for your flight."
    },
    {
        slug: "full-booking-cancellation",
        headerImg: "/images/full-booking-cancellation.jpg",
        title: "How do I cancel my entire booking?",
        intro: "Information on canceling your full booking.",
        text: "You can cancel your entire booking by logging into your account and selecting 'Manage Booking'. Be aware of cancellation policies and possible charges that may apply. Contact support for immediate assistance.",
        bulletPoints: [
            "Log into 'Manage Booking'",
            "Review cancellation policy",
            "Confirm cancellation details"
        ],
        relatedQuestions: [
            { question: "Flight cancellation", slug: "flight-cancellation" },
            { question: "Hotel cancellation", slug: "hotel-cancellation" }
        ],
        videoLink: "https://www.youtube.com/embed/full-booking-cancellation",
        ctaButton: { text: "Cancel Booking", link: "/booking/cancellations" },
        footerNote: "Review terms carefully before canceling."
    },
    {
        slug: "flight-cancellation",
        headerImg: "/images/flight-cancellation.jpg",
        title: "Can I cancel just my flight?",
        intro: "Guidance on canceling only the flight portion of your booking.",
        text: "If you wish to cancel only your flight, log into your booking online or contact our support directly. Please be aware that partial cancellations may incur fees or affect other parts of your booking.",
        bulletPoints: [
            "Access 'Manage Booking'",
            "Choose flight cancellation",
            "Check impact on related bookings"
        ],
        relatedQuestions: [
            { question: "Full booking cancellation", slug: "full-booking-cancellation" },
            { question: "Hotel cancellation", slug: "hotel-cancellation" }
        ],
        videoLink: "https://www.youtube.com/embed/flight-cancellation",
        ctaButton: { text: "Cancel Flight", link: "/booking/cancellations" },
        footerNote: "Understand the full implications of cancellation."
    },
    {
        slug: "hotel-cancellation",
        headerImg: "/images/hotel-cancellation.jpg",
        title: "How do I cancel my hotel booking?",
        intro: "Instructions for canceling your hotel reservation.",
        text: "Cancel your hotel reservation easily through your online booking portal. Ensure you review the cancellation terms and conditions, as some cancellations may incur charges depending on timing and booking terms.",
        bulletPoints: [
            "Log into your account",
            "Review hotel cancellation terms",
            "Confirm hotel cancellation"
        ],
        relatedQuestions: [
            { question: "Full booking cancellation", slug: "full-booking-cancellation" },
            { question: "Flight cancellation", slug: "flight-cancellation" }
        ],
        videoLink: "https://www.youtube.com/embed/hotel-cancellation",
        ctaButton: { text: "Cancel Hotel", link: "/booking/cancellations" },
        footerNote: "Cancellation policies vary by booking."
    },
    {
        slug: "perk-eligibility",
        headerImg: "/images/perk-eligibility.jpg",
        title: "Am I eligible for lounge and fast track perks?",
        intro: "Find out if you qualify for lounge access and fast track security.",
        text: "Lounge and fast track eligibility typically depends on your airline, booking class, frequent flyer status, or membership programs. Check your booking confirmation or contact customer support for specific eligibility details.",
        bulletPoints: [
            "Check booking confirmation",
            "Frequent flyer or membership status",
            "Booking class eligibility"
        ],
        relatedQuestions: [
            { question: "Receiving lounge or fast track passes", slug: "receiving-passes" },
            { question: "Adding lounge access or fast track", slug: "adding-access" }
        ],
        videoLink: "https://www.youtube.com/embed/perk-eligibility",
        ctaButton: { text: "Check Eligibility", link: "/perks/eligibility" },
        footerNote: "Enjoy premium travel experiences."
    },
    {
        slug: "receiving-passes",
        headerImg: "/images/receiving-passes.jpg",
        title: "How do I receive my lounge or fast track passes?",
        intro: "Get your passes for lounge access and fast track.",
        text: "Your lounge or fast track passes will typically be sent via email or included in your booking confirmation. They may also be accessible through your online booking account or airline mobile app.",
        bulletPoints: [
            "Email confirmation",
            "Booking management online",
            "Airline mobile app access"
        ],
        relatedQuestions: [
            { question: "Perk eligibility", slug: "perk-eligibility" },
            { question: "Adding lounge access or fast track", slug: "adding-access" }
        ],
        videoLink: "https://www.youtube.com/embed/receiving-passes",
        ctaButton: { text: "Access Your Passes", link: "/perks/passes" },
        footerNote: "Make your airport experience seamless."
    },
    {
        slug: "adding-access",
        headerImg: "/images/adding-access.jpg",
        title: "Can I add lounge access or fast track after booking?",
        intro: "Information on adding premium services post-booking.",
        text: "You can add lounge access or fast track security even after you've made your initial booking. Simply log into your account, select your booking, and choose from available options. Additional fees may apply.",
        bulletPoints: [
            "Log into your account",
            "Select available perks",
            "Confirm and pay additional fees if required"
        ],
        relatedQuestions: [
            { question: "Perk eligibility", slug: "perk-eligibility" },
            { question: "Receiving lounge or fast track passes", slug: "receiving-passes" }
        ],
        videoLink: "https://www.youtube.com/embed/adding-access",
        ctaButton: { text: "Add Perks Now", link: "/perks/add-access" },
        footerNote: "Enhance your travel comfort easily."
    }

];
