import React, { createContext, useContext, useState, useEffect } from "react";
import { AdminUser, AdminRole } from "../types";
import { getStoredAdminUsers, saveAdminUsers, getStoredCurrentUser, saveCurrentUser } from "../data/storage";

interface AuthContextType {
  currentUser: AdminUser | null;
  adminUsers: AdminUser[];
  login: (email: string, passwordHash: string) => boolean;
  logout: () => void;
  canEditAllArtists: boolean;
  canEditPageContent: boolean;
  canReviewDemos: boolean;
  canManageTeam: boolean;
  canExportSubscribers: boolean;
  canEditArtistProfile: (artistId: string) => boolean;
  addAdminUser: (user: Omit<AdminUser, "id" | "createdAt" | "lastLogin">) => void;
  updateAdminUser: (id: string, updates: Partial<AdminUser>) => void;
  deleteAdminUser: (id: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>(getStoredAdminUsers);
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(getStoredCurrentUser);

  useEffect(() => {
    saveAdminUsers(adminUsers);
  }, [adminUsers]);

  useEffect(() => {
    saveCurrentUser(currentUser);
  }, [currentUser]);

  const login = (email: string, pass: string): boolean => {
    const cleanEmail = email.trim().toLowerCase();
    const user = adminUsers.find(
      (u) => u.email.toLowerCase() === cleanEmail && u.passwordHash === pass
    );

    if (user) {
      const updatedUser = { ...user, lastLogin: new Date().toISOString() };
      setCurrentUser(updatedUser);
      setAdminUsers((prev) =>
        prev.map((u) => (u.id === user.id ? updatedUser : u))
      );
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const role: AdminRole | undefined = currentUser?.role;

  const canEditAllArtists = role === "super_admin" || role === "ar_manager";
  const canEditPageContent = role === "super_admin" || role === "marketing_editor";
  const canReviewDemos = role === "super_admin" || role === "ar_manager";
  const canManageTeam = role === "super_admin";
  const canExportSubscribers = role === "super_admin" || role === "marketing_editor";

  const canEditArtistProfile = (artistId: string): boolean => {
    if (!currentUser) return false;
    if (role === "super_admin" || role === "ar_manager") return true;
    if (role === "artist_manager" && currentUser.assignedArtistId === artistId) return true;
    return false;
  };

  const addAdminUser = (user: Omit<AdminUser, "id" | "createdAt" | "lastLogin">) => {
    const newUser: AdminUser = {
      ...user,
      id: `admin-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    setAdminUsers((prev) => [...prev, newUser]);
  };

  const updateAdminUser = (id: string, updates: Partial<AdminUser>) => {
    setAdminUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, ...updates } : u))
    );
    if (currentUser && currentUser.id === id) {
      setCurrentUser((prev) => (prev ? { ...prev, ...updates } : null));
    }
  };

  const deleteAdminUser = (id: string) => {
    setAdminUsers((prev) => prev.filter((u) => u.id !== id));
    if (currentUser && currentUser.id === id) {
      setCurrentUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        adminUsers,
        login,
        logout,
        canEditAllArtists,
        canEditPageContent,
        canReviewDemos,
        canManageTeam,
        canExportSubscribers,
        canEditArtistProfile,
        addAdminUser,
        updateAdminUser,
        deleteAdminUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
