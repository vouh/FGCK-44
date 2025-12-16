"use client";

import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useState } from "react";
import { firebaseConfigured, getClientAuth } from "./firebaseClient";
import { useFirebaseAuth } from "./useFirebaseAuth";

export function AuthPanel() {
  const { user, loading } = useFirebaseAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      className="rounded-2xl border border-blue-900/10 bg-white p-6"
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
      <div className="text-sm font-extrabold text-blue-950">Admin sign in</div>
      <p className="mt-2 text-sm leading-6 text-slate-600">Placeholder login (Firebase Email/Password).</p>

      <div className="mt-4 grid gap-4">
        <label className="grid gap-1">
          <span className="text-xs font-semibold text-slate-700">Email</span>
          <input
            className="h-11 rounded-md border border-blue-900/15 px-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@example.com"
            autoComplete="email"
          />
        </label>
        <label className="grid gap-1">
          <span className="text-xs font-semibold text-slate-700">Password</span>
          <input
            type="password"
            className="h-11 rounded-md border border-blue-900/15 px-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            autoComplete="current-password"
          />
        </label>
        {error ? <div className="text-sm font-semibold text-red-600">{error}</div> : null}
        <button
          type="submit"
          className="h-11 rounded-md bg-blue-900 px-4 text-sm font-extrabold text-white disabled:opacity-60"
          disabled={busy}
        >
          {busy ? "Signing in…" : "Sign in"}
        </button>
        <p className="text-xs text-slate-500">
          In Firebase Console: enable Email/Password and create admin users.
        </p>
      </div>
    </form>
  );
}
