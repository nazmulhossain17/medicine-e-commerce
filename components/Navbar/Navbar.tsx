"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, User, LogIn } from "lucide-react";
import { useAppSelector } from "@/app/GlobalRedux/hooks";
import { RootState } from "@/app/GlobalRedux/rootReducer";
import { useLogoutUser } from "@/lib/actions/log-out";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false); // Track user menu state
  const { logoutUser } = useLogoutUser(); // Use the logout hook
  const currentUser = useAppSelector(
    (state: RootState) => state.user.currentUser
  );

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
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
          {currentUser ? (
            <UserLogo
              isOpen={isUserMenuOpen}
              toggleUserMenu={toggleUserMenu}
              onLogout={logoutUser} // Pass logout function here
            />
          ) : (
            <LoginButton />
          )}
        </div>
        <div className="flex items-center md:hidden">
          {currentUser ? (
            <UserLogo
              isOpen={isUserMenuOpen}
              toggleUserMenu={toggleUserMenu}
              onLogout={logoutUser} // Pass logout function here
            />
          ) : (
            <LoginButton />
          )}
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

const UserLogo: React.FC<{
  isOpen: boolean;
  toggleUserMenu: () => void;
  onLogout?: () => void;
}> = ({ isOpen, toggleUserMenu, onLogout }) => (
  <div className="relative">
    <button
      onClick={toggleUserMenu}
      className="flex items-center text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
    >
      <User size={20} />
    </button>
    {isOpen && (
      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
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
        <button
          onClick={() => {
            if (onLogout) onLogout(); // Call the logout function
          }}
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
        >
          Logout
        </button>
      </div>
    )}
  </div>
);

const LoginButton: React.FC = () => (
  <Link href="/login">
    <button className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
      <span className="ml-2">Login</span>
    </button>
  </Link>
);

export default Navbar;
