import React, { useState } from "react";
import { useContent } from "../context/ContentContext";
import { Check, ArrowRight } from "lucide-react";

export const StoreTeaser: React.FC = () => {
  const { addSubscriber } = useContent();
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    addSubscriber(email, undefined, "Store Drop Alert");
    setIsSubmitted(true);
    setEmail("");
  };

  return (
    <section id="store" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
      <div className="editorial-card rounded-3xl p-8 sm:p-12 border border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="font-mono text-xs uppercase tracking-widest text-[#c8a858] block">
              04 // MERCHANDISE VAULT
            </span>

            <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tightest uppercase">
              PHYSICAL ARTIFACTS & PRESSINGS.
            </h2>

            <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed max-w-xl">
              Heavyweight apparel, Accra edition 180g gold splatter vinyl pressings, and exclusive label drops. Enter your email for first-access drop notifications.
            </p>

            {isSubmitted ? (
              <div className="p-4 rounded-xl bg-white/5 border border-[#c8a858]/40 text-[#c8a858] text-xs sm:text-sm flex items-center gap-3">
                <Check className="w-4 h-4 flex-shrink-0" />
                <span>You're on the list. We will send drop access before public release.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  required
                  className="flex-1 px-4 py-3 rounded-full bg-black border border-white/15 focus:border-[#c8a858] focus:outline-none text-xs text-white placeholder-zinc-500 font-mono"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-full bg-white hover:bg-[#c8a858] text-black font-display font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 flex-shrink-0"
                >
                  <span>Notify Me</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-4 text-center">
            <div className="p-6 rounded-2xl bg-black/60 border border-white/10 space-y-2">
              <span className="font-mono text-[10px] text-[#c8a858] uppercase">DROP 01</span>
              <h4 className="font-display font-bold text-sm text-white uppercase">THE TWELVE HOODIE</h4>
              <p className="text-[11px] text-zinc-500 font-mono">450 GSM &bull; ACCRA EDITION</p>
            </div>

            <div className="p-6 rounded-2xl bg-black/60 border border-white/10 space-y-2">
              <span className="font-mono text-[10px] text-[#c8a858] uppercase">DROP 02</span>
              <h4 className="font-display font-bold text-sm text-white uppercase">180G VINYL PRESS</h4>
              <p className="text-[11px] text-zinc-500 font-mono">GOLD SPLATTER LP</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
