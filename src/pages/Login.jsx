import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuthStore } from "@/store/auth";
import { motion } from "framer-motion";
import { BorderBeam } from "@/components/ui/border-beam";
import TextAnimate from "@/components/ui/text-animate";
import { RippleButton } from "@/components/ui/ripple-button";

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
    <div className="min-h-dvh grid place-items-center p-4 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 opacity-20 blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 h-60 w-60 rounded-full bg-gradient-to-r from-green-400 to-blue-400 opacity-10 blur-3xl animate-pulse delay-500"></div>
      </div>

      <motion.div className="relative w-full max-w-md" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        {/* Main card with border beam */}
        <div className="relative overflow-hidden rounded-2xl border bg-white/80 backdrop-blur-xl shadow-2xl dark:bg-slate-900/80 dark:border-slate-700">
          <BorderBeam duration={8} size={100} colorFrom="#6366f1" colorTo="#8b5cf6" />

          <div className="relative p-8">
            {/* Header with animated text */}
            <div className="text-center mb-8">
              <TextAnimate animation="blurInUp" by="character" className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                {mode === "login" ? "Welcome Back" : "Join Us"}
              </TextAnimate>
              <TextAnimate animation="fadeIn" delay={0.5} className="text-slate-600 dark:text-slate-400">
                {mode === "login" ? "Sign in to your account" : "Create your account"}
              </TextAnimate>
            </div>

            {/* Form */}
            <form onSubmit={onSubmit} className="space-y-6">
              {mode === "register" && (
                <motion.div className="space-y-2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Full Name</label>
                  <input
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white/50 backdrop-blur-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 dark:bg-slate-800/50 dark:border-slate-600 dark:focus:border-indigo-400 dark:focus:ring-indigo-900"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    placeholder="Enter your full name"
                  />
                </motion.div>
              )}

              <motion.div className="space-y-2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: mode === "register" ? 0.3 : 0.2 }}>
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Username</label>
                <input
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white/50 backdrop-blur-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 dark:bg-slate-800/50 dark:border-slate-600 dark:focus:border-indigo-400 dark:focus:ring-indigo-900"
                  value={form.username}
                  onChange={(e) => setForm((f) => ({ ...f, username: e.target.value }))}
                  placeholder="Enter your username"
                  autoComplete="username"
                />
              </motion.div>

              <motion.div className="space-y-2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: mode === "register" ? 0.4 : 0.3 }}>
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
                <input
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white/50 backdrop-blur-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 dark:bg-slate-800/50 dark:border-slate-600 dark:focus:border-indigo-400 dark:focus:ring-indigo-900"
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                  placeholder="Enter your password"
                  autoComplete={mode === "login" ? "current-password" : "new-password"}
                />
              </motion.div>

              {error && (
                <motion.div className="text-red-600 text-sm bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-200 dark:border-red-800" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                  {error}
                </motion.div>
              )}

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                <RippleButton
                  type="submit"
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  disabled={status === "loading"}
                  rippleColor="rgba(255, 255, 255, 0.3)"
                >
                  {status === "loading" ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Please wait...
                    </div>
                  ) : mode === "login" ? (
                    "Sign In"
                  ) : (
                    "Create Account"
                  )}
                </RippleButton>
              </motion.div>
            </form>

            {/* Footer links */}
            <motion.div className="mt-6 text-center space-y-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
              <button className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors duration-200 dark:text-indigo-400 dark:hover:text-indigo-300" onClick={() => setMode(mode === "login" ? "register" : "login")}>
                {mode === "login" ? "Need an account? Register" : "Have an account? Login"}
              </button>

              <div className="pt-2">
                <Link to="/" className="text-slate-600 hover:text-slate-700 transition-colors duration-200 dark:text-slate-400 dark:hover:text-slate-300">
                  ← Back to home
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Floating elements for visual appeal */}
        <motion.div
          className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full opacity-60"
          animate={{
            y: [0, -10, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-60"
          animate={{
            y: [0, 10, 0],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </div>
  );
}
