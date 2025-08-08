import { useAuthStore } from "@/store/auth";
import { InteractiveHoverButton } from "@/components/magicui/InteractiveHoverButton";
import { useNavigate } from "react-router-dom";

export default function UserMenu() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  if (!user) return null;
  return (
    <div className="flex items-center gap-3">
      <div className="text-sm text-muted-foreground">
        Signed in as <span className="font-medium text-foreground">{user.username}</span>
      </div>
      <InteractiveHoverButton
        onClick={async () => {
          await logout();
          navigate("/", { replace: true });
        }}
      >
        Logout
      </InteractiveHoverButton>
    </div>
  );
}
