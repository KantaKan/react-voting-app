import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuthStore } from "@/store/auth";

export default function Login() {
  const { login, register, status, error } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ username: "", password: "", name: "" });

  const onSubmit = async (e) => {
    e.preventDefault();
    const lower = form.username.trim().toLowerCase();
    const result = mode === "login" ? await login(lower, form.password) : await register(lower, form.password, form.name);
    if (result?.ok) navigate(from, { replace: true });
  };

  return (
    <div className="min-h-dvh grid place-items-center p-4">
      <div className="w-full max-w-sm border rounded-lg p-6 bg-card">
        <h1 className="text-xl font-semibold mb-4">{mode === "login" ? "Login" : "Create account"}</h1>
        <form onSubmit={onSubmit} className="grid gap-3">
          {mode === "register" && (
            <div className="grid gap-1">
              <label className="text-sm">Name</label>
              <input className="border rounded px-3 py-2" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="Jane Doe" />
            </div>
          )}
          <div className="grid gap-1">
            <label className="text-sm">Username</label>
            <input className="border rounded px-3 py-2" value={form.username} onChange={(e) => setForm((f) => ({ ...f, username: e.target.value }))} placeholder="jane" autoComplete="username" />
          </div>
          <div className="grid gap-1">
            <label className="text-sm">Password</label>
            <input
              className="border rounded px-3 py-2"
              type="password"
              value={form.password}
              onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
              placeholder="••••••••"
              autoComplete={mode === "login" ? "current-password" : "new-password"}
            />
          </div>
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <button type="submit" className="mt-2 bg-foreground text-background rounded px-4 py-2 disabled:opacity-50" disabled={status === "loading"}>
            {status === "loading" ? "Please wait..." : mode === "login" ? "Sign in" : "Create account"}
          </button>
        </form>

        <div className="mt-4 text-sm">
          {mode === "login" ? (
            <button className="underline" onClick={() => setMode("register")}>
              Need an account? Register
            </button>
          ) : (
            <button className="underline" onClick={() => setMode("login")}>
              Have an account? Login
            </button>
          )}
          <div className="mt-2">
            <Link to="/" className="underline">
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
