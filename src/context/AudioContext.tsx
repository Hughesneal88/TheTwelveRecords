import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { Track, Release } from "../types";
import { synthEngine } from "../utils/audioGenerator";

interface AudioContextType {
  currentTrack: Track | null;
  currentRelease: Release | null;
  isPlaying: boolean;
  progress: number; // 0 to 100
  currentTime: number; // seconds
  duration: number; // seconds
  volume: number; // 0 to 1
  playTrack: (track: Track, release: Release) => void;
  togglePlay: () => void;
  pause: () => void;
  resume: () => void;
  seek: (progressPercent: number) => void;
  setVolume: (vol: number) => void;
  closePlayer: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [currentRelease, setCurrentRelease] = useState<Release | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(180); // Default 3 mins for synth
  const [volume, setVolumeState] = useState<number>(0.85);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<number | null>(null);

  // Initialize HTML5 audio
  useEffect(() => {
    const audio = new Audio();
    audio.volume = volume;
    audioRef.current = audio;

    audio.onended = () => {
      setIsPlaying(false);
      setProgress(100);
    };

    audio.ontimeupdate = () => {
      if (audio.duration) {
        setCurrentTime(audio.currentTime);
        setDuration(audio.duration);
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    return () => {
      audio.pause();
      audio.src = "";
      synthEngine.stop();
    };
  }, []);

  // Update volume
  const setVolume = (val: number) => {
    setVolumeState(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
    }
    synthEngine.setVolume(val);
  };

  const playTrack = (track: Track, release: Release) => {
    setCurrentTrack(track);
    setCurrentRelease(release);
    setIsPlaying(true);
    setProgress(0);
    setCurrentTime(0);

    // Parse duration string if available (e.g. "4:12" -> 252s)
    if (track.duration && track.duration.includes(":")) {
      const parts = track.duration.split(":");
      const mins = parseInt(parts[0], 10) || 3;
      const secs = parseInt(parts[1], 10) || 0;
      setDuration(mins * 60 + secs);
    } else {
      setDuration(180);
    }

    if (track.audioUrl) {
      synthEngine.stop();
      if (audioRef.current) {
        audioRef.current.src = track.audioUrl;
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {
          // Fallback to synth if audio URL fails to load
          synthEngine.playPreset(track.synthTheme || "afrogospel");
        });
      }
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      synthEngine.playPreset(track.synthTheme || "afrogospel");
    }
  };

  // Synthetic timer progress
  useEffect(() => {
    if (isPlaying && (!currentTrack?.audioUrl || (audioRef.current && audioRef.current.paused))) {
      timerRef.current = window.setInterval(() => {
        setCurrentTime((prev) => {
          const next = prev + 1;
          if (next >= duration) {
            setIsPlaying(false);
            synthEngine.stop();
            return duration;
          }
          setProgress((next / duration) * 100);
          return next;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isPlaying, currentTrack, duration]);

  const pause = () => {
    setIsPlaying(false);
    if (audioRef.current) audioRef.current.pause();
    synthEngine.stop();
  };

  const resume = () => {
    if (!currentTrack) return;
    setIsPlaying(true);
    if (currentTrack.audioUrl && audioRef.current) {
      audioRef.current.play().catch(() => {
        synthEngine.playPreset(currentTrack.synthTheme || "afrogospel");
      });
    } else {
      synthEngine.playPreset(currentTrack.synthTheme || "afrogospel");
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      pause();
    } else {
      resume();
    }
  };

  const seek = (progressPercent: number) => {
    const clamped = Math.max(0, Math.min(100, progressPercent));
    setProgress(clamped);
    const newTime = (clamped / 100) * duration;
    setCurrentTime(newTime);
    if (currentTrack?.audioUrl && audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const closePlayer = () => {
    pause();
    setCurrentTrack(null);
    setCurrentRelease(null);
  };

  return (
    <AudioContext.Provider
      value={{
        currentTrack,
        currentRelease,
        isPlaying,
        progress,
        currentTime,
        duration,
        volume,
        playTrack,
        togglePlay,
        pause,
        resume,
        seek,
        setVolume,
        closePlayer
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
};
