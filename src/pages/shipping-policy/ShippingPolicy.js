import SEO from '../../utils/SEO';

const ShippingPolicy = () => {
    return (
        <>
            <SEO
                title="Shipping Policy - AirwayClear"
                description="Details about our shipping methods, delivery timelines, and available regions for AirwayClear product delivery."
                keywords="AirwayClear shipping, delivery information, shipping times"
                ogTitle="Shipping Policy - AirwayClear"
                ogDescription="Everything you need to know about our delivery process."
                twitterTitle="Shipping Policy - AirwayClear"
                twitterDescription="Learn about how and where we ship products."
            />
            <div className="px-4 py-10 md:py-16 bg-white text-gray-800 flex flex-col items-center">
                <div className="w-full max-w-4xl">
                    <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
                        Shipping policy
                    </h1>

                    <p className="mb-6 leading-relaxed">
                        Rest assured we will do everything in our power to ensure your order is delivered as soon as possible.
                        Your parcel will be left in a secure place, however please ensure you are available upon delivery.
                        The buyer holds all responsibility for stolen, or lost delivery as a result of input of wrong shipment information.
                        Please double check your shipping address is correct before confirming your order. Once you have placed your order,
                        you are committing to the sale and declaring that all information entered including the shipping address is correct.
                    </p>

                    <h2 className="text-lg md:text-xl font-semibold mb-2">PROCESSING TIMES</h2>
                    <p className="mb-6 leading-relaxed">
                        Orders can take up to 2 business days to be processed before shipment.
                    </p>

                    <p className="italic mb-6 leading-relaxed">
                        Any possible taxes and duties applicable to your order may be applied by customs and are the sole responsibility of the customer.
                    </p>

                    <h2 className="text-lg md:text-xl font-semibold mb-2">DELIVERY TIMES</h2>
                    <p className="mb-6 leading-relaxed">
                        Current average delivery time: 5–7 business days
                    </p>

                    <h2 className="text-lg md:text-xl font-semibold mb-2">UNEXPECTED DELAYS</h2>
                    <p className="mb-6 leading-relaxed">
                        Due to the current pandemic the delivery may take longer than the shipping times stated here.
                        Delays imposed by the shipping carriers are beyond our control and we cannot be held responsible for this.
                        We reserve the right to extend delivery time in any events out of our control.
                    </p>

                    <p className="leading-relaxed">
                        We appreciate your patience in this time – And we will be doing all we can to ensure your order reaches you as soon as possible.
                    </p>
                </div>
            </div>
        </>
    )
}

export default ShippingPolicy;
