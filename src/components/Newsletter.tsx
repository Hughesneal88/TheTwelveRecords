import React, { useState } from "react";
import { useContent } from "../context/ContentContext";
import { Mail, Sparkles, CheckCircle, Download, X, Gift } from "lucide-react";

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
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-gold-500/10">
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-gold-500/25 relative overflow-hidden bg-gradient-to-b from-[#101017] to-[#08080a]">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gold-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="max-w-2xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-500/15 border border-gold-500/30 text-gold-300 text-xs font-semibold uppercase tracking-widest">
              <Gift className="w-3.5 h-3.5 text-gold-400" />
              <span>FAN COMMUNITY & EXCLUSIVES</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-cinzel font-bold text-white tracking-wide">
              JOIN <span className="text-gold-gradient">THE TWELVE CIRCLE</span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
              Subscribe to receive the unreleased <strong className="text-gold-400 font-semibold">2026 Accra Acoustic Worship Sampler (3 Tracks)</strong>, early concert invitations, and private release pre-saves.
            </p>

            {isDone ? (
              <div className="p-4 rounded-2xl bg-gold-500/15 border border-gold-500/40 text-gold-200 text-xs sm:text-sm flex flex-col sm:flex-row items-center justify-between gap-3 animate-in zoom-in-50">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-gold-400 flex-shrink-0" />
                  <span>Welcome to The Twelve Circle! Your sampler link is ready:</span>
                </div>
                <button
                  onClick={() => alert("Simulated: Downloading The Twelve Records Accra Sampler ZIP (3 Tracks)...")}
                  className="px-4 py-2 bg-gold-500 text-black text-xs font-bold uppercase rounded-full flex items-center gap-1.5 shadow-md flex-shrink-0 hover:bg-gold-400"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Sampler</span>
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
                  className="flex-1 px-4 py-3 rounded-full bg-black/60 border border-white/15 focus:border-gold-400 focus:outline-none text-xs sm:text-sm text-white placeholder-slate-500"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-gold-500 to-amber-600 hover:from-gold-400 hover:to-amber-500 text-black font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-lg flex-shrink-0"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Join & Get Sampler</span>
                </button>
              </form>
            )}

            <p className="text-[10px] text-slate-500 font-light">
              We respect your privacy. Unsubscribe at any time. Direct gospel music updates only.
            </p>
          </div>
        </div>
      </section>

      {/* Modal Lead Magnet */}
      {isNewsletterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-md bg-[#0d0d12] border border-gold-500/30 rounded-3xl p-6 sm:p-8 text-center space-y-5 shadow-2xl">
            <button
              onClick={handleModalClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-14 h-14 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 flex items-center justify-center mx-auto">
              <Gift className="w-7 h-7" />
            </div>

            <div>
              <h3 className="text-xl font-cinzel font-bold text-white">
                FREE LABEL SAMPLER
              </h3>
              <p className="text-xs text-slate-300 mt-2 font-light leading-relaxed">
                Get 3 unreleased acoustic worship tracks recorded live in Accra directly to your inbox.
              </p>
            </div>

            {isDone ? (
              <div className="space-y-4 pt-2">
                <div className="p-3 rounded-xl bg-gold-500/15 border border-gold-500/40 text-gold-300 text-xs">
                  Thank you! Your download is now ready.
                </div>
                <button
                  onClick={() => {
                    alert("Simulated: Downloading The Twelve Records Accra Sampler ZIP (3 Tracks)...");
                    handleModalClose();
                  }}
                  className="w-full py-3 bg-gold-500 text-black text-xs font-bold uppercase rounded-full flex items-center justify-center gap-2"
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
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:border-gold-400 focus:outline-none"
                />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email Address *"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:border-gold-400 focus:outline-none"
                />
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-gold-500 to-amber-600 text-black text-xs font-bold uppercase tracking-wider rounded-full shadow-lg hover:brightness-110 transition-all"
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
