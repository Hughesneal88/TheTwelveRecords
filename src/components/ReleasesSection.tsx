import React, { useState } from "react";
import { useContent } from "../context/ContentContext";
import { useAudio } from "../context/AudioContext";
import { Play, Pause, Music } from "lucide-react";

export const ReleasesSection: React.FC = () => {
  const { releases, setSelectedReleaseModal } = useContent();
  const { playTrack, togglePlay, isPlaying, currentTrack } = useAudio();
  const [selectedFormat, setSelectedFormat] = useState<string>("All");

  const formats = ["All", "Single", "EP", "Album"];

  const filteredReleases = selectedFormat === "All"
    ? releases
    : releases.filter((r) => r.format === selectedFormat);

  return (
    <section id="releases" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-[#c8a858] block mb-2">
            02 // DISCOGRAPHY
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tightest uppercase">
            CATALOG RELEASES
          </h2>
          <p className="text-sm text-zinc-400 mt-2 max-w-md font-light">
            Original recordings, acoustic worship sessions, and choral albums from Accra.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {formats.map((f) => (
            <button
              key={f}
              onClick={() => setSelectedFormat(f)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all ${
                selectedFormat === f
                  ? "bg-white text-black font-bold"
                  : "bg-zinc-900 text-zinc-400 hover:text-white border border-white/10"
              }`}
            >
              {f === "All" ? "All Formats" : `${f}s`}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredReleases.map((release) => {
          const leadTrack = release.tracks[0];
          const isLeadPlaying = isPlaying && currentTrack?.id === leadTrack?.id;

          return (
            <div
              key={release.id}
              className="editorial-card rounded-2xl overflow-hidden flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-square w-full overflow-hidden bg-black">
                  <img
                    src={release.coverUrl}
                    alt={release.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80"></div>

                  <div className="absolute top-4 left-4 px-2.5 py-1 rounded bg-black/80 backdrop-blur-md text-[10px] font-mono font-bold text-[#c8a858] border border-white/10">
                    {release.catalogNumber}
                  </div>

                  <div className="absolute top-4 right-4 px-2.5 py-1 rounded bg-black/80 backdrop-blur-md text-[10px] font-mono uppercase text-white border border-white/10">
                    {release.format}
                  </div>

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
                          ? "bg-[#c8a858] text-black scale-100 shadow-2xl"
                          : "bg-black/70 text-white hover:bg-white hover:text-black group-hover:scale-105"
                      }`}
                      title={isLeadPlaying ? "Pause" : "Play sample"}
                    >
                      {isLeadPlaying ? (
                        <Pause className="w-5 h-5 fill-current" />
                      ) : (
                        <Play className="w-5 h-5 fill-current ml-1" />
                      )}
                    </button>
                  )}
                </div>

                <div className="p-6">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block mb-1">
                    {release.releaseDate} &bull; {release.genre}
                  </span>
                  <h3
                    onClick={() => setSelectedReleaseModal(release)}
                    className="font-display font-bold text-xl text-white group-hover:text-[#c8a858] transition-colors cursor-pointer"
                  >
                    {release.title}
                  </h3>
                  <p className="text-xs text-zinc-300 font-medium mt-1">
                    {release.artistName}
                  </p>
                  <p className="text-xs text-zinc-400 font-light mt-3 line-clamp-2 leading-relaxed">
                    {release.description}
                  </p>
                </div>
              </div>

              <div className="px-6 py-4 border-t border-white/10 bg-black/20 flex items-center justify-between text-xs font-mono">
                <button
                  onClick={() => setSelectedReleaseModal(release)}
                  className="text-zinc-300 hover:text-white flex items-center gap-1.5"
                >
                  <Music className="w-3.5 h-3.5 text-[#c8a858]" />
                  <span>{release.tracks.length} {release.tracks.length === 1 ? "Track" : "Tracks"} &bull; Tracklist</span>
                </button>

                {release.spotifyUrl && (
                  <span className="text-zinc-500 font-bold">DSP RELEASE</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
