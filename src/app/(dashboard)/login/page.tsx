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
        <div className="text-center mb-8 flex flex-col items-center">
          <div className="relative w-24 h-24 mb-4">
             {/* eslint-disable-next-line @next/next/no-img-element */}
             <img src="/images/logo.png" alt="FGCK Logo" className="object-contain w-full h-full" />
          </div>
        </div>
        <AuthPanel />
      </div>
    </div>
  );
}
