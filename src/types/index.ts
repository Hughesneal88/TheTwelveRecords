export type AdminRole = "super_admin" | "ar_manager" | "marketing_editor" | "artist_manager";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: AdminRole;
  assignedArtistId?: string;
  avatarUrl?: string;
  lastLogin?: string;
  createdAt: string;
}

export interface ArtistSocials {
  spotify?: string;
  appleMusic?: string;
  boomplay?: string;
  audiomack?: string;
  youtube?: string;
  instagram?: string;
  tiktok?: string;
  twitter?: string;
}

export interface Artist {
  id: string;
  slug: string;
  name: string;
  realName?: string;
  tagline: string;
  genre: string;
  origin: string;
  photoUrl: string;
  bannerUrl: string;
  bio: string;
  ministryVision?: string;
  featuredVideoUrl?: string;
  embedUrl?: string;
  isFeatured: boolean;
  socials: ArtistSocials;
  releaseIds: string[];
  bookingEmail?: string;
  pressKitUrl?: string;
}

export interface Track {
  id: string;
  title: string;
  duration: string;
  audioUrl?: string;
  synthTheme?: "afrogospel" | "worship" | "praise" | "ambient";
  featuredArtists?: string[];
  lyrics?: string;
}

export type ReleaseFormat = "Single" | "EP" | "Album";

export interface Release {
  id: string;
  catalogNumber: string;
  title: string;
  artistId: string;
  artistName: string;
  releaseDate: string;
  genre: string;
  format: ReleaseFormat;
  coverUrl: string;
  description: string;
  tracks: Track[];
  spotifyUrl?: string;
  appleMusicUrl?: string;
  boomplayUrl?: string;
  audiomackUrl?: string;
  youtubeUrl?: string;
  bandcampUrl?: string;
  embedUrl?: string;
  isFeatured: boolean;
}

export type DemoStatus = "New" | "Under Review" | "Shortlisted" | "Contacted" | "Archived";

export interface DemoSubmission {
  id: string;
  artistName: string;
  contactName: string;
  email: string;
  phone?: string;
  cityCountry: string;
  genre: string;
  streamingLink: string;
  spiritualCalling: string;
  bio: string;
  submittedAt: string;
  status: DemoStatus;
  internalNotes?: string;
}

export interface Subscriber {
  id: string;
  email: string;
  name?: string;
  source: string;
  subscribedAt: string;
}

export interface LabelInfo {
  name: string;
  tagline: string;
  city: string;
  country: string;
  address: string;
  contactEmail: string;
  bookingEmail: string;
  pressEmail: string;
  phone: string;
  heroHeadline: string;
  heroSubheadline: string;
  aboutStory: string[];
  aboutMission: string;
  demoPolicy: {
    guidelines: string[];
    responseTime: string;
    acceptedFormats: string[];
  };
  socials: {
    instagram: string;
    youtube: string;
    twitter: string;
    tiktok: string;
    spotify: string;
    boomplay: string;
    audiomack: string;
  };
}
