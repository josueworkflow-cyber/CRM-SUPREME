"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import ArenaSupremeLogo from "../../../../assets/logo horizontal sem fundo.png";
import { AppSidebar } from "../../components/app-sidebar";
import { Icon } from "../../components/icon";
import { MobileLogout } from "../../components/mobile-logout";
import { ChatPanel } from "./components/ChatPanel";
import { ClientDetailsPanel } from "./components/ClientDetailsPanel";
import { ConversationList } from "./components/ConversationList";
import { initialConversations } from "./data";
import styles from "./conversations.module.css";
import type { Conversation, InboxFilter, StatusFilter } from "./types";

function currentTime() {
  return new Intl.DateTimeFormat("pt-BR", { hour: "2-digit", minute: "2-digit" }).format(new Date());
}

function normalizeName(name: string) {
  return name.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("pt-BR");
}

function createFunnelConversation(params: URLSearchParams): Conversation | null {
  const name = params.get("cliente")?.trim();
  if (!name) return null;

  const plan = params.get("plano")?.trim() || "Interesse em conhecer os planos";
  const value = params.get("valor")?.trim() || "A definir";
  const owner = params.get("responsavel")?.trim() || "João Silva";
  const funnelNote = params.get("nota")?.trim() || "Oportunidade encaminhada do funil";
  const opportunityId = params.get("oportunidade")?.trim() || name;
  const safeId = opportunityId.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9-]+/g, "-");
  const id = `funil-${safeId || "cliente"}`;
  const initials = name.split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
  const time = currentTime();

  return {
    id,
    name,
    initials,
    tone: "tone-3",
    phone: "Contato via funil",
    preview: `Tenho interesse em ${plan.toLocaleLowerCase("pt-BR")}.`,
    time,
    unread: 0,
    status: "Aguardando equipe",
    owner,
    interest: plan,
    value,
    summary: `Oportunidade encaminhada do funil. ${funnelNote}.`,
    internalNote: `Cliente encaminhado do funil. ${funnelNote}.`,
    withAi: false,
    messages: [{ id: `${id}-mensagem-1`, sender: "client", text: `Olá! Tenho interesse em ${plan.toLocaleLowerCase("pt-BR")}.`, time }],
  };
}

export default function ConversationsPage() {
  const [conversations, setConversations] = useState(initialConversations);
  const [activeId, setActiveId] = useState("mariana");
  const [search, setSearch] = useState("");
  const [inboxFilter, setInboxFilter] = useState<InboxFilter>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("Todos os status");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [messageDraft, setMessageDraft] = useState("");
  const [noteDraft, setNoteDraft] = useState(initialConversations[0].internalNote);
  const [mobileView, setMobileView] = useState<"list" | "chat">("list");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const clientName = params.get("cliente")?.trim();
    if (!clientName) return;

    const existingConversation = initialConversations.find((conversation) => normalizeName(conversation.name) === normalizeName(clientName));
    if (existingConversation) {
      setActiveId(existingConversation.id);
      setNoteDraft(existingConversation.internalNote);
      setConversations((current) => current.map((conversation) => conversation.id === existingConversation.id ? { ...conversation, unread: 0 } : conversation));
    } else {
      const funnelConversation = createFunnelConversation(params);
      if (!funnelConversation) return;
      setActiveId(funnelConversation.id);
      setNoteDraft(funnelConversation.internalNote);
      setConversations((current) => current.some((conversation) => conversation.id === funnelConversation.id)
        ? current
        : [funnelConversation, ...current]);
    }

    setMobileView("chat");
  }, []);

  const activeConversation = conversations.find((conversation) => conversation.id === activeId) ?? conversations[0];
  const unreadCount = conversations.reduce((total, conversation) => total + conversation.unread, 0);
  const visibleConversations = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase("pt-BR");
    return conversations.filter((conversation) => {
      const matchesSearch = !normalizedSearch || `${conversation.name} ${conversation.preview} ${conversation.phone}`.toLocaleLowerCase("pt-BR").includes(normalizedSearch);
      const matchesInbox = inboxFilter === "all" || (inboxFilter === "unread" ? conversation.unread > 0 : conversation.withAi);
      const matchesStatus = statusFilter === "Todos os status" || conversation.status === statusFilter;
      return matchesSearch && matchesInbox && matchesStatus;
    });
  }, [conversations, inboxFilter, search, statusFilter]);

  function notify(message: string) {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 3000);
  }

  function selectConversation(conversation: Conversation) {
    setActiveId(conversation.id);
    setNoteDraft(conversation.internalNote);
    setConversations((current) => current.map((item) => item.id === conversation.id ? { ...item, unread: 0 } : item));
    setMobileView("chat");
  }

  function takeConversation() {
    setConversations((current) => current.map((item) => item.id === activeConversation.id
      ? { ...item, owner: "João Silva", status: "Em atendimento", claimed: true }
      : item));
    notify("Atendimento assumido por João Silva.");
  }

  function sendMessage() {
    const text = messageDraft.trim();
    if (!text) return;
    const time = currentTime();
    setConversations((current) => current.map((item) => item.id === activeConversation.id
      ? { ...item, preview: text, time, status: "Em atendimento", messages: [...item.messages, { id: `msg-${Date.now()}`, sender: "agent", text, time, read: false }] }
      : item));
    setMessageDraft("");
  }

  function saveObservation() {
    setConversations((current) => current.map((item) => item.id === activeConversation.id ? { ...item, internalNote: noteDraft.trim() } : item));
    notify("Observação salva para a equipe.");
  }

  const shellClass = `app-shell conversations-shell ${styles.scope}${mobileView === "chat" ? ` ${styles.chatView} mobile-chat-view` : ""}`;

  return (
    <div className={shellClass}>
      <AppSidebar
        activeModule="conversations"
        conversationCount={unreadCount}
        onAssistant={() => notify("A assistente IA ficará disponível nesta área em breve.")}
        onSettings={() => notify("As configurações do CRM serão adicionadas nesta próxima etapa.")}
        onProfile={() => notify("Perfil de João Silva")}
      />

      <header className="topbar"><div className="mobile-brand"><Image className="mobile-brand-logo" src={ArenaSupremeLogo} alt="Arena Supreme" priority /></div></header>

      <main className="main-content conversations-main">
        <div className="page-content conversations-page-content">
          <section className="conversations-heading">
            <div><h1>Central de conversas</h1><p className="page-subtitle">Sua equipe e a IA no mesmo atendimento.</p></div>
            <div className="inbox-controls">
              <label className="inbox-select"><Icon name="whatsapp" size={15} /><span className="visually-hidden">Número de atendimento</span><select defaultValue="all"><option value="all">Todos os números</option><option>WhatsApp • Recepção</option><option>WhatsApp • Vendas</option></select><Icon name="chevron" size={13} /></label>
              <label className="inbox-select team-select"><Icon name="user" size={15} /><span className="visually-hidden">Equipe de atendimento</span><select defaultValue="team"><option value="team">Minha equipe</option><option>Todos os atendentes</option><option>João Silva</option><option>Ana Paula</option></select><Icon name="chevron" size={13} /></label>
            </div>
          </section>

          <div className={`conversation-workspace ${mobileView === "chat" ? "show-chat" : "show-list"}`}>
            <ConversationList
              conversations={conversations}
              visibleConversations={visibleConversations}
              activeId={activeId}
              search={search}
              inboxFilter={inboxFilter}
              statusFilter={statusFilter}
              unreadCount={unreadCount}
              filtersOpen={filtersOpen}
              onSearchChange={setSearch}
              onInboxFilterChange={setInboxFilter}
              onStatusFilterChange={setStatusFilter}
              onFiltersOpenChange={setFiltersOpen}
              onSelect={selectConversation}
            />
            <ChatPanel
              conversation={activeConversation}
              messageDraft={messageDraft}
              onDraftChange={setMessageDraft}
              onSendMessage={sendMessage}
              onTakeConversation={takeConversation}
              onBack={() => setMobileView("list")}
              onNotify={notify}
            />
            <ClientDetailsPanel
              conversation={activeConversation}
              noteDraft={noteDraft}
              onNoteChange={setNoteDraft}
              onSave={saveObservation}
              onNotify={notify}
            />
          </div>
        </div>
      </main>

      <nav className="mobile-nav" aria-label="Navegação mobile">
        <a className="mobile-nav-item" href="/"><Icon name="home" size={19} /><span>Início</span></a>
        <a className="mobile-nav-item" href="/funil"><Icon name="funnel" size={19} /><span>Funil</span></a>
        <a className="mobile-nav-item active" href="/conversas" aria-current="page"><Icon name="chat" size={19} /><span>Conversas</span></a>
        <MobileLogout />
      </nav>

      {notice && <div className="toast" role="status">{notice}</div>}
    </div>
  );
}
