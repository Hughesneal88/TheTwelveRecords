import React, { useState } from "react";
import { useContent } from "../../context/ContentContext";
import { useAuth } from "../../context/AuthContext";
import { Artist } from "../../types";
import { Plus, Edit2, Trash2, Check, ArrowLeft, Upload, Loader2, Sparkles } from "lucide-react";
import { SupabaseService } from "../../utils/supabaseSync";
import { autoPopulateFromSpotifyUrl } from "../../utils/spotifyImporter";

export const ArtistEditor: React.FC = () => {
  const { artists, releases, addArtist, updateArtist, deleteArtist, addRelease } = useContent();
  const { currentUser, canEditAllArtists } = useAuth();

  const isArtistManager = currentUser?.role === "artist_manager";
  const assignedArtist = isArtistManager
    ? artists.find((a) => a.id === currentUser.assignedArtistId)
    : undefined;

  const [editingArtist, setEditingArtist] = useState<Artist | null>(assignedArtist || null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [savedFeedback, setSavedFeedback] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Spotify auto-population states
  const [rosterSpotifyInput, setRosterSpotifyInput] = useState("");
  const [formSpotifyInput, setFormSpotifyInput] = useState("");
  const [isImportingSpotify, setIsImportingSpotify] = useState(false);
  const [importSummary, setImportSummary] = useState<{
    artistName: string;
    releasesImported: number;
    tracksImported: number;
  } | null>(null);
  const [importError, setImportError] = useState<string | null>(null);

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
    embedUrl: "",
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
    setFormSpotifyInput(artist.socials?.spotify || artist.name);
    setImportSummary(null);
    setImportError(null);
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
      embedUrl: artist.embedUrl || "",
      isFeatured: artist.isFeatured,
      socials: { ...artist.socials },
      releaseIds: [...artist.releaseIds],
      bookingEmail: artist.bookingEmail || ""
    });
  };

  const handleStartCreate = () => {
    setIsCreatingNew(true);
    setEditingArtist(null);
    setFormSpotifyInput("");
    setImportSummary(null);
    setImportError(null);
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
      embedUrl: "",
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

  const handleSpotifyAutoPopulate = async (inputUrl: string, autoSaveToRoster = false) => {
    if (!inputUrl.trim()) return;
    setIsImportingSpotify(true);
    setImportError(null);
    setImportSummary(null);

    try {
      const result = await autoPopulateFromSpotifyUrl(
        inputUrl,
        artists.length,
        releases.length
      );

      if (!result || !result.artistData.name) {
        setImportError("Could not retrieve artist details from the link. Please verify the URL or search name.");
        return;
      }

      const { artistData, releases: importedReleases, importedTrackCount } = result;

      if (autoSaveToRoster) {
        const createdArtist = addArtist({
          slug: artistData.slug || "artist-" + Date.now(),
          name: artistData.name || "Artist",
          realName: artistData.realName || "",
          tagline: artistData.tagline || "",
          genre: artistData.genre || "Afro-Gospel",
          origin: artistData.origin || "Accra, Ghana",
          photoUrl: artistData.photoUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80",
          bannerUrl: artistData.bannerUrl || "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1600&q=80",
          bio: artistData.bio || "",
          ministryVision: artistData.ministryVision || "",
          featuredVideoUrl: artistData.featuredVideoUrl || "",
          embedUrl: artistData.embedUrl || "",
          isFeatured: artists.length === 0,
          socials: {
            spotify: artistData.socials?.spotify || "https://open.spotify.com",
            appleMusic: artistData.socials?.appleMusic || "https://music.apple.com",
            boomplay: artistData.socials?.boomplay || "https://boomplay.com",
            audiomack: artistData.socials?.audiomack || "https://audiomack.com",
            youtube: artistData.socials?.youtube || "https://youtube.com",
            instagram: artistData.socials?.instagram || "https://instagram.com"
          },
          releaseIds: [],
          bookingEmail: artistData.bookingEmail || ""
        });

        const createdReleaseIds: string[] = [];
        for (const rel of importedReleases) {
          const newRel = addRelease({
            ...rel,
            artistId: createdArtist.id,
            artistName: createdArtist.name
          });
          createdReleaseIds.push(newRel.id);
        }

        if (createdReleaseIds.length > 0) {
          updateArtist(createdArtist.id, { releaseIds: createdReleaseIds });
        }

        setImportSummary({
          artistName: createdArtist.name,
          releasesImported: importedReleases.length,
          tracksImported: importedTrackCount
        });
        setRosterSpotifyInput("");
      } else {
        let addedRelIds = [...formData.releaseIds];
        const targetArtistId = editingArtist ? editingArtist.id : `artist-${Date.now()}`;
        const targetArtistName = artistData.name || formData.name;

        if (importedReleases.length > 0) {
          for (const rel of importedReleases) {
            const newRel = addRelease({
              ...rel,
              artistId: targetArtistId,
              artistName: targetArtistName
            });
            addedRelIds.push(newRel.id);
          }
        }

        setFormData((prev) => ({
          ...prev,
          name: artistData.name || prev.name,
          slug: artistData.slug || prev.slug,
          tagline: artistData.tagline || prev.tagline,
          genre: artistData.genre || prev.genre,
          origin: artistData.origin || prev.origin,
          photoUrl: artistData.photoUrl || prev.photoUrl,
          bannerUrl: artistData.bannerUrl || prev.bannerUrl,
          bio: artistData.bio || prev.bio,
          embedUrl: artistData.embedUrl || prev.embedUrl,
          socials: {
            ...prev.socials,
            ...(artistData.socials || {})
          },
          releaseIds: addedRelIds
        }));

        setImportSummary({
          artistName: artistData.name || "Artist",
          releasesImported: importedReleases.length,
          tracksImported: importedTrackCount
        });
      }
    } catch (err: any) {
      setImportError(err?.message || "Failed to auto-populate from Spotify link.");
    } finally {
      setIsImportingSpotify(false);
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
          <h3 className="text-xl font-display font-bold text-white">
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

      {/* Global Auto-Import from Spotify Bar in Roster View */}
      {canEditAllArtists && !editingArtist && !isCreatingNew && (
        <div className="p-5 rounded-2xl bg-gradient-to-r from-[#1DB954]/20 via-[#0a160d] to-gold-500/10 border border-[#1DB954]/30 space-y-3 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#1DB954] flex items-center justify-center text-black shrink-0 shadow-md">
              <Sparkles className="w-4 h-4 fill-black" />
            </div>
            <div>
              <h4 className="text-sm font-display font-bold text-white tracking-wide flex items-center gap-2">
                <span>AUTO-IMPORT ARTIST & FULL DISCOGRAPHY FROM SPOTIFY</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#1DB954]/20 text-[#1ed760] font-mono font-bold border border-[#1DB954]/40">
                  1-CLICK SYNC
                </span>
              </h4>
              <p className="text-xs text-zinc-300">
                Paste any Spotify artist link (e.g. <code className="text-gold-400">https://open.spotify.com/artist/4tUqM99Y3aP3D6b7QfL19Y</code>) or type artist name (<code className="text-gold-400">allisonsaidthis</code>, <code className="text-gold-400">Kofi Raj</code>) to auto-fetch high-res photos, bio, streaming links, and all discography releases!
              </p>
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSpotifyAutoPopulate(rosterSpotifyInput, true);
            }}
            className="flex flex-col sm:flex-row gap-2.5 pt-1"
          >
            <input
              type="text"
              value={rosterSpotifyInput}
              onChange={(e) => setRosterSpotifyInput(e.target.value)}
              placeholder="Paste Spotify Artist link or artist name..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-black/80 border border-white/20 text-xs text-white placeholder:text-zinc-500 focus:border-[#1DB954] focus:outline-none font-mono"
            />
            <button
              type="submit"
              disabled={isImportingSpotify || !rosterSpotifyInput.trim()}
              className="px-5 py-2.5 rounded-xl bg-[#1DB954] hover:bg-[#1ed760] disabled:opacity-50 text-black text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md shrink-0 cursor-pointer"
            >
              {isImportingSpotify ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-black" />
                  <span>Fetching Spotify Catalog...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Auto-Import Artist & Discography</span>
                </>
              )}
            </button>
          </form>

          {importSummary && (
            <div className="p-3.5 rounded-xl bg-[#1DB954]/20 border border-[#1DB954]/40 text-[#1ed760] text-xs flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#1ed760]" />
                <span>
                  Successfully imported <strong>{importSummary.artistName}</strong> with <strong>{importSummary.releasesImported} discography releases</strong> ({importSummary.tracksImported} tracks) into label catalog!
                </span>
              </span>
              <button onClick={() => setImportSummary(null)} className="text-zinc-400 hover:text-white text-xs ml-2">✕</button>
            </div>
          )}

          {importError && (
            <div className="p-3.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs flex items-center justify-between">
              <span>⚠️ {importError}</span>
              <button onClick={() => setImportError(null)} className="text-zinc-400 hover:text-white text-xs ml-2">✕</button>
            </div>
          )}
        </div>
      )}

      {savedFeedback && (
        <div className="p-3.5 rounded-xl bg-gold-500/15 border border-gold-500/40 text-gold-300 text-xs flex items-center gap-2 animate-in fade-in">
          <Check className="w-4 h-4 text-gold-400" />
          <span>Artist data saved to Supabase cloud and synchronized live!</span>
        </div>
      )}

      {/* Editor Form */}
      {(editingArtist || isCreatingNew) ? (
        <form onSubmit={handleSave} className="p-6 rounded-2xl bg-black/40 border border-gold-500/20 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h4 className="font-display font-bold text-white text-base flex items-center gap-2">
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

          {/* Form Auto-Populate Bar */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-[#1DB954]/15 to-transparent border border-[#1DB954]/30 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-[#1ed760] uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Auto-Populate Form & Discography from Spotify</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={formSpotifyInput}
                onChange={(e) => setFormSpotifyInput(e.target.value)}
                placeholder="Paste Spotify Artist link or artist name (e.g. allisonsaidthis, Kofi Raj)..."
                className="flex-1 px-3.5 py-2 rounded-xl bg-black/70 border border-white/20 text-xs text-white placeholder:text-zinc-500 focus:border-[#1DB954] focus:outline-none font-mono"
              />
              <button
                type="button"
                disabled={isImportingSpotify || !formSpotifyInput.trim()}
                onClick={() => handleSpotifyAutoPopulate(formSpotifyInput, false)}
                className="px-4 py-2 rounded-xl bg-[#1DB954] hover:bg-[#1ed760] disabled:opacity-50 text-black text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow shrink-0 cursor-pointer"
              >
                {isImportingSpotify ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Fetching Data...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Auto-Populate Artist & Releases</span>
                  </>
                )}
              </button>
            </div>

            {importSummary && (
              <div className="p-2.5 rounded-lg bg-[#1DB954]/20 border border-[#1DB954]/40 text-[#1ed760] text-xs flex items-center justify-between mt-2">
                <span>
                  ✅ Auto-filled profile for <strong>{importSummary.artistName}</strong> and added <strong>{importSummary.releasesImported} discography releases</strong> ({importSummary.tracksImported} tracks)!
                </span>
                <button type="button" onClick={() => setImportSummary(null)} className="text-zinc-400 hover:text-white text-xs ml-2">✕</button>
              </div>
            )}
            {importError && (
              <div className="p-2.5 rounded-lg bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs flex items-center justify-between mt-2">
                <span>⚠️ {importError}</span>
                <button type="button" onClick={() => setImportError(null)} className="text-zinc-400 hover:text-white text-xs ml-2">✕</button>
              </div>
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
                placeholder="e.g. allisonsaidthis"
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
                placeholder="allisonsaidthis"
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
                placeholder="Spoken Word / Christian Hip Hop"
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
                placeholder="Spoken Word Poet & Christian Rap Pioneer"
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
                className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:border-gold-400 focus:outline-none font-mono"
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
                className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:border-gold-400 focus:outline-none font-mono"
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

          {/* Spotify / Streaming Embed URL */}
          <div className="space-y-2 pt-2">
            <label className="block text-[11px] font-semibold text-slate-300 flex items-center justify-between">
              <span>Spotify / DSP Interactive Player Embed URL</span>
              <span className="text-[10px] text-zinc-400 font-normal">Renders live interactive streaming player on artist profile page</span>
            </label>
            <input
              type="text"
              value={formData.embedUrl || ""}
              onChange={(e) => setFormData({ ...formData, embedUrl: e.target.value })}
              placeholder="https://open.spotify.com/embed/artist/4tUqM99Y3aP3D6b7QfL19Y?utm_source=generator&theme=0"
              className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:border-gold-400 focus:outline-none font-mono"
            />
            {formData.embedUrl && (
              <div className="mt-2 p-3 rounded-xl bg-black/40 border border-white/10">
                <span className="text-[10px] font-mono text-gold-400 uppercase tracking-widest block mb-2 font-bold">
                  Interactive Spotify Player Live Preview:
                </span>
                <iframe
                  src={formData.embedUrl}
                  title="Artist Spotify Preview"
                  width="100%"
                  height="152"
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  className="rounded-xl border border-white/10 bg-black"
                />
              </div>
            )}
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
              placeholder="e.g. To ignite a generation with uncompromised faith and soulful sound..."
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
                className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:border-gold-400 focus:outline-none font-mono"
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
            <span className="text-[11px] font-display font-bold text-gold-400 uppercase tracking-wider block">
              DSP STREAMING & SOCIAL PROFILES
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <input
                type="text"
                value={formData.socials.spotify || ""}
                onChange={(e) => setFormData({ ...formData, socials: { ...formData.socials, spotify: e.target.value } })}
                placeholder="Spotify URL"
                className="px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white text-xs focus:border-gold-400 focus:outline-none font-mono"
              />
              <input
                type="text"
                value={formData.socials.appleMusic || ""}
                onChange={(e) => setFormData({ ...formData, socials: { ...formData.socials, appleMusic: e.target.value } })}
                placeholder="Apple Music URL"
                className="px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white text-xs focus:border-gold-400 focus:outline-none font-mono"
              />
              <input
                type="text"
                value={formData.socials.boomplay || ""}
                onChange={(e) => setFormData({ ...formData, socials: { ...formData.socials, boomplay: e.target.value } })}
                placeholder="Boomplay URL"
                className="px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white text-xs focus:border-gold-400 focus:outline-none font-mono"
              />
              <input
                type="text"
                value={formData.socials.audiomack || ""}
                onChange={(e) => setFormData({ ...formData, socials: { ...formData.socials, audiomack: e.target.value } })}
                placeholder="Audiomack URL"
                className="px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white text-xs focus:border-gold-400 focus:outline-none font-mono"
              />
              <input
                type="text"
                value={formData.socials.youtube || ""}
                onChange={(e) => setFormData({ ...formData, socials: { ...formData.socials, youtube: e.target.value } })}
                placeholder="YouTube Channel URL"
                className="px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white text-xs focus:border-gold-400 focus:outline-none font-mono"
              />
              <input
                type="text"
                value={formData.socials.instagram || ""}
                onChange={(e) => setFormData({ ...formData, socials: { ...formData.socials, instagram: e.target.value } })}
                placeholder="Instagram Profile URL"
                className="px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white text-xs focus:border-gold-400 focus:outline-none font-mono"
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
            {artists.map((artist) => {
              const artistReleases = releases.filter((r) => r.artistId === artist.id || r.artistName.toLowerCase() === artist.name.toLowerCase());
              return (
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
                        {artist.genre} &bull; {artistReleases.length} {artistReleases.length === 1 ? "release" : "releases"}
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
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
