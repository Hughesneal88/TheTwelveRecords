import React, { useState } from "react";
import { useContent } from "../context/ContentContext";
import { Sparkles, Send, CheckCircle2, AlertCircle, Info, Link as LinkIcon, Radio, X } from "lucide-react";

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

    // Validation
    if (!formData.streamingLink || !formData.streamingLink.startsWith("http")) {
      setError("Please provide a valid streaming URL (e.g. SoundCloud, Dropbox, or Google Drive link).");
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
      <section id="demos" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-gold-500/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Guidelines & Policy */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 text-gold-400 text-xs font-semibold uppercase tracking-[0.2em]">
              <Sparkles className="w-4 h-4" />
              <span>A&R & ARTIST DISCOVERY</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-cinzel font-bold text-white tracking-wide">
              SUBMIT YOUR <span className="text-gold-gradient">DEMO</span>
            </h2>

            <p className="text-sm text-slate-300 font-light leading-relaxed">
              The Twelve Records is constantly searching for original voices across Africa and the global diaspora creating Spirit-filled Christian music.
            </p>

            <div className="space-y-4 pt-2">
              <h4 className="text-xs font-cinzel font-bold uppercase tracking-wider text-gold-400 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5" /> SUBMISSION GUIDELINES
              </h4>

              <ul className="space-y-2.5">
                {labelInfo.demoPolicy.guidelines.map((rule, idx) => (
                  <li key={idx} className="text-xs text-slate-300 font-light flex items-start gap-2.5 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-500 flex-shrink-0 mt-1.5"></span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Response Time Badge */}
            <div className="p-4 rounded-xl bg-gold-500/10 border border-gold-500/25 text-xs text-gold-200">
              <span className="font-semibold block mb-0.5">Response Policy</span>
              {labelInfo.demoPolicy.responseTime}
            </div>
          </div>

          {/* Right Column: Interactive Submission Form Card */}
          <div className="lg:col-span-7 glass-panel rounded-3xl p-6 sm:p-10 border border-gold-500/20 shadow-2xl">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-gold-500/20 border border-gold-500/40 text-gold-400 flex items-center justify-center mx-auto animate-in zoom-in-50">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-cinzel font-bold text-white">
                  DEMO RECEIVED BY THE TWELVE A&R
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto font-light leading-relaxed">
                  Thank you, <span className="text-gold-400 font-semibold">{formData.artistName || "Artist"}</span>! Your tracks have been queued in our review portal. If there is an alignment with our release schedule, our A&R directors will reach out.
                </p>
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold uppercase tracking-wider transition-all mt-4"
                >
                  Submit Another Demo
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
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                      Artist / Group Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.artistName}
                      onChange={(e) => setFormData({ ...formData, artistName: e.target.value })}
                      placeholder="e.g. Samuel Osei"
                      className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 focus:border-gold-400 focus:outline-none text-xs text-white placeholder-slate-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                      Contact Person Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      placeholder="e.g. Samuel Osei"
                      className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 focus:border-gold-400 focus:outline-none text-xs text-white placeholder-slate-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="artist@gmail.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 focus:border-gold-400 focus:outline-none text-xs text-white placeholder-slate-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                      City & Country *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.cityCountry}
                      onChange={(e) => setFormData({ ...formData, cityCountry: e.target.value })}
                      placeholder="Accra, Ghana"
                      className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 focus:border-gold-400 focus:outline-none text-xs text-white placeholder-slate-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Musical Genre *
                  </label>
                  <select
                    value={formData.genre}
                    onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 focus:border-gold-400 focus:outline-none text-xs text-white"
                  >
                    <option value="Afro-Gospel">Afro-Gospel / Highlife Praise</option>
                    <option value="Contemporary Worship">Contemporary Worship / Soul</option>
                    <option value="Christian Hip Hop">Christian Hip Hop / Afro-Drill</option>
                    <option value="Symphonic Choral">Symphonic Choral / Ensemble</option>
                    <option value="Acoustic Folk Gospel">Acoustic Folk Gospel</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center justify-between">
                    <span>Streaming Playlist / Demo URL (Private SoundCloud / Dropbox / Drive) *</span>
                  </label>
                  <div className="relative">
                    <input
                      type="url"
                      required
                      value={formData.streamingLink}
                      onChange={(e) => setFormData({ ...formData, streamingLink: e.target.value })}
                      placeholder="https://soundcloud.com/your-name/sets/demo-2026"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/60 border border-white/15 focus:border-gold-400 focus:outline-none text-xs text-white placeholder-slate-500"
                    />
                    <LinkIcon className="w-4 h-4 text-gold-400 absolute left-3 top-3" />
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    Please ensure permissions allow streaming without requiring special logins.
                  </span>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Spiritual Calling & Ministry Vision *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={formData.spiritualCalling}
                    onChange={(e) => setFormData({ ...formData, spiritualCalling: e.target.value })}
                    placeholder="Tell us what drives your ministry, your church background, and what message God has given you for this generation..."
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 focus:border-gold-400 focus:outline-none text-xs text-white placeholder-slate-500 resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-gradient-to-r from-gold-500 to-amber-600 hover:from-gold-400 hover:to-amber-500 text-black font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-gold-500/25"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Demo for Review</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Standalone Demo Modal if triggered from Nav / Hero */}
      {isDemoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-2xl bg-[#0d0d12] border border-gold-500/30 rounded-3xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsDemoModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-[10px] font-mono uppercase tracking-widest text-gold-400 block mb-1">
                THE TWELVE A&R PORTAL
              </span>
              <h3 className="text-2xl font-cinzel font-bold text-white">
                SUBMIT MUSIC DEMO
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    Artist / Band Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.artistName}
                    onChange={(e) => setFormData({ ...formData, artistName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:border-gold-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:border-gold-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Private Streaming URL (SoundCloud / Dropbox / Google Drive) *
                </label>
                <input
                  type="url"
                  required
                  value={formData.streamingLink}
                  onChange={(e) => setFormData({ ...formData, streamingLink: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:border-gold-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Ministry Vision & Testimony *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.spiritualCalling}
                  onChange={(e) => setFormData({ ...formData, spiritualCalling: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:border-gold-400 focus:outline-none resize-none"
                ></textarea>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsDemoModalOpen(false)}
                  className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold rounded-full"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-gold-500 hover:bg-gold-400 text-black text-xs font-bold uppercase rounded-full"
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
