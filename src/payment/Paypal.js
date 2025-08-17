
import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

export default function Paypal({
  handleApprove,
  amount,
  formData,
  selectedState,
  country,
  shippingOption
}) {
  const generateInvoiceId = () => `USD-${Date.now()}`;
  const generateCustomId = () => `USER-${Math.random().toString(36).substr(2, 9)}`;

  const shippingCost = shippingOption?.price || 0;

  const shippingDetails = {
    name: {
      full_name: `${formData.firstName} ${formData.lastName}`,
    },
    address: {
      address_line_1: formData.address || "",
      address_line_2: formData.apt || "",
      admin_area_2: formData.city || "",
      admin_area_1: selectedState?.value || "",
      postal_code: formData.zip || "",
      country_code: country?.value || "US",
    },
  };

  const payerDetails = {
    name: {
      given_name: formData.firstName || "",
      surname: formData.lastName || "",
    },
    email_address: formData.email || "",
    phone: {
      phone_number: {
        national_number: formData.phone || "",
      },
    },
    address: {
      address_line_1: formData.address || "",
      address_line_2: formData.apt || "",
      admin_area_2: formData.city || "",
      admin_area_1: selectedState?.value || "",
      postal_code: formData.zip || "",
      country_code: country?.value || "US",
    },
  };

  return (
    <PayPalScriptProvider
      options={{
        "client-id": process.env.REACT_APP_PAYPAL_CLIENT_KEY,
        'disable-funding': 'paylater',
        vault: false,
        intent: 'capture',
      }}
    >
      <PayPalButtons
        style={{ shape: 'rect', layout: 'vertical' }}
        className="w-full"
        createOrder={(data, actions) => {
          const invoiceId = generateInvoiceId();
          const customId = generateCustomId();

          return actions.order.create({
            purchase_units: [{
              amount: {
                value: (amount + shippingCost).toFixed(2),
                breakdown: {
                  item_total: {
                    currency_code: "USD",
                    value: amount.toFixed(2),
                  },
                  shipping: {
                    currency_code: "USD",
                    value: shippingCost.toFixed(2),
                  },
                },
              },
              description: "Payment for order",
              invoice_id: invoiceId,
              custom_id: customId,
              shipping: shippingDetails,
            }],
            payer: payerDetails,
            application_context: {
              shipping_preference: "SET_PROVIDED_ADDRESS", // Suppress address form
              user_action: "PAY_NOW",
            },
          });
        }}
        onApprove={handleApprove}
        onError={(err) => {
          console.error("PayPal Checkout onError", err);
        }}
      />
    </PayPalScriptProvider>
  );
}
