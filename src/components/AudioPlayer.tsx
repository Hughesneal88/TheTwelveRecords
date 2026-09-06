import React from "react";
import { useAudio } from "../context/AudioContext";
import { useContent } from "../context/ContentContext";
import { Play, Pause, Volume2, VolumeX, X, Disc, Radio, ExternalLink } from "lucide-react";

export const AudioPlayer: React.FC = () => {
  const {
    currentTrack,
    currentRelease,
    isPlaying,
    progress,
    currentTime,
    duration,
    volume,
    togglePlay,
    seek,
    setVolume,
    closePlayer
  } = useAudio();

  const { setSelectedReleaseModal } = useContent();

  if (!currentTrack || !currentRelease) return null;

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const handleScrub = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percent = (clickX / rect.width) * 100;
    seek(percent);
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-6 md:left-1/2 md:-translate-x-1/2 md:max-w-4xl z-40 animate-in slide-in-from-bottom-6 duration-300">
      <div className="glass-panel rounded-2xl p-3.5 sm:p-4 border border-gold-500/30 shadow-2xl bg-[#0a0a0e]/95 backdrop-blur-xl flex flex-col gap-2">
        {/* Top Progress Scrubber Bar */}
        <div
          onClick={handleScrub}
          className="relative w-full h-1.5 bg-white/10 hover:h-2 rounded-full cursor-pointer transition-all overflow-hidden group"
          title="Click to seek"
        >
          <div
            className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-gold-500 to-amber-400 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Player Controls & Info Layout */}
        <div className="flex items-center justify-between gap-3 sm:gap-6">
          {/* Left: Artwork & Track Title */}
          <div className="flex items-center gap-3 min-w-0 flex-1 sm:flex-initial">
            <div
              className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-lg overflow-hidden border border-gold-500/30 flex-shrink-0 cursor-pointer group"
              onClick={() => setSelectedReleaseModal(currentRelease)}
            >
              <img
                src={currentRelease.coverUrl}
                alt={currentTrack.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
              <div className="absolute inset-0 bg-black/20"></div>
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[9px] font-mono font-bold text-gold-400 uppercase tracking-wider">
                  {currentRelease.catalogNumber}
                </span>
                {isPlaying && (
                  <span className="flex items-center gap-0.5 h-3 ml-1">
                    <span className="wave-bar"></span>
                    <span className="wave-bar"></span>
                    <span className="wave-bar"></span>
                  </span>
                )}
              </div>
              <h4 className="text-xs sm:text-sm font-semibold text-white truncate max-w-[150px] sm:max-w-xs">
                {currentTrack.title}
              </h4>
              <p className="text-[11px] text-slate-400 truncate">
                {currentRelease.artistName}
              </p>
            </div>
          </div>

          {/* Center: Play/Pause & Time */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <span className="text-[10px] font-mono text-slate-400 hidden sm:inline">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>

            <button
              onClick={togglePlay}
              className="p-2.5 sm:p-3 rounded-full bg-gradient-to-r from-gold-500 to-amber-600 text-black shadow-lg shadow-gold-500/30 hover:brightness-110 transition-all"
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
              ) : (
                <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current ml-0.5" />
              )}
            </button>
          </div>

          {/* Right: Volume & Close */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {/* Volume Control */}
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={() => setVolume(volume === 0 ? 0.8 : 0)}
                className="text-slate-400 hover:text-gold-400 transition-colors"
                title={volume === 0 ? "Unmute" : "Mute"}
              >
                {volume === 0 ? (
                  <VolumeX className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-16 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-gold-500"
              />
            </div>

            {/* Close Dock */}
            <button
              onClick={closePlayer}
              className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              title="Close Player"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
