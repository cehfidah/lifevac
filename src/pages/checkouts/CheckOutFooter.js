import React from 'react'
import { Link } from 'react-router-dom';

const CheckOutFooter = () => {
    return (
        <>
            <footer className="mt-6 text-center py-6 text-sm text-[#162950] border-t">
                <div className="flex justify-center gap-4">
                    <Link to="/refund-policy" className="hover:underline">
                        Refund policy
                    </Link>
                    <Link to="/shipping-policy" className="hover:underline">
                        Shipping policy
                    </Link>
                    <Link to="/privacy-policy" className="hover:underline">
                        Privacy policy
                    </Link>
                    <Link to="/terms-of-service" className="hover:underline">
                        Terms of service
                    </Link>
                    <Link to="/contact-information" className="hover:underline">
                        Contact information
                    </Link>
                </div>
            </footer>
        </>
    )
}

export default CheckOutFooter;
