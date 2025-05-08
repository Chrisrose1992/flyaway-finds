"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";


// Initialize Stripe with your publishable key
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC);

function CheckoutPayPage() {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get("sessionId");

    const [bookingData, setBookingData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [paymentProcessing, setPaymentProcessing] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        const fetchBookingData = async () => {
            if (!sessionId) {
                setError("No session ID provided");
                setLoading(false);
                return;
            }

            try {
                const res = await fetch(`/api/save-booking-session?sessionId=${sessionId}`);
                if (!res.ok) throw new Error(`Failed to fetch session data: ${res.status}`);
                const data = await res.json();

                if (data.error) throw new Error(data.error);

                setBookingData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBookingData();
    }, [sessionId]);

    const handlePayment = async (e) => {
        e.preventDefault();

        if (!stripe || !elements || !bookingData) return;

        setPaymentProcessing(true);
        setError(null); // Clear previous errors

        try {
            // Create Payment Intent
            const paymentIntentRes = await fetch("/api/create-payment-intent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: Math.round(bookingData.totalPrice * 100) }), // Convert to pence
            });

            if (!paymentIntentRes.ok) {
                const errorData = await paymentIntentRes.json();
                throw new Error(errorData.details || "Failed to create payment intent");
            }
            const { clientSecret } = await paymentIntentRes.json();

            // Confirm payment with Stripe (includes 3D Secure if required)
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: `${bookingData.travelers[0].firstName} ${bookingData.travelers[0].lastName}`,
                        email: bookingData.travelers[0].email,
                    },
                },
            });

            if (result.error) {
                // Handle 3DS or other payment errors
                throw new Error(result.error.message);
            }

            if (result.paymentIntent.status === "succeeded") {
                // Payment fully confirmed, proceed to book holiday
                const bookingRes = await fetch("/api/book-holiday", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ sessionId }),
                });

                if (!bookingRes.ok) {
                    const errorData = await bookingRes.json();
                    throw new Error(errorData.details || "Failed to book holiday");
                }

                const bookingDataResponse = await bookingRes.json();
                console.log("Booking successful:", bookingDataResponse);
                setPaymentSuccess(true);
            } else {
                throw new Error("Payment not fully confirmed");
            }
        } catch (error) {
            console.error("Payment or Booking Error:", error);
            setError(error.message);
        } finally {
            setPaymentProcessing(false);
        }
    };

    if (loading) return <div className="p-6">Loading...</div>;
    if (!bookingData) return <div className="p-6"><h1>No Data</h1><p>No booking data available.</p></div>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Payment - Flyaway Finds</h1>
            <p>Total Price: £{bookingData.totalPrice}</p>

            {paymentSuccess ? (
                <div className="mt-4 p-4 bg-green-100 text-green-800 rounded">
                    Payment and booking successful! Your holiday is confirmed.
                </div>
            ) : (
                <form onSubmit={handlePayment} className="space-y-6">
                    <div className="border p-4 rounded">
                        <h2 className="font-semibold mb-2">Card Details</h2>
                        <CardElement
                            className="p-2 border rounded"
                            options={{
                                style: {
                                    base: {
                                        fontSize: "16px",
                                        color: "#424770",
                                        "::placeholder": { color: "#aab7c4" },
                                    },
                                    invalid: { color: "#9e2146" },
                                },
                            }}
                        />
                    </div>
                    {error && (
                        <div className="mt-4 p-4 bg-red-100 text-red-800 rounded">
                            {error}
                        </div>
                    )}
                    <button
                        type="submit"
                        disabled={!stripe || paymentProcessing}
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
                    >
                        {paymentProcessing ? "Processing..." : "Pay Now"}
                    </button>
                </form>
            )}
        </div>
    );
}

// Wrap the page with Stripe Elements
function CheckoutPayPageWrapper() {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutPayPage />
        </Elements>
    );
}

export default CheckoutPayPageWrapper;