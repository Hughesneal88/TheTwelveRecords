import React from "react";
import { useContent } from "../context/ContentContext";
import { useAuth } from "../context/AuthContext";
import { MapPin, Lock, ShieldCheck, ArrowUpRight } from "lucide-react";

export const Footer: React.FC = () => {
  const { labelInfo, navigateToHome, setIsLoginModalOpen, setIsAdminModalOpen, setIsDemoModalOpen } = useContent();
  const { currentUser } = useAuth();

  const handleNavClick = (sectionId: string) => {
    navigateToHome();
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <footer className="bg-[#050507] border-t border-white/10 pt-20 pb-14 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-white/5">
          {/* Col 1: Label Brand & Ethos */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={navigateToHome}>
              <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20 p-0.5 bg-black">
                <img
                  src="/assets/logo.jpg"
                  alt="The Twelve Records"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <span className="font-display text-lg font-bold text-white tracking-wider uppercase">
                THE TWELVE <span className="text-gold-400">RECORDS</span>
              </span>
            </div>

            <p className="text-xs text-slate-400 font-light leading-relaxed max-w-sm">
              {labelInfo.tagline}. An independent Christian record label advancing Afro-Gospel and Contemporary Worship from Accra, Ghana to the nations.
            </p>

            <div className="flex items-center gap-2 text-[11px] text-gold-400/90 font-mono">
              <MapPin className="w-3.5 h-3.5" />
              <span>{labelInfo.address}</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="font-mono text-xs font-bold text-white uppercase tracking-widest text-gold-400">
              NAVIGATION
            </h4>
            <ul className="space-y-2.5 text-xs font-sans">
              <li>
                <button onClick={() => handleNavClick("artists")} className="hover:text-white transition-colors">
                  Artist Roster
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick("releases")} className="hover:text-white transition-colors">
                  Discography
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick("about")} className="hover:text-white transition-colors">
                  Our Story & Accra HQ
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick("store")} className="hover:text-white transition-colors">
                  Merch Vault (2026)
                </button>
              </li>
              <li>
                <button onClick={() => setIsDemoModalOpen(true)} className="hover:text-white transition-colors flex items-center gap-1 text-gold-400">
                  <span>Submit Demo</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: African & Global DSPs */}
          <div className="space-y-4">
            <h4 className="font-mono text-xs font-bold text-white uppercase tracking-widest text-gold-400">
              STREAMING HUBS
            </h4>
            <ul className="space-y-2.5 text-xs font-mono">
              <li>
                <a href={labelInfo.socials.boomplay} target="_blank" rel="noreferrer" className="hover:text-gold-400 transition-colors flex items-center justify-between group">
                  <span>BOOMPLAY AFRICA</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href={labelInfo.socials.audiomack} target="_blank" rel="noreferrer" className="hover:text-amber-400 transition-colors flex items-center justify-between group">
                  <span>AUDIOMACK</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href={labelInfo.socials.spotify} target="_blank" rel="noreferrer" className="hover:text-[#1DB954] transition-colors flex items-center justify-between group">
                  <span>SPOTIFY</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href={labelInfo.socials.youtube} target="_blank" rel="noreferrer" className="hover:text-red-400 transition-colors flex items-center justify-between group">
                  <span>YOUTUBE</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href={labelInfo.socials.instagram} target="_blank" rel="noreferrer" className="hover:text-pink-400 transition-colors flex items-center justify-between group">
                  <span>INSTAGRAM</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Inquiries */}
          <div className="space-y-4">
            <h4 className="font-mono text-xs font-bold text-white uppercase tracking-widest text-gold-400">
              DIRECT INQUIRIES
            </h4>
            <div className="space-y-2 text-xs text-slate-400 font-light">
              <p>General: <a href={`mailto:${labelInfo.contactEmail}`} className="text-white hover:text-gold-400 transition-colors">{labelInfo.contactEmail}</a></p>
              <p>Bookings: <a href={`mailto:${labelInfo.bookingEmail}`} className="text-white hover:text-gold-400 transition-colors">{labelInfo.bookingEmail}</a></p>
              <p>Press & Media: <a href={`mailto:${labelInfo.pressEmail}`} className="text-white hover:text-gold-400 transition-colors">{labelInfo.pressEmail}</a></p>
              <p>HQ Studio: <span className="text-white font-mono">{labelInfo.phone}</span></p>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Discreet Admin Access */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-mono">
          <p>
            &copy; {new Date().getFullYear()} The Twelve Records. All rights reserved. Registered in Accra, Ghana.
          </p>

          <div className="flex items-center space-x-6">
            <button
              onClick={() => {
                if (currentUser) {
                  setIsAdminModalOpen(true);
                } else {
                  setIsLoginModalOpen(true);
                }
              }}
              className="flex items-center gap-1.5 hover:text-gold-400 transition-colors group"
              title="Portal & CMS Access"
            >
              {currentUser ? (
                <>
                  <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
                  <span className="text-gold-400 font-medium">
                    Logged in as {currentUser.name}
                  </span>
                </>
              ) : (
                <>
                  <Lock className="w-3 h-3 text-slate-600 group-hover:text-gold-400 transition-colors" />
                  <span>Portal Login</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
