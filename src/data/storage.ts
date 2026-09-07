import { LabelInfo, Artist, Release, DemoSubmission, Subscriber, AdminUser } from "../types";
import { initialLabelInfo, initialArtists, initialReleases, initialDemos, initialSubscribers, initialAdminUsers } from "./initialData";

const KEYS = {
  LABEL_INFO: "ttr_label_info_v2",
  ARTISTS: "ttr_artists_v2",
  RELEASES: "ttr_releases_v2",
  DEMOS: "ttr_demos_v2",
  SUBSCRIBERS: "ttr_subscribers_v2",
  ADMIN_USERS: "ttr_admin_users_v2",
  CURRENT_USER: "ttr_current_user_v2"
};

export const getStoredLabelInfo = (): LabelInfo => {
  try {
    const data = localStorage.getItem(KEYS.LABEL_INFO);
    return data ? JSON.parse(data) : initialLabelInfo;
  } catch {
    return initialLabelInfo;
  }
};

export const saveLabelInfo = (info: LabelInfo) => {
  localStorage.setItem(KEYS.LABEL_INFO, JSON.stringify(info));
};

export const getStoredArtists = (): Artist[] => {
  try {
    const data = localStorage.getItem(KEYS.ARTISTS);
    if (data) {
      const parsed: Artist[] = JSON.parse(data);
      return parsed.map((a) => {
        if (a.slug === "kofi-raj" || a.name.toLowerCase().includes("kofi")) {
          return {
            ...a,
            embedUrl: "https://open.spotify.com/embed/artist/2EyAC0DDvlmRKKO2DgijlG?utm_source=generator&theme=0",
            socials: {
              ...a.socials,
              spotify: "https://open.spotify.com/artist/2EyAC0DDvlmRKKO2DgijlG"
            }
          };
        }
        if (a.slug === "allisonsaidthis" || a.name.toLowerCase().includes("allison")) {
          return {
            ...a,
            embedUrl: "https://open.spotify.com/embed/artist/4tUqM99Y3aP3D6b7QfL19Y?utm_source=generator&theme=0",
            socials: {
              ...a.socials,
              spotify: "https://open.spotify.com/artist/4tUqM99Y3aP3D6b7QfL19Y"
            }
          };
        }
        return a;
      });
    }
    return initialArtists;
  } catch {
    return initialArtists;
  }
};

export const saveArtists = (artists: Artist[]) => {
  localStorage.setItem(KEYS.ARTISTS, JSON.stringify(artists));
};

export const getStoredReleases = (): Release[] => {
  try {
    const data = localStorage.getItem(KEYS.RELEASES);
    if (data) {
      const parsed: Release[] = JSON.parse(data);
      return parsed.map((r) => {
        if (r.artistName.toLowerCase().includes("kofi")) {
          return {
            ...r,
            spotifyUrl: r.spotifyUrl?.includes("spotify.com")
              ? r.spotifyUrl.replace("5gR5ZtQ45lqXWlJ4a4kY5Z", "2EyAC0DDvlmRKKO2DgijlG")
              : "https://open.spotify.com/artist/2EyAC0DDvlmRKKO2DgijlG",
            embedUrl: r.embedUrl?.includes("spotify.com")
              ? r.embedUrl.replace("5gR5ZtQ45lqXWlJ4a4kY5Z", "2EyAC0DDvlmRKKO2DgijlG")
              : r.embedUrl
          };
        }
        return r;
      });
    }
    return initialReleases;
  } catch {
    return initialReleases;
  }
};

export const saveReleases = (releases: Release[]) => {
  localStorage.setItem(KEYS.RELEASES, JSON.stringify(releases));
};

export const getStoredDemos = (): DemoSubmission[] => {
  try {
    const data = localStorage.getItem(KEYS.DEMOS);
    return data ? JSON.parse(data) : initialDemos;
  } catch {
    return initialDemos;
  }
};

export const saveDemos = (demos: DemoSubmission[]) => {
  localStorage.setItem(KEYS.DEMOS, JSON.stringify(demos));
};

export const getStoredSubscribers = (): Subscriber[] => {
  try {
    const data = localStorage.getItem(KEYS.SUBSCRIBERS);
    return data ? JSON.parse(data) : initialSubscribers;
  } catch {
    return initialSubscribers;
  }
};

export const saveSubscribers = (subs: Subscriber[]) => {
  localStorage.setItem(KEYS.SUBSCRIBERS, JSON.stringify(subs));
};

export const getStoredAdminUsers = (): AdminUser[] => {
  try {
    const data = localStorage.getItem(KEYS.ADMIN_USERS);
    return data ? JSON.parse(data) : initialAdminUsers;
  } catch {
    return initialAdminUsers;
  }
};

export const saveAdminUsers = (users: AdminUser[]) => {
  localStorage.setItem(KEYS.ADMIN_USERS, JSON.stringify(users));
};

export const getStoredCurrentUser = (): AdminUser | null => {
  try {
    const data = localStorage.getItem(KEYS.CURRENT_USER);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

export const saveCurrentUser = (user: AdminUser | null) => {
  if (user) {
    localStorage.setItem(KEYS.CURRENT_USER, JSON.stringify(user));
  } else {
    localStorage.removeItem(KEYS.CURRENT_USER);
  }
};

export const exportAllDataJSON = () => {
  const exportPayload = {
    version: "1.0.0",
    exportedAt: new Date().toISOString(),
    labelInfo: getStoredLabelInfo(),
    artists: getStoredArtists(),
    releases: getStoredReleases(),
    demos: getStoredDemos(),
    subscribers: getStoredSubscribers(),
    adminUsers: getStoredAdminUsers()
  };
  const blob = new Blob([JSON.stringify(exportPayload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `the-twelve-records-backup-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const exportSubscribersCSV = (subscribers: Subscriber[]) => {
  const headers = ["ID", "Email", "Name", "Source", "Subscribed At"];
  const rows = subscribers.map(s => [
    `"${s.id}"`,
    `"${s.email}"`,
    `"${s.name || ""}"`,
    `"${s.source}"`,
    `"${s.subscribedAt}"`
  ]);
  const csvContent = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `the-twelve-circle-subscribers-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const resetAllToFactoryDefaults = () => {
  localStorage.removeItem(KEYS.LABEL_INFO);
  localStorage.removeItem(KEYS.ARTISTS);
  localStorage.removeItem(KEYS.RELEASES);
  localStorage.removeItem(KEYS.DEMOS);
  localStorage.removeItem(KEYS.SUBSCRIBERS);
  localStorage.removeItem(KEYS.ADMIN_USERS);
  localStorage.removeItem(KEYS.CURRENT_USER);
  window.location.reload();
};
