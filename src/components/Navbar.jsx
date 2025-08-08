import { Link, NavLink } from "react-router-dom";
import { useAuthStore } from "@/store/auth";
import UserMenu from "@/components/UserMenu.jsx";
import { AnimatedGradientText } from "@/components/magicui/AnimatedGradientText";
import { InteractiveHoverButton } from "@/components/magicui/InteractiveHoverButton";

export default function Navbar() {
  const { user } = useAuthStore();

  const linkClass = ({ isActive }) => `px-3 py-2 text-sm rounded-md transition-colors ${isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`;

  return (
    <div className="sticky top-0 z-40 w-full border-b bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-lg font-semibold">
            <AnimatedGradientText className="font-extrabold">GENVOTE</AnimatedGradientText>
          </span>
        </Link>

        {user && (
          <nav className="hidden items-center gap-1 sm:flex">
            <NavLink to="/" className={linkClass} end>
              Home
            </NavLink>
            <NavLink to="/app" className={linkClass}>
              Dashboard
            </NavLink>
          </nav>
        )}

        <div className="flex items-center gap-3">
          {user ? (
            <UserMenu />
          ) : (
            <Link to="/login">
              <InteractiveHoverButton>Get Started</InteractiveHoverButton>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
