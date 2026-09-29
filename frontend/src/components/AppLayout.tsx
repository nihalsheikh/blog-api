import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";

/**
 * The app shell and the single source of the layout contract:
 * `md:ml-64` clears the fixed sidebar, and `pb-24` clears the fixed bottom
 * nav on mobile. Anything pinned to the bottom must be accounted for here.
 */
export default function AppLayout() {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <MobileNav />

      <main className="md:ml-64 py-6 md:py-8 pb-24 md:pb-10">
        <div className="px-4 md:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
