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
           
             <img src="/images/logo.png" alt="FGCK Logo" className="object-contain w-full h-full" />
          </div>
        </div>
        <AuthPanel />
        <div className="mt-12 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} Full Gospel Church Githurai 44. All rights reserved. <br />
          <span className="mt-1 block">
            Powered by{" "}
            <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-blue-500 transition-all hover:text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.4)]"
            >
              Spectre Tech limited
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}
