import React, { useState } from "react";
import { useContent } from "../context/ContentContext";
import { CheckCircle2, AlertCircle, Link as LinkIcon, X, ArrowUpRight } from "lucide-react";

export const DemosSection: React.FC = () => {
  const { labelInfo, submitDemo, isDemoModalOpen, setIsDemoModalOpen } = useContent();

  const [formData, setFormData] = useState({
    artistName: "",
    contactName: "",
    email: "",
    phone: "",
    cityCountry: "Accra, Ghana",
    genre: "Afro-Gospel",
    streamingLink: "",
    spiritualCalling: "",
    bio: ""
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.streamingLink || !formData.streamingLink.startsWith("http")) {
      setError("Please provide a valid streaming URL (e.g. SoundCloud, Dropbox, or Google Drive).");
      return;
    }

    submitDemo(formData);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      artistName: "",
      contactName: "",
      email: "",
      phone: "",
      cityCountry: "Accra, Ghana",
      genre: "Afro-Gospel",
      streamingLink: "",
      spiritualCalling: "",
      bio: ""
    });
  };

  return (
    <>
      <section id="demos" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Guidelines */}
          <div className="lg:col-span-5 space-y-6">
            <span className="font-mono text-xs uppercase tracking-widest text-[#c8a858] block">
              05 // A&R DIRECTORY
            </span>

            <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tightest uppercase">
              DEMO SUBMISSIONS
            </h2>

            <p className="text-sm text-zinc-400 font-light leading-relaxed">
              We review submissions from gospel pioneers, worship leaders, and Christian artists across Ghana, Africa, and the global diaspora.
            </p>

            <div className="space-y-4 pt-2">
              <h4 className="font-mono text-xs uppercase tracking-wider text-white">
                SUBMISSION CRITERIA
              </h4>

              <ul className="space-y-2.5">
                {labelInfo.demoPolicy.guidelines.map((rule, idx) => (
                  <li key={idx} className="text-xs text-zinc-300 font-light flex items-start gap-2.5 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c8a858] flex-shrink-0 mt-1.5"></span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-black border border-white/10 text-xs font-mono text-zinc-400">
              <span className="text-white block mb-0.5 uppercase">RESPONSE TIMEFRAME</span>
              {labelInfo.demoPolicy.responseTime}
            </div>
          </div>

          {/* Right Column: Submission Form */}
          <div className="lg:col-span-7 editorial-card rounded-3xl p-6 sm:p-10 border border-white/10">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-white/10 border border-[#c8a858] text-[#c8a858] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="font-display font-bold text-2xl text-white uppercase">
                  DEMO RECEIVED
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto font-light leading-relaxed">
                  Thank you, <span className="text-white font-semibold">{formData.artistName || "Artist"}</span>. Your submission is now in our A&R review queue. If there is a fit with our catalog schedule, we will reach out directly.
                </p>
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-mono uppercase tracking-wider transition-all mt-4"
                >
                  Submit Another Track
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                      Artist / Group Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.artistName}
                      onChange={(e) => setFormData({ ...formData, artistName: e.target.value })}
                      placeholder="e.g. Samuel Osei"
                      className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/15 focus:border-[#c8a858] focus:outline-none text-xs text-white placeholder-zinc-600"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                      Contact Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      placeholder="e.g. Samuel Osei"
                      className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/15 focus:border-[#c8a858] focus:outline-none text-xs text-white placeholder-zinc-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="artist@gmail.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/15 focus:border-[#c8a858] focus:outline-none text-xs text-white placeholder-zinc-600 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                      City & Country *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.cityCountry}
                      onChange={(e) => setFormData({ ...formData, cityCountry: e.target.value })}
                      placeholder="Accra, Ghana"
                      className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/15 focus:border-[#c8a858] focus:outline-none text-xs text-white placeholder-zinc-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                    Musical Genre *
                  </label>
                  <select
                    value={formData.genre}
                    onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/15 focus:border-[#c8a858] focus:outline-none text-xs text-white"
                  >
                    <option value="Afro-Gospel">Afro-Gospel / Highlife Praise</option>
                    <option value="Contemporary Worship">Contemporary Worship / Soul</option>
                    <option value="Christian Hip Hop">Christian Hip Hop / Afro-Drill</option>
                    <option value="Symphonic Choral">Symphonic Choral / Ensemble</option>
                    <option value="Acoustic Folk Gospel">Acoustic Folk Gospel</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                    Streaming URL (SoundCloud / Dropbox / Google Drive) *
                  </label>
                  <div className="relative">
                    <input
                      type="url"
                      required
                      value={formData.streamingLink}
                      onChange={(e) => setFormData({ ...formData, streamingLink: e.target.value })}
                      placeholder="https://soundcloud.com/..."
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black border border-white/15 focus:border-[#c8a858] focus:outline-none text-xs text-white placeholder-zinc-600 font-mono"
                    />
                    <LinkIcon className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                    Spiritual Calling & Testimony *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={formData.spiritualCalling}
                    onChange={(e) => setFormData({ ...formData, spiritualCalling: e.target.value })}
                    placeholder="Tell us about your background, church fellowship, and the message God has given you..."
                    className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/15 focus:border-[#c8a858] focus:outline-none text-xs text-white placeholder-zinc-600 resize-none font-light leading-relaxed"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-white hover:bg-[#c8a858] text-black font-display font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                >
                  <span>Submit Demo for Review</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {isDemoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-2xl bg-[#0d0d12] border border-white/15 rounded-3xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsDemoModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#c8a858] block mb-1">
                A&R DISCOVERY
              </span>
              <h3 className="font-display font-bold text-2xl text-white uppercase">
                SUBMIT MUSIC DEMO
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">
                    Artist / Band Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.artistName}
                    onChange={(e) => setFormData({ ...formData, artistName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-white/15 text-xs text-white focus:border-[#c8a858] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-white/15 text-xs text-white focus:border-[#c8a858] focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">
                  Streaming URL (SoundCloud / Dropbox / Drive) *
                </label>
                <input
                  type="url"
                  required
                  value={formData.streamingLink}
                  onChange={(e) => setFormData({ ...formData, streamingLink: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-white/15 text-xs text-white focus:border-[#c8a858] focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">
                  Ministry Vision & Calling *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.spiritualCalling}
                  onChange={(e) => setFormData({ ...formData, spiritualCalling: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-white/15 text-xs text-white focus:border-[#c8a858] focus:outline-none resize-none font-light"
                ></textarea>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsDemoModalOpen(false)}
                  className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-zinc-300 text-xs font-mono uppercase rounded-full"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-white text-black hover:bg-[#c8a858] text-xs font-display font-bold uppercase rounded-full"
                >
                  Submit Demo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
