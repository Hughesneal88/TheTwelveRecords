import React from "react";
import { useContent } from "../context/ContentContext";
import { useAuth } from "../context/AuthContext";
import { useAudio } from "../context/AudioContext";
import { ArrowLeft, Play, Pause, ExternalLink, Edit3, Video, Disc, Clock, Share2 } from "lucide-react";

export const ArtistDetailPage: React.FC = () => {
  const { activeArtistSlug, getArtistBySlug, getReleasesByArtistId, navigateToHome, setIsAdminModalOpen, setSelectedReleaseModal } = useContent();
  const { canEditArtistProfile } = useAuth();
  const { playTrack, togglePlay, isPlaying, currentTrack } = useAudio();

  const artist = activeArtistSlug ? getArtistBySlug(activeArtistSlug) : undefined;

  if (!artist) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-4 text-center max-w-xl mx-auto">
        <h2 className="font-display font-bold text-3xl text-white mb-4">Artist Not Found</h2>
        <p className="text-zinc-400 text-sm mb-6">The requested artist profile does not exist.</p>
        <button
          onClick={navigateToHome}
          className="px-6 py-2.5 rounded-full bg-white text-black font-bold text-xs uppercase"
        >
          Return to Roster
        </button>
      </div>
    );
  }

  const artistReleases = getReleasesByArtistId(artist.id);
  const canEdit = canEditArtistProfile(artist.id);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${artist.name} | The Twelve Records`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-36 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Top Breadcrumb Bar */}
      <div className="py-4 flex items-center justify-between border-b border-white/10 mb-8">
        <button
          onClick={navigateToHome}
          className="flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white uppercase tracking-wider transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Label Roster</span>
        </button>

        <div className="flex items-center gap-3">
          {canEdit && (
            <button
              onClick={() => setIsAdminModalOpen(true)}
              className="px-4 py-2 bg-[#c8a858] text-black text-xs font-bold uppercase tracking-wider rounded-full flex items-center gap-1.5"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Profile</span>
            </button>
          )}

          <button
            onClick={handleShare}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-300"
            title="Share"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Hero Spread */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end pb-12 border-b border-white/10">
        <div className="lg:col-span-5">
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 bg-black">
            <img
              src={artist.photoUrl}
              alt={artist.name}
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#c8a858]">
            <span>{artist.origin}</span>
            <span>&bull;</span>
            <span>{artist.genre}</span>
          </div>

          <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl text-white tracking-tightest uppercase leading-none">
            {artist.name}
          </h1>

          <p className="text-lg text-zinc-300 font-light leading-relaxed max-w-xl">
            {artist.tagline}
          </p>

          {/* DSP Streaming Badges */}
          <div className="flex flex-wrap gap-2 pt-2">
            {artist.socials.spotify && (
              <a
                href={artist.socials.spotify}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-full bg-white/10 hover:bg-[#1DB954] text-white hover:text-black font-semibold text-xs transition-all font-mono"
              >
                SPOTIFY
              </a>
            )}
            {artist.socials.boomplay && (
              <a
                href={artist.socials.boomplay}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-full bg-white/10 hover:bg-[#c8a858] text-white hover:text-black font-semibold text-xs transition-all font-mono"
              >
                BOOMPLAY
              </a>
            )}
            {artist.socials.audiomack && (
              <a
                href={artist.socials.audiomack}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-full bg-white/10 hover:bg-amber-500 text-white hover:text-black font-semibold text-xs transition-all font-mono"
              >
                AUDIOMACK
              </a>
            )}
            {artist.socials.appleMusic && (
              <a
                href={artist.socials.appleMusic}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-full bg-white/10 hover:bg-pink-500 text-white hover:text-white font-semibold text-xs transition-all font-mono"
              >
                APPLE MUSIC
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Main Content: Bio & Discography Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-12">
        <div className="lg:col-span-7 space-y-10">
          <div>
            <h3 className="font-display font-bold text-xl text-white uppercase tracking-wider mb-4">
              Biography
            </h3>
            <p className="text-zinc-300 font-light text-base leading-relaxed whitespace-pre-line">
              {artist.bio}
            </p>
          </div>

          {artist.ministryVision && (
            <div className="p-6 rounded-2xl bg-[#0e0e13] border-l-4 border-[#c8a858] text-sm text-zinc-200 font-light italic leading-relaxed">
              "{artist.ministryVision}"
            </div>
          )}

          {artist.featuredVideoUrl && (
            <div>
              <h3 className="font-display font-bold text-xl text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                <Video className="w-5 h-5 text-[#c8a858]" />
                <span>Featured Worship Spotlight</span>
              </h3>
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 bg-black">
                <iframe
                  src={artist.featuredVideoUrl}
                  title={`${artist.name} Spotlight Video`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Discography & Booking */}
        <div className="lg:col-span-5 space-y-8">
          <div className="p-6 rounded-2xl editorial-card border border-white/10">
            <h3 className="font-display font-bold text-lg text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <Disc className="w-4 h-4 text-[#c8a858]" />
              <span>Catalog Releases ({artistReleases.length})</span>
            </h3>

            {artistReleases.length === 0 ? (
              <p className="text-xs text-zinc-500 font-mono">Catalog recordings in production in Accra.</p>
            ) : (
              <div className="space-y-3">
                {artistReleases.map((release) => {
                  const leadTrack = release.tracks[0];
                  const isTrackPlaying = isPlaying && currentTrack?.id === leadTrack?.id;

                  return (
                    <div
                      key={release.id}
                      className="p-3.5 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between gap-3 group"
                    >
                      <div
                        className="flex items-center gap-3 min-w-0 cursor-pointer flex-1"
                        onClick={() => setSelectedReleaseModal(release)}
                      >
                        <img
                          src={release.coverUrl}
                          alt={release.title}
                          className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <span className="text-[10px] font-mono text-[#c8a858] block">
                            {release.catalogNumber}
                          </span>
                          <h4 className="text-xs font-display font-bold text-white truncate group-hover:text-[#c8a858] transition-colors">
                            {release.title}
                          </h4>
                        </div>
                      </div>

                      {leadTrack && (
                        <button
                          onClick={() => {
                            if (isTrackPlaying) {
                              togglePlay();
                            } else {
                              playTrack(leadTrack, release);
                            }
                          }}
                          className={`p-2.5 rounded-full flex-shrink-0 transition-all ${
                            isTrackPlaying
                              ? "bg-[#c8a858] text-black"
                              : "bg-white/10 text-white hover:bg-white hover:text-black"
                          }`}
                        >
                          {isTrackPlaying ? (
                            <Pause className="w-3.5 h-3.5 fill-current" />
                          ) : (
                            <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                          )}
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Booking Contact */}
          <div className="p-6 rounded-2xl editorial-card border border-white/10 space-y-3">
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">
              Booking & Inquiries
            </h4>
            <p className="text-xs text-zinc-400 font-light leading-relaxed">
              For church invitations, festival appearances, and live recordings with {artist.name}:
            </p>
            <a
              href={`mailto:${artist.bookingEmail || "bookings@thetwelverecords.com"}`}
              className="w-full py-3 rounded-xl bg-white text-black hover:bg-[#c8a858] font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
            >
              <span>Contact Management</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
