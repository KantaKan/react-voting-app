import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "@/pages/Login.jsx";
import UserMenu from "@/components/UserMenu.jsx";
import { useAuthStore } from "@/store/auth";
import ProtectedRoute from "@/components/ProtectedRoute.jsx";
import Home from "@/pages/Home.jsx";
import Landing from "@/pages/Landing.jsx";
import Navbar from "@/components/Navbar.jsx";
import Dashboard from "@/pages/Dashboard.jsx";
import { AuthDebug } from "./pages/Debug";
import { ListPage } from "./pages/List";

function App() {
  const { init } = useAuthStore();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    init();
    setReady(true);
  }, [init]);

  if (!ready) return null;

  return (
    <div className="min-h-dvh">
      <Navbar />
      <main>
        <Routes>
          <Route index element={<Landing />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/app" element={<Dashboard />} />
            <Route path="/list" element={<ListPage />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
