import { useAuthStore } from "@/store/auth";

export default function UserMenu() {
  const { user, logout } = useAuthStore();
  if (!user) return null;
  return (
    <div className="flex items-center gap-3">
      <div className="text-sm">
        Signed in as <span className="font-medium">{user.username}</span>
      </div>
      <button className="border rounded px-3 py-1" onClick={logout}>
        Logout
      </button>
    </div>
  );
}
