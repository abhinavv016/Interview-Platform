import { Link, useLocation } from "react-router";
import { BookOpenIcon, LayoutDashboardIcon } from "lucide-react";
import { UserButton } from "@clerk/clerk-react";

function Navbar() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-[#0a0d0a]/70 border-b border-white/5">
      <div className="max-w-310 mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO - Left Aligned */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative size-9 rounded-lg bg-cyan-400 grid place-items-center shadow-[0_0_30px_-4px_rgba(34,211,238,0.6)] group-hover:rotate-3 transition-transform">
            <span className="font-mono font-black text-black text-lg">{"</>"}</span>
          </div>
          <div className="leading-none">
            <div className="flex items-baseline gap-1">
              <span className="text-[19px] font-semibold tracking-tight text-stone-100">Intervue</span>
              <span className="text-[19px] font-serif-display italic text-cyan-400">X</span>
            </div>
            <span className="text-[10.5px] mt-1 font-mono uppercase tracking-[0.18em] text-stone-500 block">
              placement.engine
            </span>
          </div>
        </Link>

        {/* RIGHT ALIGNED SECTION */}
        <div className="flex items-center gap-3 ml-auto">

          {/* NAVIGATION LINKS */}
          <div className="hidden md:flex items-center gap-1 mr-2">
            <Link
              to="/problems"
              className={`px-4 py-2 rounded-full font-mono text-[11px] uppercase tracking-[0.2em] transition-all duration-300 flex items-center gap-2 ${isActive("/problems")
                  ? "text-cyan-400 bg-cyan-400/10 border border-cyan-400/20"
                  : "text-stone-400 hover:text-cyan-400 border border-transparent"
                }`}
            >
              <BookOpenIcon className="size-3.5" />
              Problems
            </Link>

            <Link
              to="/dashboard"
              className={`px-4 py-2 rounded-full font-mono text-[11px] uppercase tracking-[0.2em] transition-all duration-300 flex items-center gap-2 ${isActive("/dashboard")
                  ? "text-cyan-400 bg-cyan-400/10 border border-cyan-400/20"
                  : "text-stone-400 hover:text-cyan-400 border border-transparent"
                }`}
            >
              <LayoutDashboardIcon className="size-3.5" />
              Dashboard
            </Link>
          </div>

          {/* VERTICAL SEPARATOR */}
          <div className="h-4 w-px bg-white/10 hidden sm:block mx-1" />

          {/* USER PROFILE */}
          <div className="relative">
            <div className="absolute inset-0 bg-cyan-400/20 blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: "size-10",
                  userButtonTrigger: "size-10"
                }
              }}
            />
          </div>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;