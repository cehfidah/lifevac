// components/Header.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import Container from "../Container";

export default function Header() {
  const [openDropdown, setOpenDropdown] = useState(false);

  return (
    <Container>
      <header className="flex justify-between items-center paddingX py-2 md:py-4 bg-white">
        <div className="flex items-center space-x-8">
          <Link to="/" className="text-lg font-bold">AirwayClear</Link>
          <ul className="flex space-x-2 text-gray-700 font-medium">
            <li className="hover:bg-[#f5f5f5] p-2 md:p-4 hover:rounded-xl"><Link to="/shop">Shop</Link></li>
            <li className="hover:bg-[#f5f5f5] p-2 md:p-4 hover:rounded-xl"><Link to="/orders">Orders</Link></li>
          </ul>
        </div>
        <div className="relative">
          <button
            onClick={() => setOpenDropdown(!openDropdown)}
            className="rounded-full bg-gray-200 p-2"
          >
            <span className="material-icons"> 👤</span>
          </button>
          {openDropdown && (
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md py-2 z-20">
              <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</Link>
              <Link to="/settings" className="block px-4 py-2 hover:bg-gray-100">Settings</Link>
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">Logout</button>
            </div>
          )}
        </div>
      </header>
    </Container>
  );
}
