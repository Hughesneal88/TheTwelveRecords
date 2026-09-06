import React, { useState, useEffect } from "react";
import { useContent } from "../context/ContentContext";
import { useAudio } from "../context/AudioContext";
import { Play, Pause, ChevronDown, Sparkles, Disc, Radio } from "lucide-react";

export const Hero: React.FC = () => {
  const { labelInfo, releases, setSelectedReleaseModal, setIsDemoModalOpen, setIsNewsletterModalOpen } = useContent();
  const { playTrack, togglePlay, isPlaying, currentTrack } = useAudio();

  const featuredRelease = releases.find((r) => r.isFeatured) || releases[0];
  const featuredTrack = featuredRelease?.tracks[0];
  const isThisFeaturedPlaying = isPlaying && currentTrack?.id === featuredTrack?.id;

  // Dynamic typing / tagline cycler
  const taglines = [
    "PIONEERING FAITH & SOUND",
    "AFRO-GOSPEL TO THE NATIONS",
    "CONTEMPORARY WORSHIP FROM ACCRA",
    "SONIC EXCELLENCE FOR ETERNITY"
  ];
  const [taglineIndex, setTaglineIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % taglines.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleFeaturedPlay = () => {
    if (!featuredRelease || !featuredTrack) return;
    if (isThisFeaturedPlaying) {
      togglePlay();
    } else {
      playTrack(featuredTrack, featuredRelease);
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden hero-glow-radial">
      {/* Background Animated Gradient Aura */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-br from-gold-500/20 via-amber-600/10 to-transparent rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gold-600/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 left-10 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Subtle Grid Lines Overlay */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(to right, #d4af37 1px, transparent 1px), linear-gradient(to bottom, #d4af37 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }}
      ></div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Official Gold Emblem Spotlight */}
        <div className="relative mb-6 group cursor-pointer" onClick={() => scrollToSection("artists")}>
          <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-gold-500/30 to-amber-500/20 blur-xl opacity-70 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full p-1 bg-gradient-to-b from-gold-400 via-gold-600 to-amber-900 shadow-2xl border border-gold-300/30">
            <img
              src="/assets/logo.jpg"
              alt="The Twelve Records Official Emblem"
              className="w-full h-full object-cover rounded-full shadow-inner"
            />
          </div>
          {/* Subtle Rotating Ring */}
          <div className="absolute -inset-2 rounded-full border border-gold-500/20 border-dashed animate-spin-slow pointer-events-none"></div>
        </div>

        {/* Location & Ethos Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/25 text-gold-400 text-xs font-semibold uppercase tracking-[0.2em] mb-4">
          <Radio className="w-3.5 h-3.5 text-gold-400 animate-pulse" />
          <span>ACCRA, GHANA &bull; CHRISTIAN MUSIC RECORD LABEL</span>
        </div>

        {/* Dynamic Tagline Title */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-cinzel font-black tracking-tight text-white max-w-4xl leading-[1.1] mb-6">
          <span className="text-gold-light transition-all duration-700 block">
            {taglines[taglineIndex]}
          </span>
        </h1>

        {/* Subtitle / Mission */}
        <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl font-light leading-relaxed mb-8">
          {labelInfo.heroSubheadline}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <button
            onClick={() => scrollToSection("artists")}
            className="px-7 py-3.5 bg-gradient-to-r from-gold-500 to-amber-600 hover:from-gold-400 hover:to-amber-500 text-black font-bold text-xs uppercase tracking-widest rounded-full shadow-lg hover:shadow-gold-500/25 transition-all transform hover:-translate-y-0.5"
          >
            Explore Roster
          </button>

          <button
            onClick={() => setIsDemoModalOpen(true)}
            className="px-6 py-3.5 bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white border border-gold-500/30 hover:border-gold-400 font-semibold text-xs uppercase tracking-widest rounded-full transition-all flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-gold-400" />
            Submit Music Demo
          </button>

          <button
            onClick={() => setIsNewsletterModalOpen(true)}
            className="px-6 py-3.5 bg-gold-500/10 hover:bg-gold-500/20 text-gold-300 hover:text-gold-200 border border-gold-500/40 font-semibold text-xs uppercase tracking-widest rounded-full transition-all"
          >
            Get Free Sampler
          </button>
        </div>

        {/* Live Featured Release Pill (Interactive Sample Trigger) */}
        {featuredRelease && featuredTrack && (
          <div className="glass-panel rounded-2xl p-3 sm:p-4 max-w-lg w-full flex items-center justify-between gap-4 border border-gold-500/25 shadow-2xl transform hover:scale-[1.02] transition-all">
            <div
              className="flex items-center gap-3.5 text-left cursor-pointer flex-1 min-w-0"
              onClick={() => setSelectedReleaseModal(featuredRelease)}
            >
              <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 border border-gold-500/30">
                <img
                  src={featuredRelease.coverUrl}
                  alt={featuredRelease.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20"></div>
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-bold tracking-wider text-gold-400 uppercase block">
                  FEATURED DROP &bull; {featuredRelease.catalogNumber}
                </span>
                <h4 className="text-sm font-semibold text-white truncate">
                  {featuredTrack.title}
                </h4>
                <p className="text-xs text-slate-400 truncate">
                  {featuredRelease.artistName}
                </p>
              </div>
            </div>

            <button
              onClick={handleFeaturedPlay}
              className={`p-3 rounded-full flex-shrink-0 transition-all ${
                isThisFeaturedPlaying
                  ? "bg-gold-500 text-black shadow-lg shadow-gold-500/40"
                  : "bg-white/10 hover:bg-gold-500 hover:text-black text-white"
              }`}
              title={isThisFeaturedPlaying ? "Pause preview" : "Play audio sample"}
            >
              {isThisFeaturedPlaying ? (
                <Pause className="w-5 h-5 fill-current" />
              ) : (
                <Play className="w-5 h-5 fill-current ml-0.5" />
              )}
            </button>
          </div>
        )}

        {/* Smooth Scroll Caret */}
        <div className="mt-14">
          <button
            onClick={() => scrollToSection("artists")}
            className="text-slate-400 hover:text-gold-400 flex flex-col items-center gap-1 transition-colors group"
            aria-label="Scroll to roster"
          >
            <span className="text-[10px] uppercase tracking-widest font-mono text-slate-400 group-hover:text-gold-400">
              EXPLORE
            </span>
            <ChevronDown className="w-5 h-5 animate-bounce text-gold-400" />
          </button>
        </div>
      </div>
    </section>
  );
};
