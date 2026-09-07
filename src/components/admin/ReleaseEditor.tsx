import React, { useState } from "react";
import { useContent } from "../../context/ContentContext";
import { Release, Track, ReleaseFormat } from "../../types";
import { Plus, Edit2, Trash2, Disc, Music, Check, ArrowLeft, Upload, Sparkles, Loader2, Play, Pause } from "lucide-react";
import { autoPopulateReleaseFromUrl } from "../../utils/spotifyImporter";
import { SupabaseService } from "../../utils/supabaseSync";

export const ReleaseEditor: React.FC = () => {
  const { releases, artists, addRelease, updateRelease, deleteRelease } = useContent();

  const [editingRelease, setEditingRelease] = useState<Release | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [savedFeedback, setSavedFeedback] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Spotify auto-population states
  const [spotifyInput, setSpotifyInput] = useState("");
  const [isImportingSpotify, setIsImportingSpotify] = useState(false);
  const [importFeedback, setImportFeedback] = useState<string | null>(null);
  const [importError, setImportError] = useState<string | null>(null);
  const [playingTrackId, setPlayingTrackId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Omit<Release, "id">>({
    catalogNumber: `TTR-00${releases.length + 1}`,
    title: "",
    artistId: artists[0]?.id || "",
    artistName: artists[0]?.name || "",
    releaseDate: new Date().toISOString().slice(0, 10),
    genre: "Afro-Gospel",
    format: "Single",
    coverUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80",
    description: "",
    embedUrl: "",
    tracks: [
      {
        id: `trk-${Date.now()}`,
        title: "",
        duration: "3:45",
        synthTheme: "afrogospel"
      }
    ],
    spotifyUrl: "https://open.spotify.com",
    appleMusicUrl: "",
    boomplayUrl: "https://boomplay.com",
    audiomackUrl: "https://audiomack.com",
    youtubeUrl: "",
    isFeatured: false
  });

  const handleStartEdit = (release: Release) => {
    setEditingRelease(release);
    setIsCreatingNew(false);
    setSpotifyInput(release.spotifyUrl || release.title);
    setImportFeedback(null);
    setImportError(null);
    setFormData({
      catalogNumber: release.catalogNumber,
      title: release.title,
      artistId: release.artistId,
      artistName: release.artistName,
      releaseDate: release.releaseDate,
      genre: release.genre,
      format: release.format,
      coverUrl: release.coverUrl,
      description: release.description,
      embedUrl: release.embedUrl || "",
      tracks: [...release.tracks],
      spotifyUrl: release.spotifyUrl || "",
      appleMusicUrl: release.appleMusicUrl || "",
      boomplayUrl: release.boomplayUrl || "",
      audiomackUrl: release.audiomackUrl || "",
      youtubeUrl: release.youtubeUrl || "",
      isFeatured: release.isFeatured
    });
  };

  const handleStartCreate = () => {
    setIsCreatingNew(true);
    setEditingRelease(null);
    setSpotifyInput("");
    setImportFeedback(null);
    setImportError(null);
    setFormData({
      catalogNumber: `TTR-00${releases.length + 1}`,
      title: "",
      artistId: artists[0]?.id || "",
      artistName: artists[0]?.name || "",
      releaseDate: new Date().toISOString().slice(0, 10),
      genre: "Afro-Gospel",
      format: "Single",
      coverUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80",
      description: "",
      embedUrl: "",
      tracks: [
        {
          id: `trk-${Date.now()}`,
          title: "New Track",
          duration: "3:45",
          synthTheme: "afrogospel"
        }
      ],
      spotifyUrl: "https://open.spotify.com",
      appleMusicUrl: "",
      boomplayUrl: "https://boomplay.com",
      audiomackUrl: "https://audiomack.com",
      youtubeUrl: "",
      isFeatured: false
    });
  };

  const handleArtistSelect = (artistId: string) => {
    const matched = artists.find((a) => a.id === artistId);
    setFormData({
      ...formData,
      artistId,
      artistName: matched ? matched.name : ""
    });
  };

  const handleAutoPopulate = async (url: string) => {
    if (!url.trim()) return;
    setIsImportingSpotify(true);
    setImportError(null);
    setImportFeedback(null);

    try {
      const populated = await autoPopulateReleaseFromUrl(
        url,
        formData.artistId,
        formData.artistName,
        formData.catalogNumber
      );

      if (!populated || !populated.title) {
        setImportError("Could not retrieve release info from the search or URL.");
        return;
      }

      setFormData((prev) => ({
        ...prev,
        title: populated.title || prev.title,
        artistName: populated.artistName || prev.artistName,
        coverUrl: populated.coverUrl || prev.coverUrl,
        releaseDate: populated.releaseDate || prev.releaseDate,
        genre: populated.genre || prev.genre,
        format: populated.format || prev.format,
        description: populated.description || prev.description,
        embedUrl: populated.embedUrl || prev.embedUrl,
        spotifyUrl: populated.spotifyUrl || prev.spotifyUrl,
        appleMusicUrl: populated.appleMusicUrl || prev.appleMusicUrl,
        tracks: populated.tracks && populated.tracks.length > 0 ? populated.tracks : prev.tracks
      }));

      setImportFeedback(`Loaded "${populated.title}" with ${populated.tracks?.length || 1} tracks & high-res artwork!`);
    } catch (err: any) {
      setImportError(err?.message || "Failed to auto-populate release.");
    } finally {
      setIsImportingSpotify(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);

    try {
      const publicUrl = await SupabaseService.uploadMediaFile(file, "releases");
      if (publicUrl) {
        setFormData((prev) => ({ ...prev, coverUrl: publicUrl }));
      } else {
        const reader = new FileReader();
        reader.onload = () => {
          if (typeof reader.result === "string") {
            setFormData((prev) => ({ ...prev, coverUrl: reader.result as string }));
          }
        };
        reader.readAsDataURL(file);
      }
    } finally {
      setIsUploading(false);
    }
  };

  const handleAddTrack = () => {
    setFormData({
      ...formData,
      tracks: [
        ...formData.tracks,
        {
          id: `trk-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          title: `Track ${formData.tracks.length + 1}`,
          duration: "3:30",
          synthTheme: "afrogospel"
        }
      ]
    });
  };

  const handleRemoveTrack = (index: number) => {
    setFormData({
      ...formData,
      tracks: formData.tracks.filter((_, i) => i !== index)
    });
  };

  const handleTrackChange = (index: number, field: keyof Track, val: string) => {
    const updated = [...formData.tracks];
    updated[index] = { ...updated[index], [field]: val };
    setFormData({ ...formData, tracks: updated });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (isCreatingNew) {
      addRelease(formData);
      setIsCreatingNew(false);
    } else if (editingRelease) {
      updateRelease(editingRelease.id, formData);
      setEditingRelease(null);
    }
    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-display font-bold text-white">
            DISCOGRAPHY & CATALOG MANAGEMENT
          </h3>
          <p className="text-xs text-slate-400">
            Manage singles, worship EPs, albums, catalog numbers, tracklists, and streaming URLs.
          </p>
        </div>

        {!editingRelease && !isCreatingNew && (
          <button
            onClick={handleStartCreate}
            className="px-4 py-2 rounded-full bg-gold-500 hover:bg-gold-400 text-black text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md self-start"
          >
            <Plus className="w-4 h-4" />
            <span>New Release</span>
          </button>
        )}
      </div>

      {savedFeedback && (
        <div className="p-3.5 rounded-xl bg-gold-500/15 border border-gold-500/40 text-gold-300 text-xs flex items-center gap-2">
          <Check className="w-4 h-4 text-gold-400" />
          <span>Release catalog updated and synchronized live!</span>
        </div>
      )}

      {/* Editor Form */}
      {(editingRelease || isCreatingNew) ? (
        <form onSubmit={handleSave} className="p-6 rounded-2xl bg-black/40 border border-gold-500/20 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h4 className="font-display font-bold text-white text-base flex items-center gap-2">
              <Disc className="w-4 h-4 text-gold-400" />
              <span>{isCreatingNew ? "Add New Catalog Release" : `Editing: ${formData.title}`}</span>
            </h4>
            <button
              type="button"
              onClick={() => {
                setEditingRelease(null);
                setIsCreatingNew(false);
              }}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Releases
            </button>
          </div>

          {/* Spotify / Apple Auto-Fill Banner */}
          <div className="p-4 rounded-xl bg-[#1DB954]/10 border border-[#1DB954]/30 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#1ed760] uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Auto-Fill Metadata & Tracklist from Spotify / Apple Link</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={spotifyInput}
                onChange={(e) => setSpotifyInput(e.target.value)}
                placeholder="Paste Spotify album/track link or song title (e.g. 'Sticky Notes allisonsaidthis')..."
                className="flex-1 px-3.5 py-2 rounded-xl bg-black/70 border border-white/20 text-xs text-white placeholder:text-zinc-500 focus:border-[#1DB954] focus:outline-none font-mono"
              />
              <button
                type="button"
                disabled={isImportingSpotify || !spotifyInput.trim()}
                onClick={() => handleAutoPopulate(spotifyInput)}
                className="px-4 py-2 rounded-xl bg-[#1DB954] hover:bg-[#1ed760] disabled:opacity-50 text-black text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow shrink-0 cursor-pointer"
              >
                {isImportingSpotify ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Auto-Filling...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Auto-Fill Release & Tracks</span>
                  </>
                )}
              </button>
            </div>

            {importFeedback && (
              <div className="p-2.5 rounded-lg bg-[#1DB954]/20 border border-[#1DB954]/40 text-[#1ed760] text-xs flex items-center justify-between mt-2">
                <span>✅ {importFeedback}</span>
                <button type="button" onClick={() => setImportFeedback(null)} className="text-zinc-400 hover:text-white text-xs ml-2">✕</button>
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
                Catalog Code *
              </label>
              <input
                type="text"
                required
                value={formData.catalogNumber}
                onChange={(e) => setFormData({ ...formData, catalogNumber: e.target.value })}
                placeholder="TTR-006"
                className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:border-gold-400 focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                Release Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Sticky Notes"
                className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:border-gold-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                Artist *
              </label>
              <select
                value={formData.artistId}
                onChange={(e) => handleArtistSelect(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:border-gold-400 focus:outline-none"
              >
                {artists.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                Format *
              </label>
              <select
                value={formData.format}
                onChange={(e) => setFormData({ ...formData, format: e.target.value as ReleaseFormat })}
                className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:border-gold-400 focus:outline-none"
              >
                <option value="Single">Single</option>
                <option value="EP">EP</option>
                <option value="Album">Album</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                Release Date *
              </label>
              <input
                type="date"
                required
                value={formData.releaseDate}
                onChange={(e) => setFormData({ ...formData, releaseDate: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:border-gold-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                Genre *
              </label>
              <input
                type="text"
                required
                value={formData.genre}
                onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                placeholder="Christian Hip Hop / Gospel"
                className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:border-gold-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Artwork Cover & Upload */}
          <div className="space-y-2">
            <label className="block text-[11px] font-semibold text-slate-300">
              Cover Artwork URL (600x600 High-Res or Upload) *
            </label>
            <input
              type="text"
              required
              value={formData.coverUrl}
              onChange={(e) => setFormData({ ...formData, coverUrl: e.target.value })}
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
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
              {formData.coverUrl && (
                <img
                  src={formData.coverUrl}
                  alt="Cover Preview"
                  className="w-12 h-12 rounded-lg object-cover border border-gold-500/30"
                />
              )}
            </div>
          </div>

          {/* Embedded Streaming Player URL */}
          <div className="space-y-2 pt-1">
            <label className="block text-[11px] font-semibold text-slate-300 flex items-center justify-between">
              <span>Interactive Spotify / DSP Player Embed URL</span>
              <span className="text-[10px] text-zinc-400 font-normal">Plays directly in release modal window</span>
            </label>
            <input
              type="text"
              value={formData.embedUrl || ""}
              onChange={(e) => setFormData({ ...formData, embedUrl: e.target.value })}
              placeholder="https://open.spotify.com/embed/album/... or /embed/track/..."
              className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:border-gold-400 focus:outline-none font-mono"
            />
            {formData.embedUrl && (
              <div className="mt-2 p-3 rounded-xl bg-black/40 border border-white/10">
                <span className="text-[10px] font-mono text-gold-400 uppercase tracking-widest block mb-2 font-bold">
                  Release Live Embed Preview:
                </span>
                <iframe
                  src={formData.embedUrl}
                  title="Release Spotify Preview"
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
              Release Description / Liner Notes
            </label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:border-gold-400 focus:outline-none resize-none leading-relaxed"
            ></textarea>
          </div>

          {/* DSP Streaming Links */}
          <div className="space-y-3 pt-2">
            <span className="text-[11px] font-display font-bold text-gold-400 uppercase tracking-wider block">
              DSP STREAMING PURCHASE / LISTEN LINKS
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <input
                type="text"
                value={formData.spotifyUrl || ""}
                onChange={(e) => setFormData({ ...formData, spotifyUrl: e.target.value })}
                placeholder="Spotify Release URL"
                className="px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white text-xs focus:border-gold-400 focus:outline-none font-mono"
              />
              <input
                type="text"
                value={formData.appleMusicUrl || ""}
                onChange={(e) => setFormData({ ...formData, appleMusicUrl: e.target.value })}
                placeholder="Apple Music Release URL"
                className="px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white text-xs focus:border-gold-400 focus:outline-none font-mono"
              />
              <input
                type="text"
                value={formData.audiomackUrl || ""}
                onChange={(e) => setFormData({ ...formData, audiomackUrl: e.target.value })}
                placeholder="Audiomack URL"
                className="px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white text-xs focus:border-gold-400 focus:outline-none font-mono"
              />
              <input
                type="text"
                value={formData.boomplayUrl || ""}
                onChange={(e) => setFormData({ ...formData, boomplayUrl: e.target.value })}
                placeholder="Boomplay URL"
                className="px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white text-xs focus:border-gold-400 focus:outline-none font-mono"
              />
              <input
                type="text"
                value={formData.youtubeUrl || ""}
                onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
                placeholder="YouTube Music / Video URL"
                className="px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white text-xs focus:border-gold-400 focus:outline-none font-mono"
              />
            </div>
          </div>

          {/* Tracklist Management */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-display font-bold text-gold-400 uppercase tracking-wider flex items-center gap-1.5">
                <Music className="w-3.5 h-3.5" /> TRACKLIST & AUDIO SAMPLES ({formData.tracks.length})
              </span>
              <button
                type="button"
                onClick={handleAddTrack}
                className="px-3 py-1 bg-white/10 hover:bg-gold-500 hover:text-black rounded-lg text-xs font-semibold text-slate-200 transition-colors"
              >
                + Add Track
              </button>
            </div>

            <div className="space-y-3">
              {formData.tracks.map((track, idx) => (
                <div key={track.id || idx} className="p-3.5 rounded-xl bg-white/5 border border-white/10 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                  <div className="sm:col-span-4">
                    <input
                      type="text"
                      required
                      value={track.title}
                      onChange={(e) => handleTrackChange(idx, "title", e.target.value)}
                      placeholder="Track Title"
                      className="w-full px-3 py-1.5 rounded-lg bg-black/60 border border-white/15 text-xs text-white"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <input
                      type="text"
                      value={track.duration}
                      onChange={(e) => handleTrackChange(idx, "duration", e.target.value)}
                      placeholder="Duration (e.g. 3:45)"
                      className="w-full px-3 py-1.5 rounded-lg bg-black/60 border border-white/15 text-xs text-white font-mono"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <select
                      value={track.synthTheme || "afrogospel"}
                      onChange={(e) => handleTrackChange(idx, "synthTheme", e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-black/60 border border-white/15 text-xs text-white"
                    >
                      <option value="afrogospel">Afro-Gospel Preset</option>
                      <option value="worship">Acoustic Worship Preset</option>
                      <option value="praise">High Praise Preset</option>
                      <option value="ambient">Ambient Sanctuary Preset</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2 flex items-center gap-1.5">
                    <input
                      type="text"
                      value={track.audioUrl || ""}
                      onChange={(e) => handleTrackChange(idx, "audioUrl", e.target.value)}
                      placeholder="Preview Audio URL"
                      className="w-full px-3 py-1.5 rounded-lg bg-black/60 border border-white/15 text-xs text-white font-mono"
                    />
                    {track.audioUrl && (
                      <button
                        type="button"
                        onClick={() => {
                          if (playingTrackId === track.id) {
                            setPlayingTrackId(null);
                          } else {
                            setPlayingTrackId(track.id);
                            const audio = new Audio(track.audioUrl);
                            audio.play().catch(() => {});
                          }
                        }}
                        className="p-1.5 rounded-lg bg-gold-500/20 text-gold-400 hover:bg-gold-500 hover:text-black shrink-0"
                        title="Preview audio"
                      >
                        {playingTrackId === track.id ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                      </button>
                    )}
                  </div>

                  <div className="sm:col-span-1 text-right">
                    {formData.tracks.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveTrack(idx)}
                        className="p-1.5 text-slate-400 hover:text-rose-400"
                        title="Remove track"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={() => {
                setEditingRelease(null);
                setIsCreatingNew(false);
              }}
              className="px-5 py-2.5 rounded-full bg-white/10 text-slate-300 text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-7 py-2.5 rounded-full bg-gradient-to-r from-gold-500 to-amber-600 hover:from-gold-400 hover:to-amber-500 text-black font-bold text-xs uppercase tracking-wider shadow-lg"
            >
              Save Release
            </button>
          </div>
        </form>
      ) : (
        /* Release Grid List */
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {releases.map((release) => (
            <div
              key={release.id}
              className="p-4 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-between gap-4 hover:border-gold-500/30 transition-all"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <img
                  src={release.coverUrl}
                  alt={release.title}
                  className="w-14 h-14 rounded-xl object-cover border border-gold-500/30 flex-shrink-0"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold text-gold-400">
                      {release.catalogNumber}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-slate-400">
                      {release.format}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-white truncate">
                    {release.title}
                  </h4>
                  <span className="text-xs text-slate-400 truncate block">
                    {release.artistName} &bull; {release.tracks.length} {release.tracks.length === 1 ? "track" : "tracks"}
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-2 flex-shrink-0">
                <button
                  onClick={() => handleStartEdit(release)}
                  className="p-2 rounded-lg bg-gold-500/15 hover:bg-gold-500 text-gold-300 hover:text-black transition-colors"
                  title="Edit Release"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Delete release ${release.title}?`)) {
                      deleteRelease(release.id);
                    }
                  }}
                  className="p-2 rounded-lg bg-white/5 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-colors"
                  title="Delete Release"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
