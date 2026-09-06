import React from "react";
import { useContent } from "../../context/ContentContext";
import { Download, Users, Mail, Calendar, Sparkles } from "lucide-react";

export const SubscribersView: React.FC = () => {
  const { subscribers, exportCSV } = useContent();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-cinzel font-bold text-white">
            THE TWELVE CIRCLE SUBSCRIBERS ({subscribers.length})
          </h3>
          <p className="text-xs text-slate-400">
            Direct fan audience captured via lead magnets, acoustic sampler downloads, and store notifications.
          </p>
        </div>

        <button
          onClick={exportCSV}
          className="px-5 py-2.5 rounded-full bg-gradient-to-r from-gold-500 to-amber-600 hover:from-gold-400 hover:to-amber-500 text-black text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg self-start"
        >
          <Download className="w-4 h-4" />
          <span>Export to CSV</span>
        </button>
      </div>

      {subscribers.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-black/40 border border-white/10">
          <p className="text-xs text-slate-400">No subscribers captured yet.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-black/40">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#14141c] text-gold-400 uppercase font-mono text-[10px] tracking-wider border-b border-white/10">
              <tr>
                <th className="py-3.5 px-4">#</th>
                <th className="py-3.5 px-4">Email Address</th>
                <th className="py-3.5 px-4">Fan Name</th>
                <th className="py-3.5 px-4">Source Channel</th>
                <th className="py-3.5 px-4">Subscribed Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-light">
              {subscribers.map((sub, idx) => (
                <tr key={sub.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-3 px-4 font-mono text-slate-500">{idx + 1}</td>
                  <td className="py-3 px-4 font-medium text-white flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-gold-400" />
                    <span>{sub.email}</span>
                  </td>
                  <td className="py-3 px-4 text-slate-300">{sub.name || "—"}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded-full bg-white/5 text-[10px] text-gold-300 border border-white/10">
                      {sub.source}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-400">
                    {new Date(sub.subscribedAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
