import React from "react";
import { useContent } from "../context/ContentContext";
import { useAudio } from "../context/AudioContext";
import { X, Play, Pause, Music, Clock, ExternalLink, Headphones } from "lucide-react";
import { getPrimaryEmbedUrl } from "../utils/embedHelper";

export const ReleaseModal: React.FC = () => {
  const { selectedReleaseModal, setSelectedReleaseModal } = useContent();
  const { playTrack, togglePlay, isPlaying, currentTrack } = useAudio();

  if (!selectedReleaseModal) return null;

  const release = selectedReleaseModal;
  const embedUrl = getPrimaryEmbedUrl(release);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-[#0c0c10] border border-white/15 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        <button
          onClick={() => setSelectedReleaseModal(null)}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/80 hover:bg-white/10 text-zinc-300 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8 border-b border-white/10 flex flex-col sm:flex-row gap-6 items-center sm:items-start bg-[#101015]">
          <img
            src={release.coverUrl}
            alt={release.title}
            className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl object-cover border border-white/15 flex-shrink-0 bg-black"
          />

          <div className="flex-1 text-center sm:text-left min-w-0">
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-2 font-mono text-[11px] text-[#c8a858]">
              <span>{release.catalogNumber}</span>
              <span>&bull;</span>
              <span>{release.format}</span>
              <span>&bull;</span>
              <span>{release.releaseDate}</span>
            </div>

            <h3 className="font-display font-bold text-2xl sm:text-3xl text-white uppercase tracking-tight">
              {release.title}
            </h3>

            <p className="text-sm font-semibold text-zinc-300 mt-1">
              {release.artistName}
            </p>

            <p className="text-xs text-zinc-400 mt-3 font-light leading-relaxed line-clamp-3">
              {release.description}
            </p>

            <div className="flex flex-wrap gap-2 mt-4 justify-center sm:justify-start text-xs font-mono">
              {release.spotifyUrl && (
                <a
                  href={release.spotifyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1 bg-white/10 hover:bg-[#1DB954] text-white hover:text-black rounded-full font-bold transition-all flex items-center gap-1"
                >
                  <span>SPOTIFY</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
              {release.audiomackUrl && (
                <a
                  href={release.audiomackUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1 bg-white/10 hover:bg-amber-500 text-white hover:text-black rounded-full font-bold transition-all flex items-center gap-1"
                >
                  <span>AUDIOMACK</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
              {release.appleMusicUrl && (
                <a
                  href={release.appleMusicUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1 bg-white/10 hover:bg-rose-500 text-white hover:text-black rounded-full font-bold transition-all flex items-center gap-1"
                >
                  <span>APPLE MUSIC</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
              {release.boomplayUrl && (
                <a
                  href={release.boomplayUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1 bg-white/10 hover:bg-[#c8a858] text-white hover:text-black rounded-full font-bold transition-all flex items-center gap-1"
                >
                  <span>BOOMPLAY</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Embedded Streaming Player */}
        {embedUrl && (
          <div className="px-6 pt-5 pb-1 bg-black/40 border-b border-white/5">
            <div className="flex items-center gap-2 mb-2 text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
              <Headphones className="w-3 h-3 text-gold-400" />
              <span>LIVE STREAMING EMBED</span>
            </div>
            <iframe
              src={embedUrl}
              title={release.title}
              width="100%"
              height="152"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="rounded-xl border border-white/10 bg-black/50"
            />
          </div>
        )}

        <div className="p-6 overflow-y-auto space-y-3 flex-1">
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 mb-2 flex items-center gap-1.5">
            <Music className="w-3.5 h-3.5 text-[#c8a858]" />
            <span>TRACKLIST ({release.tracks.length})</span>
          </h4>

          {release.tracks.map((track, idx) => {
            const isThisPlaying = isPlaying && currentTrack?.id === track.id;

            return (
              <div
                key={track.id}
                className={`p-3.5 rounded-xl border transition-all flex items-center justify-between gap-4 ${
                  isThisPlaying
                    ? "bg-[#c8a858]/10 border-[#c8a858]/40 text-[#c8a858]"
                    : "bg-white/5 hover:bg-white/10 border-white/5 text-zinc-200"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="font-mono text-xs text-zinc-500 w-5 text-right">
                    {idx + 1}.
                  </span>
                  <div className="min-w-0">
                    <h5 className="text-sm font-semibold text-white truncate">
                      {track.title}
                    </h5>
                    {track.lyrics && (
                      <p className="text-[11px] text-zinc-400 font-light italic truncate max-w-md">
                        "{track.lyrics}"
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="text-xs font-mono text-zinc-400 flex items-center gap-1">
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
                        ? "bg-[#c8a858] text-black"
                        : "bg-white/10 hover:bg-white hover:text-black text-white"
                    }`}
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

        <div className="p-4 bg-black/40 border-t border-white/10 text-center font-mono text-[11px] text-zinc-500">
          &copy; 2026 The Twelve Records &bull; Accra, Ghana
        </div>
      </div>
    </div>
  );
};
