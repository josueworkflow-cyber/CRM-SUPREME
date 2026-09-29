"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import BragancaLogo from "../../../assets/logo bragança.png";
import ArenaSupremeLogo from "../../../assets/logo horizontal sem fundo.png";
import { Avatar } from "./avatar";
import { Icon } from "./icon";
import { clearMockSession } from "../lib/mock-auth";

export type ActiveModule = "overview" | "funnel" | "conversations";

type AppSidebarProps = {
  activeModule: ActiveModule;
  conversationCount?: number;
  onAssistant: () => void;
  onSettings: () => void;
  onProfile: () => void;
};

export function AppSidebar({ activeModule, conversationCount = 5, onAssistant, onSettings, onProfile }: AppSidebarProps) {
  const router = useRouter();
  return (
    <aside className="sidebar">
      <Link className="brand" href="/" aria-label="Arena Supreme — visão geral">
        <Image className="brand-logo" src={ArenaSupremeLogo} alt="Arena Supreme" priority />
      </Link>

      <nav className="side-nav" aria-label="Menu principal">
        <Link className={`nav-link${activeModule === "overview" ? " active" : ""}`} href="/" aria-current={activeModule === "overview" ? "page" : undefined}>
          <Icon name="home" /><span>Visão geral</span>
        </Link>
        <Link className={`nav-link${activeModule === "funnel" ? " active" : ""}`} href="/funil" aria-current={activeModule === "funnel" ? "page" : undefined}>
          <Icon name="funnel" /><span>Funil de vendas</span>
        </Link>
        <Link className={`nav-link${activeModule === "conversations" ? " active" : ""}`} href="/conversas" aria-current={activeModule === "conversations" ? "page" : undefined}><Icon name="chat" /><span>Conversas</span>{conversationCount > 0 && <span className="nav-badge">{conversationCount}</span>}</Link>
        <button className="nav-link" type="button" onClick={onSettings}><Icon name="settings" /><span>Configurações</span></button>
      </nav>

      <div className="sidebar-bottom">
        <div className="sidebar-profile-row">
          <button type="button" className="sidebar-profile" onClick={onProfile}>
          <Avatar initials="JS" tone={3} label="João Silva" />
            <span className="sidebar-profile-copy"><strong>João Silva</strong><small>Gestor</small></span>
            <Icon name="chevron" size={14} />
          </button>
          <button type="button" className="sidebar-logout" aria-label="Sair da conta" title="Sair da conta" onClick={() => { clearMockSession(); router.replace("/login"); }}>
            <Icon name="logout" size={15} />
          </button>
        </div>
        <button type="button" className="assistant-link" onClick={onAssistant}>
          <span className="assistant-heading"><Icon name="assistant" /><strong>Assistente IA</strong></span>
          <span className="assistant-caption">Pergunte sobre seus clientes e atendimentos</span>
        </button>
        <div className="powered-by">
          <span className="powered-by-label">Desenvolvido por:</span>
          <Image className="powered-by-logo" src={BragancaLogo} alt="Bragança Automações" />
        </div>
      </div>
    </aside>
  );
}
