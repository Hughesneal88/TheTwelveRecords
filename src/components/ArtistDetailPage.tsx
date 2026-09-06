import React from "react";
import { useContent } from "../context/ContentContext";
import { useAuth } from "../context/AuthContext";
import { useAudio } from "../context/AudioContext";
import {
  ArrowLeft,
  Play,
  Pause,
  Mail,
  Sparkles,
  ExternalLink,
  Edit3,
  Video,
  Disc,
  Radio,
  Share2
} from "lucide-react";

export const ArtistDetailPage: React.FC = () => {
  const { activeArtistSlug, getArtistBySlug, getReleasesByArtistId, navigateToHome, setIsAdminModalOpen, setSelectedReleaseModal } = useContent();
  const { canEditArtistProfile } = useAuth();
  const { playTrack, togglePlay, isPlaying, currentTrack } = useAudio();

  const artist = activeArtistSlug ? getArtistBySlug(activeArtistSlug) : undefined;

  if (!artist) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-4 text-center max-w-xl mx-auto">
        <h2 className="text-3xl font-cinzel font-bold text-white mb-4">Artist Not Found</h2>
        <p className="text-slate-400 text-sm mb-6">The requested artist profile does not exist or has been updated.</p>
        <button
          onClick={navigateToHome}
          className="px-6 py-2.5 rounded-full bg-gold-500 text-black font-semibold text-xs uppercase tracking-wider"
        >
          Return to Label Roster
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
        text: `Check out ${artist.name} on The Twelve Records (Accra, Ghana)`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Artist link copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-32">
      {/* Back Button & Top Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <button
          onClick={navigateToHome}
          className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-gold-400 uppercase tracking-widest transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Label Roster</span>
        </button>

        <div className="flex items-center gap-3">
          {canEdit && (
            <button
              onClick={() => setIsAdminModalOpen(true)}
              className="px-4 py-2 bg-gradient-to-r from-gold-500 to-amber-600 text-black text-xs font-bold uppercase tracking-wider rounded-full shadow-lg hover:brightness-110 transition-all flex items-center gap-1.5"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit My Artist Page</span>
            </button>
          )}

          <button
            onClick={handleShare}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
            title="Share Artist Page"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Hero Banner Section */}
      <div className="relative h-[380px] sm:h-[480px] w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative w-full h-full rounded-3xl overflow-hidden border border-gold-500/20 shadow-2xl">
          <img
            src={artist.bannerUrl || artist.photoUrl}
            alt={artist.name}
            className="w-full h-full object-cover object-center"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1600&q=80";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-[#08080a]/60 to-transparent"></div>

          {/* Hero Content Overlay */}
          <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="flex items-end gap-5">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-2 border-gold-400 p-0.5 shadow-2xl flex-shrink-0 bg-black">
                <img
                  src={artist.photoUrl}
                  alt={artist.name}
                  className="w-full h-full object-cover rounded-xl"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&q=80";
                  }}
                />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-gold-400">
                    {artist.origin} &bull; {artist.genre}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-gold-500/20 text-gold-300 text-[10px] font-bold uppercase tracking-wider border border-gold-500/30">
                    Official Artist
                  </span>
                </div>
                <h1 className="text-3xl sm:text-5xl font-cinzel font-black text-white tracking-wide">
                  {artist.name}
                </h1>
                <p className="text-xs sm:text-sm text-slate-300 font-light mt-1 max-w-xl">
                  {artist.tagline}
                </p>
              </div>
            </div>

            {/* DSP Streaming Badges */}
            <div className="flex flex-wrap items-center gap-2">
              {artist.socials.spotify && (
                <a
                  href={artist.socials.spotify}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-1.5 rounded-full bg-[#1DB954]/20 hover:bg-[#1DB954] text-[#1DB954] hover:text-black font-semibold text-xs tracking-wider transition-all border border-[#1DB954]/40"
                >
                  Spotify
                </a>
              )}
              {artist.socials.appleMusic && (
                <a
                  href={artist.socials.appleMusic}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-1.5 rounded-full bg-pink-500/20 hover:bg-pink-500 text-pink-300 hover:text-white font-semibold text-xs tracking-wider transition-all border border-pink-500/40"
                >
                  Apple Music
                </a>
              )}
              {artist.socials.boomplay && (
                <a
                  href={artist.socials.boomplay}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-1.5 rounded-full bg-gold-500/20 hover:bg-gold-500 text-gold-300 hover:text-black font-semibold text-xs tracking-wider transition-all border border-gold-500/40"
                >
                  Boomplay
                </a>
              )}
              {artist.socials.audiomack && (
                <a
                  href={artist.socials.audiomack}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-1.5 rounded-full bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-black font-semibold text-xs tracking-wider transition-all border border-amber-500/40"
                >
                  Audiomack
                </a>
              )}
              {artist.socials.instagram && (
                <a
                  href={artist.socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-semibold tracking-wider transition-all"
                >
                  Instagram
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Artist Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left 2 Columns: Bio, Ministry Vision & Featured Video */}
        <div className="lg:col-span-2 space-y-10">
          {/* Biography */}
          <div className="glass-panel rounded-2xl p-8 border border-gold-500/15">
            <h3 className="text-xl font-cinzel font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gold-400"></span>
              BIOGRAPHY & MINISTRY CALLING
            </h3>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light whitespace-pre-line mb-6">
              {artist.bio}
            </p>

            {artist.ministryVision && (
              <div className="p-5 rounded-xl bg-gold-500/10 border-l-4 border-gold-400 text-xs sm:text-sm text-gold-200 italic leading-relaxed">
                "{artist.ministryVision}"
              </div>
            )}
          </div>

          {/* Featured Video / Live Session Embed */}
          {artist.featuredVideoUrl && (
            <div className="glass-panel rounded-2xl p-8 border border-gold-500/15">
              <h3 className="text-xl font-cinzel font-bold text-white mb-4 flex items-center gap-2">
                <Video className="w-5 h-5 text-gold-400" />
                FEATURED WORSHIP & VIDEO SPOTLIGHT
              </h3>
              <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 bg-black">
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

        {/* Right Column: Artist Discography & Booking Contact */}
        <div className="space-y-8">
          {/* Discography by this artist */}
          <div className="glass-panel rounded-2xl p-6 border border-gold-500/15">
            <h3 className="text-lg font-cinzel font-bold text-white mb-4 flex items-center gap-2">
              <Disc className="w-4 h-4 text-gold-400" />
              DISCOGRAPHY ({artistReleases.length})
            </h3>

            {artistReleases.length === 0 ? (
              <p className="text-xs text-slate-400">New releases currently in production in Accra studios.</p>
            ) : (
              <div className="space-y-4">
                {artistReleases.map((release) => {
                  const leadTrack = release.tracks[0];
                  const isTrackPlaying = isPlaying && currentTrack?.id === leadTrack?.id;

                  return (
                    <div
                      key={release.id}
                      className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-gold-500/30 transition-all flex items-center justify-between gap-3 group"
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
                          <span className="text-[10px] font-mono text-gold-400 block">
                            {release.catalogNumber} &bull; {release.format}
                          </span>
                          <h4 className="text-xs font-semibold text-white truncate group-hover:text-gold-300 transition-colors">
                            {release.title}
                          </h4>
                          <span className="text-[10px] text-slate-400">
                            {release.releaseDate}
                          </span>
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
                          className={`p-2 rounded-full transition-all flex-shrink-0 ${
                            isTrackPlaying
                              ? "bg-gold-500 text-black shadow-md shadow-gold-500/40"
                              : "bg-white/10 text-white hover:bg-gold-500 hover:text-black"
                          }`}
                          title={isTrackPlaying ? "Pause sample" : "Play sample preview"}
                        >
                          {isTrackPlaying ? (
                            <Pause className="w-4 h-4 fill-current" />
                          ) : (
                            <Play className="w-4 h-4 fill-current ml-0.5" />
                          )}
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Booking & Ministry Inquiries */}
          <div className="glass-panel rounded-2xl p-6 border border-gold-500/15">
            <h3 className="text-lg font-cinzel font-bold text-white mb-2 flex items-center gap-2">
              <Mail className="w-4 h-4 text-gold-400" />
              BOOKING & MINISTRY INQUIRIES
            </h3>
            <p className="text-xs text-slate-300 mb-4 leading-relaxed font-light">
              For church conferences, festival invitations, worship ministry, and press features with {artist.name}:
            </p>
            <a
              href={`mailto:${artist.bookingEmail || "bookings@thetwelverecords.com"}?subject=Booking Inquiry for ${artist.name}`}
              className="w-full py-3 rounded-xl bg-gold-500/15 hover:bg-gold-500 text-gold-300 hover:text-black font-semibold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 border border-gold-500/30"
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
