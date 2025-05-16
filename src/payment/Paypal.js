import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function Paypal({ handleApprove, amount }) {
    const generateInvoiceId = () => `INV-${Date.now()}`;
    const generateCustomId = () => `USER-${Math.random().toString(36).substr(2, 9)}`;

    return (
        <PayPalScriptProvider
            options={{
                "client-id": process.env.REACT_APP_PAYPAL_CLIENT_KEY
            }}>
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-2xl mb-4">Pay with PayPal</h1>
                <PayPalButtons
                    style={{ layout: "vertical" }}
                    createOrder={(data, actions) => {
                        const invoiceId = generateInvoiceId();
                        const customId = generateCustomId();

                        return actions.order.create({
                            purchase_units: [{
                                amount: {
                                    value: amount.toFixed(2),
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
