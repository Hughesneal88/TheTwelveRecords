import React from "react";
import { useContent } from "../context/ContentContext";
import { useAudio } from "../context/AudioContext";
import { X, Play, Pause, ExternalLink, Disc, Music, Clock } from "lucide-react";

export const ReleaseModal: React.FC = () => {
  const { selectedReleaseModal, setSelectedReleaseModal, navigateToArtist, getArtistBySlug } = useContent();
  const { playTrack, togglePlay, isPlaying, currentTrack } = useAudio();

  if (!selectedReleaseModal) return null;

  const release = selectedReleaseModal;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#0d0d12] border border-gold-500/30 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={() => setSelectedReleaseModal(null)}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header & Cover */}
        <div className="p-6 sm:p-8 bg-gradient-to-b from-[#16161f] to-[#0d0d12] border-b border-white/10 flex flex-col sm:flex-row gap-6 items-center sm:items-start">
          <img
            src={release.coverUrl}
            alt={release.title}
            className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl object-cover border border-gold-500/30 shadow-xl flex-shrink-0"
          />

          <div className="flex-1 text-center sm:text-left min-w-0">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-gold-500/20 text-gold-300 text-[10px] font-mono font-bold border border-gold-500/30">
                {release.catalogNumber}
              </span>
              <span className="text-[10px] uppercase font-bold text-slate-400">
                {release.format} &bull; {release.releaseDate}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-cinzel font-bold text-white tracking-wide">
              {release.title}
            </h3>

            <p className="text-sm font-semibold text-gold-400 mt-1">
              {release.artistName}
            </p>

            <p className="text-xs text-slate-300 mt-3 font-light leading-relaxed line-clamp-3">
              {release.description}
            </p>

            {/* DSP Streaming Buttons */}
            <div className="flex flex-wrap gap-2 mt-4 justify-center sm:justify-start">
              {release.spotifyUrl && (
                <a
                  href={release.spotifyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1 bg-[#1DB954]/20 hover:bg-[#1DB954] text-[#1DB954] hover:text-black rounded-full text-xs font-semibold tracking-wider transition-all"
                >
                  Spotify
                </a>
              )}
              {release.appleMusicUrl && (
                <a
                  href={release.appleMusicUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1 bg-pink-500/20 hover:bg-pink-500 text-pink-300 hover:text-white rounded-full text-xs font-semibold tracking-wider transition-all"
                >
                  Apple Music
                </a>
              )}
              {release.boomplayUrl && (
                <a
                  href={release.boomplayUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1 bg-gold-500/20 hover:bg-gold-500 text-gold-300 hover:text-black rounded-full text-xs font-semibold tracking-wider transition-all"
                >
                  Boomplay
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Tracklist Section */}
        <div className="p-6 overflow-y-auto space-y-3 flex-1">
          <h4 className="text-xs font-cinzel font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
            <Music className="w-3.5 h-3.5 text-gold-400" />
            <span>TRACKLIST ({release.tracks.length})</span>
          </h4>

          {release.tracks.map((track, idx) => {
            const isThisPlaying = isPlaying && currentTrack?.id === track.id;

            return (
              <div
                key={track.id}
                className={`p-3.5 rounded-xl border transition-all flex items-center justify-between gap-4 ${
                  isThisPlaying
                    ? "bg-gold-500/10 border-gold-500/40 text-gold-300"
                    : "bg-white/5 hover:bg-white/10 border-white/5 text-slate-200"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="font-mono text-xs text-slate-400 w-5 text-right">
                    {idx + 1}.
                  </span>
                  <div className="min-w-0">
                    <h5 className="text-sm font-medium text-white truncate">
                      {track.title}
                    </h5>
                    {track.lyrics && (
                      <p className="text-[11px] text-slate-400 font-light italic truncate max-w-md">
                        "{track.lyrics}"
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {track.duration}
                  </span>

                  <button
                    onClick={() => {
                      if (isThisPlaying) {
                        togglePlay();
                      } else {
                        playTrack(track, release);
                      }
                    }}
                    className={`p-2 rounded-full transition-all ${
                      isThisPlaying
                        ? "bg-gold-500 text-black"
                        : "bg-white/10 hover:bg-gold-500 hover:text-black text-white"
                    }`}
                    title={isThisPlaying ? "Pause" : "Play track preview"}
                  >
                    {isThisPlaying ? (
                      <Pause className="w-3.5 h-3.5 fill-current" />
                    ) : (
                      <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 bg-black/40 border-t border-white/10 text-center">
          <p className="text-[11px] text-slate-400">
            &copy; 2026 The Twelve Records &bull; Distributed globally from Accra, Ghana
          </p>
        </div>
      </div>
    </div>
  );
};
