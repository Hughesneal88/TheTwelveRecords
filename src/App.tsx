import React from "react";
import { AuthProvider } from "./context/AuthContext";
import { ContentProvider, useContent } from "./context/ContentContext";
import { AudioProvider } from "./context/AudioContext";
import { SEO } from "./components/SEO";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { ArtistsSection } from "./components/ArtistsSection";
import { ArtistDetailPage } from "./components/ArtistDetailPage";
import { ReleasesSection } from "./components/ReleasesSection";
import { ReleaseModal } from "./components/ReleaseModal";
import { AboutSection } from "./components/AboutSection";
import { StoreTeaser } from "./components/StoreTeaser";
import { DemosSection } from "./components/DemosSection";
import { Newsletter } from "./components/Newsletter";
import { Footer } from "./components/Footer";
import { AudioPlayer } from "./components/AudioPlayer";
import { AdminModal } from "./components/admin/AdminModal";
import { AdminLoginModal } from "./components/admin/AdminLoginModal";

const MainContent: React.FC = () => {
  const { currentView } = useContent();

  return (
    <div className="min-h-screen bg-[#08080a] text-slate-100 flex flex-col justify-between selection:bg-gold-500 selection:text-black">
      <SEO />
      <Navbar />

      <main className="flex-1">
        {currentView === "artist-page" ? (
          <ArtistDetailPage />
        ) : (
          <>
            <Hero />
            <ArtistsSection />
            <ReleasesSection />
            <AboutSection />
            <StoreTeaser />
            <DemosSection />
            <Newsletter />
          </>
        )}
      </main>

      <Footer />

      {/* Persistent Audio Dock */}
      <AudioPlayer />

      {/* Global Modals */}
      <ReleaseModal />
      <AdminModal />
      <AdminLoginModal />
    </div>
  );
};

export function App() {
  return (
    <AuthProvider>
      <ContentProvider>
        <AudioProvider>
          <MainContent />
        </AudioProvider>
      </ContentProvider>
    </AuthProvider>
  );
}

export default App;
