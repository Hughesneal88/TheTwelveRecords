import React, { useState } from "react";
import { useContent } from "../../context/ContentContext";
import { DemoStatus } from "../../types";
import { Sparkles, ExternalLink, MessageSquare, Trash2, CheckCircle2, Clock } from "lucide-react";

export const DemosInbox: React.FC = () => {
  const { demos, updateDemoStatus, deleteDemo } = useContent();
  const [selectedStatus, setSelectedStatus] = useState<string>("All");

  const statuses: (DemoStatus | "All")[] = ["All", "New", "Under Review", "Shortlisted", "Contacted", "Archived"];

  const filteredDemos = selectedStatus === "All"
    ? demos
    : demos.filter((d) => d.status === selectedStatus);

  const getStatusColor = (status: DemoStatus) => {
    switch (status) {
      case "New":
        return "bg-blue-500/20 text-blue-300 border-blue-500/40";
      case "Under Review":
        return "bg-amber-500/20 text-amber-300 border-amber-500/40";
      case "Shortlisted":
        return "bg-gold-500/20 text-gold-300 border-gold-500/40 font-bold";
      case "Contacted":
        return "bg-emerald-500/20 text-emerald-300 border-emerald-500/40";
      case "Archived":
        return "bg-slate-500/20 text-slate-400 border-slate-500/40";
      default:
        return "bg-white/10 text-white";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-cinzel font-bold text-white">
            A&R DEMO SUBMISSION INBOX ({demos.length})
          </h3>
          <p className="text-xs text-slate-400">
            Review streaming links, spiritual callings, and candidate notes from artists who submitted music.
          </p>
        </div>

        {/* Status Filter */}
        <div className="flex flex-wrap gap-2">
          {statuses.map((s) => (
            <button
              key={s}
              onClick={() => setSelectedStatus(s)}
              className={`px-3 py-1 rounded-full text-xs font-medium tracking-wider transition-all ${
                selectedStatus === s
                  ? "bg-gold-500 text-black font-semibold"
                  : "bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {filteredDemos.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-black/40 border border-white/10">
          <p className="text-xs text-slate-400">No submissions found in this category.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredDemos.map((demo) => (
            <div
              key={demo.id}
              className="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-4 hover:border-gold-500/30 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono border ${getStatusColor(demo.status)}`}>
                      {demo.status}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      Submitted {new Date(demo.submittedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h4 className="text-lg font-cinzel font-bold text-white">
                    {demo.artistName}
                  </h4>
                  <p className="text-xs text-slate-400">
                    Contact: <span className="text-slate-200">{demo.contactName}</span> &bull; {demo.email} &bull; {demo.cityCountry}
                  </p>
                </div>

                {/* Status Selector */}
                <div className="flex items-center gap-2 self-start sm:self-center">
                  <select
                    value={demo.status}
                    onChange={(e) => updateDemoStatus(demo.id, e.target.value as DemoStatus)}
                    className="px-3 py-1.5 rounded-xl bg-[#16161e] border border-white/20 text-xs text-white focus:border-gold-400 focus:outline-none"
                  >
                    <option value="New">Status: New</option>
                    <option value="Under Review">Status: Under Review</option>
                    <option value="Shortlisted">Status: Shortlisted</option>
                    <option value="Contacted">Status: Contacted</option>
                    <option value="Archived">Status: Archived</option>
                  </select>

                  <button
                    onClick={() => {
                      if (confirm(`Delete submission from ${demo.artistName}?`)) {
                        deleteDemo(demo.id);
                      }
                    }}
                    className="p-2 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-white/5"
                    title="Delete demo submission"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Streaming Link */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-gold-500/10 border border-gold-500/25">
                <div className="min-w-0 pr-4">
                  <span className="text-[10px] font-mono uppercase text-gold-400 block font-semibold">
                    STREAMING DEMO PLAYLIST ({demo.genre})
                  </span>
                  <a
                    href={demo.streamingLink}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-gold-200 hover:text-white underline truncate block"
                  >
                    {demo.streamingLink}
                  </a>
                </div>

                <a
                  href={demo.streamingLink}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-1.5 rounded-full bg-gold-500 hover:bg-gold-400 text-black font-bold text-xs flex items-center gap-1.5 flex-shrink-0"
                >
                  <span>Listen</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Spiritual Calling & Ministry Vision */}
              <div className="space-y-1">
                <span className="text-[11px] font-semibold text-slate-300">Spiritual Calling & Testimony:</span>
                <p className="text-xs text-slate-300 font-light leading-relaxed italic bg-white/5 p-3 rounded-xl border border-white/5">
                  "{demo.spiritualCalling}"
                </p>
              </div>

              {/* Internal A&R Notes */}
              <div className="space-y-1">
                <span className="text-[11px] font-semibold text-slate-300 flex items-center gap-1">
                  <MessageSquare className="w-3 h-3 text-gold-400" /> A&R Review Notes:
                </span>
                <input
                  type="text"
                  value={demo.internalNotes || ""}
                  onChange={(e) => updateDemoStatus(demo.id, demo.status, e.target.value)}
                  placeholder="Type internal notes (e.g. 'Strong vocals on track 1, follow up next Tuesday')..."
                  className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:border-gold-400 focus:outline-none placeholder-slate-500"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
