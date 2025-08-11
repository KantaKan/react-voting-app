import { useAuthStore } from "@/store/auth";

export function AuthDebug() {
  const { user, accessToken, refreshToken, status, isRefreshing } = useAuthStore();

  // Only show in development
  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        top: "10px",
        right: "10px",
        background: "#f0f0f0",
        padding: "10px",
        border: "1px solid #ccc",
        fontSize: "12px",
        zIndex: 9999,
        maxWidth: "300px",
      }}
    >
      <h4>Auth Debug</h4>
      <div>Status: {status}</div>
      <div>User: {user ? `${user.name} (${user.username})` : "None"}</div>
      <div>Access Token: {accessToken ? `${accessToken.substring(0, 10)}...` : "None"}</div>
      <div>Refresh Token: {refreshToken ? `${refreshToken.substring(0, 10)}...` : "None"}</div>
      <div>Refreshing: {isRefreshing ? "Yes" : "No"}</div>
      <button onClick={() => console.log("Current auth state:", { user, accessToken, refreshToken, status, isRefreshing })} style={{ marginTop: "5px", fontSize: "10px" }}>
        Log State
      </button>
    </div>
  );
}
