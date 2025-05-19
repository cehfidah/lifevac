// components/Header.jsx
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "../Container";
import { useDispatch } from "react-redux";
import { logout } from "../../store/slice/authSlice";
import logo from "../../assest/logo2.avif";
import { clearCart } from "../../store/slice/cartSlice";

export default function Header() {
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    navigate("/");
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <Container>
      <header className="flex justify-between items-center paddingX py-2 md:py-4 bg-white">
        <div className="flex items-center space-x-8">
          <Link to="/" className="text-lg font-bold">
            {" "}
            <img width={200} src={logo} />
          </Link>
          <ul className="flex space-x-2 text-gray-700 font-medium">
            <li className="hover:bg-[#f5f5f5] p-2 md:p-4 hover:rounded-xl">
              <Link to="/">Shop</Link>
            </li>
            <li className="hover:bg-[#f5f5f5] p-2 md:p-4 hover:rounded-xl">
              <Link to="/orders">Orders</Link>
            </li>
          </ul>
        </div>
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpenDropdown(!openDropdown)}
            className="rounded-full bg-gray-200 p-2"
          >
            <span className="material-icons">👤</span>
          </button>
          {openDropdown && (
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md py-2 z-20">
              <Link
                to="/profile"
                className="block px-4 py-2 hover:bg-gray-100"
                onClick={() => setOpenDropdown(false)}
              >
                Profile
              </Link>
              <Link
                to="/settings"
                className="block px-4 py-2 hover:bg-gray-100"
                onClick={() => setOpenDropdown(false)}
              >
                Settings
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>
    </Container>
  );
}
