import React, { useState } from "react";
import { useContent } from "../../context/ContentContext";
import { useAuth } from "../../context/AuthContext";
import { Artist } from "../../types";
import { Plus, Edit2, Trash2, Image, Link, Sparkles, Check, ArrowLeft, Upload, Loader2 } from "lucide-react";
import { SupabaseService } from "../../utils/supabaseSync";

export const ArtistEditor: React.FC = () => {
  const { artists, addArtist, updateArtist, deleteArtist } = useContent();
  const { currentUser, canEditAllArtists } = useAuth();

  const isArtistManager = currentUser?.role === "artist_manager";
  const assignedArtist = isArtistManager
    ? artists.find((a) => a.id === currentUser.assignedArtistId)
    : undefined;

  const [editingArtist, setEditingArtist] = useState<Artist | null>(assignedArtist || null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [savedFeedback, setSavedFeedback] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const [formData, setFormData] = useState<Omit<Artist, "id">>({
    slug: "",
    name: "",
    realName: "",
    tagline: "",
    genre: "Afro-Gospel / Contemporary Praise",
    origin: "Accra, Ghana",
    photoUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1600&q=80",
    bio: "",
    ministryVision: "",
    featuredVideoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    isFeatured: true,
    socials: {
      spotify: "https://open.spotify.com",
      appleMusic: "https://music.apple.com",
      boomplay: "https://boomplay.com",
      audiomack: "https://audiomack.com",
      youtube: "https://youtube.com",
      instagram: "https://instagram.com"
    },
    releaseIds: [],
    bookingEmail: ""
  });

  const handleStartEdit = (artist: Artist) => {
    setEditingArtist(artist);
    setIsCreatingNew(false);
    setFormData({
      slug: artist.slug,
      name: artist.name,
      realName: artist.realName || "",
      tagline: artist.tagline,
      genre: artist.genre,
      origin: artist.origin,
      photoUrl: artist.photoUrl,
      bannerUrl: artist.bannerUrl,
      bio: artist.bio,
      ministryVision: artist.ministryVision || "",
      featuredVideoUrl: artist.featuredVideoUrl || "",
      isFeatured: artist.isFeatured,
      socials: { ...artist.socials },
      releaseIds: [...artist.releaseIds],
      bookingEmail: artist.bookingEmail || ""
    });
  };

  const handleStartCreate = () => {
    setIsCreatingNew(true);
    setEditingArtist(null);
    setFormData({
      slug: "new-artist-" + Date.now(),
      name: "",
      realName: "",
      tagline: "",
      genre: "Afro-Gospel / Contemporary Worship",
      origin: "Accra, Ghana",
      photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80",
      bannerUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1600&q=80",
      bio: "",
      ministryVision: "",
      featuredVideoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      isFeatured: false,
      socials: {
        spotify: "https://open.spotify.com",
        appleMusic: "https://music.apple.com",
        boomplay: "https://boomplay.com",
        audiomack: "https://audiomack.com",
        youtube: "https://youtube.com",
        instagram: "https://instagram.com"
      },
      releaseIds: [],
      bookingEmail: ""
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: "photoUrl" | "bannerUrl") => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);

    try {
      const publicUrl = await SupabaseService.uploadMediaFile(file, "artists");
      if (publicUrl) {
        setFormData((prev) => ({ ...prev, [field]: publicUrl }));
      } else {
        const reader = new FileReader();
        reader.onload = () => {
          if (typeof reader.result === "string") {
            setFormData((prev) => ({ ...prev, [field]: reader.result as string }));
          }
        };
        reader.readAsDataURL(file);
      }
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = formData.slug.trim() || formData.name.toLowerCase().replace(/\s+/g, "-");

    if (isCreatingNew) {
      addArtist({ ...formData, slug });
      setIsCreatingNew(false);
    } else if (editingArtist) {
      updateArtist(editingArtist.id, { ...formData, slug });
      if (!isArtistManager) {
        setEditingArtist(null);
      }
    }

    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-cinzel font-bold text-white">
            {isArtistManager ? "YOUR ARTIST STUDIO" : "ARTIST ROSTER MANAGEMENT"}
          </h3>
          <p className="text-xs text-slate-400">
            {isArtistManager
              ? `Manage profile data, photos, and DSP links for ${assignedArtist?.name || "your artist page"}.`
              : "Add, edit, or remove label artists, photo assets, bios, and streaming links."}
          </p>
        </div>

        {canEditAllArtists && !editingArtist && !isCreatingNew && (
          <button
            onClick={handleStartCreate}
            className="px-4 py-2 rounded-full bg-gold-500 hover:bg-gold-400 text-black text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md self-start"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Artist</span>
          </button>
        )}
      </div>

      {savedFeedback && (
        <div className="p-3.5 rounded-xl bg-gold-500/15 border border-gold-500/40 text-gold-300 text-xs flex items-center gap-2 animate-in fade-in">
          <Check className="w-4 h-4 text-gold-400" />
          <span>Artist data saved to Supabase cloud and synchronized live!</span>
        </div>
      )}

      {(editingArtist || isCreatingNew) ? (
        <form onSubmit={handleSave} className="p-6 rounded-2xl bg-black/40 border border-gold-500/20 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h4 className="font-cinzel font-bold text-white text-base flex items-center gap-2">
              <Edit2 className="w-4 h-4 text-gold-400" />
              <span>{isCreatingNew ? "Create New Artist Profile" : `Editing: ${formData.name || "Artist"}`}</span>
            </h4>

            {canEditAllArtists && (
              <button
                type="button"
                onClick={() => {
                  setEditingArtist(null);
                  setIsCreatingNew(false);
                }}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Roster List
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                Stage / Public Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Kofi Owusu"
                className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:border-gold-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                URL Slug (/artist/...) *
              </label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="kofi-owusu"
                className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:border-gold-400 focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                Genre / Style *
              </label>
              <input
                type="text"
                required
                value={formData.genre}
                onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                placeholder="Afro-Gospel / Contemporary Praise"
                className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:border-gold-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                Artist Tagline / Headline *
              </label>
              <input
                type="text"
                required
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                placeholder="Afro-Gospel Pioneer & Electric Praise Leader"
                className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:border-gold-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                Home City & Origin *
              </label>
              <input
                type="text"
                required
                value={formData.origin}
                onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                placeholder="Accra, Ghana"
                className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:border-gold-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Media & Images */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <div className="space-y-2">
              <label className="block text-[11px] font-semibold text-slate-300">
                Portrait Photo (Supabase Storage or Direct URL) *
              </label>
              <input
                type="text"
                value={formData.photoUrl}
                onChange={(e) => setFormData({ ...formData, photoUrl: e.target.value })}
                placeholder="https://..."
                className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:border-gold-400 focus:outline-none"
              />
              <div className="flex items-center gap-3">
                <label className="cursor-pointer px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-slate-200 text-xs flex items-center gap-1.5 transition-colors">
                  {isUploading ? <Loader2 className="w-3.5 h-3.5 animate-spin text-gold-400" /> : <Upload className="w-3.5 h-3.5 text-gold-400" />}
                  <span>Upload to Supabase Storage</span>
                  <input
                    type="file"
                    accept="image/*"
                    disabled={isUploading}
                    onChange={(e) => handleFileUpload(e, "photoUrl")}
                    className="hidden"
                  />
                </label>
                {formData.photoUrl && (
                  <img
                    src={formData.photoUrl}
                    alt="Preview"
                    className="w-10 h-10 rounded-lg object-cover border border-gold-500/30"
                  />
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-[11px] font-semibold text-slate-300">
                Hero Banner Artwork (Supabase Storage or Direct URL) *
              </label>
              <input
                type="text"
                value={formData.bannerUrl}
                onChange={(e) => setFormData({ ...formData, bannerUrl: e.target.value })}
                placeholder="https://..."
                className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:border-gold-400 focus:outline-none"
              />
              <div className="flex items-center gap-3">
                <label className="cursor-pointer px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-slate-200 text-xs flex items-center gap-1.5 transition-colors">
                  {isUploading ? <Loader2 className="w-3.5 h-3.5 animate-spin text-gold-400" /> : <Upload className="w-3.5 h-3.5 text-gold-400" />}
                  <span>Upload to Supabase Storage</span>
                  <input
                    type="file"
                    accept="image/*"
                    disabled={isUploading}
                    onChange={(e) => handleFileUpload(e, "bannerUrl")}
                    className="hidden"
                  />
                </label>
                {formData.bannerUrl && (
                  <img
                    src={formData.bannerUrl}
                    alt="Banner Preview"
                    className="w-16 h-10 rounded-lg object-cover border border-gold-500/30"
                  />
                )}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1">
              Full Artist Biography *
            </label>
            <textarea
              required
              rows={4}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:border-gold-400 focus:outline-none resize-none leading-relaxed"
            ></textarea>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1">
              Spiritual Ministry Vision Quote
            </label>
            <input
              type="text"
              value={formData.ministryVision}
              onChange={(e) => setFormData({ ...formData, ministryVision: e.target.value })}
              placeholder="e.g. To ignite a generation with joyful praise..."
              className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:border-gold-400 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                Featured YouTube Video Embed URL
              </label>
              <input
                type="text"
                value={formData.featuredVideoUrl}
                onChange={(e) => setFormData({ ...formData, featuredVideoUrl: e.target.value })}
                placeholder="https://www.youtube.com/embed/..."
                className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:border-gold-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                Direct Booking Email
              </label>
              <input
                type="email"
                value={formData.bookingEmail}
                onChange={(e) => setFormData({ ...formData, bookingEmail: e.target.value })}
                placeholder="artist.bookings@thetwelverecords.com"
                className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:border-gold-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <span className="text-[11px] font-cinzel font-bold text-gold-400 uppercase tracking-wider block">
              DSP STREAMING & SOCIAL PROFILES
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <input
                type="text"
                value={formData.socials.spotify || ""}
                onChange={(e) => setFormData({ ...formData, socials: { ...formData.socials, spotify: e.target.value } })}
                placeholder="Spotify URL"
                className="px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white text-xs focus:border-gold-400 focus:outline-none"
              />
              <input
                type="text"
                value={formData.socials.appleMusic || ""}
                onChange={(e) => setFormData({ ...formData, socials: { ...formData.socials, appleMusic: e.target.value } })}
                placeholder="Apple Music URL"
                className="px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white text-xs focus:border-gold-400 focus:outline-none"
              />
              <input
                type="text"
                value={formData.socials.boomplay || ""}
                onChange={(e) => setFormData({ ...formData, socials: { ...formData.socials, boomplay: e.target.value } })}
                placeholder="Boomplay URL"
                className="px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white text-xs focus:border-gold-400 focus:outline-none"
              />
              <input
                type="text"
                value={formData.socials.audiomack || ""}
                onChange={(e) => setFormData({ ...formData, socials: { ...formData.socials, audiomack: e.target.value } })}
                placeholder="Audiomack URL"
                className="px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white text-xs focus:border-gold-400 focus:outline-none"
              />
              <input
                type="text"
                value={formData.socials.youtube || ""}
                onChange={(e) => setFormData({ ...formData, socials: { ...formData.socials, youtube: e.target.value } })}
                placeholder="YouTube Channel URL"
                className="px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white text-xs focus:border-gold-400 focus:outline-none"
              />
              <input
                type="text"
                value={formData.socials.instagram || ""}
                onChange={(e) => setFormData({ ...formData, socials: { ...formData.socials, instagram: e.target.value } })}
                placeholder="Instagram Profile URL"
                className="px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white text-xs focus:border-gold-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
            {canEditAllArtists && (
              <button
                type="button"
                onClick={() => {
                  setEditingArtist(null);
                  setIsCreatingNew(false);
                }}
                className="px-5 py-2.5 rounded-full bg-white/10 text-slate-300 text-xs font-semibold"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="px-7 py-2.5 rounded-full bg-gradient-to-r from-gold-500 to-amber-600 hover:from-gold-400 hover:to-amber-500 text-black font-bold text-xs uppercase tracking-wider shadow-lg"
            >
              Save Artist Changes
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {artists.map((artist) => (
              <div
                key={artist.id}
                className="p-4 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-between gap-4 hover:border-gold-500/30 transition-all"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <img
                    src={artist.photoUrl}
                    alt={artist.name}
                    className="w-14 h-14 rounded-xl object-cover border border-gold-500/30 flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-semibold text-white truncate">
                        {artist.name}
                      </h4>
                      {artist.isFeatured && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-gold-500/20 text-gold-300 font-bold">
                          FEATURED
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-gold-400/90 font-mono block">
                      /artist/{artist.slug}
                    </span>
                    <span className="text-[11px] text-slate-400 truncate block">
                      {artist.genre} &bull; {artist.origin}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 flex-shrink-0">
                  <button
                    onClick={() => handleStartEdit(artist)}
                    className="p-2 rounded-lg bg-gold-500/15 hover:bg-gold-500 text-gold-300 hover:text-black transition-colors"
                    title="Edit Artist"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>

                  {canEditAllArtists && (
                    <button
                      onClick={() => {
                        if (confirm(`Are you sure you want to delete ${artist.name}?`)) {
                          deleteArtist(artist.id);
                        }
                      }}
                      className="p-2 rounded-lg bg-white/5 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-colors"
                      title="Delete Artist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
