import React, { useState, useEffect } from "react";
import { useContent } from "../context/ContentContext";
import { Globe, MapPin, Clock, Compass, ShieldCheck, Heart } from "lucide-react";

export const AboutSection: React.FC = () => {
  const { labelInfo } = useContent();
  const [accraTime, setAccraTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Africa/Accra",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
      };
      setAccraTime(new Intl.DateTimeFormat("en-US", options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative overflow-hidden">
      {/* Background Accent Glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none"></div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Side: Rain Labs Layered Editorial Image Stack */}
        <div className="lg:col-span-5 relative">
          <div className="relative mx-auto max-w-md lg:max-w-none">
            {/* Primary Large Image */}
            <div className="relative rounded-3xl overflow-hidden border border-gold-500/20 shadow-2xl z-10 aspect-[4/5] bg-black">
              <img
                src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1000&q=80"
                alt="The Twelve Records Accra Studio"
                className="w-full h-full object-cover filter brightness-90 hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

              {/* Accra HQ Live Badge Overlay */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/80 backdrop-blur-md border border-gold-500/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gold-400 text-xs font-mono font-semibold">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>ACCRA, GHANA HQ</span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-mono text-slate-300">
                    <Clock className="w-3 h-3 text-gold-400 animate-pulse" />
                    <span>{accraTime || "12:00:00 PM GMT"}</span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-400 mt-1 font-light">
                  {labelInfo.address}
                </p>
              </div>
            </div>

            {/* Asymmetrical Floating Background Accent Frame */}
            <div className="absolute -bottom-6 -right-6 w-full h-full rounded-3xl border border-gold-500/30 -z-0 hidden sm:block pointer-events-none"></div>
          </div>
        </div>

        {/* Right Side: Editorial Content & Pillars */}
        <div className="lg:col-span-7 space-y-8">
          <div>
            <div className="flex items-center gap-2 text-gold-400 text-xs font-semibold uppercase tracking-[0.25em] mb-3">
              <Globe className="w-4 h-4" />
              <span>ETHOS & HERITAGE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cinzel font-bold text-white tracking-wide leading-tight">
              FAITH, SOUND & <span className="text-gold-gradient">CULTURAL IMPACT</span>
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 font-light text-sm sm:text-base leading-relaxed">
            {labelInfo.aboutStory.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {/* Core Values Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="p-5 rounded-2xl glass-panel border border-gold-500/15">
              <div className="w-9 h-9 rounded-xl bg-gold-500/10 text-gold-400 flex items-center justify-center mb-3">
                <Compass className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-cinzel font-bold uppercase tracking-wider text-white mb-1">
                SPIRITUAL VISION
              </h4>
              <p className="text-[11px] text-slate-400 leading-relaxed font-light">
                Stewarding worship and songs forged in prayer and devotion.
              </p>
            </div>

            <div className="p-5 rounded-2xl glass-panel border border-gold-500/15">
              <div className="w-9 h-9 rounded-xl bg-gold-500/10 text-gold-400 flex items-center justify-center mb-3">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-cinzel font-bold uppercase tracking-wider text-white mb-1">
                SONIC EXCELLENCE
              </h4>
              <p className="text-[11px] text-slate-400 leading-relaxed font-light">
                World-class engineering, vibrant West African percussion, and orchestral polish.
              </p>
            </div>

            <div className="p-5 rounded-2xl glass-panel border border-gold-500/15">
              <div className="w-9 h-9 rounded-xl bg-gold-500/10 text-gold-400 flex items-center justify-center mb-3">
                <Heart className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-cinzel font-bold uppercase tracking-wider text-white mb-1">
                GLOBAL DISTRIBUTION
              </h4>
              <p className="text-[11px] text-slate-400 leading-relaxed font-light">
                Connecting African gospel voices directly with listeners in over 140 countries.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
