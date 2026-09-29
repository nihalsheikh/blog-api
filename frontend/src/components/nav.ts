import { BookOpen, Home, PenLine, User } from "lucide-react";
import type { NavItem } from "../types/components";

/**
 * The single source of truth for app navigation, shared by the desktop
 * Sidebar and the mobile bottom bar. It lives in its own module rather than
 * inside Sidebar so neither component has to import from the other, and so
 * both files stay pure components — which is what keeps react-refresh able
 * to hot-reload them.
 */
export const NAV_ITEMS: NavItem[] = [
  { to: "/home", label: "Home", icon: Home },
  { to: "/explore", label: "Explore", icon: BookOpen },
  { to: "/my/blogs", label: "My stories", icon: PenLine },
  { to: "/profile", label: "Profile", icon: User },
];
