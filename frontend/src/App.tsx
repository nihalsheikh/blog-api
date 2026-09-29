import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import BlogDetail from "./pages/BlogDetail";
import BlogEditor from "./pages/BlogEditor";
import MyBlogs from "./pages/MyBlogs";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

/**
 * Route table.
 *
 * Reading is public — the backend serves `GET /blogs` and `GET /blogs/{id}`
 * without a token. Writing and managing require a session, so those routes
 * sit inside the shell and behind ProtectedRoute. NotFound is deliberately
 * outside the shell: it has no sidebar, just a way back.
 */
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Public reading, inside the app shell */}
      <Route element={<AppLayout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/blogs/:id" element={<BlogDetail />} />
      </Route>

      {/* Session required */}
      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/my/blogs" element={<MyBlogs />} />
        <Route path="/write" element={<BlogEditor />} />
        <Route path="/write/:id" element={<BlogEditor />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
