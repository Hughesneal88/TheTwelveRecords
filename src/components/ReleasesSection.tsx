import React, { useState } from "react";
import { useContent } from "../context/ContentContext";
import { useAudio } from "../context/AudioContext";
import { Release, ReleaseFormat } from "../types";
import { Disc3, Play, Pause, ExternalLink, Sparkles, Music } from "lucide-react";

export const ReleasesSection: React.FC = () => {
  const { releases, setSelectedReleaseModal } = useContent();
  const { playTrack, togglePlay, isPlaying, currentTrack } = useAudio();
  const [selectedFormat, setSelectedFormat] = useState<string>("All");

  const formats = ["All", "Single", "EP", "Album"];

  const filteredReleases = selectedFormat === "All"
    ? releases
    : releases.filter((r) => r.format === selectedFormat);

  return (
    <section id="releases" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-gold-500/10">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-2 text-gold-400 text-xs font-semibold uppercase tracking-[0.2em] mb-2">
            <Disc3 className="w-4 h-4" />
            <span>CATALOG & DISCOGRAPHY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cinzel font-bold text-white tracking-wide">
            LATEST <span className="text-gold-gradient">RELEASES</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-xl">
            Stream singles, worship EPs, and live choral recordings produced by The Twelve Records.
          </p>
        </div>

        {/* Format Filters */}
        <div className="flex flex-wrap gap-2">
          {formats.map((f) => (
            <button
              key={f}
              onClick={() => setSelectedFormat(f)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase transition-all ${
                selectedFormat === f
                  ? "bg-gold-500 text-black font-semibold shadow-md shadow-gold-500/20"
                  : "bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10"
              }`}
            >
              {f === "All" ? "All Releases" : `${f}s`}
            </button>
          ))}
        </div>
      </div>

      {/* Discography Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredReleases.map((release) => {
          const leadTrack = release.tracks[0];
          const isLeadPlaying = isPlaying && currentTrack?.id === leadTrack?.id;

          return (
            <div
              key={release.id}
              className="glass-panel glass-panel-hover rounded-2xl overflow-hidden border border-gold-500/15 flex flex-col justify-between group transition-all duration-300 transform hover:-translate-y-1"
            >
              <div>
                {/* Album Cover & Play Overlay */}
                <div className="relative aspect-square w-full overflow-hidden bg-black/40">
                  <img
                    src={release.coverUrl}
                    alt={release.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>

                  {/* Catalog Pill */}
                  <div className="absolute top-4 left-4 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-gold-500/40 text-[10px] font-mono font-bold text-gold-400">
                    {release.catalogNumber}
                  </div>

                  {/* Format Pill */}
                  <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-[10px] uppercase font-bold text-slate-200">
                    {release.format}
                  </div>

                  {/* Centered Play Button */}
                  {leadTrack && (
                    <button
                      onClick={() => {
                        if (isLeadPlaying) {
                          togglePlay();
                        } else {
                          playTrack(leadTrack, release);
                        }
                      }}
                      className={`absolute inset-0 m-auto w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                        isLeadPlaying
                          ? "bg-gold-500 text-black shadow-2xl scale-100"
                          : "bg-black/60 backdrop-blur-md text-white hover:bg-gold-500 hover:text-black group-hover:scale-110"
                      }`}
                      title={isLeadPlaying ? "Pause sample" : "Play sample preview"}
                    >
                      {isLeadPlaying ? (
                        <Pause className="w-6 h-6 fill-current" />
                      ) : (
                        <Play className="w-6 h-6 fill-current ml-1" />
                      )}
                    </button>
                  )}
                </div>

                {/* Release Information */}
                <div className="p-6">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-gold-500/90 block mb-1">
                    {release.releaseDate} &bull; {release.genre}
                  </span>
                  <h3
                    onClick={() => setSelectedReleaseModal(release)}
                    className="text-lg font-cinzel font-bold text-white group-hover:text-gold-300 transition-colors cursor-pointer"
                  >
                    {release.title}
                  </h3>
                  <p className="text-xs font-medium text-slate-300 mt-0.5">
                    {release.artistName}
                  </p>
                  <p className="text-xs text-slate-400 font-light mt-3 line-clamp-2 leading-relaxed">
                    {release.description}
                  </p>
                </div>
              </div>

              {/* Card Footer: Track Count & DSP Links */}
              <div className="px-6 py-4 border-t border-white/10 bg-black/30 flex items-center justify-between">
                <button
                  onClick={() => setSelectedReleaseModal(release)}
                  className="text-xs font-semibold text-gold-400 hover:text-gold-300 flex items-center gap-1"
                >
                  <Music className="w-3.5 h-3.5" />
                  <span>{release.tracks.length} {release.tracks.length === 1 ? "Track" : "Tracks"} &bull; Details</span>
                </button>

                <div className="flex items-center space-x-2">
                  {release.spotifyUrl && (
                    <a
                      href={release.spotifyUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[11px] font-mono text-slate-400 hover:text-[#1DB954] transition-colors"
                      title="Spotify"
                    >
                      SPOTIFY
                    </a>
                  )}
                  {release.boomplayUrl && (
                    <a
                      href={release.boomplayUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[11px] font-mono text-slate-400 hover:text-gold-400 transition-colors"
                      title="Boomplay"
                    >
                      BOOMPLAY
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
