import { supabase } from "./supabaseClient";
import { LabelInfo, Artist, Release, DemoSubmission, Subscriber, AdminUser } from "../types";

export const SupabaseService = {
  // Storage Upload
  async uploadMediaFile(file: File, folder: string = "uploads"): Promise<string | null> {
    try {
      const ext = file.name.split(".").pop();
      const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${ext}`;
      const { data, error } = await supabase.storage.from("media").upload(fileName, file, {
        cacheControl: "3600",
        upsert: true
      });
      if (error || !data) {
        console.warn("Storage upload error, falling back:", error);
        return null;
      }
      const { data: publicUrlData } = supabase.storage.from("media").getPublicUrl(fileName);
      return publicUrlData.publicUrl;
    } catch (err) {
      console.warn("Upload exception:", err);
      return null;
    }
  },

  // Label Info
  async getLabelInfo(): Promise<LabelInfo | null> {
    try {
      const { data, error } = await supabase.from("label_info").select("*").eq("id", "main").single();
      if (error || !data) return null;
      return {
        name: data.name,
        tagline: data.tagline || "",
        city: data.city || "Accra",
        country: data.country || "Ghana",
        address: data.address || "",
        contactEmail: data.contact_email || "",
        bookingEmail: data.booking_email || "",
        pressEmail: data.press_email || "",
        phone: data.phone || "",
        heroHeadline: data.hero_headline || "",
        heroSubheadline: data.hero_subheadline || "",
        aboutStory: data.about_story || [],
        aboutMission: data.about_mission || "",
        demoPolicy: data.demo_policy || { guidelines: [], responseTime: "", acceptedFormats: [] },
        socials: data.socials || {}
      };
    } catch {
      return null;
    }
  },

  async saveLabelInfo(info: LabelInfo) {
    try {
      await supabase.from("label_info").upsert({
        id: "main",
        name: info.name,
        tagline: info.tagline,
        city: info.city,
        country: info.country,
        address: info.address,
        contact_email: info.contactEmail,
        booking_email: info.bookingEmail,
        press_email: info.pressEmail,
        phone: info.phone,
        hero_headline: info.heroHeadline,
        hero_subheadline: info.heroSubheadline,
        about_story: info.aboutStory,
        about_mission: info.aboutMission,
        demo_policy: info.demoPolicy,
        socials: info.socials,
        updated_at: new Date().toISOString()
      });
    } catch (err) {
      console.warn("Supabase saveLabelInfo fallback to local:", err);
    }
  },

  // Artists
  async getArtists(): Promise<Artist[] | null> {
    try {
      const { data, error } = await supabase.from("artists").select("*").order("created_at", { ascending: true });
      if (error || !data) return null;
      return data.map((d) => ({
        id: d.id,
        slug: d.slug,
        name: d.name,
        realName: d.real_name,
        tagline: d.tagline || "",
        genre: d.genre || "",
        origin: d.origin || "",
        photoUrl: d.photo_url || "",
        bannerUrl: d.banner_url || "",
        bio: d.bio || "",
        ministryVision: d.ministry_vision,
        featuredVideoUrl: d.featured_video_url,
        isFeatured: d.is_featured || false,
        socials: d.socials || {},
        releaseIds: d.release_ids || [],
        bookingEmail: d.booking_email
      }));
    } catch {
      return null;
    }
  },

  async saveArtist(artist: Artist) {
    try {
      await supabase.from("artists").upsert({
        id: artist.id,
        slug: artist.slug,
        name: artist.name,
        real_name: artist.realName,
        tagline: artist.tagline,
        genre: artist.genre,
        origin: artist.origin,
        photo_url: artist.photoUrl,
        banner_url: artist.bannerUrl,
        bio: artist.bio,
        ministry_vision: artist.ministryVision,
        featured_video_url: artist.featuredVideoUrl,
        is_featured: artist.isFeatured,
        socials: artist.socials,
        release_ids: artist.releaseIds,
        booking_email: artist.bookingEmail,
        updated_at: new Date().toISOString()
      });
    } catch (err) {
      console.warn("Supabase saveArtist fallback:", err);
    }
  },

  async deleteArtist(id: string) {
    try {
      await supabase.from("artists").delete().eq("id", id);
    } catch (err) {
      console.warn("Supabase deleteArtist error:", err);
    }
  },

  // Releases
  async getReleases(): Promise<Release[] | null> {
    try {
      const { data, error } = await supabase.from("releases").select("*").order("created_at", { ascending: true });
      if (error || !data) return null;
      return data.map((d) => ({
        id: d.id,
        catalogNumber: d.catalog_number,
        title: d.title,
        artistId: d.artist_id || "",
        artistName: d.artist_name,
        releaseDate: d.release_date,
        genre: d.genre || "",
        format: d.format,
        coverUrl: d.cover_url || "",
        description: d.description || "",
        tracks: d.tracks || [],
        spotifyUrl: d.spotify_url,
        appleMusicUrl: d.apple_music_url,
        boomplayUrl: d.boomplay_url,
        audiomackUrl: d.audiomack_url,
        youtubeUrl: d.youtube_url,
        bandcampUrl: d.bandcamp_url,
        isFeatured: d.is_featured || false
      }));
    } catch {
      return null;
    }
  },

  async saveRelease(release: Release) {
    try {
      await supabase.from("releases").upsert({
        id: release.id,
        catalog_number: release.catalogNumber,
        title: release.title,
        artist_id: release.artistId,
        artist_name: release.artistName,
        release_date: release.releaseDate,
        genre: release.genre,
        format: release.format,
        cover_url: release.coverUrl,
        description: release.description,
        tracks: release.tracks,
        spotify_url: release.spotifyUrl,
        apple_music_url: release.appleMusicUrl,
        boomplay_url: release.boomplayUrl,
        audiomack_url: release.audiomackUrl,
        youtube_url: release.youtubeUrl,
        bandcamp_url: release.bandcampUrl,
        is_featured: release.isFeatured,
        updated_at: new Date().toISOString()
      });
    } catch (err) {
      console.warn("Supabase saveRelease fallback:", err);
    }
  },

  async deleteRelease(id: string) {
    try {
      await supabase.from("releases").delete().eq("id", id);
    } catch (err) {
      console.warn("Supabase deleteRelease error:", err);
    }
  },

  // Demos
  async getDemos(): Promise<DemoSubmission[] | null> {
    try {
      const { data, error } = await supabase.from("demo_submissions").select("*").order("submitted_at", { ascending: false });
      if (error || !data) return null;
      return data.map((d) => ({
        id: d.id,
        artistName: d.artist_name,
        contactName: d.contact_name,
        email: d.email,
        phone: d.phone,
        cityCountry: d.city_country,
        genre: d.genre,
        streamingLink: d.streaming_link,
        spiritualCalling: d.spiritual_calling,
        bio: d.bio,
        submittedAt: d.submitted_at,
        status: d.status,
        internalNotes: d.internal_notes
      }));
    } catch {
      return null;
    }
  },

  async insertDemo(demo: DemoSubmission) {
    try {
      await supabase.from("demo_submissions").insert({
        id: demo.id,
        artist_name: demo.artistName,
        contact_name: demo.contactName,
        email: demo.email,
        phone: demo.phone,
        city_country: demo.cityCountry,
        genre: demo.genre,
        streaming_link: demo.streamingLink,
        spiritual_calling: demo.spiritualCalling,
        bio: demo.bio,
        status: demo.status,
        internal_notes: demo.internalNotes,
        submitted_at: demo.submittedAt
      });
    } catch (err) {
      console.warn("Supabase insertDemo fallback:", err);
    }
  },

  async updateDemo(demo: DemoSubmission) {
    try {
      await supabase.from("demo_submissions").update({
        status: demo.status,
        internal_notes: demo.internalNotes
      }).eq("id", demo.id);
    } catch (err) {
      console.warn("Supabase updateDemo fallback:", err);
    }
  },

  async deleteDemo(id: string) {
    try {
      await supabase.from("demo_submissions").delete().eq("id", id);
    } catch (err) {
      console.warn("Supabase deleteDemo error:", err);
    }
  },

  // Subscribers
  async getSubscribers(): Promise<Subscriber[] | null> {
    try {
      const { data, error } = await supabase.from("subscribers").select("*").order("subscribed_at", { ascending: false });
      if (error || !data) return null;
      return data.map((d) => ({
        id: d.id,
        email: d.email,
        name: d.name,
        source: d.source,
        subscribedAt: d.subscribed_at
      }));
    } catch {
      return null;
    }
  },

  async insertSubscriber(sub: Subscriber) {
    try {
      await supabase.from("subscribers").upsert({
        id: sub.id,
        email: sub.email,
        name: sub.name,
        source: sub.source,
        subscribed_at: sub.subscribedAt
      });
    } catch (err) {
      console.warn("Supabase insertSubscriber fallback:", err);
    }
  },

  // Admin Users
  async getAdminUsers(): Promise<AdminUser[] | null> {
    try {
      const { data, error } = await supabase.from("admin_users").select("*").order("created_at", { ascending: true });
      if (error || !data) return null;
      return data.map((d) => ({
        id: d.id,
        name: d.name,
        email: d.email,
        passwordHash: d.password_hash,
        role: d.role,
        assignedArtistId: d.assigned_artist_id,
        avatarUrl: d.avatar_url,
        lastLogin: d.last_login,
        createdAt: d.created_at
      }));
    } catch {
      return null;
    }
  },

  async saveAdminUser(user: AdminUser) {
    try {
      await supabase.from("admin_users").upsert({
        id: user.id,
        name: user.name,
        email: user.email,
        password_hash: user.passwordHash,
        role: user.role,
        assigned_artist_id: user.assignedArtistId,
        avatar_url: user.avatarUrl,
        last_login: user.lastLogin,
        created_at: user.createdAt
      });
    } catch (err) {
      console.warn("Supabase saveAdminUser fallback:", err);
    }
  },

  async deleteAdminUser(id: string) {
    try {
      await supabase.from("admin_users").delete().eq("id", id);
    } catch (err) {
      console.warn("Supabase deleteAdminUser error:", err);
    }
  }
};
