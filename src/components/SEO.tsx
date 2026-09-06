import React, { useEffect } from "react";
import { useContent } from "../context/ContentContext";

export const SEO: React.FC = () => {
  const { labelInfo, artists, releases, currentView, activeArtistSlug, getArtistBySlug } = useContent();

  const currentArtist = activeArtistSlug ? getArtistBySlug(activeArtistSlug) : undefined;

  useEffect(() => {
    // Dynamic page title
    if (currentView === "artist-page" && currentArtist) {
      document.title = `${currentArtist.name} | The Twelve Records (Accra, Ghana)`;
    } else {
      document.title = `${labelInfo.name} | Accra, Ghana — ${labelInfo.tagline}`;
    }

    // JSON-LD Structured Data
    const existingScript = document.getElementById("json-ld-label");
    if (existingScript) existingScript.remove();

    const schemaData = {
      "@context": "https://schema.org",
      "@type": "MusicRecordLabel",
      "name": labelInfo.name,
      "description": labelInfo.heroSubheadline,
      "url": "https://thetwelverecords.com",
      "logo": "https://thetwelverecords.com/assets/logo.jpg",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": labelInfo.city,
        "addressCountry": labelInfo.country
      },
      "genre": ["Christian", "Afro-Gospel", "Contemporary Worship", "Christian Hip Hop"],
      "sameAs": [
        labelInfo.socials.instagram,
        labelInfo.socials.youtube,
        labelInfo.socials.twitter,
        labelInfo.socials.boomplay
      ]
    };

    const script = document.createElement("script");
    script.id = "json-ld-label";
    script.type = "application/ld+json";
    script.text = JSON.stringify(schemaData);
    document.head.appendChild(script);

    return () => {
      const el = document.getElementById("json-ld-label");
      if (el) el.remove();
    };
  }, [labelInfo, currentView, currentArtist]);

  return null;
};
