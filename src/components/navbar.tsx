
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Navbar: React.FC = () => {
  const { isAuthenticated, profile, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/products");
  };

  return (
    <header className="w-full border-b border-slate-700 bg-slate-900/80">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/products" className="text-lg font-semibold text-white hover:opacity-90">
              🛒 E-Com Lite
            </Link>
            <nav className="hidden sm:flex gap-3 text-sm">
              <Link to="/" className="text-slate-200 hover:text-white">Home</Link>
              <Link to="/products" className="text-slate-200 hover:text-white">Products</Link>
              <Link to="/checkout" className="text-slate-200 hover:text-white">Checkout</Link>
              {isAuthenticated && <Link to="/dashboard" className="text-slate-200 hover:text-white">Dashboard</Link>}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            {/* tombol / icon checkout selalu tampil */}
            <Link
              to="/checkout"
              className="hidden sm:inline-flex items-center gap-2 rounded bg-amber-500 px-3 py-1 text-sm font-medium text-slate-900 hover:bg-amber-600"
            >
              🧾 Checkout
            </Link>

            {!isAuthenticated ? (
              <Link
                to="/login"
                className="inline-flex items-center gap-2 rounded bg-blue-600 px-3 py-1 text-sm font-medium text-white hover:bg-blue-700"
              >
                Login
              </Link>
            ) : (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  {profile?.avatar ? (
                    <img
                      src={profile.avatar}
                      alt={profile.username}
                      className="w-8 h-8 rounded-full object-cover border border-slate-700"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-sm font-medium text-white">
                      {profile?.username?.[0]?.toUpperCase() ?? "U"}
                    </div>
                  )}
                </div>

                <div className="hidden sm:block text-sm text-slate-200">
                  <div>Hai, <span className="font-semibold text-white">{profile?.username}</span></div>
                </div>

                <button
                  onClick={handleLogout}
                  className="rounded px-3 py-1 text-sm bg-red-600 text-white hover:bg-red-700"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
