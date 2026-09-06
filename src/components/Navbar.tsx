import React, { useState, useEffect } from "react";
import { useContent } from "../context/ContentContext";
import { useAuth } from "../context/AuthContext";
import { Menu, X, ArrowUpRight, User, ShieldCheck, LogOut } from "lucide-react";

export const Navbar: React.FC = () => {
  const { currentView, navigateToHome, setIsLoginModalOpen, setIsAdminModalOpen, setIsDemoModalOpen } = useContent();
  const { currentUser, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
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
          ? "bg-[#070709]/95 backdrop-blur-md border-b border-white/10 py-3.5"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo & Title */}
        <button
          onClick={navigateToHome}
          className="flex items-center space-x-3.5 group text-left focus:outline-none"
        >
          <div className="w-10 h-10 rounded-full overflow-hidden border border-[#c8a858]/40 p-0.5 group-hover:border-[#c8a858] transition-colors bg-black flex-shrink-0">
            <img
              src="/assets/logo.jpg"
              alt="The Twelve Records"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div>
            <span className="font-display font-black text-base sm:text-lg tracking-tight text-white group-hover:text-[#c8a858] transition-colors block leading-none">
              THE TWELVE
            </span>
            <span className="font-mono text-[10px] tracking-[0.2em] text-[#a1a1aa] uppercase mt-0.5 block">
              RECORDS &bull; ACCRA
            </span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 text-xs font-semibold tracking-wider text-[#a1a1aa] uppercase">
          <button
            onClick={() => handleNavClick("artists")}
            className="hover:text-white transition-colors"
          >
            Roster
          </button>
          <button
            onClick={() => handleNavClick("releases")}
            className="hover:text-white transition-colors"
          >
            Releases
          </button>
          <button
            onClick={() => handleNavClick("about")}
            className="hover:text-white transition-colors"
          >
            About
          </button>
          <button
            onClick={() => handleNavClick("store")}
            className="hover:text-white transition-colors flex items-center gap-1.5"
          >
            <span>Vault</span>
            <span className="text-[9px] px-1.5 py-0.2 rounded bg-white/10 text-[#c8a858] font-mono">
              SOON
            </span>
          </button>
          <button
            onClick={() => handleNavClick("demos")}
            className="hover:text-white transition-colors"
          >
            A&R / Demos
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <button
            onClick={() => setIsDemoModalOpen(true)}
            className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-black bg-[#c8a858] hover:bg-[#d9c585] rounded-full transition-all flex items-center gap-1.5"
          >
            <span>Submit Demo</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {currentUser ? (
            <div className="flex items-center space-x-2 pl-2 border-l border-white/10">
              <button
                onClick={() => setIsAdminModalOpen(true)}
                className="px-3.5 py-2 text-xs font-semibold bg-white/10 hover:bg-white/20 text-white rounded-full transition-all flex items-center gap-1.5"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#c8a858]" />
                <span>
                  {currentUser.role === "super_admin"
                    ? "Admin"
                    : currentUser.role === "artist_manager"
                    ? "Artist Studio"
                    : "CMS"}
                </span>
              </button>
              <button
                onClick={logout}
                title="Log out"
                className="p-2 text-zinc-400 hover:text-rose-400 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="p-2 text-zinc-400 hover:text-white rounded-full transition-colors flex items-center gap-1.5 text-xs font-medium"
              title="Portal Login"
            >
              <User className="w-4 h-4" />
              <span className="hidden lg:inline text-[11px] uppercase tracking-wider">Portal</span>
            </button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center space-x-2">
          {currentUser && (
            <button
              onClick={() => setIsAdminModalOpen(true)}
              className="p-2 bg-[#c8a858]/20 text-[#c8a858] rounded-full"
            >
              <ShieldCheck className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-zinc-300 hover:text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0a0e] border-b border-white/10 px-6 py-6 space-y-4">
          <div className="flex flex-col space-y-3 font-display text-lg tracking-tight">
            <button
              onClick={() => handleNavClick("artists")}
              className="text-left text-zinc-200 hover:text-[#c8a858] py-2 border-b border-white/5"
            >
              ARTISTS
            </button>
            <button
              onClick={() => handleNavClick("releases")}
              className="text-left text-zinc-200 hover:text-[#c8a858] py-2 border-b border-white/5"
            >
              RELEASES
            </button>
            <button
              onClick={() => handleNavClick("about")}
              className="text-left text-zinc-200 hover:text-[#c8a858] py-2 border-b border-white/5"
            >
              ABOUT / ACCRA
            </button>
            <button
              onClick={() => handleNavClick("store")}
              className="text-left text-zinc-200 hover:text-[#c8a858] py-2 border-b border-white/5 flex items-center justify-between"
            >
              <span>MERCH VAULT</span>
              <span className="text-xs px-2 py-0.5 rounded bg-white/10 text-[#c8a858] font-mono">COMING SOON</span>
            </button>
            <button
              onClick={() => handleNavClick("demos")}
              className="text-left text-zinc-200 hover:text-[#c8a858] py-2 border-b border-white/5"
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
              className="w-full py-3 text-center text-xs font-bold uppercase tracking-wider bg-[#c8a858] text-black rounded-lg"
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
                  className="flex-1 py-2.5 bg-white/10 text-white font-semibold text-xs rounded-lg text-center"
                >
                  Open Dashboard
                </button>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="px-4 py-2.5 bg-white/5 text-rose-300 font-semibold text-xs rounded-lg"
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
                className="w-full py-2.5 bg-white/5 text-zinc-400 hover:text-white text-xs font-medium rounded-lg text-center"
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
