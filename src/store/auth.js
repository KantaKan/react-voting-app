import { create } from "zustand";
import { apiRequest } from "@/lib/api";

const STORAGE_KEY = "voteapp_auth_v1";

function persistState(state) {
  const toStore = {
    user: state.user,
    accessToken: state.accessToken,
    refreshToken: state.refreshToken,
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toStore));
  } catch {
    console.error("Failed to persist auth state");
  }
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export const useAuthStore = create((set, get) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  status: "idle",
  error: null,

  init: () => {
    const loaded = loadState();
    if (loaded) {
      set({ user: loaded.user, accessToken: loaded.accessToken, refreshToken: loaded.refreshToken });
    }
  },

  setAuth: ({ user, accessToken, refreshToken }) => {
    set({ user, accessToken, refreshToken, error: null });
    persistState(get());
  },

  clearAuth: () => {
    set({ user: null, accessToken: null, refreshToken: null, status: "idle", error: null });
    persistState(get());
  },

  login: async (username, password) => {
    set({ status: "loading", error: null });
    try {
      const res = await apiRequest("/auth/login", {
        method: "POST",
        body: { username, password },
      });
      if (res.error) throw new Error(res.error);
      set({
        user: res.user,
        accessToken: res.accessToken,
        refreshToken: res.refreshToken,
        status: "authenticated",
        error: null,
      });
      persistState(get());
      return { ok: true };
    } catch (err) {
      set({ status: "error", error: err.message || "Login failed" });
      return { ok: false, error: err.message };
    }
  },

  register: async (username, password, name) => {
    set({ status: "loading", error: null });
    try {
      const res = await apiRequest("/auth/register", {
        method: "POST",
        body: { username, password, name },
      });
      if (res.error) throw new Error(res.error);
      set({
        user: res.user,
        accessToken: res.accessToken,
        refreshToken: res.refreshToken,
        status: "authenticated",
        error: null,
      });
      persistState(get());
      return { ok: true };
    } catch (err) {
      set({ status: "error", error: err.message || "Register failed" });
      return { ok: false, error: err.message };
    }
  },

  refreshTokens: async () => {
    const { refreshToken } = get();
    if (!refreshToken) throw new Error("No refresh token");
    const res = await apiRequest("/auth/refresh", {
      method: "POST",
      body: { refreshToken },
    });
    if (res.error) throw new Error(res.error);
    set({ accessToken: res.accessToken, refreshToken: res.refreshToken });
    persistState(get());
    return res.accessToken;
  },

  logout: async () => {
    try {
      const { refreshToken } = get();
      if (refreshToken) {
        await get().fetchWithAuth("/auth/logout", {
          method: "POST",
          body: { refreshToken },
        });
      }
    } catch {}
    set({ user: null, accessToken: null, refreshToken: null, status: "idle", error: null });
    persistState(get());
  },

  fetchWithAuth: async (path, options = {}) => {
    const { accessToken } = get();
    try {
      const result = await apiRequest(path, { ...options, accessToken });
      if (result && result.error === "Unauthorized") throw new Error("Unauthorized");
      return result;
    } catch (err) {
      if (err && (err.status === 401 || err.message === "Unauthorized")) {
        try {
          const newAccess = await get().refreshTokens();
          return await apiRequest(path, { ...options, accessToken: newAccess });
        } catch (e) {
          get().clearAuth();
          throw e;
        }
      }
      throw err;
    }
  },
}));
