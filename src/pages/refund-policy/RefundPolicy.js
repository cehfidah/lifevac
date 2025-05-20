import React from "react";
import SEO from "../../utils/SEO";

const RefundPolicy = () => {
  return (
    <>
      <SEO
        title="Refund Policy - AirwayClear"
        description="Learn about our refund policy, return conditions, and how to request a refund for AirwayClear purchases."
        keywords="AirwayClear refund, return policy, product returns"
        ogTitle="AirwayClear Refund Policy"
        ogDescription="View our full refund and return policy."
        twitterTitle="Refund Policy - AirwayClear"
        twitterDescription="Understand how refunds work with AirwayClear."
      />

      <div className="max-w-2xl mx-auto px-4 py-10 text-base text-[#162950] leading-relaxed">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Refund policy
        </h1>

        <p className="mb-6">
          We have a 30-day return policy, which means you have 30 days after
          receiving your item to request a return.
        </p>
        <p className="mb-6">
          To be eligible for a return, your item must be in the same condition
          that you received it, unworn or unused, with tags, and in its original
          packaging. You’ll also need the receipt or proof of purchase.
        </p>
        <p className="mb-6">
          To start a return, you can contact us at info@airwayclear.us
        </p>
        <p className="mb-6">
          stating you would like to return your order. We will send you return
          instructions.
        </p>
        <p>
          <br />
          If your return is accepted, we’ll send you instructions on how and
          where to send your package. Items sent back to us without first
          requesting a return will not be accepted. <br />
          <br />
          You can always contact us for any return question at
          info@airwayclear.us
        </p>

        <h5 className="mb-2 font-bold">Damages and issues</h5>
        <p className="mb-6">
          Please inspect your order upon reception and contact us immediately if
          the item is defective, damaged or if you receive the wrong item, so
          that we can evaluate the issue and make it right.
        </p>

        <h5 className="mb-2 font-bold">Exceptions / non-returnable items</h5>
        <p className="mb-6">
          Certain types of items cannot be returned, like perishable goods (such
          as food, flowers, or plants), custom products (such as special orders
          or personalized items), and personal care goods (such as beauty
          products). We also do not accept returns for hazardous materials,
          flammable liquids, or gases. Please get in touch if you have questions
          or concerns about your specific item.
        </p>
        <p className="mb-6">
          Unfortunately, we cannot accept returns on sale items or gift cards.
        </p>

        <h5 className="mb-2 font-bold">Exchanges</h5>
        <p className="mb-6">
          The fastest way to ensure you get what you want is to return the item
          you have, and once the return is accepted, make a separate purchase
          for the new item.
        </p>

        <h5 className="mb-2 font-bold">
          European Union 14 day cooling off period
        </h5>
        <p className="mb-6">
          Notwithstanding the above, if the merchandise is being shipped into
          the European Union, you have the right to cancel or return your order
          within 14 days, for any reason and without a justification. As above,
          your item must be in the same condition that you received it, unworn
          or unused, with tags, and in its original packaging. You’ll also need
          the receipt or proof of purchase.
        </p>

        <h5 className="mb-2 font-bold">Refunds</h5>
        <p className="mb-6">
          We will notify you once we’ve received and inspected your return, and
          let you know if the refund was approved or not. If approved, you’ll be
          automatically refunded on your original payment method within 10
          business days. Please remember it can take some time for your bank or
          credit card company to process and post the refund too.
        </p>
        <p className="mb-6">
          If more than 15 business days have passed since we’ve approved your
          return, please contact us at
        </p>

        <div title="info@versafind.shop" class="truncate">
          info@airwayclear.us
        </div>
      </div>
    </>
  );
};

export default RefundPolicy;
