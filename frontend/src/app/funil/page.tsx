"use client";

import Image from "next/image";
import { useMemo, useState, type DragEvent } from "react";
import ArenaSupremeLogo from "../../../../assets/logo horizontal sem fundo.png";
import { AppSidebar } from "../../components/app-sidebar";
import { Icon } from "../../components/icon";
import { MobileLogout } from "../../components/mobile-logout";
import { NewOpportunityDialog } from "./components/NewOpportunityDialog";
import { OpportunityCard } from "./components/OpportunityCard";
import { OpportunityDialog } from "./components/OpportunityDialog";
import { initialOpportunities, owners, stages } from "./data";
import styles from "./funnel.module.css";
import type { Opportunity, StageId } from "./types";

function getInitials(name: string) {
  return name.split(" ").slice(0, 2).map((part) => part[0]).join("").toUpperCase();
}

export default function FunnelPage() {
  const [opportunities, setOpportunities] = useState(initialOpportunities);
  const [search, setSearch] = useState("");
  const [ownerFilter, setOwnerFilter] = useState("all");
  const [mobileStage, setMobileStage] = useState<StageId>("new");
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragTarget, setDragTarget] = useState<StageId | null>(null);
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const [newOpportunityStage, setNewOpportunityStage] = useState<StageId | null>(null);
  const [notice, setNotice] = useState("");

  const filteredOpportunities = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase("pt-BR");
    return opportunities.filter((opportunity) => {
      const matchesSearch = !normalizedSearch || `${opportunity.name} ${opportunity.plan} ${opportunity.owner}`.toLocaleLowerCase("pt-BR").includes(normalizedSearch);
      const matchesOwner = ownerFilter === "all" || opportunity.owner === ownerFilter;
      return matchesSearch && matchesOwner;
    });
  }, [opportunities, ownerFilter, search]);

  function showNotice(message: string) {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 3000);
  }

  function moveOpportunity(id: string, stage: StageId) {
    setOpportunities((current) => current.map((opportunity) => opportunity.id === id ? { ...opportunity, stage } : opportunity));
    setSelectedOpportunity((current) => current?.id === id ? { ...current, stage } : current);
    setDraggedId(null);
    setDragTarget(null);
  }

  function assignOpportunity(id: string, owner: string) {
    const ownerInitials = getInitials(owner);
    setOpportunities((current) => current.map((opportunity) => opportunity.id === id ? { ...opportunity, owner, ownerInitials } : opportunity));
    setSelectedOpportunity((current) => current?.id === id ? { ...current, owner, ownerInitials } : current);
  }

  function startDragging(event: DragEvent<HTMLElement>, opportunity: Opportunity) {
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", opportunity.id);
    setDraggedId(opportunity.id);
  }

  function addOpportunity(formData: FormData) {
    const name = String(formData.get("name") ?? "").trim();
    const owner = String(formData.get("owner") ?? owners[0]);
    const rawPrice = String(formData.get("price") ?? "").trim();
    const numericPrice = Number(rawPrice.replace(/\./g, "").replace(",", ".").replace(/[^\d.]/g, ""));
    const price = Number.isFinite(numericPrice)
      ? new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(numericPrice)
      : `R$ ${rawPrice}`;
    const opportunity: Opportunity = {
      id: `op-${Date.now()}`,
      name,
      plan: String(formData.get("plan") ?? "Plano mensal"),
      price,
      owner,
      ownerInitials: getInitials(owner),
      stage: String(formData.get("stage") ?? "new") as StageId,
      note: "Novo interesse",
      signal: "chat",
    };
    setOpportunities((current) => [opportunity, ...current]);
    setNewOpportunityStage(null);
    setMobileStage(opportunity.stage);
    showNotice(`${name} foi adicionado ao funil.`);
  }

  function renderColumn(stageId: StageId, compact = false) {
    const stage = stages.find((item) => item.id === stageId)!;
    const entries = filteredOpportunities.filter((opportunity) => opportunity.stage === stage.id);
    return (
      <section
        className={`kanban-column stage-${stage.id}${dragTarget === stage.id ? " is-drop-target" : ""}${compact ? " compact-column" : ""}`}
        key={`${compact ? "mobile-" : ""}${stage.id}`}
        onDragOver={(event) => { event.preventDefault(); setDragTarget(stage.id); }}
        onDragLeave={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setDragTarget(null); }}
        onDrop={(event) => {
          event.preventDefault();
          const id = event.dataTransfer.getData("text/plain") || draggedId;
          if (id) moveOpportunity(id, stage.id);
        }}
      >
        <div className="kanban-column-heading">
          <div className="kanban-stage-title"><span className="kanban-dot" /><h2>{stage.label}</h2><span className="kanban-count">{entries.length}</span></div>
          <button type="button" className="row-action column-more" aria-label={`Opções da etapa ${stage.label}`} onClick={() => showNotice(`Etapa: ${stage.label}`)}><Icon name="more" /></button>
        </div>
        <div className="kanban-cards">
          {entries.map((opportunity, index) => (
            <OpportunityCard
              opportunity={opportunity}
              index={index}
              key={opportunity.id}
              onOpen={setSelectedOpportunity}
              onDragStart={startDragging}
              isDragging={draggedId === opportunity.id}
            />
          ))}
          {entries.length === 0 && <p className="empty-column">Nenhuma oportunidade nesta etapa.</p>}
          <button type="button" className="add-opportunity-inline" onClick={() => setNewOpportunityStage(stage.id)}><Icon name="plus" size={17} /><span>Adicionar</span></button>
        </div>
      </section>
    );
  }

  return (
    <div className={`app-shell funnel-shell ${styles.scope}`}>
      <AppSidebar
        activeModule="funnel"
        onAssistant={() => showNotice("A assistente IA ficará disponível nesta área em breve.")}
        onSettings={() => showNotice("As configurações do CRM serão adicionadas nesta próxima etapa.")}
        onProfile={() => showNotice("Perfil de João Silva")}
      />
      <main className="main-content funnel-main">
        <header className="topbar"><div className="mobile-brand"><Image className="mobile-brand-logo" src={ArenaSupremeLogo} alt="Arena Supreme" priority /></div></header>
        <div className="page-content funnel-page-content">
          <section className="page-heading funnel-heading">
            <div><h1>Funil de vendas</h1><p className="page-subtitle">Acompanhe cada oportunidade e organize os próximos passos.</p></div>
            <div className="funnel-controls">
              <label className="funnel-search"><Icon name="search" size={17} /><span className="visually-hidden">Buscar cliente</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar cliente" /></label>
              <label className="owner-filter"><Icon name="user" size={16} /><span className="visually-hidden">Filtrar responsável</span><select value={ownerFilter} onChange={(event) => setOwnerFilter(event.target.value)}><option value="all">Todos os responsáveis</option>{owners.map((owner) => <option key={owner}>{owner}</option>)}</select><Icon name="chevron" size={14} /></label>
              <button type="button" className="button-primary new-opportunity-button" onClick={() => setNewOpportunityStage("new")}><Icon name="plus" size={16} /><span>Nova oportunidade</span></button>
            </div>
          </section>

          <nav className="mobile-stage-tabs" aria-label="Etapas do funil">
            {stages.map((stage) => (
              <button type="button" className={mobileStage === stage.id ? "selected" : ""} onClick={() => setMobileStage(stage.id)} key={stage.id}>
                <span>{stage.label}</span><span className="kanban-count">{filteredOpportunities.filter((opportunity) => opportunity.stage === stage.id).length}</span>
              </button>
            ))}
          </nav>

          <div className="kanban-board" aria-label="Quadro do funil de vendas">{stages.map((stage) => renderColumn(stage.id))}</div>
          <div className="mobile-kanban-board" aria-label="Etapa selecionada do funil">{renderColumn(mobileStage, true)}</div>
        </div>
      </main>

      <nav className="mobile-nav" aria-label="Navegação mobile">
        <a className="mobile-nav-item" href="/"><Icon name="home" size={19} /><span>Início</span></a>
        <a className="mobile-nav-item active" href="/funil"><Icon name="funnel" size={19} /><span>Funil</span></a>
        <a className="mobile-nav-item" href="/conversas"><Icon name="chat" size={19} /><span>Conversas</span></a>
        <MobileLogout />
      </nav>

      {newOpportunityStage && <NewOpportunityDialog stage={newOpportunityStage} onClose={() => setNewOpportunityStage(null)} onCreate={addOpportunity} />}
      {selectedOpportunity && <OpportunityDialog opportunity={selectedOpportunity} onClose={() => setSelectedOpportunity(null)} onMove={moveOpportunity} onAssign={assignOpportunity} />}
      {notice && <div className="toast" role="status">{notice}</div>}
    </div>
  );
}
