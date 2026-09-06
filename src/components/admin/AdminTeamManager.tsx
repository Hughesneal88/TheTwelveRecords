import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useContent } from "../../context/ContentContext";
import { AdminRole, AdminUser } from "../../types";
import { Users, Plus, ShieldCheck, Trash2, Key, Check, AlertCircle } from "lucide-react";

export const AdminTeamManager: React.FC = () => {
  const { adminUsers, currentUser, addAdminUser, deleteAdminUser } = useAuth();
  const { artists } = useContent();

  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    passwordHash: "",
    role: "ar_manager" as AdminRole,
    assignedArtistId: artists[0]?.id || ""
  });

  const [feedback, setFeedback] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.passwordHash) return;

    addAdminUser({
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      passwordHash: formData.passwordHash,
      role: formData.role,
      assignedArtistId: formData.role === "artist_manager" ? formData.assignedArtistId : undefined
    });

    setIsAdding(false);
    setFormData({
      name: "",
      email: "",
      passwordHash: "",
      role: "ar_manager",
      assignedArtistId: artists[0]?.id || ""
    });
    setFeedback("New team member added successfully!");
    setTimeout(() => setFeedback(null), 3000);
  };

  const getRoleBadge = (role: AdminRole) => {
    switch (role) {
      case "super_admin":
        return "bg-gold-500/20 text-gold-300 border-gold-500/40 font-bold";
      case "ar_manager":
        return "bg-blue-500/20 text-blue-300 border-blue-500/40";
      case "marketing_editor":
        return "bg-purple-500/20 text-purple-300 border-purple-500/40";
      case "artist_manager":
        return "bg-emerald-500/20 text-emerald-300 border-emerald-500/40";
      default:
        return "bg-white/10 text-white";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-cinzel font-bold text-white">
            ADMIN TEAM & ARTIST MANAGER ACCESS
          </h3>
          <p className="text-xs text-slate-400">
            Super Admin control room for managing team logins, A&R privileges, and artist self-service access.
          </p>
        </div>

        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="px-4 py-2 rounded-full bg-gold-500 hover:bg-gold-400 text-black text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md self-start"
          >
            <Plus className="w-4 h-4" />
            <span>Add Team Member</span>
          </button>
        )}
      </div>

      {feedback && (
        <div className="p-3.5 rounded-xl bg-gold-500/15 border border-gold-500/40 text-gold-300 text-xs flex items-center gap-2">
          <Check className="w-4 h-4 text-gold-400" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Add New User Form */}
      {isAdding && (
        <form onSubmit={handleSubmit} className="p-6 rounded-2xl bg-black/50 border border-gold-500/25 space-y-4 animate-in fade-in">
          <h4 className="font-cinzel font-bold text-white text-sm">
            Create Team Account
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Kwame Mensah"
                className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:border-gold-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="kwame@thetwelverecords.com"
                className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:border-gold-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                Role / Access Level *
              </label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value as AdminRole })}
                className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:border-gold-400 focus:outline-none"
              >
                <option value="super_admin">Super Admin (Executive / Full Access)</option>
                <option value="ar_manager">A&R Manager (Roster & Demos)</option>
                <option value="marketing_editor">Marketing Lead (Public Copy & Subscribers)</option>
                <option value="artist_manager">Artist / Artist Manager (Scoped to Single Artist)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                Password *
              </label>
              <input
                type="password"
                required
                value={formData.passwordHash}
                onChange={(e) => setFormData({ ...formData, passwordHash: e.target.value })}
                placeholder="Initial password"
                className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:border-gold-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Conditional Scoped Artist Selector if Artist Manager */}
          {formData.role === "artist_manager" && (
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                Assign to Artist Profile *
              </label>
              <select
                value={formData.assignedArtistId}
                onChange={(e) => setFormData({ ...formData, assignedArtistId: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:border-gold-400 focus:outline-none"
              >
                {artists.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name} (/artist/{a.slug})
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 rounded-full bg-white/10 text-slate-300 text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-full bg-gold-500 text-black text-xs font-bold uppercase tracking-wider"
            >
              Create Account
            </button>
          </div>
        </form>
      )}

      {/* Team User List */}
      <div className="space-y-3">
        {adminUsers.map((user) => {
          const matchedArtist = user.assignedArtistId
            ? artists.find((a) => a.id === user.assignedArtistId)
            : null;

          const isSelf = currentUser?.id === user.id;

          return (
            <div
              key={user.id}
              className="p-4 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-full bg-gold-500/20 border border-gold-500/30 flex items-center justify-center text-gold-400 font-bold text-sm">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-semibold text-white">
                      {user.name} {isSelf && <span className="text-[10px] text-gold-400 font-mono">(You)</span>}
                    </h4>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono border ${getRoleBadge(user.role)}`}>
                      {user.role.replace("_", " ").toUpperCase()}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400">
                    {user.email}
                    {matchedArtist && (
                      <span className="text-emerald-400 ml-1.5 font-medium">
                        &bull; Scoped to {matchedArtist.name}
                      </span>
                    )}
                  </span>
                </div>
              </div>

              {!isSelf && (
                <button
                  onClick={() => {
                    if (confirm(`Remove access for ${user.name}?`)) {
                      deleteAdminUser(user.id);
                    }
                  }}
                  className="p-2 text-slate-400 hover:text-rose-400 hover:bg-white/5 rounded-lg"
                  title="Delete user"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
