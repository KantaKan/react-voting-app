import { useEffect, useState } from "react";
import Login from "@/pages/Login.jsx";
import UserMenu from "@/components/UserMenu.jsx";
import { useAuthStore } from "@/store/auth";

function App() {
  const { user, init } = useAuthStore();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    init();
    setReady(true);
  }, [init]);

  if (!ready) return null;

  return (
    <div className="min-h-dvh">
      <header className="border-b p-4 flex items-center justify-between">
        <div className="font-semibold">Vote App</div>
        <UserMenu />
      </header>
      <main>{user ? <div className="p-4">Welcome, {user.name || user.username}!</div> : <Login />}</main>
    </div>
  );
}

export default App;
