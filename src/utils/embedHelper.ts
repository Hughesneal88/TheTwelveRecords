/**
 * Helper to resolve direct Spotify / Audiomack / Apple Music iframe embed URLs
 */
export function getSpotifyEmbedUrl(url?: string): string | null {
  if (!url) return null;
  
  // Format: https://open.spotify.com/artist/4tUqM99Y3aP3D6b7QfL19Y -> https://open.spotify.com/embed/artist/4tUqM99Y3aP3D6b7QfL19Y?utm_source=generator&theme=0
  const spotifyRegex = /open\.spotify\.com\/(track|album|artist|playlist)\/([a-zA-Z0-9]+)/;
  const match = url.match(spotifyRegex);
  if (match) {
    const [, type, id] = match;
    return `https://open.spotify.com/embed/${type}/${id}?utm_source=generator&theme=0`;
  }
  return null;
}

export function getAudiomackEmbedUrl(url?: string): string | null {
  if (!url) return null;
  
  // Format: https://audiomack.com/allisonsaidthis/album/sticky-notes -> https://audiomack.com/embed/allisonsaidthis/album/sticky-notes?background=1
  // Format: https://audiomack.com/allisonsaidthis/song/taste -> https://audiomack.com/embed/allisonsaidthis/song/taste?background=1
  if (url.includes("audiomack.com/embed/")) {
    return url;
  }
  if (url.includes("audiomack.com/")) {
    const cleanPath = url.replace("https://audiomack.com/", "").replace("http://audiomack.com/", "");
    return `https://audiomack.com/embed/${cleanPath}?background=1`;
  }
  return null;
}

export function getPrimaryEmbedUrl(item: {
  embedUrl?: string;
  spotifyUrl?: string;
  audiomackUrl?: string;
}): string | null {
  if (item.embedUrl) return item.embedUrl;
  const spotify = getSpotifyEmbedUrl(item.spotifyUrl);
  if (spotify) return spotify;
  const audiomack = getAudiomackEmbedUrl(item.audiomackUrl);
  if (audiomack) return audiomack;
  return null;
}
