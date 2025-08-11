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
    console.log("✅ Auth state persisted:", { hasUser: !!toStore.user, hasAccessToken: !!toStore.accessToken, hasRefreshToken: !!toStore.refreshToken });
  } catch (error) {
    console.error("❌ Failed to persist auth state:", error);
  }
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      console.log("🔍 No stored auth state found");
      return null;
    }
    const parsed = JSON.parse(raw);
    console.log("🔍 Loaded auth state:", { hasUser: !!parsed.user, hasAccessToken: !!parsed.accessToken, hasRefreshToken: !!parsed.refreshToken });
    return parsed;
  } catch (error) {
    console.error("❌ Failed to load auth state:", error);
    return null;
  }
}

export const useAuthStore = create((set, get) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  status: "idle",
  error: null,
  isRefreshing: false,

  init: () => {
    console.log("🚀 Initializing auth store...");
    const loaded = loadState();
    if (loaded) {
      set({ user: loaded.user, accessToken: loaded.accessToken, refreshToken: loaded.refreshToken });
      console.log("✅ Auth store initialized with existing session");
    } else {
      console.log("ℹ️  Auth store initialized without session");
    }
  },

  setAuth: ({ user, accessToken, refreshToken }) => {
    console.log("🔐 Setting auth state:", { hasUser: !!user, hasAccessToken: !!accessToken, hasRefreshToken: !!refreshToken });
    set({ user, accessToken, refreshToken, error: null });
    persistState(get());
  },

  clearAuth: () => {
    console.log("🚪 Clearing auth state");
    set({ user: null, accessToken: null, refreshToken: null, status: "idle", error: null, isRefreshing: false });
    try {
      localStorage.removeItem(STORAGE_KEY);
      console.log("✅ Auth state cleared from localStorage");
    } catch (error) {
      console.error("❌ Failed to clear auth state from localStorage:", error);
    }
  },

  login: async (username, password) => {
    console.log("🔑 Starting login process...");
    set({ status: "loading", error: null });
    try {
      const res = await apiRequest("/auth/login", {
        method: "POST",
        body: { username, password },
      });
      if (res.error) throw new Error(res.error);

      console.log("✅ Login successful");
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
      console.error("❌ Login failed:", err);
      set({ status: "error", error: err.message || "Login failed" });
      return { ok: false, error: err.message };
    }
  },

  register: async (username, password, name) => {
    console.log("📝 Starting registration process...");
    set({ status: "loading", error: null });
    try {
      const res = await apiRequest("/auth/register", {
        method: "POST",
        body: { username, password, name },
      });
      if (res.error) throw new Error(res.error);

      console.log("✅ Registration successful");
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
      console.error("❌ Registration failed:", err);
      set({ status: "error", error: err.message || "Register failed" });
      return { ok: false, error: err.message };
    }
  },

  refreshTokens: async () => {
    const state = get();
    const { refreshToken, isRefreshing } = state;

    console.log("🔄 Token refresh requested", { hasRefreshToken: !!refreshToken, isRefreshing });

    // Prevent multiple simultaneous refresh attempts
    if (isRefreshing) {
      console.log("⏳ Refresh already in progress, waiting...");
      let attempts = 0;
      while (get().isRefreshing && attempts < 50) {
        // 5 second max wait
        await new Promise((resolve) => setTimeout(resolve, 100));
        attempts++;
      }
      const newToken = get().accessToken;
      console.log("✅ Got token from concurrent refresh:", !!newToken);
      return newToken;
    }

    if (!refreshToken) {
      console.error("❌ No refresh token available");
      throw new Error("No refresh token");
    }

    set({ isRefreshing: true });
    console.log("🔄 Starting token refresh...");

    try {
      const res = await apiRequest("/auth/refresh", {
        method: "POST",
        body: { refreshToken },
      });

      if (res.error) {
        console.error("❌ Refresh API returned error:", res.error);
        throw new Error(res.error);
      }

      console.log("✅ Token refresh successful");
      set({
        accessToken: res.accessToken,
        refreshToken: res.refreshToken,
        isRefreshing: false,
      });
      persistState(get());
      return res.accessToken;
    } catch (error) {
      console.error("❌ Token refresh failed:", error);
      set({ isRefreshing: false });
      throw error;
    }
  },

  logout: async () => {
    console.log("🚪 Starting logout process...");
    try {
      const { refreshToken } = get();
      if (refreshToken) {
        console.log("📤 Sending logout request to server...");
        await apiRequest("/auth/logout", {
          method: "POST",
          body: { refreshToken },
        });
        console.log("✅ Server logout successful");
      }
    } catch (error) {
      console.warn("⚠️ Server logout failed (continuing anyway):", error);
    }

    get().clearAuth();
    console.log("✅ Logout complete");
  },

  fetchWithAuth: async (path, options = {}) => {
    const { accessToken } = get();

    console.log(`📡 Making authenticated request to: ${path}`, { hasAccessToken: !!accessToken });

    try {
      const result = await apiRequest(path, { ...options, accessToken });
      console.log(`✅ Request to ${path} successful`);

      if (result && result.error === "Unauthorized") {
        console.log(`⚠️ Request to ${path} returned Unauthorized`);
        throw new Error("Unauthorized");
      }

      return result;
    } catch (err) {
      console.log(`❌ Request to ${path} failed:`, err);

      if (err && (err.status === 401 || err.message === "Unauthorized")) {
        console.log("🔄 Attempting token refresh due to 401...");

        try {
          const newAccess = await get().refreshTokens();
          console.log("🔄 Retrying request with new token...");
          const retryResult = await apiRequest(path, { ...options, accessToken: newAccess });
          console.log(`✅ Retry request to ${path} successful`);
          return retryResult;
        } catch (refreshError) {
          console.error("❌ Token refresh failed, clearing auth:", refreshError);

          // Clear auth and give user a helpful message
          get().clearAuth();

          // Don't throw the technical error, throw a user-friendly one
          throw new Error("Your session has expired. Please log in again.");
        }
      }

      // Re-throw other errors as-is
      throw err;
    }
  },
}));
