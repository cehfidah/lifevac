import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";

export default function Paypal() {
    const navigate = useNavigate();

    const handleApprove = (data, actions) => {
        return actions.order.capture().then(function (details) {
            const paymentResponse = {
                payer: details.payer.name.given_name,
                email: details.payer.email_address,
                amount: details.purchase_units[0].amount.value,
                currency: details.purchase_units[0].amount.currency_code,
                status: details.status,
                id: details.id
            };
            console.log(details, "details");
            navigate('/success', { state: paymentResponse });
        });
    };

    return (
        <PayPalScriptProvider
            options={{
                "client-id": "AdLmfV6qkoQBBHqarYM06PLOteNhkDRpVnjbHckoe46hcBYaAVipDMCJ_mcNC9G3BVi1MSk7OE66LAFW"
            }}>
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-2xl mb-4">Pay with PayPal</h1>
                <PayPalButtons
                    style={{ layout: "vertical" }}
                    createOrder={(data, actions) => {
                        return actions.order.create({
                            purchase_units: [{
                                amount: {
                                    value: "1000.00",
                                }
                            }]
                        });
                    }}
                    onApprove={handleApprove}
                />
            </div>
        </PayPalScriptProvider>
    );
}
