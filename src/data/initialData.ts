import { LabelInfo, Artist, Release, DemoSubmission, Subscriber, AdminUser } from "../types";

export const initialLabelInfo: LabelInfo = {
  name: "The Twelve Records",
  tagline: "Pioneering Faith & Sound from Accra to the Nations",
  city: "Accra",
  country: "Ghana",
  address: "Twelve Creative Compound, Airport Residential Area, Accra, Ghana",
  contactEmail: "info@thetwelverecords.com",
  bookingEmail: "bookings@thetwelverecords.com",
  pressEmail: "press@thetwelverecords.com",
  phone: "+233 24 000 1212",
  heroHeadline: "PIONEERING FAITH & SOUND",
  heroSubheadline: "From the vibrant heart of Accra to the global stage — redefining Afro-Gospel, Christian Hip Hop, and Kingdom sound with sonic excellence and spiritual depth.",
  aboutStory: [
    "Born in Accra, Ghana, The Twelve Records is a visionary Christian record label and creative house dedicated to stewarding authentic Kingdom sounds that transcend geographical and cultural borders.",
    "Rooted in the rich rhythmic heritage of West Africa and propelled by world-class production, we partner with gospel pioneers, lyricists, and worship leaders to create music that impacts eternity.",
    "From spoken-word contemplation and high-energy drill praise in Accra sanctuaries to gospel anthems resounding across streaming platforms globally, our heartbeat remains constant: Christ exalted through uncompromised artistry."
  ],
  aboutMission: "Empowering spirit-filled African artists with world-class production, strategic global DSP distribution, and uncompromising spiritual integrity.",
  demoPolicy: {
    guidelines: [
      "We accept original Christian music across Afro-Gospel, Contemporary Worship, Christian Hip Hop, and Spoken Word.",
      "Submit private streaming links only (SoundCloud, Dropbox, or Google Drive). Do NOT attach raw MP3 files directly.",
      "Include 2 to 3 of your strongest unreleased tracks or recent singles.",
      "Share your personal ministry vision, church/fellowship background, and what drives your sound."
    ],
    responseTime: "Our A&R team listens to every submission within 14 business days.",
    acceptedFormats: ["Private SoundCloud Playlist", "Dropbox Folder Link", "Google Drive Shared Folder", "Audiomack Private Link", "Disco.ac"]
  },
  socials: {
    instagram: "https://instagram.com/thetwelverecords",
    youtube: "https://youtube.com/@thetwelverecords",
    twitter: "https://x.com/thetwelverecords",
    tiktok: "https://tiktok.com/@thetwelverecords",
    spotify: "https://open.spotify.com",
    boomplay: "https://www.boomplay.com",
    audiomack: "https://audiomack.com"
  }
};

export const initialAdminUsers: AdminUser[] = [
  {
    id: "admin-1",
    name: "Kweku Hughes",
    email: "admin@thetwelverecords.com",
    passwordHash: "TwelveAdmin2026!",
    role: "super_admin",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    lastLogin: new Date().toISOString(),
    createdAt: "2026-01-01T00:00:00Z"
  },
  {
    id: "admin-2",
    name: "Nana Yaw Mensah",
    email: "ar@thetwelverecords.com",
    passwordHash: "TwelveAR2026!",
    role: "ar_manager",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
    lastLogin: new Date().toISOString(),
    createdAt: "2026-01-15T00:00:00Z"
  },
  {
    id: "admin-3",
    name: "Abena Serwaa",
    email: "press@thetwelverecords.com",
    passwordHash: "TwelveMedia2026!",
    role: "marketing_editor",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80",
    lastLogin: new Date().toISOString(),
    createdAt: "2026-02-01T00:00:00Z"
  },
  {
    id: "admin-4",
    name: "allisonsaidthis (Artist Access)",
    email: "artist.allison@thetwelverecords.com",
    passwordHash: "TwelveArtist2026!",
    role: "artist_manager",
    assignedArtistId: "artist-1",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80",
    lastLogin: new Date().toISOString(),
    createdAt: "2026-02-10T00:00:00Z"
  },
  {
    id: "admin-5",
    name: "Kofi Raj (Artist Access)",
    email: "artist.kofi@thetwelverecords.com",
    passwordHash: "TwelveArtist2026!",
    role: "artist_manager",
    assignedArtistId: "artist-2",
    avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80",
    lastLogin: new Date().toISOString(),
    createdAt: "2026-02-15T00:00:00Z"
  }
];

export const initialArtists: Artist[] = [
  {
    id: "artist-1",
    slug: "allisonsaidthis",
    name: "allisonsaidthis",
    realName: "Allison",
    tagline: "Spoken Word Poet & Christian Rap Pioneer",
    genre: "Christian Hip Hop / Spoken Word",
    origin: "Accra, Ghana",
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1600&q=80",
    bio: "allisonsaidthis is a Ghanaian Christian hip hop artist, lyricist, and spoken word poet. Starting their poetic journey at the age of 8 and later honing their craft with the SCRIBES poetry movement in university, allisonsaidthis blends raw theological contemplation, intricate cadences, and soulful hip-hop rhythms. With notable projects including the 2025 release 'Sticky Notes' and 2026 singles 'Taste' and 'KAIZEN', their music is defined by uncompromised faith, honest vulnerability, and atmospheric storytelling.",
    ministryVision: "To turn spoken truth into rhythm, ministering to the quiet spaces of the soul where faith meets life.",
    featuredVideoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    embedUrl: "https://open.spotify.com/embed/artist/4tUqM99Y3aP3D6b7QfL19Y?utm_source=generator&theme=0",
    isFeatured: true,
    socials: {
      spotify: "https://open.spotify.com/artist/4tUqM99Y3aP3D6b7QfL19Y",
      appleMusic: "https://music.apple.com/us/artist/allisonsaidthis/1786523992",
      boomplay: "https://boomplay.com",
      audiomack: "https://audiomack.com/allisonsaidthis",
      youtube: "https://youtube.com",
      instagram: "https://instagram.com/allisonsaidthis"
    },
    releaseIds: ["rel-1", "rel-2", "rel-3"],
    bookingEmail: "allison.bookings@thetwelverecords.com"
  },
  {
    id: "artist-2",
    slug: "kofi-raj",
    name: "Kofi Raj",
    realName: "Kofi Raj",
    tagline: "Ghanaian Afro-Gospel Lyricist & High-Energy Praise Minister",
    genre: "Afro-Gospel / Christian Rap",
    origin: "Accra, Ghana",
    photoUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1600&q=80",
    bio: "Kofi Raj is a dynamic Ghanaian gospel rapper, lyricist, and songwriter based in Accra. Renowned for his razor-sharp delivery and passionate gospel testimony, Kofi Raj frequently collaborates across the Ghanaian Christian music vanguard—including landmark joint works with Kobby Flow, Kwame Jnr, and Phil Angs on anthems like 'Fire In Me', 'Barabbas Was Me', and his solo breakthrough 'Alert'. Blending contemporary Ghanaian drill and Afrobeat rhythms with unwavering kingdom messages, Kofi Raj is empowering a new generation to praise with bold conviction.",
    ministryVision: "Taking the gospel to the streets and the nations through relentless energy, authentic truth, and unapologetic praise.",
    featuredVideoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    embedUrl: "https://open.spotify.com/embed/artist/5gR5ZtQ45lqXWlJ4a4kY5Z?utm_source=generator&theme=0",
    isFeatured: true,
    socials: {
      spotify: "https://open.spotify.com/artist/5gR5ZtQ45lqXWlJ4a4kY5Z",
      appleMusic: "https://music.apple.com/us/artist/kofi-raj/1545624892",
      boomplay: "https://www.boomplay.com/artists/21893892",
      audiomack: "https://audiomack.com/kofiraj",
      youtube: "https://youtube.com",
      instagram: "https://instagram.com/kofirajmusic"
    },
    releaseIds: ["rel-4", "rel-5", "rel-6"],
    bookingEmail: "kofi.bookings@thetwelverecords.com"
  }
];

export const initialReleases: Release[] = [
  {
    id: "rel-1",
    catalogNumber: "TTR-001",
    title: "Sticky Notes",
    artistId: "artist-1",
    artistName: "allisonsaidthis",
    releaseDate: "2025-12-25",
    genre: "Christian Hip Hop / Spoken Word",
    format: "Album",
    coverUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80",
    embedUrl: "https://audiomack.com/embed/allisonsaidthis/album/sticky-notes?background=1",
    description: "The seminal body of work by allisonsaidthis, exploring faith, growth, and divine grace through intricate spoken word poetry and soulful hip hop production.",
    tracks: [
      {
        id: "trk-101",
        title: "HIGHS AND LOWS",
        duration: "3:24",
        synthTheme: "afrogospel",
        lyrics: "Through every high and every valley low, You remain the anchor that holds my soul."
      },
      {
        id: "trk-102",
        title: "PATIENCE (feat. KQ The Artist)",
        duration: "3:42",
        synthTheme: "ambient"
      },
      {
        id: "trk-103",
        title: "21st Birthday",
        duration: "3:15",
        synthTheme: "worship"
      },
      {
        id: "trk-104",
        title: "Sticky Notes Outro",
        duration: "2:50",
        synthTheme: "ambient"
      }
    ],
    spotifyUrl: "https://open.spotify.com/artist/4tUqM99Y3aP3D6b7QfL19Y",
    appleMusicUrl: "https://music.apple.com/us/artist/allisonsaidthis/1786523992",
    boomplayUrl: "https://boomplay.com",
    audiomackUrl: "https://audiomack.com/allisonsaidthis/album/sticky-notes",
    youtubeUrl: "https://youtube.com",
    isFeatured: true
  },
  {
    id: "rel-2",
    catalogNumber: "TTR-002",
    title: "Taste",
    artistId: "artist-1",
    artistName: "allisonsaidthis",
    releaseDate: "2026-03-15",
    genre: "Christian Hip Hop",
    format: "Single",
    coverUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80",
    embedUrl: "https://audiomack.com/embed/allisonsaidthis/song/taste?background=1",
    description: "A vibrant, faith-fueled declaration inspired by Psalm 34:8 — Taste and see that the Lord is good.",
    tracks: [
      {
        id: "trk-201",
        title: "Taste",
        duration: "3:12",
        synthTheme: "afrogospel"
      }
    ],
    spotifyUrl: "https://open.spotify.com/artist/4tUqM99Y3aP3D6b7QfL19Y",
    appleMusicUrl: "https://music.apple.com/us/artist/allisonsaidthis/1786523992",
    boomplayUrl: "https://boomplay.com",
    audiomackUrl: "https://audiomack.com/allisonsaidthis/song/taste",
    youtubeUrl: "https://youtube.com",
    isFeatured: true
  },
  {
    id: "rel-3",
    catalogNumber: "TTR-003",
    title: "THE QUIET BETWEEN US (KAIZEN)",
    artistId: "artist-1",
    artistName: "allisonsaidthis",
    releaseDate: "2026-08-28",
    genre: "Spoken Word / Hip Hop",
    format: "EP",
    coverUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80",
    embedUrl: "https://audiomack.com/embed/allisonsaidthis/album/the-quiet-between-us?background=1",
    description: "A meditative and contemplative EP featuring 'KAIZEN' and 'Thoughts in the rain', exploring continual spiritual refinement.",
    tracks: [
      {
        id: "trk-301",
        title: "KAIZEN",
        duration: "3:30",
        synthTheme: "afrogospel"
      },
      {
        id: "trk-302",
        title: "Thoughts in the rain",
        duration: "3:45",
        synthTheme: "ambient"
      }
    ],
    spotifyUrl: "https://open.spotify.com/artist/4tUqM99Y3aP3D6b7QfL19Y",
    appleMusicUrl: "https://music.apple.com/us/artist/allisonsaidthis/1786523992",
    boomplayUrl: "https://boomplay.com",
    audiomackUrl: "https://audiomack.com/allisonsaidthis/album/the-quiet-between-us",
    youtubeUrl: "https://youtube.com",
    isFeatured: false
  },
  {
    id: "rel-4",
    catalogNumber: "TTR-004",
    title: "Alert",
    artistId: "artist-2",
    artistName: "Kofi Raj",
    releaseDate: "2022-11-10",
    genre: "Afro-Gospel / Drill",
    format: "Single",
    coverUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&q=80",
    embedUrl: "https://open.spotify.com/embed/artist/5gR5ZtQ45lqXWlJ4a4kY5Z?utm_source=generator&theme=0",
    description: "Kofi Raj’s explosive breakthrough single delivering high-energy gospel rhymes with heavy West African 808 percussion.",
    tracks: [
      {
        id: "trk-401",
        title: "Alert",
        duration: "3:38",
        synthTheme: "praise"
      }
    ],
    spotifyUrl: "https://open.spotify.com/artist/5gR5ZtQ45lqXWlJ4a4kY5Z",
    appleMusicUrl: "https://music.apple.com/us/artist/kofi-raj/1545624892",
    boomplayUrl: "https://boomplay.com/artists/21893892",
    audiomackUrl: "https://audiomack.com/kofiraj",
    youtubeUrl: "https://youtube.com",
    isFeatured: true
  },
  {
    id: "rel-5",
    catalogNumber: "TTR-005",
    title: "Fire In Me",
    artistId: "artist-2",
    artistName: "Kofi Raj",
    releaseDate: "2024-05-18",
    genre: "Afro-Gospel",
    format: "Single",
    coverUrl: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=800&q=80",
    embedUrl: "https://audiomack.com/embed/kobbyflow/song/fire-in-me?background=1",
    description: "Electrifying praise collaboration featuring Kobby Flow and Kwame Jnr, igniting the believer's inner passion for God.",
    tracks: [
      {
        id: "trk-501",
        title: "Fire In Me (feat. Kwame Jnr & Kobby Flow)",
        duration: "3:52",
        synthTheme: "praise"
      }
    ],
    spotifyUrl: "https://open.spotify.com/artist/5gR5ZtQ45lqXWlJ4a4kY5Z",
    appleMusicUrl: "https://music.apple.com/us/artist/kofi-raj/1545624892",
    boomplayUrl: "https://boomplay.com/artists/21893892",
    audiomackUrl: "https://audiomack.com/kobbyflow/song/fire-in-me",
    youtubeUrl: "https://youtube.com",
    isFeatured: true
  },
  {
    id: "rel-6",
    catalogNumber: "TTR-006",
    title: "Barabbas Was Me (The Redemption Anthems)",
    artistId: "artist-2",
    artistName: "Kofi Raj",
    releaseDate: "2026-04-12",
    genre: "Afro-Gospel / Drill",
    format: "EP",
    coverUrl: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=800&q=80",
    embedUrl: "https://open.spotify.com/embed/artist/5gR5ZtQ45lqXWlJ4a4kY5Z?utm_source=generator&theme=0",
    description: "A profound lyrical masterpiece on substituted grace, the cross, and victorious salvation featuring Ozzy Music & Erady.",
    tracks: [
      {
        id: "trk-601",
        title: "Barabbas Was Me (feat. Ozzy Music & Erady)",
        duration: "4:05",
        synthTheme: "afrogospel"
      },
      {
        id: "trk-602",
        title: "Peace, Be Still (feat. Ozzy Music)",
        duration: "4:18",
        synthTheme: "worship"
      },
      {
        id: "trk-603",
        title: "Ogeneh Doh (feat. Treasure Music)",
        duration: "3:40",
        synthTheme: "praise"
      }
    ],
    spotifyUrl: "https://open.spotify.com/artist/5gR5ZtQ45lqXWlJ4a4kY5Z",
    appleMusicUrl: "https://music.apple.com/us/artist/kofi-raj/1545624892",
    boomplayUrl: "https://boomplay.com/artists/21893892",
    audiomackUrl: "https://audiomack.com/kofiraj",
    youtubeUrl: "https://youtube.com",
    isFeatured: false
  }
];

export const initialDemos: DemoSubmission[] = [
  {
    id: "demo-1",
    artistName: "Emmanuel Darko",
    contactName: "Emmanuel Darko",
    email: "emmanuel.darko@gmail.com",
    phone: "+233 24 123 4567",
    cityCountry: "Kumasi, Ghana",
    genre: "Contemporary Worship",
    streamingLink: "https://soundcloud.com/emmanuel-darko/sets/grace-unveiled",
    spiritualCalling: "I am a worship leader at Harvest Chapel Kumasi. God has placed a burden on my heart to write songs that restore hope to broken families across Africa.",
    bio: "Songwriter and pianist with 6 years of church worship ministry experience.",
    submittedAt: "2026-08-28T14:30:00Z",
    status: "Shortlisted",
    internalNotes: "Exceptional vocal control. Strong hook in track 2. Schedule discovery call with A&R."
  },
  {
    id: "demo-2",
    artistName: "Zion Flow (Samuel & David)",
    contactName: "Samuel Mensah",
    email: "zionflowgh@gmail.com",
    cityCountry: "Tema, Ghana",
    genre: "Christian Hip Hop / Afro-Fusion",
    streamingLink: "https://dropbox.com/s/zionflow-2026-demos",
    spiritualCalling: "Reaching high school and university students across Ghana with high-energy faith anthems.",
    bio: "Duo producing their own beats and rapping in English and Ga.",
    submittedAt: "2026-09-02T10:15:00Z",
    status: "New",
    internalNotes: "Solid beat production. Review second verse lyricism."
  }
];

export const initialSubscribers: Subscriber[] = [
  {
    id: "sub-1",
    email: "musicfan.accra@gmail.com",
    name: "Kwabena Boateng",
    source: "Hero Lead Magnet",
    subscribedAt: "2026-08-30T18:22:00Z"
  },
  {
    id: "sub-2",
    email: "worshipdaily.uk@outlook.com",
    name: "Sarah Jenkins",
    source: "Footer Newsletter",
    subscribedAt: "2026-09-04T09:12:00Z"
  },
  {
    id: "sub-3",
    email: "gospelpulse.ng@yahoo.com",
    name: "Femi Adebayo",
    source: "Store VIP Drop Alert",
    subscribedAt: "2026-09-06T12:05:00Z"
  }
];
