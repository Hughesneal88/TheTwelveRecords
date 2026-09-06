import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useContent } from "../../context/ContentContext";
import { X, Lock, Mail, ShieldCheck, UserCheck, AlertCircle, Sparkles } from "lucide-react";

export const AdminLoginModal: React.FC = () => {
  const { isLoginModalOpen, setIsLoginModalOpen, setIsAdminModalOpen } = useContent();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  if (!isLoginModalOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const success = login(email, password);
    if (success) {
      setIsLoginModalOpen(false);
      setIsAdminModalOpen(true);
      setEmail("");
      setPassword("");
    } else {
      setError("Invalid email address or password. Please try again.");
    }
  };

  const handleQuickLogin = (quickEmail: string, quickPass: string) => {
    setEmail(quickEmail);
    setPassword(quickPass);
    const success = login(quickEmail, quickPass);
    if (success) {
      setIsLoginModalOpen(false);
      setIsAdminModalOpen(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-md bg-[#0d0d12] border border-gold-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Close Button */}
        <button
          onClick={() => setIsLoginModalOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full overflow-hidden border border-gold-500/40 p-0.5 mx-auto">
            <img src="/assets/logo.jpg" alt="The Twelve Records" className="w-full h-full object-cover rounded-full" />
          </div>
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-gold-400 block">
            THE TWELVE RECORDS &bull; SECURE PORTAL
          </span>
          <h3 className="text-2xl font-display font-bold text-white tracking-tight uppercase">
            LABEL PORTAL LOGIN
          </h3>
          <p className="text-xs text-slate-400 font-light">
            Sign in with your role-based credentials (Executive, A&R, Marketing, or Artist Manager).
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@thetwelverecords.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/60 border border-white/15 focus:border-gold-400 focus:outline-none text-xs text-white placeholder-slate-500"
              />
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/60 border border-white/15 focus:border-gold-400 focus:outline-none text-xs text-white placeholder-slate-500"
              />
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-gold-500 to-amber-600 hover:from-gold-400 hover:to-amber-500 text-black font-bold text-xs uppercase tracking-wider rounded-full shadow-lg transition-all"
          >
            Sign In to Portal
          </button>
        </form>

        {/* Demo Quick-Login Role Switcher for Fast Evaluation */}
        <div className="pt-4 border-t border-white/10">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-2 text-center flex items-center justify-center gap-1">
            <Sparkles className="w-3 h-3 text-gold-400" />
            <span>TEST DEMO ACCOUNTS (1-CLICK QUICK SWITCH)</span>
          </span>

          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <button
              type="button"
              onClick={() => handleQuickLogin("admin@thetwelverecords.com", "TwelveAdmin2026!")}
              className="p-2 rounded-lg bg-white/5 hover:bg-gold-500/20 text-slate-200 hover:text-gold-300 border border-white/10 text-left transition-colors"
            >
              <div className="font-semibold text-gold-400">Super Admin</div>
              <div className="text-[10px] text-slate-400">Full Label Control</div>
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin("ar@thetwelverecords.com", "TwelveAR2026!")}
              className="p-2 rounded-lg bg-white/5 hover:bg-gold-500/20 text-slate-200 hover:text-gold-300 border border-white/10 text-left transition-colors"
            >
              <div className="font-semibold text-gold-400">A&R Manager</div>
              <div className="text-[10px] text-slate-400">Roster & Demos</div>
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin("press@thetwelverecords.com", "TwelveMedia2026!")}
              className="p-2 rounded-lg bg-white/5 hover:bg-gold-500/20 text-slate-200 hover:text-gold-300 border border-white/10 text-left transition-colors"
            >
              <div className="font-semibold text-gold-400">Marketing Lead</div>
              <div className="text-[10px] text-slate-400">Page Copy & Fans</div>
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin("artist.kofi@thetwelverecords.com", "TwelveArtist2026!")}
              className="p-2 rounded-lg bg-white/5 hover:bg-gold-500/20 text-slate-200 hover:text-gold-300 border border-white/10 text-left transition-colors"
            >
              <div className="font-semibold text-gold-400">Artist: Kofi Owusu</div>
              <div className="text-[10px] text-slate-400">Scoped Profile Edit</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
