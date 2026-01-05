"use client";

import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { firebaseConfigured, getClientAuth } from "./firebaseClient";
import { useFirebaseAuth } from "./useFirebaseAuth";

export function AuthPanel() {
  const { user, loading } = useFirebaseAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  if (!firebaseConfigured) {
    return (
      <div className="rounded-2xl border border-blue-900/10 bg-white p-6">
        <div className="text-sm font-extrabold text-blue-950">Firebase not configured</div>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Add your Firebase Client SDK keys to <span className="font-semibold text-slate-900">.env.local</span> (see
          <span className="font-semibold text-slate-900"> .env.example</span>), then restart the dev server.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="rounded-2xl border border-blue-900/10 bg-white p-6 text-sm text-slate-600">
        Checking login…
      </div>
    );
  }

  if (user) {
    return (
      <div className="rounded-2xl border border-blue-900/10 bg-white p-6">
        <div className="text-sm font-extrabold text-blue-950">Signed in</div>
        <div className="mt-2 text-sm text-slate-600">{user.email}</div>
        <button
          type="button"
          className="mt-4 h-11 rounded-md bg-blue-900 px-4 text-sm font-extrabold text-white"
          onClick={async () => {
            const auth = getClientAuth();
            if (!auth) return;
            await signOut(auth);
          }}
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <form
      className="rounded-2xl border border-blue-900/10 bg-white p-8 shadow-xl"
      onSubmit={async (e) => {
        e.preventDefault();
        setError(null);
        setBusy(true);
        try {
          const auth = getClientAuth();
          if (!auth) {
            setError("Firebase auth not available.");
            return;
          }
          await signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
          setError(err instanceof Error ? err.message : "Failed to sign in.");
        } finally {
          setBusy(false);
        }
      }}
    >
      <div className="grid gap-6">
        <div className="grid gap-2">
          <label className="text-sm font-medium text-slate-700">Email</label>
          <input
            className="h-12 rounded-lg border border-slate-200 bg-slate-50 px-4 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
            autoComplete="email"
          />
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium text-slate-700">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="h-12 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 pr-12 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-0 top-0 h-full px-4 text-slate-400 hover:text-slate-600 transition-colors"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {error && <div className="text-sm font-medium text-red-600">{error}</div>}

        <button
          type="submit"
          disabled={busy}
          className="h-12 rounded-lg bg-blue-600 text-sm font-bold text-white hover:bg-blue-700 disabled:opacity-50 transition-colors shadow-lg shadow-blue-600/20"
        >
          {busy ? "Signing in..." : "Sign in"}
        </button>
      </div>
    </form>
  );
}

