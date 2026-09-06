import React, { useState } from "react";
import { useContent } from "../../context/ContentContext";
import { useAuth } from "../../context/AuthContext";
import { ArtistEditor } from "./ArtistEditor";
import { ReleaseEditor } from "./ReleaseEditor";
import { PageEditor } from "./PageEditor";
import { DemosInbox } from "./DemosInbox";
import { SubscribersView } from "./SubscribersView";
import { AdminTeamManager } from "./AdminTeamManager";
import {
  X,
  Users,
  Disc,
  FileText,
  Sparkles,
  Mail,
  ShieldCheck,
  Download,
  RotateCcw,
  LogOut,
  User
} from "lucide-react";

export const AdminModal: React.FC = () => {
  const {
    isAdminModalOpen,
    setIsAdminModalOpen,
    exportBackup,
    factoryReset
  } = useContent();

  const {
    currentUser,
    logout,
    canEditAllArtists,
    canEditPageContent,
    canReviewDemos,
    canManageTeam,
    canExportSubscribers
  } = useAuth();

  const isArtistManager = currentUser?.role === "artist_manager";

  // Active tab state
  const [activeTab, setActiveTab] = useState<
    "artists" | "releases" | "content" | "demos" | "subscribers" | "team" | "settings"
  >(isArtistManager ? "artists" : "artists");

  if (!isAdminModalOpen || !currentUser) return null;

  const handleClose = () => {
    setIsAdminModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/90 backdrop-blur-xl animate-in fade-in">
      <div className="relative w-full max-w-6xl h-[90vh] bg-[#0c0c10] border border-gold-500/30 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="px-6 py-4 bg-[#14141c] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-full overflow-hidden border border-gold-500/40 p-0.5">
              <img src="/assets/logo.jpg" alt="Logo" className="w-full h-full object-cover rounded-full" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-cinzel text-sm font-bold text-white">
                  THE TWELVE CMS &bull; CONTROL ROOM
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-gold-500/20 text-gold-300 font-mono uppercase font-bold border border-gold-500/30">
                  {currentUser.role.replace("_", " ")}
                </span>
              </div>
              <span className="text-xs text-slate-400 font-light">
                Logged in as <strong className="text-white font-medium">{currentUser.name}</strong> ({currentUser.email})
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                logout();
                setIsAdminModalOpen(false);
              }}
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-rose-500/20 text-slate-300 hover:text-rose-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>

            <button
              onClick={handleClose}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
              aria-label="Close dashboard"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Body: Tabs & Content Workspace */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Navigation Sidebar */}
          <div className="w-full md:w-64 bg-[#0e0e14] border-r border-white/5 p-4 flex md:flex-col gap-1.5 overflow-x-auto md:overflow-x-visible">
            {/* Artists Tab */}
            <button
              onClick={() => setActiveTab("artists")}
              className={`px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-all w-full text-left flex-shrink-0 ${
                activeTab === "artists"
                  ? "bg-gold-500 text-black shadow-md font-bold"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Users className="w-4 h-4" />
              <span>{isArtistManager ? "My Artist Profile" : "Artist Roster"}</span>
            </button>

            {/* Releases Tab (Super Admin, A&R, Marketing) */}
            {!isArtistManager && (
              <button
                onClick={() => setActiveTab("releases")}
                className={`px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-all w-full text-left flex-shrink-0 ${
                  activeTab === "releases"
                    ? "bg-gold-500 text-black shadow-md font-bold"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Disc className="w-4 h-4" />
                <span>Discography</span>
              </button>
            )}

            {/* Demos Inbox (Super Admin, A&R) */}
            {canReviewDemos && !isArtistManager && (
              <button
                onClick={() => setActiveTab("demos")}
                className={`px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-all w-full text-left flex-shrink-0 ${
                  activeTab === "demos"
                    ? "bg-gold-500 text-black shadow-md font-bold"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>Demo Submissions</span>
              </button>
            )}

            {/* Page Copy (Super Admin, Marketing) */}
            {canEditPageContent && !isArtistManager && (
              <button
                onClick={() => setActiveTab("content")}
                className={`px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-all w-full text-left flex-shrink-0 ${
                  activeTab === "content"
                    ? "bg-gold-500 text-black shadow-md font-bold"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Page Copy & SEO</span>
              </button>
            )}

            {/* Fan Subscribers (Super Admin, Marketing) */}
            {canExportSubscribers && !isArtistManager && (
              <button
                onClick={() => setActiveTab("subscribers")}
                className={`px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-all w-full text-left flex-shrink-0 ${
                  activeTab === "subscribers"
                    ? "bg-gold-500 text-black shadow-md font-bold"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Mail className="w-4 h-4" />
                <span>Fan Subscribers</span>
              </button>
            )}

            {/* Team Management (Super Admin only) */}
            {canManageTeam && !isArtistManager && (
              <button
                onClick={() => setActiveTab("team")}
                className={`px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-all w-full text-left flex-shrink-0 ${
                  activeTab === "team"
                    ? "bg-gold-500 text-black shadow-md font-bold"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Team Accounts</span>
              </button>
            )}

            {/* Global Settings & Export (Super Admin only) */}
            {canManageTeam && !isArtistManager && (
              <button
                onClick={() => setActiveTab("settings")}
                className={`px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-all w-full text-left flex-shrink-0 ${
                  activeTab === "settings"
                    ? "bg-gold-500 text-black shadow-md font-bold"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Download className="w-4 h-4" />
                <span>Data Backup & Sync</span>
              </button>
            )}
          </div>

          {/* Workspace Area */}
          <div className="flex-1 p-6 sm:p-8 overflow-y-auto bg-[#0c0c10]">
            {activeTab === "artists" && <ArtistEditor />}
            {activeTab === "releases" && <ReleaseEditor />}
            {activeTab === "content" && <PageEditor />}
            {activeTab === "demos" && <DemosInbox />}
            {activeTab === "subscribers" && <SubscribersView />}
            {activeTab === "team" && <AdminTeamManager />}
            {activeTab === "settings" && (
              <div className="space-y-6 max-w-xl">
                <div>
                  <h3 className="text-xl font-cinzel font-bold text-white">
                    DATA BACKUP & REPOSITORY SYNC
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Export your entire label catalog, artist bios, and settings as a clean JSON backup, or restore factory demo data.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-semibold text-white">Download All Data (JSON)</h4>
                      <p className="text-xs text-slate-400">Save a complete snapshot to your local computer.</p>
                    </div>
                    <button
                      onClick={exportBackup}
                      className="px-4 py-2 rounded-full bg-gold-500 hover:bg-gold-400 text-black font-bold text-xs uppercase"
                    >
                      Export Backup
                    </button>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-semibold text-rose-300">Reset to Factory Defaults</h4>
                      <p className="text-xs text-slate-400">Clear all local customizations and restore initial demo state.</p>
                    </div>
                    <button
                      onClick={() => {
                        if (confirm("Reset all customizations to factory defaults?")) {
                          factoryReset();
                        }
                      }}
                      className="px-4 py-2 rounded-full bg-rose-500/20 hover:bg-rose-500 text-rose-300 hover:text-white font-bold text-xs uppercase transition-colors"
                    >
                      Reset Defaults
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
