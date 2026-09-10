import React, { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  ShoppingCart, Home, Users, Phone, ShoppingBag, 
  LogIn, LogOut, X, User, Mail, Lock, Sparkles, Menu 
} from "lucide-react";
import useOnlineStatus from "../utils/useOnlineStatus.js";
import userContext from "../utils/userContext.js";
import { useSelector } from "react-redux";
import { LOGO_URL } from "../utils/constants.js"; 

const Header = () => {
  const [loginButton, setLoginButton] = useState("Login");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const internetStatus = useOnlineStatus();
  const { loggedInUser, setUserName } = useContext(userContext);
  const cartItems = useSelector((state) => state.cart.items);
  const location = useLocation();

  const initials = loggedInUser
    ? loggedInUser.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase()
    : "?";

  const navLinks = [
    { to: "/", icon: Home, label: "Home" },
    { to: "/AboutUs", icon: Users, label: "About" },
    { to: "/ContactUs", icon: Phone, label: "Contact" },
    { to: "/Grocery", icon: ShoppingBag, label: "Grocery" },
  ];

  return (
    <>
      {/* ── Ultra-Premium Fixed Header (SOLID BACKGROUND TO HIDE CARDS BENEATH) ── */}
      <header className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-4 sm:px-6 h-24 bg-neutral-950 border-b border-white/5 shadow-[0_4px_40px_rgba(0,0,0,0.5)] transition-all duration-500">
        
        {/* Brand Logo & Home Trigger */}
        <Link 
          to="/" 
          onClick={() => {
            window.dispatchEvent(new Event("resetHome"));
            setIsMobileMenuOpen(false);
          }}
          className="flex items-center gap-4 group cursor-pointer outline-none"
        >
          <div className="relative flex h-12 w-12 items-center justify-center rounded-[1rem] bg-neutral-900 border border-white/10 shadow-inner overflow-hidden transition-transform duration-500 group-hover:scale-105 group-hover:border-amber-500/30">
            {/* Subtle glow behind logo */}
            <div className="absolute inset-0 bg-amber-500/20 blur-md group-hover:bg-amber-500/40 transition-colors duration-500" />
            <img
              src={LOGO_URL}
              alt="FeastFlow logo"
              className="relative z-10 w-10 h-10 object-cover rounded-xl"
            />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xl font-black tracking-tight text-white group-hover:text-amber-100 transition-colors">
              Feast<span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Flow</span>
            </h1>
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-500 group-hover:text-amber-500/80 transition-colors">
              Premium Delivery
            </p>
          </div>
        </Link>

        {/* ── Desktop Navigation ── */}
        <nav className="hidden md:flex items-center gap-1.5 rounded-[2rem] bg-neutral-900 p-1.5 border border-white/5 shadow-inner">
          {navLinks.map(({ to, icon: Icon, label }) => {
            const isActive = location.pathname === to;
            
            const handleNavClick = () => {
              if (to === "/") {
                window.dispatchEvent(new Event("resetHome")); // Reset Cards on Body
              }
            };

            return (
              <Link
                key={to}
                to={to}
                onClick={handleNavClick}
                // When Active: Uses exact Sign In button styling (gradient, black text, glowing shadow)
                // When Inactive: Subtle text link with hover effect
                className={`flex items-center gap-2 rounded-full px-4 lg:px-5 py-2.5 text-xs lg:text-sm font-black tracking-widest uppercase transition-all duration-300 outline-none active:scale-95 ${
                  isActive 
                    ? "bg-gradient-to-br from-amber-400 to-amber-600 text-neutral-950 shadow-[0_0_20px_rgba(245,158,11,0.4)] scale-[1.02]" 
                    : "text-neutral-400 hover:text-white hover:bg-neutral-800"
                }`}
              >
                <Icon className={`w-4 h-4 transition-transform duration-300 ${isActive ? 'scale-110 text-neutral-950' : ''}`} />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Section Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          
          {/* Network Status Pill */}
          <div className={`hidden xl:flex items-center gap-2 text-[10px] font-black tracking-widest uppercase px-4 py-2.5 rounded-full border shadow-inner transition-colors duration-500 ${
            internetStatus 
              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
              : "bg-rose-500/10 text-rose-400 border-rose-500/20"
          }`}>
            <span className="relative flex h-2.5 w-2.5">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${internetStatus ? 'bg-emerald-400' : 'bg-rose-400'}`}></span>
              <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${internetStatus ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
            </span>
            {internetStatus ? "Online" : "Offline"}
          </div>

          {/* Cart Button */}
          <Link
            to="/Cart"
            className="group relative flex items-center gap-2.5 rounded-full bg-neutral-900 px-4 sm:px-5 py-2.5 text-sm font-bold text-white border border-white/5 transition-all duration-300 hover:bg-neutral-800 hover:border-white/10 active:scale-95 shadow-inner"
          >
            <ShoppingCart className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">Cart</span>
            
            {/* Cart Badge */}
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-[10px] font-black text-neutral-950 shadow-lg animate-bounce border border-neutral-900">
                {cartItems.length}
              </span>
            )}
          </Link>

          {/* User Profile / Login Auth */}
          {loginButton === "Logout" ? (
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-3 pl-4 border-l border-white/10">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 text-xs font-black text-amber-400 border border-white/10 shadow-inner">
                  {initials}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white truncate max-w-[80px]">
                    {loggedInUser}
                  </span>
                  <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest">
                    Guest
                  </span>
                </div>
              </div>
              <button
                onClick={() => {
                  setLoginButton("Login");
                  if (setUserName) setUserName("Default User");
                }}
                className="flex items-center justify-center h-10 w-10 sm:w-auto sm:px-4 gap-2 rounded-full bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 transition-all duration-300 hover:scale-105 active:scale-95"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline text-xs font-bold uppercase tracking-wider">Logout</span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowLoginModal(true)}
              className="flex items-center gap-2 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 px-5 sm:px-6 py-2.5 text-sm font-black uppercase tracking-widest text-neutral-950 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] active:scale-95"
            >
              <LogIn className="w-4 h-4" />
              <span className="hidden sm:inline">Sign In</span>
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex items-center justify-center h-10 w-10 rounded-full bg-neutral-900 border border-white/5 text-white hover:bg-neutral-800 transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5 text-amber-400" /> : <Menu className="w-5 h-5 text-amber-400" />}
          </button>
        </div>
      </header>

      {/* ── Mobile Navigation Menu ── */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-neutral-950/95 backdrop-blur-3xl pt-28 pb-6 px-6 md:hidden flex flex-col justify-between animate-fade-in">
          <nav className="flex flex-col gap-4">
            {navLinks.map(({ to, icon: Icon, label }) => {
              const isActive = location.pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  onClick={() => {
                    if (to === "/") window.dispatchEvent(new Event("resetHome"));
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-4 px-6 py-4 rounded-[2rem] text-sm font-black tracking-widest uppercase transition-all duration-300 active:scale-95 border ${
                    isActive 
                      ? "bg-gradient-to-br from-amber-400 to-amber-600 text-neutral-950 border-transparent shadow-[0_0_20px_rgba(245,158,11,0.4)]" 
                      : "bg-neutral-900 border-white/5 text-neutral-400"
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-neutral-950' : 'text-neutral-500'}`} />
                  {label}
                </Link>
              );
            })}
          </nav>

          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-center gap-2 text-xs font-black tracking-widest uppercase py-4 rounded-full border border-white/5 bg-neutral-900 shadow-inner">
              <span className="text-neutral-500">System Status:</span>
              <span className={internetStatus ? "text-emerald-400" : "text-rose-400"}>
                {internetStatus ? "Online" : "Offline"}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ── Ultra-Premium Login Modal ── */}
      {showLoginModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-md animate-fade-in"
          onClick={() => setShowLoginModal(false)}
        >
          <div
            className="relative w-full max-w-md overflow-hidden rounded-[3rem] bg-neutral-900 p-8 sm:p-10 border border-white/10 shadow-[0_0_60px_-15px_rgba(245,158,11,0.3)] transform transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Ambient Background Glows */}
            <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full blur-[100px] opacity-20 pointer-events-none bg-amber-500" />
            <div className="absolute -left-20 -bottom-20 w-64 h-64 rounded-full blur-[100px] opacity-10 pointer-events-none bg-white" />

            {/* Modal Header */}
            <div className="flex items-start justify-between mb-8 relative z-10">
              <div className="space-y-2">
                <span className="inline-flex items-center gap-1.5 text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 shadow-inner">
                  <Sparkles className="w-3 h-3" /> Secure Access
                </span>
                <h3 className="text-3xl font-black tracking-tight text-white mt-4">
                  Welcome back
                </h3>
                <p className="text-sm font-medium text-neutral-400">
                  Authenticate to access premium gastronomy.
                </p>
              </div>
              <button
                onClick={() => setShowLoginModal(false)}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-950 border border-white/10 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-inner"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Login Form */}
            <form
              className="space-y-5 relative z-10"
              onSubmit={(e) => {
                e.preventDefault();
                setLoginButton("Logout");
                if (setUserName) setUserName(inputName);
                setShowLoginModal(false);
              }}
            >
              {/* Name Input */}
              <div className="space-y-2 group">
                <label className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 text-neutral-500 group-focus-within:text-amber-400 transition-colors">
                  <User className="w-3.5 h-3.5" /> Full Name
                </label>
                <input
                  required
                  type="text"
                  placeholder="Enter your name"
                  value={inputName}
                  onChange={(e) => setInputName(e.target.value)}
                  className="w-full h-14 px-6 rounded-[1.5rem] text-sm font-bold bg-neutral-950 text-white placeholder-neutral-600 border border-white/5 focus:outline-none focus:border-amber-500/50 focus:ring-4 focus:ring-amber-500/10 transition-all shadow-inner"
                />
              </div>

              {/* Email Input */}
              <div className="space-y-2 group">
                <label className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 text-neutral-500 group-focus-within:text-amber-400 transition-colors">
                  <Mail className="w-3.5 h-3.5" /> Email Address
                </label>
                <input
                  required
                  type="email"
                  placeholder="name@example.com"
                  value={inputEmail}
                  onChange={(e) => setInputEmail(e.target.value)}
                  className="w-full h-14 px-6 rounded-[1.5rem] text-sm font-bold bg-neutral-950 text-white placeholder-neutral-600 border border-white/5 focus:outline-none focus:border-amber-500/50 focus:ring-4 focus:ring-amber-500/10 transition-all shadow-inner"
                />
              </div>

              {/* Password Input */}
              <div className="space-y-2 group">
                <label className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 text-neutral-500 group-focus-within:text-amber-400 transition-colors">
                  <Lock className="w-3.5 h-3.5" /> Password
                </label>
                <input
                  required
                  type="password"
                  placeholder="••••••••"
                  value={inputPassword}
                  onChange={(e) => setInputPassword(e.target.value)}
                  className="w-full h-14 px-6 rounded-[1.5rem] text-sm font-bold bg-neutral-950 text-white placeholder-neutral-600 border border-white/5 focus:outline-none focus:border-amber-500/50 focus:ring-4 focus:ring-amber-500/10 transition-all shadow-inner"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full h-14 rounded-[1.5rem] text-sm font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3 cursor-pointer shadow-[0_0_20px_rgba(245,158,11,0.2)] mt-8 hover:scale-[1.02] active:scale-95 bg-gradient-to-r from-amber-400 to-amber-600 text-neutral-950 hover:shadow-[0_0_30px_rgba(245,158,11,0.4)]"
              >
                Sign In Securely
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </button>
            </form>

            <div className="mt-8 text-center text-[10px] font-bold tracking-[0.2em] uppercase pt-6 border-t border-white/5 text-neutral-600 relative z-10">
              Protected by 256-bit encryption
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;