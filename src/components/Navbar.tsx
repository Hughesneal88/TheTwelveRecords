import React, { useState, useEffect } from "react";
import { useContent } from "../context/ContentContext";
import { useAuth } from "../context/AuthContext";
import { Menu, X, Disc3, Sparkles, User, ShieldCheck, LogOut } from "lucide-react";

export const Navbar: React.FC = () => {
  const { currentView, navigateToHome, setIsLoginModalOpen, setIsAdminModalOpen, setIsDemoModalOpen } = useContent();
  const { currentUser, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    if (currentView !== "home") {
      navigateToHome();
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-[#08080a]/90 backdrop-blur-md border-b border-gold-500/20 py-3 shadow-2xl"
          : "bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo & Title */}
        <button
          onClick={navigateToHome}
          className="flex items-center space-x-3 group text-left focus:outline-none"
        >
          <div className="relative w-11 h-11 rounded-full overflow-hidden border border-gold-500/40 p-0.5 shadow-lg group-hover:border-gold-400 transition-all">
            <img
              src="/assets/logo.jpg"
              alt="The Twelve Records"
              className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                // Fallback SVG if asset is loading
                (e.target as HTMLElement).style.display = "none";
              }}
            />
            <div className="absolute inset-0 rounded-full border border-gold-400/30 animate-pulse-slow"></div>
          </div>
          <div>
            <span className="font-cinzel text-lg md:text-xl font-bold tracking-wider text-white group-hover:text-gold-400 transition-colors flex items-center gap-1.5">
              THE TWELVE <span className="text-gold-500 font-light">RECORDS</span>
            </span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-slate-400 block -mt-1">
              ACCRA, GHANA
            </span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <button
            onClick={() => handleNavClick("artists")}
            className="text-sm font-medium text-slate-300 hover:text-gold-400 transition-colors tracking-wide"
          >
            ROSTER
          </button>
          <button
            onClick={() => handleNavClick("releases")}
            className="text-sm font-medium text-slate-300 hover:text-gold-400 transition-colors tracking-wide"
          >
            DISCOGRAPHY
          </button>
          <button
            onClick={() => handleNavClick("about")}
            className="text-sm font-medium text-slate-300 hover:text-gold-400 transition-colors tracking-wide"
          >
            OUR STORY
          </button>
          <button
            onClick={() => handleNavClick("store")}
            className="text-sm font-medium text-slate-300 hover:text-gold-400 transition-colors tracking-wide flex items-center gap-1.5"
          >
            VAULT <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-gold-500/20 text-gold-400 border border-gold-500/30">SOON</span>
          </button>
          <button
            onClick={() => handleNavClick("demos")}
            className="text-sm font-medium text-slate-300 hover:text-gold-400 transition-colors tracking-wide"
          >
            DEMOS
          </button>
        </nav>

        {/* Action Buttons & Portal Access */}
        <div className="hidden md:flex items-center space-x-4">
          <button
            onClick={() => setIsDemoModalOpen(true)}
            className="px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-gold-500/10 hover:bg-gold-500/20 text-gold-400 border border-gold-500/40 hover:border-gold-400 rounded-full transition-all flex items-center gap-1.5 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" /> Submit Demo
          </button>

          {currentUser ? (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsAdminModalOpen(true)}
                className="px-3.5 py-2 text-xs font-semibold bg-gradient-to-r from-gold-600 to-amber-600 text-black rounded-full hover:brightness-110 transition-all flex items-center gap-1.5 shadow-md"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>
                  {currentUser.role === "super_admin"
                    ? "Admin"
                    : currentUser.role === "artist_manager"
                    ? "Artist Studio"
                    : "Dashboard"}
                </span>
              </button>
              <button
                onClick={logout}
                title="Log out"
                className="p-2 text-slate-400 hover:text-rose-400 hover:bg-white/5 rounded-full transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="p-2 text-slate-400 hover:text-gold-400 hover:bg-white/5 rounded-full transition-colors flex items-center gap-1 text-xs"
              title="Portal Login (Admin & Artists)"
            >
              <User className="w-4 h-4" />
              <span className="text-[11px] font-medium hidden lg:inline">Portal</span>
            </button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center space-x-2">
          {currentUser && (
            <button
              onClick={() => setIsAdminModalOpen(true)}
              className="p-2 bg-gold-500/20 text-gold-400 rounded-full"
            >
              <ShieldCheck className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-200 hover:text-gold-400 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0d0d12]/95 backdrop-blur-xl border-b border-gold-500/20 px-6 py-6 space-y-4 shadow-2xl animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-3">
            <button
              onClick={() => handleNavClick("artists")}
              className="text-left text-base font-medium text-slate-200 hover:text-gold-400 py-2 border-b border-white/5"
            >
              ARTIST ROSTER
            </button>
            <button
              onClick={() => handleNavClick("releases")}
              className="text-left text-base font-medium text-slate-200 hover:text-gold-400 py-2 border-b border-white/5"
            >
              DISCOGRAPHY
            </button>
            <button
              onClick={() => handleNavClick("about")}
              className="text-left text-base font-medium text-slate-200 hover:text-gold-400 py-2 border-b border-white/5"
            >
              OUR STORY & ACCRA ROOTS
            </button>
            <button
              onClick={() => handleNavClick("store")}
              className="text-left text-base font-medium text-slate-200 hover:text-gold-400 py-2 border-b border-white/5 flex items-center justify-between"
            >
              <span>MERCH VAULT</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-gold-500/20 text-gold-400">COMING SOON</span>
            </button>
            <button
              onClick={() => handleNavClick("demos")}
              className="text-left text-base font-medium text-slate-200 hover:text-gold-400 py-2 border-b border-white/5"
            >
              DEMO SUBMISSIONS
            </button>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsDemoModalOpen(true);
              }}
              className="w-full py-2.5 text-center text-xs font-semibold uppercase tracking-wider bg-gold-500/15 text-gold-400 border border-gold-500/40 rounded-lg"
            >
              Submit Music Demo
            </button>

            {currentUser ? (
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsAdminModalOpen(true);
                  }}
                  className="flex-1 py-2.5 bg-gold-500 text-black font-semibold text-xs rounded-lg text-center"
                >
                  Open Dashboard
                </button>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="px-4 py-2.5 bg-white/10 text-rose-300 font-semibold text-xs rounded-lg"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsLoginModalOpen(true);
                }}
                className="w-full py-2.5 bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-medium rounded-lg text-center"
              >
                Portal Login (Admin & Artists)
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
