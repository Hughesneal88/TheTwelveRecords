import React, { useState } from "react";
import { useContent } from "../context/ContentContext";
import { useAuth } from "../context/AuthContext";
import { ArrowUpRight, Sparkles, Edit3 } from "lucide-react";

export const ArtistsSection: React.FC = () => {
  const { artists, navigateToArtist, setIsDemoModalOpen, setIsAdminModalOpen } = useContent();
  const { canEditArtistProfile } = useAuth();
  const [selectedGenre, setSelectedGenre] = useState<string>("All");

  const genres = ["All", "Afro-Gospel", "Contemporary Worship", "Christian Hip Hop", "Symphonic Worship"];

  const filteredArtists = selectedGenre === "All"
    ? artists
    : artists.filter((a) => a.genre.toLowerCase().includes(selectedGenre.toLowerCase()));

  return (
    <section id="artists" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-[#c8a858] block mb-2">
            01 // ARTIST ROSTER
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tightest uppercase">
            THE ROSTER
          </h2>
          <p className="text-sm text-zinc-400 mt-2 max-w-md font-light">
            Gospel innovators and worship ministers shaping modern African Christian sound.
          </p>
        </div>

        {/* Genre Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {genres.map((g) => (
            <button
              key={g}
              onClick={() => setSelectedGenre(g)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all ${
                selectedGenre === g
                  ? "bg-white text-black font-bold"
                  : "bg-zinc-900 text-zinc-400 hover:text-white border border-white/10"
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Warner-Style Artist Directory Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredArtists.map((artist) => {
          const canEditThis = canEditArtistProfile(artist.id);

          return (
            <div
              key={artist.id}
              className="group relative rounded-2xl overflow-hidden editorial-card flex flex-col justify-between cursor-pointer"
              onClick={() => navigateToArtist(artist.slug)}
            >
              {/* Photo Area */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-black">
                <img
                  src={artist.photoUrl}
                  alt={artist.name}
                  className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d11] via-transparent to-transparent opacity-90"></div>

                {/* Scoped Quick Edit Badge */}
                {canEditThis && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsAdminModalOpen(true);
                    }}
                    className="absolute top-4 right-4 p-2 rounded-full bg-[#c8a858] text-black shadow-lg hover:scale-110 transition-transform"
                    title="Edit artist profile"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                )}

                {/* Origin Tag */}
                <div className="absolute top-4 left-4 px-2.5 py-1 rounded bg-black/70 backdrop-blur-md text-[10px] font-mono uppercase tracking-wider text-[#c8a858] border border-white/10">
                  {artist.origin}
                </div>
              </div>

              {/* Information Block */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block mb-1">
                    {artist.genre}
                  </span>
                  <h3 className="font-display font-black text-2xl text-white group-hover:text-[#c8a858] transition-colors flex items-center justify-between">
                    <span>{artist.name}</span>
                    <ArrowUpRight className="w-5 h-5 text-zinc-500 group-hover:text-white transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </h3>
                  <p className="text-xs text-zinc-400 font-light mt-2 line-clamp-2 leading-relaxed">
                    {artist.tagline}
                  </p>
                </div>

                {/* DSP Streaming Handles */}
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                  <div className="flex items-center space-x-3">
                    {artist.socials.spotify && (
                      <span className="hover:text-white transition-colors">SPOTIFY</span>
                    )}
                    {artist.socials.boomplay && (
                      <span className="hover:text-[#c8a858] transition-colors">BOOMPLAY</span>
                    )}
                    {artist.socials.audiomack && (
                      <span className="hover:text-amber-400 transition-colors">AUDIOMACK</span>
                    )}
                  </div>
                  <span className="text-[#c8a858] font-bold text-xs font-sans">
                    View Profile &rarr;
                  </span>
                </div>
              </div>
            </div>
          );
        })}

        {/* Minimalist A&R Scouting Card */}
        <div className="rounded-2xl border border-dashed border-white/20 p-8 flex flex-col justify-center items-center text-center group hover:border-[#c8a858] transition-all bg-[#09090c]">
          <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#c8a858] mb-4 group-hover:scale-110 transition-transform">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="font-display font-bold text-xl text-white mb-2">
            JOIN THE ROSTER
          </h3>
          <p className="text-xs text-zinc-400 mb-6 max-w-xs leading-relaxed font-light">
            We are actively discovering Christian vocalists, worship ministers, and producers across Africa.
          </p>
          <button
            onClick={() => setIsDemoModalOpen(true)}
            className="px-6 py-2.5 rounded-full bg-white text-black font-display font-bold text-xs uppercase tracking-wider hover:bg-[#c8a858] transition-all"
          >
            Submit Music Demo
          </button>
        </div>
      </div>
    </section>
  );
};
