import { Artist, Release, Track, ReleaseFormat } from "../types";
import { getSpotifyEmbedUrl, getPrimaryEmbedUrl } from "./embedHelper";

export interface AutoPopulatedArtistResult {
  artistData: Partial<Artist>;
  releases: Omit<Release, "id">[];
  importedTrackCount: number;
}

/**
 * Parses artist / album / track info from a Spotify URL or artist search term
 * and automatically populates artist profile & full discography releases.
 */
export async function autoPopulateFromSpotifyUrl(
  inputUrl: string,
  existingArtistCount: number = 0,
  existingReleaseCount: number = 0
): Promise<AutoPopulatedArtistResult> {
  const cleanInput = inputUrl.trim();
  
  // Extract Spotify ID if it is a Spotify URL
  let spotifyArtistId = "";
  let spotifyEmbed = "";
  let queryTerm = cleanInput;
  
  const spotifyArtistRegex = /open\.spotify\.com\/artist\/([a-zA-Z0-9]+)/;
  const match = cleanInput.match(spotifyArtistRegex);
  
  if (match) {
    spotifyArtistId = match[1];
    spotifyEmbed = `https://open.spotify.com/embed/artist/${spotifyArtistId}?utm_source=generator&theme=0`;
    
    // Map known IDs for 100% precision
    if (spotifyArtistId === "4tUqM99Y3aP3D6b7QfL19Y") {
      queryTerm = "allisonsaidthis";
    } else if (spotifyArtistId === "2EyAC0DDvlmRKKO2DgijlG" || spotifyArtistId === "5gR5ZtQ45lqXWlJ4a4kY5Z") {
      queryTerm = "Kofi Raj";
      spotifyArtistId = "2EyAC0DDvlmRKKO2DgijlG";
      spotifyEmbed = `https://open.spotify.com/embed/artist/2EyAC0DDvlmRKKO2DgijlG?utm_source=generator&theme=0`;
    }
  } else {
    // If user passed a full URL that's not Spotify, extract name or use as search term
    queryTerm = cleanInput.replace(/https?:\/\/(www\.)?(open\.)?(spotify\.com|audiomack\.com)\/(artist\/)?/i, "").replace(/\/$/, "");
  }

  // Fallback / Defaults
  let artistName = queryTerm.replace(/-/g, " ");
  let genre = "Christian Hip Hop / Afro-Gospel";
  let photoUrl = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80";
  let bannerUrl = "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1600&q=80";
  let bio = `${artistName} is an acclaimed recording artist releasing impactful music under The Twelve Records.`;
  let tagline = "Pioneering Faith & Sound from Accra to the Nations";
  let appleMusicUrl = "";
  let audiomackUrl = "";
  let releases: Omit<Release, "id">[] = [];

  try {
    // 1. Search iTunes / Apple Music open directory for the artist and collections
    const searchUrl = `https://itunes.apple.com/search?term=${encodeURIComponent(queryTerm)}&entity=musicArtist&limit=5`;
    const searchRes = await fetch(searchUrl);
    const searchData = await searchRes.json();

    if (searchData.resultCount > 0) {
      const itunesArtist = searchData.results[0];
      artistName = itunesArtist.artistName || artistName;
      appleMusicUrl = itunesArtist.artistLinkUrl || "";
      if (itunesArtist.primaryGenreName) {
        genre = `${itunesArtist.primaryGenreName} / Christian`;
      }

      // 2. Fetch all collections / albums for this artist
      const lookupUrl = `https://itunes.apple.com/lookup?id=${itunesArtist.artistId}&entity=album&limit=25`;
      const lookupRes = await fetch(lookupUrl);
      const lookupData = await lookupRes.json();

      if (lookupData.resultCount > 1) {
        const collections = lookupData.results.filter((r: any) => r.wrapperType === "collection");
        
        let relIndex = existingReleaseCount + 1;
        for (const col of collections) {
          const highResCover = col.artworkUrl100
            ? col.artworkUrl100.replace("100x100bb.jpg", "600x600bb.jpg").replace("100x100bb.png", "600x600bb.png")
            : photoUrl;

          // Set artist photo/banner from the latest high-res artwork if available
          if (!photoUrl || photoUrl.includes("unsplash")) {
            photoUrl = highResCover;
            bannerUrl = highResCover;
          }

          const rawTitle = col.collectionName || "Untitled Release";
          const cleanTitle = rawTitle.replace(/\s*-\s*(Single|EP|Album)$/i, "");
          const isSingle = rawTitle.toLowerCase().includes("single") || col.trackCount === 1;
          const isEp = rawTitle.toLowerCase().includes("ep") || (col.trackCount > 1 && col.trackCount <= 6);
          const format: ReleaseFormat = isSingle ? "Single" : isEp ? "EP" : "Album";
          const releaseDate = col.releaseDate ? col.releaseDate.substring(0, 10) : new Date().toISOString().substring(0, 10);

          // 3. Fetch tracks for this specific album
          let tracks: Track[] = [];
          try {
            const trackLookupUrl = `https://itunes.apple.com/lookup?id=${col.collectionId}&entity=song`;
            const trackRes = await fetch(trackLookupUrl);
            const trackData = await trackRes.json();
            const rawTracks = trackData.results.filter((r: any) => r.wrapperType === "track");

            if (rawTracks.length > 0) {
              tracks = rawTracks.map((t: any, idx: number) => {
                const totalSec = Math.floor((t.trackTimeMillis || 210000) / 1000);
                const m = Math.floor(totalSec / 60);
                const s = totalSec % 60;
                return {
                  id: `trk-${col.collectionId}-${t.trackId || idx}`,
                  title: t.trackName || `Track ${idx + 1}`,
                  duration: `${m}:${s < 10 ? "0" : ""}${s}`,
                  audioUrl: t.previewUrl || undefined,
                  synthTheme: "afrogospel"
                };
              });
            }
          } catch {
            // fallback track if individual lookup fails
          }

          if (tracks.length === 0) {
            tracks = [
              {
                id: `trk-${col.collectionId}-1`,
                title: cleanTitle,
                duration: "3:30",
                synthTheme: "afrogospel"
              }
            ];
          }

          const catCode = `TTR-00${relIndex}`;
          relIndex++;

          releases.push({
            catalogNumber: catCode,
            title: cleanTitle,
            artistId: `artist-${existingArtistCount + 1}`,
            artistName: artistName,
            releaseDate: releaseDate,
            genre: col.primaryGenreName ? `${col.primaryGenreName} / Gospel` : genre,
            format: format,
            coverUrl: highResCover,
            embedUrl: spotifyEmbed || undefined,
            description: `${cleanTitle} by ${artistName}. Official release recorded and distributed by The Twelve Records.`,
            tracks: tracks,
            spotifyUrl: cleanInput.includes("spotify.com") ? cleanInput : undefined,
            appleMusicUrl: col.collectionViewUrl || appleMusicUrl,
            isFeatured: releases.length === 0
          });
        }
      }
    }
  } catch (err) {
    console.warn("Auto-populate error from open search, using direct format:", err);
  }

  // Custom curated metadata if allisonsaidthis or Kofi Raj
  const slug = artistName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  let spotifyDirectUrl = "";

  if (slug.includes("allison")) {
    tagline = "Spoken Word Poet & Christian Rap Pioneer";
    bio = "allisonsaidthis is a Ghanaian Christian hip hop artist, lyricist, and spoken word poet. Starting their poetic journey at the age of 8 and later honing their craft with the SCRIBES poetry movement in university, allisonsaidthis blends raw theological contemplation, intricate cadences, and soulful hip-hop rhythms. With notable projects including 'Sticky Notes', 'Taste', and 'THE QUIET BETWEEN US', their music is defined by uncompromised faith, honest vulnerability, and atmospheric storytelling.";
    audiomackUrl = "https://audiomack.com/allisonsaidthis";
    spotifyDirectUrl = "https://open.spotify.com/artist/4tUqM99Y3aP3D6b7QfL19Y";
    spotifyEmbed = "https://open.spotify.com/embed/artist/4tUqM99Y3aP3D6b7QfL19Y?utm_source=generator&theme=0";
  } else if (slug.includes("kofi") || slug.includes("raj")) {
    tagline = "Ghanaian Afro-Gospel Lyricist & High-Energy Praise Minister";
    bio = "Kofi Raj is a dynamic Ghanaian gospel rapper, lyricist, and songwriter based in Accra. Renowned for his razor-sharp delivery and passionate gospel testimony, Kofi Raj frequently collaborates across the Ghanaian Christian music vanguard—including landmark joint works with Kobby Flow, Kwame Jnr, and Phil Angs on anthems like 'Fire In Me', 'Barabbas Was Me', and his solo breakthrough 'Alert'. Blending contemporary Ghanaian drill and Afrobeat rhythms with unwavering kingdom messages, Kofi Raj is empowering a new generation to praise with bold conviction.";
    audiomackUrl = "https://audiomack.com/kofiraj";
    spotifyDirectUrl = "https://open.spotify.com/artist/2EyAC0DDvlmRKKO2DgijlG";
    spotifyEmbed = "https://open.spotify.com/embed/artist/2EyAC0DDvlmRKKO2DgijlG?utm_source=generator&theme=0";
  } else if (spotifyArtistId) {
    spotifyDirectUrl = `https://open.spotify.com/artist/${spotifyArtistId}`;
  } else if (cleanInput.includes("open.spotify.com/artist/")) {
    spotifyDirectUrl = cleanInput.split("?")[0];
  } else {
    spotifyDirectUrl = `https://open.spotify.com/artist/${spotifyArtistId || slug}`;
  }

  const totalTracks = releases.reduce((sum, r) => sum + r.tracks.length, 0);

  return {
    artistData: {
      name: artistName,
      slug: slug,
      tagline: tagline,
      genre: genre,
      origin: "Accra, Ghana",
      photoUrl: photoUrl,
      bannerUrl: bannerUrl,
      bio: bio,
      embedUrl: spotifyEmbed || undefined,
      socials: {
        spotify: spotifyDirectUrl,
        appleMusic: appleMusicUrl || undefined,
        audiomack: audiomackUrl || undefined,
        boomplay: `https://www.boomplay.com/search/all?searchName=${encodeURIComponent(artistName)}`,
        youtube: `https://youtube.com/results?search_query=${encodeURIComponent(artistName + " music")}`
      }
    },
    releases: releases,
    importedTrackCount: totalTracks
  };
}

/**
 * Auto-populate single Release from Spotify / Apple Album or Track URL
 */
export async function autoPopulateReleaseFromUrl(
  inputUrl: string,
  artistId: string = "artist-1",
  artistName: string = "Artist",
  catalogNumber: string = "TTR-001"
): Promise<Partial<Release> | null> {
  const cleanInput = inputUrl.trim();
  
  try {
    const searchUrl = `https://itunes.apple.com/search?term=${encodeURIComponent(cleanInput)}&entity=album,song&limit=1`;
    const searchRes = await fetch(searchUrl);
    const searchData = await searchRes.json();

    if (searchData.resultCount > 0) {
      const item = searchData.results[0];
      const title = item.collectionName || item.trackName || "New Release";
      const coverUrl = item.artworkUrl100
        ? item.artworkUrl100.replace("100x100bb.jpg", "600x600bb.jpg").replace("100x100bb.png", "600x600bb.png")
        : "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80";
      
      const isSingle = (item.trackCount || 1) === 1 || title.toLowerCase().includes("single");
      const isEp = (item.trackCount || 1) <= 6 && !isSingle;
      const format: ReleaseFormat = isSingle ? "Single" : isEp ? "EP" : "Album";
      const releaseDate = item.releaseDate ? item.releaseDate.substring(0, 10) : new Date().toISOString().substring(0, 10);
      const spotifyEmbed = getSpotifyEmbedUrl(cleanInput) || undefined;

      return {
        catalogNumber,
        title: title.replace(/\s*-\s*(Single|EP|Album)$/i, ""),
        artistId,
        artistName: item.artistName || artistName,
        releaseDate,
        genre: item.primaryGenreName ? `${item.primaryGenreName} / Gospel` : "Afro-Gospel",
        format,
        coverUrl,
        embedUrl: spotifyEmbed,
        description: `Official release '${title}' by ${item.artistName || artistName}.`,
        spotifyUrl: cleanInput.includes("spotify.com") ? cleanInput : undefined,
        appleMusicUrl: item.collectionViewUrl || item.trackViewUrl || undefined,
        tracks: [
          {
            id: `trk-${Date.now()}-1`,
            title: item.trackName || title,
            duration: item.trackTimeMillis ? `${Math.floor(item.trackTimeMillis / 60000)}:${Math.floor((item.trackTimeMillis % 60000) / 1000).toString().padStart(2, "0")}` : "3:30",
            audioUrl: item.previewUrl || undefined,
            synthTheme: "afrogospel"
          }
        ]
      };
    }
  } catch (err) {
    console.warn("Release auto-populate error:", err);
  }

  return null;
}

/**
 * Imports full discography (Albums, EPs, Singles, Tracks) for a specific artist
 * given an artist ID, artist name, and optional Spotify artist link or search term.
 */
export async function importDiscographyForArtist(
  artistId: string,
  artistName: string,
  spotifyUrlOrQuery?: string,
  existingReleaseCount: number = 0
): Promise<{ releases: Omit<Release, "id">[]; importedTrackCount: number }> {
  const query = (spotifyUrlOrQuery && spotifyUrlOrQuery.trim()) ? spotifyUrlOrQuery : artistName;
  const result = await autoPopulateFromSpotifyUrl(
    query,
    0,
    existingReleaseCount
  );

  const mappedReleases = result.releases.map((r) => ({
    ...r,
    artistId: artistId || r.artistId,
    artistName: artistName || r.artistName
  }));

  return {
    releases: mappedReleases,
    importedTrackCount: result.importedTrackCount
  };
}
