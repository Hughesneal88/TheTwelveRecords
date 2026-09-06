import React, { useState } from "react";
import { useContent } from "../context/ContentContext";
import { useAuth } from "../context/AuthContext";
import { ArrowRight, Music2, Sparkles, ExternalLink, Edit3 } from "lucide-react";

export const ArtistsSection: React.FC = () => {
  const { artists, navigateToArtist, setIsDemoModalOpen, setIsAdminModalOpen } = useContent();
  const { canEditArtistProfile } = useAuth();
  const [selectedGenre, setSelectedGenre] = useState<string>("All");

  const genres = ["All", "Afro-Gospel", "Contemporary Worship", "Christian Hip Hop", "Symphonic Worship"];

  const filteredArtists = selectedGenre === "All"
    ? artists
    : artists.filter((a) => a.genre.toLowerCase().includes(selectedGenre.toLowerCase()));

  return (
    <section id="artists" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-2 text-gold-400 text-xs font-semibold uppercase tracking-[0.2em] mb-2">
            <Music2 className="w-4 h-4" />
            <span>THE TWELVE ROSTER</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cinzel font-bold text-white tracking-wide">
            OUR <span className="text-gold-gradient">ARTISTS</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-xl">
            Stewarding the new sound of faith from Accra to the global stage. Discover biographies, discographies, and streaming hubs.
          </p>
        </div>

        {/* Genre Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {genres.map((g) => (
            <button
              key={g}
              onClick={() => setSelectedGenre(g)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase transition-all ${
                selectedGenre === g
                  ? "bg-gold-500 text-black font-semibold shadow-md shadow-gold-500/20"
                  : "bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10"
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Warner-Style Artist Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredArtists.map((artist) => {
          const canEditThis = canEditArtistProfile(artist.id);

          return (
            <div
              key={artist.id}
              className="group relative rounded-2xl overflow-hidden glass-panel glass-panel-hover border border-gold-500/15 flex flex-col transition-all duration-300 transform hover:-translate-y-1.5"
            >
              {/* Artist Portrait */}
              <div
                className="relative h-80 sm:h-96 w-full overflow-hidden cursor-pointer"
                onClick={() => navigateToArtist(artist.slug)}
              >
                <img
                  src={artist.photoUrl}
                  alt={artist.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 filter brightness-95 group-hover:brightness-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-[#08080a]/30 to-transparent"></div>

                {/* Featured Badge */}
                {artist.isFeatured && (
                  <div className="absolute top-4 left-4 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-gold-500/40 text-[10px] font-bold uppercase tracking-wider text-gold-400">
                    Featured
                  </div>
                )}

                {/* Quick Edit Badge for Logged-in Artist / Admin */}
                {canEditThis && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsAdminModalOpen(true);
                    }}
                    className="absolute top-4 right-4 p-2 rounded-full bg-gold-500 text-black shadow-lg hover:scale-110 transition-transform"
                    title="Edit this artist profile"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                )}

                {/* Origin Tag */}
                <div className="absolute bottom-4 left-4 text-xs font-mono text-gold-400/90 tracking-wider">
                  {artist.origin}
                </div>
              </div>

              {/* Artist Info & Content */}
              <div className="p-6 flex-1 flex flex-col justify-between bg-[#0b0b0f]/80">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-gold-500/90 block mb-1">
                    {artist.genre}
                  </span>
                  <h3
                    onClick={() => navigateToArtist(artist.slug)}
                    className="text-xl sm:text-2xl font-cinzel font-bold text-white group-hover:text-gold-400 transition-colors cursor-pointer"
                  >
                    {artist.name}
                  </h3>
                  <p className="text-xs text-slate-300 mt-2 line-clamp-2 leading-relaxed font-light">
                    {artist.tagline}
                  </p>
                </div>

                {/* DSP Streaming Badges (Spotify, Apple, Boomplay, Audiomack, YouTube, IG) */}
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center space-x-3 text-slate-400">
                    {artist.socials.spotify && (
                      <a
                        href={artist.socials.spotify}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-[#1DB954] transition-colors"
                        title="Spotify"
                      >
                        <span className="text-xs font-bold font-mono">SPOTIFY</span>
                      </a>
                    )}
                    {artist.socials.boomplay && (
                      <a
                        href={artist.socials.boomplay}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-gold-400 transition-colors"
                        title="Boomplay"
                      >
                        <span className="text-xs font-bold font-mono">BOOMPLAY</span>
                      </a>
                    )}
                    {artist.socials.audiomack && (
                      <a
                        href={artist.socials.audiomack}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-amber-400 transition-colors"
                        title="Audiomack"
                      >
                        <span className="text-xs font-bold font-mono">AUDIOMACK</span>
                      </a>
                    )}
                  </div>

                  {/* View Dedicated Profile Page */}
                  <button
                    onClick={() => navigateToArtist(artist.slug)}
                    className="flex items-center gap-1 text-xs font-semibold text-gold-400 hover:text-gold-300 group/btn"
                  >
                    <span>Profile</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {/* Invitation Card for New Artists */}
        <div className="rounded-2xl glass-panel border border-dashed border-gold-500/30 p-8 flex flex-col justify-center items-center text-center group hover:border-gold-400 transition-all">
          <div className="w-14 h-14 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 mb-4 group-hover:scale-110 transition-transform">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-cinzel font-bold text-white mb-2">
            JOIN THE TWELVE ROSTER
          </h3>
          <p className="text-xs text-slate-400 mb-6 max-w-xs leading-relaxed">
            Are you an African Christian artist, worship leader, or band pushing musical boundaries? We are actively scouting for our upcoming catalog.
          </p>
          <button
            onClick={() => setIsDemoModalOpen(true)}
            className="px-5 py-2.5 rounded-full bg-gold-500/20 hover:bg-gold-500 text-gold-300 hover:text-black font-semibold text-xs uppercase tracking-wider transition-all"
          >
            Submit Music Demo
          </button>
        </div>
      </div>
    </section>
  );
};
