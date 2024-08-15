"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, User, LogIn, ShoppingCart } from "lucide-react";
import { useAppSelector } from "@/app/GlobalRedux/hooks";
import { useLogoutUser } from "@/lib/actions/log-out";
import { useRouter } from "next/navigation";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { logoutUser } = useLogoutUser();
  const currentUser = useAppSelector((state: any) => state.user.currentUser);
  const cartItems = useAppSelector((state: any) => state.cart.products);
  const cartItemCount = cartItems.length;

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
            <>
              <UserLogo
                isOpen={isUserMenuOpen}
                toggleUserMenu={toggleUserMenu}
                onLogout={logoutUser}
                currentUser={currentUser} // Pass currentUser as a prop
              />
              <CartButton itemCount={cartItemCount} />
            </>
          ) : (
            <>
              <LoginButton />
              <CartButton itemCount={cartItemCount} />
            </>
          )}
        </div>
        <div className="flex items-center md:hidden">
          {currentUser ? (
            <>
              <UserLogo
                isOpen={isUserMenuOpen}
                toggleUserMenu={toggleUserMenu}
                onLogout={logoutUser}
                currentUser={currentUser} // Pass currentUser as a prop
              />
              <CartButton itemCount={cartItemCount} />
            </>
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
          {currentUser ? (
            <>
              <UserLogo
                isOpen={isUserMenuOpen}
                toggleUserMenu={toggleUserMenu}
                onLogout={logoutUser}
                currentUser={currentUser} // Pass currentUser as a prop
              />
              <CartButton itemCount={cartItemCount} />
            </>
          ) : (
            <>
              <LoginButton />
              <CartButton itemCount={cartItemCount} />
            </>
          )}
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
  currentUser: any; // Add currentUser as a prop
}> = ({ isOpen, toggleUserMenu, onLogout, currentUser }) => {
  const router = useRouter();

  const handleLogout = async () => {
    if (onLogout) {
      await onLogout();
      router.push("/");
    }
  };

  return (
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
          {currentUser.role === "admin" || currentUser.role === "superAdmin" ? (
            <Link
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              href="/dashboard"
            >
              Dashboard
            </Link>
          ) : null}
          <Link
            href="/create-product"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Sell Product
          </Link>
          <Link
            href="/settings"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Settings
          </Link>
          <button
            onClick={handleLogout}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

const LoginButton: React.FC = () => (
  <Link href="/login">
    <button className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
      <span className="ml-2">Login</span>
    </button>
  </Link>
);

const CartButton: React.FC<{ itemCount: number }> = ({ itemCount }) => (
  <Link href="/cart">
    <div className="relative">
      <ShoppingCart className="m-2" size={24} />
      {itemCount > 0 && (
        <span className="absolute top-0 right-0 block w-4 h-4 bg-red-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </div>
  </Link>
);

export default Navbar;
