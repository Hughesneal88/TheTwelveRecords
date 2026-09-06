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
  heroSubheadline: "From the vibrant heart of Accra to the global stage — redefining Afro-Gospel, Contemporary Worship, and Kingdom sound with sonic excellence and spiritual depth.",
  aboutStory: [
    "Born in Accra, Ghana, The Twelve Records is a visionary Christian record label and creative house dedicated to stewarding authentic Kingdom sounds that transcend geographical and cultural borders.",
    "Rooted in the rich rhythmic heritage of West Africa and propelled by world-class production, we partner with gospel pioneers, worship leaders, and vocalists to create music that impacts eternity.",
    "From intimate acoustic worship sessions in Accra sanctuaries to thunderous praise anthems resounding across stadiums globally, our heartbeat remains constant: Christ exalted through uncompromised artistry."
  ],
  aboutMission: "Empowering spirit-filled African artists with world-class production, strategic global DSP distribution, and uncompromising spiritual integrity.",
  demoPolicy: {
    guidelines: [
      "We accept original Christian music across Afro-Gospel, Contemporary Worship, Christian Hip Hop, and Gospel Highlife.",
      "Submit private streaming links only (SoundCloud, Dropbox, or Google Drive). Do NOT attach raw MP3 files directly.",
      "Include 2 to 3 of your strongest unreleased tracks or recent singles.",
      "Share your personal ministry vision, church/fellowship background, and what drives your sound."
    ],
    responseTime: "Our A&R team listens to every submission within 14 business days.",
    acceptedFormats: ["Private SoundCloud Playlist", "Dropbox Folder Link", "Google Drive Shared Folder", "Disco.ac"]
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
    name: "Kofi Owusu (Artist Access)",
    email: "artist.kofi@thetwelverecords.com",
    passwordHash: "TwelveArtist2026!",
    role: "artist_manager",
    assignedArtistId: "artist-1",
    avatarUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&q=80",
    lastLogin: new Date().toISOString(),
    createdAt: "2026-02-10T00:00:00Z"
  },
  {
    id: "admin-5",
    name: "Ama Grace (Artist Access)",
    email: "artist.ama@thetwelverecords.com",
    passwordHash: "TwelveArtist2026!",
    role: "artist_manager",
    assignedArtistId: "artist-2",
    avatarUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&q=80",
    lastLogin: new Date().toISOString(),
    createdAt: "2026-02-15T00:00:00Z"
  }
];

export const initialArtists: Artist[] = [
  {
    id: "artist-1",
    slug: "kofi-owusu",
    name: "Kofi Owusu",
    realName: "Kofi Owusu-Ansah",
    tagline: "Afro-Gospel Pioneer & Highlife Praise Leader",
    genre: "Afro-Gospel / Highlife Praise",
    origin: "Accra, Ghana",
    photoUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1600&q=80",
    bio: "Kofi Owusu is a central figure in the contemporary West African gospel renaissance. Infusing driving Ghanaian percussion, vibrant brass lines, and an unshakeable message of redemption, his songs have sparked vibrant praise across churches and festivals throughout Africa, the UK, and North America.",
    ministryVision: "To ignite a generation with joyful, Spirit-filled praise that celebrates God's unfailing grace in every season of life.",
    featuredVideoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    isFeatured: true,
    socials: {
      spotify: "https://open.spotify.com",
      appleMusic: "https://music.apple.com",
      boomplay: "https://boomplay.com",
      audiomack: "https://audiomack.com",
      youtube: "https://youtube.com",
      instagram: "https://instagram.com/kofiowusumusic",
      tiktok: "https://tiktok.com/@kofiowusu"
    },
    releaseIds: ["rel-1", "rel-4"],
    bookingEmail: "kofi.bookings@thetwelverecords.com"
  },
  {
    id: "artist-2",
    slug: "ama-grace",
    name: "Ama Grace",
    realName: "Ama Grace Addo",
    tagline: "Intimate Contemporary Worship & Soulful Vocals",
    genre: "Contemporary Worship / Soul",
    origin: "Accra & Cape Coast, Ghana",
    photoUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1600&q=80",
    bio: "Ama Grace is celebrated for her soaring, velvety vocal tone and deeply meditative lyricism. Her live acoustic worship sessions, recorded in Accra, have become quiet sanctuaries for believers seeking deep spiritual renewal and peace.",
    ministryVision: "Leading listeners into the secret place of divine intimacy through raw, unvarnished worship and prayers of surrender.",
    featuredVideoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    isFeatured: true,
    socials: {
      spotify: "https://open.spotify.com",
      appleMusic: "https://music.apple.com",
      boomplay: "https://boomplay.com",
      audiomack: "https://audiomack.com",
      youtube: "https://youtube.com",
      instagram: "https://instagram.com/amagraceworship"
    },
    releaseIds: ["rel-2"],
    bookingEmail: "ama.bookings@thetwelverecords.com"
  },
  {
    id: "artist-3",
    slug: "the-twelve-collective",
    name: "The Twelve Worship Collective",
    realName: "The Twelve Collective Ensemble",
    tagline: "Symphonic Afro-Worship & Stadium Anthems",
    genre: "Symphonic Worship / Choral Gospel",
    origin: "Accra, Ghana",
    photoUrl: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=800&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1600&q=80",
    bio: "A dynamic collective of 24 vocalists and instrumentalists based in Accra. Combining indigenous Ghanaian languages (Twi, Ga, Ewe) with soaring orchestral arrangements, The Twelve Worship Collective embodies the heartbeat of communal revival.",
    ministryVision: "Uniting the global body of Christ through authentic African choral majesty and Spirit-led declarations.",
    isFeatured: true,
    socials: {
      spotify: "https://open.spotify.com",
      appleMusic: "https://music.apple.com",
      boomplay: "https://boomplay.com",
      audiomack: "https://audiomack.com",
      youtube: "https://youtube.com",
      instagram: "https://instagram.com/thetwelveworship"
    },
    releaseIds: ["rel-3"],
    bookingEmail: "collective@thetwelverecords.com"
  },
  {
    id: "artist-4",
    slug: "jeremiah-asare",
    name: "Jeremiah Asare",
    realName: "Jeremiah Asare-Bediako",
    tagline: "Urban Afro-Fusion & Christian Hip Hop",
    genre: "Christian Hip Hop / Afro-Fusion",
    origin: "Kumasi & Accra, Ghana",
    photoUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1600&q=80",
    bio: "With razor-sharp lyricism, drill-infused drums, and honest testimonies of transformation, Jeremiah Asare represents the new wave of African urban Christian music engaging youth culture with bold truth.",
    ministryVision: "Reaching urban youth, campus communities, and the global diaspora with the uncompromising Gospel of grace.",
    isFeatured: false,
    socials: {
      spotify: "https://open.spotify.com",
      appleMusic: "https://music.apple.com",
      boomplay: "https://boomplay.com",
      audiomack: "https://audiomack.com",
      youtube: "https://youtube.com",
      instagram: "https://instagram.com/jeremiahasare_chh"
    },
    releaseIds: ["rel-5"],
    bookingEmail: "jeremiah.bookings@thetwelverecords.com"
  }
];

export const initialReleases: Release[] = [
  {
    id: "rel-1",
    catalogNumber: "TTR-001",
    title: "Onyame Noko (God of Wonders)",
    artistId: "artist-1",
    artistName: "Kofi Owusu",
    releaseDate: "2026-02-14",
    genre: "Afro-Gospel / Highlife Praise",
    format: "Single",
    coverUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80",
    description: "An explosive high-energy celebration of God’s miracle-working power, blending Accra brass lines with talking drums and irresistible praise.",
    tracks: [
      {
        id: "trk-101",
        title: "Onyame Noko (God of Wonders)",
        duration: "4:12",
        synthTheme: "afrogospel",
        lyrics: "Onyame noko a Otumi ye! (There is nothing God cannot do!) In the fire, in the flood, You remain faithful."
      },
      {
        id: "trk-102",
        title: "Onyame Noko (Instrumental Praise)",
        duration: "4:12",
        synthTheme: "praise"
      }
    ],
    spotifyUrl: "https://open.spotify.com",
    appleMusicUrl: "https://music.apple.com",
    boomplayUrl: "https://boomplay.com",
    audiomackUrl: "https://audiomack.com",
    youtubeUrl: "https://youtube.com",
    isFeatured: true
  },
  {
    id: "rel-2",
    catalogNumber: "TTR-002",
    title: "Rivers in the Desert EP",
    artistId: "artist-2",
    artistName: "Ama Grace",
    releaseDate: "2026-03-01",
    genre: "Contemporary Worship / Soul",
    format: "EP",
    coverUrl: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=800&q=80",
    description: "A 4-track acoustic pilgrimage of surrender and divine encounter, recorded live in an intimate sanctuary in Osu, Accra.",
    tracks: [
      {
        id: "trk-201",
        title: "Surrender All (Live in Accra)",
        duration: "5:28",
        synthTheme: "worship",
        lyrics: "Take my life, a living sacrifice. Here at Your feet, I lay my crowns down."
      },
      {
        id: "trk-202",
        title: "Rivers Flow",
        duration: "4:45",
        synthTheme: "worship"
      },
      {
        id: "trk-203",
        title: "Living Water (Interlude)",
        duration: "2:15",
        synthTheme: "ambient"
      },
      {
        id: "trk-204",
        title: "Everlasting Light",
        duration: "5:02",
        synthTheme: "worship"
      }
    ],
    spotifyUrl: "https://open.spotify.com",
    appleMusicUrl: "https://music.apple.com",
    boomplayUrl: "https://boomplay.com",
    audiomackUrl: "https://audiomack.com",
    isFeatured: true
  },
  {
    id: "rel-3",
    catalogNumber: "TTR-003",
    title: "Sons of Thunder (Live at National Theatre)",
    artistId: "artist-3",
    artistName: "The Twelve Worship Collective",
    releaseDate: "2026-04-10",
    genre: "Symphonic Worship",
    format: "Album",
    coverUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80",
    description: "Recorded live before 3,000 worshippers at the National Theatre in Accra. Capturing the raw spiritual fire and choral majesty of Ghanaian praise.",
    tracks: [
      {
        id: "trk-301",
        title: "Lion of Judah (Awurade Basa)",
        duration: "6:40",
        synthTheme: "praise"
      },
      {
        id: "trk-302",
        title: "Holy Are You Lord (Ga & English Anthem)",
        duration: "7:12",
        synthTheme: "worship"
      },
      {
        id: "trk-303",
        title: "Ancient of Days Reprise",
        duration: "4:50",
        synthTheme: "ambient"
      }
    ],
    spotifyUrl: "https://open.spotify.com",
    appleMusicUrl: "https://music.apple.com",
    boomplayUrl: "https://boomplay.com",
    audiomackUrl: "https://audiomack.com",
    isFeatured: true
  },
  {
    id: "rel-4",
    catalogNumber: "TTR-004",
    title: "Grace Abounds (Accra Sunset Mix)",
    artistId: "artist-1",
    artistName: "Kofi Owusu",
    releaseDate: "2026-05-02",
    genre: "Afro-Gospel",
    format: "Single",
    coverUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80",
    description: "Sun-drenched chords and infectious optimism that celebrates every new morning in Christ.",
    tracks: [
      {
        id: "trk-401",
        title: "Grace Abounds",
        duration: "3:35",
        synthTheme: "afrogospel"
      }
    ],
    spotifyUrl: "https://open.spotify.com",
    appleMusicUrl: "https://music.apple.com",
    isFeatured: false
  },
  {
    id: "rel-5",
    catalogNumber: "TTR-005",
    title: "Light & Salt",
    artistId: "artist-4",
    artistName: "Jeremiah Asare",
    releaseDate: "2026-05-20",
    genre: "Christian Hip Hop",
    format: "Single",
    coverUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&q=80",
    description: "Hard-hitting 808s and unapologetic gospel bars speaking life into the streets of Accra and beyond.",
    tracks: [
      {
        id: "trk-501",
        title: "Light & Salt",
        duration: "3:18",
        synthTheme: "afrogospel"
      }
    ],
    spotifyUrl: "https://open.spotify.com",
    appleMusicUrl: "https://music.apple.com",
    boomplayUrl: "https://boomplay.com",
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
