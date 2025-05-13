import React, { useState } from "react";

export default function Header({ onProfileClick }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="bg-white border-b px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">AirwayClear</h1>
      <div className="relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="rounded-full bg-gray-200 p-2 hover:bg-gray-300"
        >
          👤
        </button>
        {dropdownOpen && (
          <ul className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md border">
            <li onClick={onProfileClick} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Profile</li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Settings</li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Logout</li>
          </ul>
        )}
      </div>
    </header>
  );
}
