import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="text-center py-6 text-sm text-gray-600 border-t">
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link to="/refund-policy" className="hover:underline">Refund policy</Link>
        <Link to="/shipping-policy" className="hover:underline">Shipping policy</Link>
        <Link to="/privacy-policy" className="hover:underline">Privacy policy</Link>
        <Link to="/terms-of-service" className="hover:underline">Terms of service</Link>
        <Link to="/contact-information" className="hover:underline">Contact information</Link>
      </div>
    </footer>
  );
}
