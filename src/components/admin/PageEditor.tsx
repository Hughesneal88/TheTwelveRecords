import React, { useState } from "react";
import { useContent } from "../../context/ContentContext";
import { Globe, FileText, Check, Radio } from "lucide-react";

export const PageEditor: React.FC = () => {
  const { labelInfo, updateLabelInfo } = useContent();

  const [formData, setFormData] = useState({
    heroHeadline: labelInfo.heroHeadline,
    heroSubheadline: labelInfo.heroSubheadline,
    aboutStory0: labelInfo.aboutStory[0] || "",
    aboutStory1: labelInfo.aboutStory[1] || "",
    aboutStory2: labelInfo.aboutStory[2] || "",
    aboutMission: labelInfo.aboutMission,
    address: labelInfo.address,
    contactEmail: labelInfo.contactEmail,
    bookingEmail: labelInfo.bookingEmail,
    pressEmail: labelInfo.pressEmail,
    phone: labelInfo.phone
  });

  const [savedFeedback, setSavedFeedback] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateLabelInfo({
      heroHeadline: formData.heroHeadline,
      heroSubheadline: formData.heroSubheadline,
      aboutStory: [formData.aboutStory0, formData.aboutStory1, formData.aboutStory2].filter(Boolean),
      aboutMission: formData.aboutMission,
      address: formData.address,
      contactEmail: formData.contactEmail,
      bookingEmail: formData.bookingEmail,
      pressEmail: formData.pressEmail,
      phone: formData.phone
    });

    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-cinzel font-bold text-white">
          PAGE CONTENT & COPY EDITOR
        </h3>
        <p className="text-xs text-slate-400">
          Edit the hero headlines, Accra story, mission statement, contact info, and SEO content in real time.
        </p>
      </div>

      {savedFeedback && (
        <div className="p-3.5 rounded-xl bg-gold-500/15 border border-gold-500/40 text-gold-300 text-xs flex items-center gap-2">
          <Check className="w-4 h-4 text-gold-400" />
          <span>Website content updated live across all sections!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="p-6 rounded-2xl bg-black/40 border border-gold-500/20 space-y-6">
        {/* Section 1: Hero Headlines */}
        <div className="space-y-3">
          <h4 className="font-cinzel font-bold text-gold-400 text-xs uppercase tracking-wider flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5" /> HERO BANNER COPY
          </h4>

          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1">
              Hero Headline
            </label>
            <input
              type="text"
              required
              value={formData.heroHeadline}
              onChange={(e) => setFormData({ ...formData, heroHeadline: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:border-gold-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1">
              Hero Subheadline / Tagline Description
            </label>
            <textarea
              rows={2}
              required
              value={formData.heroSubheadline}
              onChange={(e) => setFormData({ ...formData, heroSubheadline: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:border-gold-400 focus:outline-none resize-none leading-relaxed"
            ></textarea>
          </div>
        </div>

        {/* Section 2: About Us Story & Accra Heritage */}
        <div className="space-y-3 pt-4 border-t border-white/10">
          <h4 className="font-cinzel font-bold text-gold-400 text-xs uppercase tracking-wider flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5" /> ABOUT US & ACCRA HERITAGE STORY
          </h4>

          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1">
              Story Paragraph 1 (Origin & Identity)
            </label>
            <textarea
              rows={2}
              value={formData.aboutStory0}
              onChange={(e) => setFormData({ ...formData, aboutStory0: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:border-gold-400 focus:outline-none resize-none leading-relaxed"
            ></textarea>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1">
              Story Paragraph 2 (Sound & Heritage)
            </label>
            <textarea
              rows={2}
              value={formData.aboutStory1}
              onChange={(e) => setFormData({ ...formData, aboutStory1: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:border-gold-400 focus:outline-none resize-none leading-relaxed"
            ></textarea>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1">
              Story Paragraph 3 (Global Scope)
            </label>
            <textarea
              rows={2}
              value={formData.aboutStory2}
              onChange={(e) => setFormData({ ...formData, aboutStory2: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:border-gold-400 focus:outline-none resize-none leading-relaxed"
            ></textarea>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1">
              Label Core Mission Statement
            </label>
            <input
              type="text"
              value={formData.aboutMission}
              onChange={(e) => setFormData({ ...formData, aboutMission: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:border-gold-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Section 3: Contact Details & Accra Location */}
        <div className="space-y-3 pt-4 border-t border-white/10">
          <h4 className="font-cinzel font-bold text-gold-400 text-xs uppercase tracking-wider flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5" /> ACCRA HQ & CONTACT DIRECTORY
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                HQ Address (Accra, Ghana)
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:border-gold-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                Phone Number
              </label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:border-gold-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                General Inquiries Email
              </label>
              <input
                type="email"
                value={formData.contactEmail}
                onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:border-gold-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                Bookings Email
              </label>
              <input
                type="email"
                value={formData.bookingEmail}
                onChange={(e) => setFormData({ ...formData, bookingEmail: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:border-gold-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                Press & Media Email
              </label>
              <input
                type="email"
                value={formData.pressEmail}
                onChange={(e) => setFormData({ ...formData, pressEmail: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:border-gold-400 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-white/10">
          <button
            type="submit"
            className="px-7 py-2.5 rounded-full bg-gradient-to-r from-gold-500 to-amber-600 hover:from-gold-400 hover:to-amber-500 text-black font-bold text-xs uppercase tracking-wider shadow-lg"
          >
            Save Page Content
          </button>
        </div>
      </form>
    </div>
  );
};
