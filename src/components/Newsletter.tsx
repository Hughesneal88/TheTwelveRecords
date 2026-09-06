import React, { useState } from "react";
import { useContent } from "../context/ContentContext";
import { Sparkles, CheckCircle, Download, X, Disc, ArrowRight, ShieldCheck } from "lucide-react";

export const Newsletter: React.FC = () => {
  const { addSubscriber, isNewsletterModalOpen, setIsNewsletterModalOpen } = useContent();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isDone, setIsDone] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    addSubscriber(email, name, "The Twelve Circle Lead Magnet");
    setIsDone(true);
  };

  const handleModalClose = () => {
    setIsNewsletterModalOpen(false);
    setIsDone(false);
    setEmail("");
    setName("");
  };

  return (
    <>
      {/* Inline Newsletter Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5 relative">
        <div className="relative rounded-3xl p-8 sm:p-14 border border-white/10 bg-[#09090d] overflow-hidden">
          {/* Subtle architectural background line */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold-400/[0.03] rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl mx-auto text-center space-y-7 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-gold-400 text-[10px] font-mono tracking-widest uppercase">
              <Disc className="w-3 h-3 text-gold-400 animate-spin" style={{ animationDuration: "8s" }} />
              <span>PRIVATE FAN COMMUNITY // DIRECT FROM ACCRA</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tightest uppercase">
              JOIN <span className="text-gold-400">THE TWELVE CIRCLE</span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed max-w-2xl mx-auto">
              Subscribe to receive the unreleased <strong className="text-white font-medium">2026 Accra Acoustic Worship Sampler (3 Tracks)</strong>, exclusive vinyl release dates, and private concert access.
            </p>

            {isDone ? (
              <div className="p-5 rounded-2xl bg-gold-400/10 border border-gold-400/30 text-gold-200 text-xs sm:text-sm flex flex-col sm:flex-row items-center justify-between gap-4 animate-in zoom-in-95">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-gold-400 flex-shrink-0" />
                  <span className="text-left">Welcome to The Twelve Circle! Your sampler link is ready:</span>
                </div>
                <button
                  onClick={() => alert("Simulated: Downloading The Twelve Records Accra Sampler ZIP (3 Tracks)...")}
                  className="px-5 py-2.5 bg-gold-400 text-black text-xs font-mono font-bold uppercase tracking-wider rounded-full flex items-center gap-2 flex-shrink-0 hover:bg-gold-300 transition-colors shadow-lg"
                >
                  <Download className="w-4 h-4" />
                  <span>Download MP3 Sampler</span>
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="flex-1 px-5 py-3.5 rounded-full bg-black/60 border border-white/15 focus:border-gold-400 focus:outline-none text-xs sm:text-sm text-white placeholder-slate-500 font-sans transition-all"
                />
                <button
                  type="submit"
                  className="px-7 py-3.5 rounded-full bg-gold-400 hover:bg-gold-300 text-black font-display font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg flex-shrink-0 group"
                >
                  <span>Claim Sampler</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </form>
            )}

            <div className="flex items-center justify-center gap-4 text-[10px] text-slate-500 font-mono">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-gold-400/70" /> NO SPAM &bull; 100% GOSPEL MUSIC UPDATES
              </span>
              <span>&bull;</span>
              <span>UNSUBSCRIBE ANYTIME</span>
            </div>
          </div>
        </div>
      </section>

      {/* Modal Lead Magnet */}
      {isNewsletterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-md bg-[#0b0b0f] border border-gold-400/30 rounded-3xl p-6 sm:p-8 text-center space-y-6 shadow-2xl">
            <button
              onClick={handleModalClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-14 h-14 rounded-full bg-gold-400/10 border border-gold-400/30 text-gold-400 flex items-center justify-center mx-auto">
              <Disc className="w-7 h-7 animate-spin" style={{ animationDuration: "10s" }} />
            </div>

            <div>
              <span className="text-[10px] font-mono tracking-widest text-gold-400 uppercase block mb-1">
                EXCLUSIVE FAN ACCESS
              </span>
              <h3 className="text-2xl font-display font-bold text-white uppercase tracking-tight">
                FREE LABEL SAMPLER
              </h3>
              <p className="text-xs text-slate-300 mt-2 font-light leading-relaxed">
                Download 3 unreleased acoustic worship and Afro-Gospel tracks recorded live in Accra directly to your inbox.
              </p>
            </div>

            {isDone ? (
              <div className="space-y-4 pt-2">
                <div className="p-3.5 rounded-xl bg-gold-400/15 border border-gold-400/40 text-gold-300 text-xs font-mono">
                  Thank you! Your download is now ready.
                </div>
                <button
                  onClick={() => {
                    alert("Simulated: Downloading The Twelve Records Accra Sampler ZIP (3 Tracks)...");
                    handleModalClose();
                  }}
                  className="w-full py-3.5 bg-gold-400 text-black text-xs font-mono font-bold uppercase tracking-wider rounded-full flex items-center justify-center gap-2 hover:bg-gold-300 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Download MP3 Sampler</span>
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name (Optional)"
                  className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:border-gold-400 focus:outline-none"
                />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email Address *"
                  className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:border-gold-400 focus:outline-none"
                />
                <button
                  type="submit"
                  className="w-full py-3.5 bg-gold-400 hover:bg-gold-300 text-black text-xs font-display font-bold uppercase tracking-wider rounded-full shadow-lg transition-all"
                >
                  Claim Free Sampler
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};
