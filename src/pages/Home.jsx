import { useAuthStore } from "@/store/auth";

export default function Home() {
  const { user } = useAuthStore();
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold">Welcome, {user?.name || user?.username}!</h2>
      <p className="text-sm text-muted-foreground mt-2">This is a protected home page.</p>
    </div>
  );
}
