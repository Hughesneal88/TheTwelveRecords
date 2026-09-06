import React, { useState, useEffect } from "react";
import { useContent } from "../context/ContentContext";
import { MapPin, Clock } from "lucide-react";

export const AboutSection: React.FC = () => {
  const { labelInfo } = useContent();
  const [accraTime, setAccraTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Africa/Accra",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
      };
      setAccraTime(new Intl.DateTimeFormat("en-US", options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Side: Editorial Image & Studio Badge */}
        <div className="lg:col-span-5">
          <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black aspect-[4/5]">
            <img
              src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1000&q=80"
              alt="Accra Studio"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>

            {/* Live Accra HQ Marker */}
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/80 backdrop-blur-md border border-white/15">
              <div className="flex items-center justify-between font-mono text-xs">
                <div className="flex items-center gap-1.5 text-white">
                  <MapPin className="w-3.5 h-3.5 text-[#c8a858]" />
                  <span>ACCRA, GHANA HQ</span>
                </div>
                <div className="flex items-center gap-1 text-[#c8a858]">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{accraTime || "12:00:00 PM GMT"}</span>
                </div>
              </div>
              <p className="text-[11px] text-zinc-400 font-light mt-1.5">
                {labelInfo.address}
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Editorial Ethos Story */}
        <div className="lg:col-span-7 space-y-8">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#c8a858] block mb-2">
              03 // ETHOS & HERITAGE
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tightest uppercase leading-tight">
              STEWARDING SOUND & PURPOSE.
            </h2>
          </div>

          <div className="space-y-4 text-zinc-300 font-light text-base leading-relaxed">
            {labelInfo.aboutStory.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          {/* Label Mission Banner */}
          <div className="p-6 rounded-2xl bg-[#0e0e13] border-l-4 border-[#c8a858] text-sm text-zinc-200 font-light leading-relaxed">
            <span className="font-mono text-[10px] uppercase text-[#c8a858] block mb-1">MISSION STATEMENT</span>
            {labelInfo.aboutMission}
          </div>
        </div>
      </div>
    </section>
  );
};
