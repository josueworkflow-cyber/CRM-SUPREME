"use client";

import { useRouter } from "next/navigation";
import { clearMockSession } from "../lib/mock-auth";
import { Icon } from "./icon";

export function MobileLogout() {
  const router = useRouter();

  return (
    <button
      type="button"
      className="mobile-nav-item mobile-nav-logout"
      onClick={() => { clearMockSession(); router.replace("/login"); }}
    >
      <Icon name="logout" size={19} />
      <span>Sair</span>
    </button>
  );
}
