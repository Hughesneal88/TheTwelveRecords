import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useContent } from "../../context/ContentContext";
import { User, Lock, Mail, ShieldCheck, Check, Key, ExternalLink } from "lucide-react";

export const UserProfileEditor: React.FC = () => {
  const { currentUser, updateAdminUser } = useAuth();
  const { artists, navigateToArtist, setIsAdminModalOpen } = useContent();

  if (!currentUser) return null;

  const matchedArtist = currentUser.assignedArtistId
    ? artists.find((a) => a.id === currentUser.assignedArtistId)
    : null;

  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [password, setPassword] = useState(currentUser.passwordHash);
  const [savedFeedback, setSavedFeedback] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) return;

    updateAdminUser(currentUser.id, {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      passwordHash: password
    });

    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 3500);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h3 className="text-xl font-display font-bold text-white uppercase tracking-tight">
          MY ACCOUNT & PROFILE SETTINGS
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Manage your personal login credentials, display name, email, and password.
        </p>
      </div>

      {savedFeedback && (
        <div className="p-3.5 rounded-xl bg-gold-400/15 border border-gold-400/40 text-gold-300 text-xs font-mono flex items-center gap-2 animate-in fade-in">
          <Check className="w-4 h-4 text-gold-400 flex-shrink-0" />
          <span>Profile updated and synchronized with Supabase cloud database!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-2xl bg-black/40 border border-white/10 space-y-5">
        {/* Role & Access Info Badge */}
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gold-400/15 border border-gold-400/30 flex items-center justify-center text-gold-400 font-display font-bold text-sm">
              {currentUser.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-display font-bold text-white">{currentUser.name}</span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-gold-400/20 text-gold-300 border border-gold-400/30 uppercase">
                  {currentUser.role.replace("_", " ")}
                </span>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">{currentUser.email}</span>
            </div>
          </div>

          {matchedArtist && (
            <button
              type="button"
              onClick={() => {
                setIsAdminModalOpen(false);
                navigateToArtist(matchedArtist.slug);
              }}
              className="text-[11px] text-gold-400 hover:text-gold-300 font-mono flex items-center gap-1 self-start sm:self-center"
            >
              <span>View Public Page ({matchedArtist.name})</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Form Inputs */}
        <div className="space-y-4">
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-300 mb-1.5">
              Full Display Name *
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Kofi Owusu"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/60 border border-white/15 focus:border-gold-400 focus:outline-none text-xs text-white placeholder-slate-500 font-sans"
              />
              <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-300 mb-1.5">
              Email Address (Login) *
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@thetwelverecords.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/60 border border-white/15 focus:border-gold-400 focus:outline-none text-xs text-white placeholder-slate-500 font-mono"
              />
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-300 mb-1.5">
              Account Password *
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/60 border border-white/15 focus:border-gold-400 focus:outline-none text-xs text-white placeholder-slate-500 font-mono"
              />
              <Key className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
            </div>
            <p className="text-[10px] text-slate-500 mt-1 font-mono">
              You can type a new password here to update your login credentials.
            </p>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-white/10">
          <button
            type="submit"
            className="px-7 py-2.5 rounded-full bg-gold-400 hover:bg-gold-300 text-black font-display font-bold text-xs uppercase tracking-wider shadow-lg transition-all"
          >
            Save Account Settings
          </button>
        </div>
      </form>
    </div>
  );
};
