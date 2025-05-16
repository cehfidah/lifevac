import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Paypal() {
    const navigate = useNavigate();

    const generateInvoiceId = () => `INV-${Date.now()}`;
    const generateCustomId = () => `USER-${Math.random().toString(36).substr(2, 9)}`;

    const [invoice_id, setInvoice_id] = useState("");
    const [custom_id, setCustom_id] = useState("");


    const handleApprove = (data, actions) => {
        return actions.order.capture().then(function (details) {
            const paymentResponse = {
                payer: details.payer.name.given_name,
                email: details.payer.email_address,
                amount: details.purchase_units[0].amount.value,
                currency: details.purchase_units[0].amount.currency_code,
                status: details.status,
                id: details.id,
                transactionId: details.id,
                invoice_id: invoice_id,
                custom_id: custom_id,
                txn_id: details.id,
                item_quantity: 3,
                sub_total: 3474.64,
                shipping_amount: 500,
                final_amount: 3974.64,
                total_saving: 2625.36,
                product_detail: [
                    {
                        id: "offer1",
                        image: "https://cdn.shopify.com/s/files/1/0638/0378/5380/files/Kaching-Bundles-Adult_Mask_3_300x300.svg?v=1737985220",
                        sectionTitle: "AirwayClear™-Antichoking Device:",
                        title: "BUY ONE",
                        kits: "1× Full Kit",
                        price: 3474.64,
                        originalPrice: 6100,
                        savings: 2625.36,
                        guideIncluded: false,
                        tag: false,
                        tagText: "",
                        quantity: 3
                    }
                ],
                shipping_address: {
                    firstName: "Doshi Kirtan",
                    lastName: "Rajnikant",
                    address: "47 Milap Nagar Main Road Shakti Nagar",
                    apt: "hjghbjb",
                    city: "Rajkot",
                    zip: "360005",
                    phone: "9512218936",
                    country: "India",
                    state: "Gujarat",
                    phoneCode: "91"
                }
            };

            console.log(paymentResponse, "payload")
            navigate('/success', { state: paymentResponse });
        });
    };

    return (
        <PayPalScriptProvider
            options={{
                "client-id": process.env.REACT_APP_PAYPAL_CLIENT_KEY
            }}>
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-2xl mb-4">Pay with PayPal</h1>
                <PayPalButtons
                    style={{ layout: "vertical" }}
                    createOrder={(data, actions) => {
                        const invoiceId = generateInvoiceId();
                        const customId = generateCustomId();

                        setInvoice_id(invoiceId);
                        setCustom_id(customId);

                        return actions.order.create({
                            purchase_units: [{
                                amount: {
                                    value: "899.00",
                                },
                                description: "Payment for order",
                                invoice_id: invoiceId,
                                custom_id: customId,
                            }]
                        });
                    }}
                    onApprove={handleApprove}
                />
            </div>
        </PayPalScriptProvider>
    );
}
