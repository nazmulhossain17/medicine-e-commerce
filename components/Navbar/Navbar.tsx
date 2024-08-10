"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, User } from "lucide-react";
import Image from "next/image";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-2xl font-bold">
          Medicine Store
        </Link>
        <div className="hidden md:flex items-center space-x-4">
          <div className="flex space-x-4">
            <NavItem href="/">Home</NavItem>
            <NavItem href="/product">Product</NavItem>
            <NavItem href="/about">About</NavItem>
            <NavItem href="/contact">Contact</NavItem>
          </div>
          <UserLogo />
        </div>
        <div className="flex items-center md:hidden">
          <UserLogo />
          <button
            className="ml-2 text-white"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavItem href="/" onClick={toggleMenu}>
              Home
            </NavItem>
            <NavItem href="/about" onClick={toggleMenu}>
              About
            </NavItem>
            <NavItem href="/services" onClick={toggleMenu}>
              Services
            </NavItem>
            <NavItem href="/contact" onClick={toggleMenu}>
              Contact
            </NavItem>
          </div>
        </div>
      )}
    </nav>
  );
};

const NavItem: React.FC<{
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}> = ({ href, children, onClick }) => (
  <Link
    href={href}
    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
    onClick={onClick}
  >
    {children}
  </Link>
);

const UserLogo: React.FC = () => (
  <div className="relative group">
    <button className="flex items-center text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
      <User size={20} />
    </button>
    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
      <Link
        href="/profile"
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        Profile
      </Link>
      <Link
        href="/settings"
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        Settings
      </Link>
      <Link
        href="/logout"
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        Logout
      </Link>
    </div>
  </div>
);

export default Navbar;
