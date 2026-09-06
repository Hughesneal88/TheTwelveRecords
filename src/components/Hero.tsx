import React from "react";
import { useContent } from "../context/ContentContext";
import { useAudio } from "../context/AudioContext";
import { Play, Pause, ArrowDown, Disc, Sparkles } from "lucide-react";

export const Hero: React.FC = () => {
  const { releases, setSelectedReleaseModal, setIsDemoModalOpen } = useContent();
  const { playTrack, togglePlay, isPlaying, currentTrack } = useAudio();

  const featuredRelease = releases.find((r) => r.isFeatured) || releases[0];
  const featuredTrack = featuredRelease?.tracks[0];
  const isThisFeaturedPlaying = isPlaying && currentTrack?.id === featuredTrack?.id;

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
    <section className="relative min-h-[88vh] flex flex-col justify-between pt-32 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Top Metadata Strip */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6 text-[11px] font-mono tracking-widest text-[#a1a1aa] uppercase">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#c8a858] animate-pulse"></span>
          <span className="text-white font-medium">ACCRA HQ &bull; GHANA, WEST AFRICA</span>
        </div>
        <div className="hidden sm:flex items-center gap-6">
          <span>CHRISTIAN MUSIC IMPRINT</span>
          <span>EST. 2026</span>
          <span className="text-[#c8a858]">GLOBAL DSP DISTRIBUTION</span>
        </div>
      </div>

      {/* Main Center Content */}
      <div className="my-auto py-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Typography Block */}
        <div className="lg:col-span-8 space-y-6">
          <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tightest text-white leading-[0.95] uppercase">
            PIONEERING <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-[#c8a858]">
              FAITH & SOUND.
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-zinc-400 max-w-2xl font-light leading-relaxed">
            Redefining Afro-Gospel, Contemporary Worship, and African Christian music from Accra to the global stage. Built with sonic mastery and spiritual depth.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => scrollToSection("artists")}
              className="px-8 py-3.5 bg-white hover:bg-[#c8a858] text-black font-display font-bold text-xs uppercase tracking-widest rounded-full transition-all transform hover:-translate-y-0.5"
            >
              Explore Roster
            </button>

            <button
              onClick={() => setIsDemoModalOpen(true)}
              className="px-7 py-3.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-white/15 font-semibold text-xs uppercase tracking-widest rounded-full transition-all flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#c8a858]" />
              <span>Submit Music Demo</span>
            </button>
          </div>
        </div>

        {/* Right Emblem & Featured Release Card */}
        <div className="lg:col-span-4 flex flex-col items-center lg:items-end space-y-6">
          {/* Official Emblem */}
          <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border border-[#c8a858]/30 p-1 bg-black shadow-2xl">
            <img
              src="/assets/logo.jpg"
              alt="The Twelve Records Emblem"
              className="w-full h-full object-cover rounded-full"
            />
          </div>

          {/* Minimalist Live Audio Sample Card */}
          {featuredRelease && featuredTrack && (
            <div className="w-full max-w-sm p-4 rounded-2xl editorial-card border border-white/10 flex items-center justify-between gap-4">
              <div
                className="flex items-center gap-3.5 min-w-0 cursor-pointer flex-1"
                onClick={() => setSelectedReleaseModal(featuredRelease)}
              >
                <img
                  src={featuredRelease.coverUrl}
                  alt={featuredRelease.title}
                  className="w-14 h-14 rounded-xl object-cover border border-white/10 flex-shrink-0"
                />
                <div className="min-w-0">
                  <span className="text-[10px] font-mono text-[#c8a858] block uppercase">
                    SPOTLIGHT &bull; {featuredRelease.catalogNumber}
                  </span>
                  <h4 className="text-sm font-display font-bold text-white truncate">
                    {featuredTrack.title}
                  </h4>
                  <p className="text-xs text-zinc-400 truncate">
                    {featuredRelease.artistName}
                  </p>
                </div>
              </div>

              <button
                onClick={handleFeaturedPlay}
                className={`p-3 rounded-full flex-shrink-0 transition-all ${
                  isThisFeaturedPlaying
                    ? "bg-[#c8a858] text-black shadow-lg"
                    : "bg-white/10 hover:bg-[#c8a858] hover:text-black text-white"
                }`}
                title={isThisFeaturedPlaying ? "Pause preview" : "Play track preview"}
              >
                {isThisFeaturedPlaying ? (
                  <Pause className="w-4 h-4 fill-current" />
                ) : (
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs text-zinc-500">
        <span className="font-mono text-[11px]">SCROLL TO EXPLORE LABEL CATALOG</span>
        <button
          onClick={() => scrollToSection("artists")}
          className="text-zinc-400 hover:text-white flex items-center gap-1.5 transition-colors"
        >
          <span className="text-[11px] font-mono">DISCOVER</span>
          <ArrowDown className="w-3.5 h-3.5" />
        </button>
      </div>
    </section>
  );
};
