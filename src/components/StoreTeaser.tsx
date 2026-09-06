import React, { useState } from "react";
import { useContent } from "../context/ContentContext";
import { ShoppingBag, Bell, Check, Sparkles, Shirt, Disc3 } from "lucide-react";

export const StoreTeaser: React.FC = () => {
  const { addSubscriber } = useContent();
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    addSubscriber(email, undefined, "Store VIP Drop Alert");
    setIsSubmitted(true);
    setEmail("");
  };

  return (
    <section id="store" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-gold-500/10">
      <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-gold-500/20 relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Text & Waitlist Form */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/15 border border-gold-500/30 text-gold-300 text-xs font-semibold uppercase tracking-widest">
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>THE TWELVE MERCH VAULT</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-cinzel font-bold text-white tracking-wide">
              PHYSICAL ARTIFACTS & <span className="text-gold-gradient">LIMITED MERCH</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed max-w-xl">
              We are preparing limited-run heavyweight hoodies, Accra edition vinyl pressings, and exclusive label collectibles. Enter your email to receive private first-access drop notifications and 15% off launch day orders.
            </p>

            {isSubmitted ? (
              <div className="p-4 rounded-xl bg-gold-500/15 border border-gold-500/40 text-gold-300 text-xs sm:text-sm flex items-center gap-3">
                <Check className="w-5 h-5 text-gold-400 flex-shrink-0" />
                <span>You're on the VIP list! We will notify you before the first public drop.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email for VIP drop access..."
                  required
                  className="flex-1 px-4 py-3 rounded-full bg-black/60 border border-white/15 focus:border-gold-400 focus:outline-none text-xs sm:text-sm text-white placeholder-slate-500"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-gold-500 to-amber-600 hover:from-gold-400 hover:to-amber-500 text-black font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-lg flex-shrink-0"
                >
                  <Bell className="w-3.5 h-3.5" />
                  <span>Notify Me</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Product Teaser Cards */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-black/40 border border-white/10 flex flex-col items-center text-center group hover:border-gold-500/40 transition-all">
              <div className="w-16 h-16 rounded-2xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400 mb-3 group-hover:scale-110 transition-transform">
                <Shirt className="w-7 h-7" />
              </div>
              <h4 className="text-xs font-cinzel font-bold text-white">THE TWELVE HOODIE</h4>
              <span className="text-[10px] text-gold-400 font-mono mt-1">450 GSM Heavyweight</span>
              <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 mt-2 rounded bg-white/5 text-slate-400">
                In Production
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-black/40 border border-white/10 flex flex-col items-center text-center group hover:border-gold-500/40 transition-all">
              <div className="w-16 h-16 rounded-2xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400 mb-3 group-hover:scale-110 transition-transform">
                <Disc3 className="w-7 h-7" />
              </div>
              <h4 className="text-xs font-cinzel font-bold text-white">ACCRA VINYL PRESS</h4>
              <span className="text-[10px] text-gold-400 font-mono mt-1">180g Gold Splatter</span>
              <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 mt-2 rounded bg-white/5 text-slate-400">
                Mastering
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
