"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { hasMockSession } from "../lib/mock-auth";

export function AuthGate({ children }: { children: ReactNode }) {
  const pathname = usePathname() ?? "/";
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const isLoginPage = pathname === "/login";

  useEffect(() => {
    const hasSession = hasMockSession();
    setAuthenticated(hasSession);
    setChecked(true);

    if (isLoginPage && hasSession) {
      router.replace("/");
    } else if (!isLoginPage && !hasSession) {
      router.replace("/login");
    }
  }, [isLoginPage, pathname, router]);

  if (isLoginPage) return children;
  if (!checked || !authenticated) {
    return <div className="auth-loading" role="status" aria-label="Verificando acesso"><span /></div>;
  }

  return children;
}
