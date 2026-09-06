import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://qragitbknfaiwnhrnyzy.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFyYWdpdGJrbmZhaXduaHJueXp5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg3MzA4NDksImV4cCI6MjEwNDMwNjg0OX0.gyc0cvqVYogHXwnB3cOsgwtyy-fctaT8z2GY7oof1o0";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
