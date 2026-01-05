"use client";

import { AuthPanel } from "@/features/auth/AuthPanel";
import { useFirebaseAuth } from "@/features/auth/useFirebaseAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const { user, loading } = useFirebaseAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && !loading) {
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-blue-950">FGCK Admin</h1>
          <p className="text-slate-600">Sign in to manage your website</p>
        </div>
        <AuthPanel />
      </div>
    </div>
  );
}
