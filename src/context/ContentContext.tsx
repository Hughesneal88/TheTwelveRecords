import React, { createContext, useContext, useState, useEffect } from "react";
import { LabelInfo, Artist, Release, DemoSubmission, Subscriber, DemoStatus } from "../types";
import {
  getStoredLabelInfo,
  saveLabelInfo,
  getStoredArtists,
  saveArtists,
  getStoredReleases,
  saveReleases,
  getStoredDemos,
  saveDemos,
  getStoredSubscribers,
  saveSubscribers,
  exportAllDataJSON,
  exportSubscribersCSV,
  resetAllToFactoryDefaults
} from "../data/storage";
import { SupabaseService } from "../utils/supabaseSync";

interface ContentContextType {
  labelInfo: LabelInfo;
  updateLabelInfo: (info: Partial<LabelInfo>) => void;

  artists: Artist[];
  addArtist: (artist: Omit<Artist, "id">) => void;
  updateArtist: (id: string, updates: Partial<Artist>) => void;
  deleteArtist: (id: string) => void;
  getArtistBySlug: (slug: string) => Artist | undefined;

  releases: Release[];
  addRelease: (release: Omit<Release, "id">) => void;
  updateRelease: (id: string, updates: Partial<Release>) => void;
  deleteRelease: (id: string) => void;
  getReleasesByArtistId: (artistId: string) => Release[];

  demos: DemoSubmission[];
  submitDemo: (demo: Omit<DemoSubmission, "id" | "submittedAt" | "status">) => void;
  updateDemoStatus: (id: string, status: DemoStatus, notes?: string) => void;
  deleteDemo: (id: string) => void;

  subscribers: Subscriber[];
  addSubscriber: (email: string, name?: string, source?: string) => boolean;

  // Modals & Navigation states
  currentView: "home" | "artist-page";
  activeArtistSlug: string | null;
  navigateToHome: () => void;
  navigateToArtist: (slug: string) => void;

  selectedArtistModal: Artist | null;
  setSelectedArtistModal: (artist: Artist | null) => void;

  selectedReleaseModal: Release | null;
  setSelectedReleaseModal: (release: Release | null) => void;

  isAdminModalOpen: boolean;
  setIsAdminModalOpen: (open: boolean) => void;

  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (open: boolean) => void;

  isNewsletterModalOpen: boolean;
  setIsNewsletterModalOpen: (open: boolean) => void;

  isDemoModalOpen: boolean;
  setIsDemoModalOpen: (open: boolean) => void;

  exportBackup: () => void;
  exportCSV: () => void;
  factoryReset: () => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [labelInfo, setLabelInfoState] = useState<LabelInfo>(getStoredLabelInfo);
  const [artists, setArtistsState] = useState<Artist[]>(getStoredArtists);
  const [releases, setReleasesState] = useState<Release[]>(getStoredReleases);
  const [demos, setDemosState] = useState<DemoSubmission[]>(getStoredDemos);
  const [subscribers, setSubscribersState] = useState<Subscriber[]>(getStoredSubscribers);

  // View state & deep routing
  const [currentView, setCurrentView] = useState<"home" | "artist-page">("home");
  const [activeArtistSlug, setActiveArtistSlug] = useState<string | null>(null);

  // Modals
  const [selectedArtistModal, setSelectedArtistModal] = useState<Artist | null>(null);
  const [selectedReleaseModal, setSelectedReleaseModal] = useState<Release | null>(null);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isNewsletterModalOpen, setIsNewsletterModalOpen] = useState<boolean>(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState<boolean>(false);

  // Hydrate from Supabase on mount
  useEffect(() => {
    const fetchFromSupabase = async () => {
      try {
        const [cloudInfo, cloudArtists, cloudReleases, cloudDemos, cloudSubs] = await Promise.all([
          SupabaseService.getLabelInfo(),
          SupabaseService.getArtists(),
          SupabaseService.getReleases(),
          SupabaseService.getDemos(),
          SupabaseService.getSubscribers()
        ]);

        if (cloudInfo) setLabelInfoState(cloudInfo);
        if (cloudArtists && cloudArtists.length > 0) setArtistsState(cloudArtists);
        if (cloudReleases && cloudReleases.length > 0) setReleasesState(cloudReleases);
        if (cloudDemos && cloudDemos.length > 0) setDemosState(cloudDemos);
        if (cloudSubs && cloudSubs.length > 0) setSubscribersState(cloudSubs);
      } catch (err) {
        console.warn("Using local cache, cloud sync error:", err);
      }
    };

    fetchFromSupabase();
  }, []);

  // Handle URL hash / path routing on load
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path.startsWith("/artist/")) {
        const slug = path.replace("/artist/", "").replace("/", "");
        if (slug) {
          setActiveArtistSlug(slug);
          setCurrentView("artist-page");
          return;
        }
      }
      if (window.location.pathname === "/admin" || window.location.hash === "#admin") {
        setIsAdminModalOpen(true);
      }
      setCurrentView("home");
      setActiveArtistSlug(null);
    };

    handlePopState();
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Sync to localStorage
  useEffect(() => {
    saveLabelInfo(labelInfo);
  }, [labelInfo]);

  useEffect(() => {
    saveArtists(artists);
  }, [artists]);

  useEffect(() => {
    saveReleases(releases);
  }, [releases]);

  useEffect(() => {
    saveDemos(demos);
  }, [demos]);

  useEffect(() => {
    saveSubscribers(subscribers);
  }, [subscribers]);

  const updateLabelInfo = (info: Partial<LabelInfo>) => {
    const updated = { ...labelInfo, ...info };
    setLabelInfoState(updated);
    SupabaseService.saveLabelInfo(updated);
  };

  const addArtist = (artistData: Omit<Artist, "id">) => {
    const newArtist: Artist = {
      ...artistData,
      id: `artist-${Date.now()}`
    };
    setArtistsState((prev) => [newArtist, ...prev]);
    SupabaseService.saveArtist(newArtist);
  };

  const updateArtist = (id: string, updates: Partial<Artist>) => {
    setArtistsState((prev) =>
      prev.map((a) => {
        if (a.id === id) {
          const updated = { ...a, ...updates };
          SupabaseService.saveArtist(updated);
          return updated;
        }
        return a;
      })
    );
    if (selectedArtistModal && selectedArtistModal.id === id) {
      setSelectedArtistModal((prev) => (prev ? { ...prev, ...updates } : null));
    }
  };

  const deleteArtist = (id: string) => {
    setArtistsState((prev) => prev.filter((a) => a.id !== id));
    SupabaseService.deleteArtist(id);
    if (selectedArtistModal && selectedArtistModal.id === id) {
      setSelectedArtistModal(null);
    }
  };

  const getArtistBySlug = (slug: string): Artist | undefined => {
    return artists.find((a) => a.slug.toLowerCase() === slug.toLowerCase());
  };

  const addRelease = (releaseData: Omit<Release, "id">) => {
    const newRelease: Release = {
      ...releaseData,
      id: `rel-${Date.now()}`
    };
    setReleasesState((prev) => [newRelease, ...prev]);
    SupabaseService.saveRelease(newRelease);
  };

  const updateRelease = (id: string, updates: Partial<Release>) => {
    setReleasesState((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          const updated = { ...r, ...updates };
          SupabaseService.saveRelease(updated);
          return updated;
        }
        return r;
      })
    );
    if (selectedReleaseModal && selectedReleaseModal.id === id) {
      setSelectedReleaseModal((prev) => (prev ? { ...prev, ...updates } : null));
    }
  };

  const deleteRelease = (id: string) => {
    setReleasesState((prev) => prev.filter((r) => r.id !== id));
    SupabaseService.deleteRelease(id);
    if (selectedReleaseModal && selectedReleaseModal.id === id) {
      setSelectedReleaseModal(null);
    }
  };

  const getReleasesByArtistId = (artistId: string): Release[] => {
    return releases.filter((r) => r.artistId === artistId);
  };

  const submitDemo = (demoData: Omit<DemoSubmission, "id" | "submittedAt" | "status">) => {
    const newDemo: DemoSubmission = {
      ...demoData,
      id: `demo-${Date.now()}`,
      submittedAt: new Date().toISOString(),
      status: "New"
    };
    setDemosState((prev) => [newDemo, ...prev]);
    SupabaseService.insertDemo(newDemo);
  };

  const updateDemoStatus = (id: string, status: DemoStatus, notes?: string) => {
    setDemosState((prev) =>
      prev.map((d) => {
        if (d.id === id) {
          const updated = { ...d, status, internalNotes: notes !== undefined ? notes : d.internalNotes };
          SupabaseService.updateDemo(updated);
          return updated;
        }
        return d;
      })
    );
  };

  const deleteDemo = (id: string) => {
    setDemosState((prev) => prev.filter((d) => d.id !== id));
    SupabaseService.deleteDemo(id);
  };

  const addSubscriber = (email: string, name?: string, source: string = "Website"): boolean => {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes("@")) return false;
    const exists = subscribers.some((s) => s.email.toLowerCase() === cleanEmail);
    if (!exists) {
      const newSub: Subscriber = {
        id: `sub-${Date.now()}`,
        email: cleanEmail,
        name: name?.trim(),
        source,
        subscribedAt: new Date().toISOString()
      };
      setSubscribersState((prev) => [newSub, ...prev]);
      SupabaseService.insertSubscriber(newSub);
    }
    return true;
  };

  const navigateToHome = () => {
    setCurrentView("home");
    setActiveArtistSlug(null);
    window.history.pushState({}, "", "/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigateToArtist = (slug: string) => {
    setActiveArtistSlug(slug);
    setCurrentView("artist-page");
    window.history.pushState({}, "", `/artist/${slug}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <ContentContext.Provider
      value={{
        labelInfo,
        updateLabelInfo,
        artists,
        addArtist,
        updateArtist,
        deleteArtist,
        getArtistBySlug,
        releases,
        addRelease,
        updateRelease,
        deleteRelease,
        getReleasesByArtistId,
        demos,
        submitDemo,
        updateDemoStatus,
        deleteDemo,
        subscribers,
        addSubscriber,
        currentView,
        activeArtistSlug,
        navigateToHome,
        navigateToArtist,
        selectedArtistModal,
        setSelectedArtistModal,
        selectedReleaseModal,
        setSelectedReleaseModal,
        isAdminModalOpen,
        setIsAdminModalOpen,
        isLoginModalOpen,
        setIsLoginModalOpen,
        isNewsletterModalOpen,
        setIsNewsletterModalOpen,
        isDemoModalOpen,
        setIsDemoModalOpen,
        exportBackup: exportAllDataJSON,
        exportCSV: () => exportSubscribersCSV(subscribers),
        factoryReset: resetAllToFactoryDefaults
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error("useContent must be used within a ContentProvider");
  }
  return context;
};
