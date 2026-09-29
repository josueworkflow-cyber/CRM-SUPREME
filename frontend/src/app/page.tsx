"use client";

import Image from "next/image";
import ArenaSupremeLogo from "../../../assets/logo horizontal sem fundo.png";
import { useState } from "react";
import { AppSidebar } from "../components/app-sidebar";
import { Avatar } from "../components/avatar";
import { Icon } from "../components/icon";
import { MobileLogout } from "../components/mobile-logout";
import { NewCustomerDialog } from "./components/NewCustomerDialog";
import { RecentConversationDialog } from "./components/RecentConversationDialog";
import { getInitials, initialCustomers, stageClass } from "./data";
import type { Customer } from "./types";
import styles from "./dashboard.module.css";

export default function Home() {
  const [customers, setCustomers] = useState(initialCustomers);
  const [newCustomerOpen, setNewCustomerOpen] = useState(false);
  const [activeConversation, setActiveConversation] = useState<Customer | null>(null);
  const [notice, setNotice] = useState("");

  function showNotice(message: string) {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 3200);
  }

  function createCustomer(name: string, phone: string) {
    const customer: Customer = {
      id: Date.now(), name, phone: phone || "Telefone não informado", time: "agora",
      message: "Novo contato cadastrado", stage: "Novo", owner: "João Silva",
    };
    setCustomers((current) => [customer, ...current]);
    setNewCustomerOpen(false);
    showNotice(`${name} foi adicionado aos clientes recentes.`);
  }

  const customerNamed = (name: string, fallbackIndex: number) => customers.find((customer) => customer.name === name) ?? initialCustomers[fallbackIndex];

  return (
    <div className={`app-shell ${styles.scope}`} id="overview">
      <AppSidebar
        activeModule="overview"
        onAssistant={() => showNotice("A assistente IA ficará disponível nesta área em breve.")}
        onSettings={() => showNotice("As configurações do CRM serão adicionadas nesta próxima etapa.")}
        onProfile={() => showNotice("Perfil de João Silva")}
      />

      <main className="main-content">
        <header className="topbar"><div className="mobile-brand"><Image className="mobile-brand-logo" src={ArenaSupremeLogo} alt="Arena Supreme" priority /></div></header>

        <div className="page-content">
          <section className="page-heading">
            <div><h1>Visão geral</h1><p className="page-subtitle">Acompanhe seus clientes e os atendimentos da equipe.</p></div>
            <div className="heading-actions">
              <button type="button" className="button-secondary date-button"><Icon name="calendar" size={15} /><span>Últimos 7 dias</span><Icon name="chevron" size={14} /></button>
              <button type="button" className="button-primary" onClick={() => setNewCustomerOpen(true)}><Icon name="plus" size={16} /><span>Novo cliente</span></button>
            </div>
          </section>

          <section className="metrics-grid" aria-label="Indicadores de atendimento">
            <article className="metric-card"><div className="metric-label"><span className="metric-icon"><Icon name="send" /></span><span>Disparos</span></div><strong>248</strong></article>
            <article className="metric-card"><div className="metric-label"><span className="metric-icon"><Icon name="chat" /></span><span>Em conversa</span></div><strong>32</strong></article>
            <article className="metric-card"><div className="metric-label"><span className="metric-icon"><Icon name="reply" /></span><span>Respostas</span></div><strong>186</strong></article>
            <article className="metric-card"><div className="metric-label"><span className="metric-icon"><Icon name="percent" /></span><span>Taxa de resposta</span></div><strong>75%</strong></article>
            <article className="metric-card"><div className="metric-label"><span className="metric-icon"><Icon name="muted" /></span><span>Sem resposta</span></div><strong>62</strong></article>
            <article className="metric-card"><div className="metric-label"><span className="metric-icon"><Icon name="clock" /></span><span>Tempo médio</span></div><strong>4 min</strong></article>
          </section>

          <div className="dashboard-grid">
            <section className="panel recent-panel" id="recent-customers">
              <div className="panel-heading"><h2>Clientes recentes</h2><button type="button" className="text-link" onClick={() => showNotice("Você está vendo os clientes recentes.")}>Ver todos</button></div>
              <div className="table-scroll">
                <table className="customers-table">
                  <thead><tr><th>Cliente</th><th>Última interação</th><th>Etapa</th><th>Responsável</th><th><span className="visually-hidden">Ações</span></th></tr></thead>
                  <tbody>
                    {customers.map((customer, index) => (
                      <tr key={customer.id}>
                        <td><div className="customer-cell"><Avatar initials={getInitials(customer.name)} tone={index} label={customer.name} /><div><strong>{customer.name}</strong><span>{customer.phone}</span></div></div></td>
                        <td><div className="interaction-cell"><Icon name="chat" size={15} /><div><span>{customer.time}</span><small>{customer.message}</small></div></div></td>
                        <td><span className={`stage-badge ${stageClass[customer.stage]}`}>{customer.stage}</span></td>
                        <td><div className="owner-cell"><Avatar initials={getInitials(customer.owner)} tone={index + 2} label={customer.owner} small /><span>{customer.owner}</span></div></td>
                        <td><button type="button" className="row-action" aria-label={`Abrir conversa de ${customer.name}`} onClick={() => setActiveConversation(customer)}><Icon name="more" /></button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="panel attention-panel" aria-labelledby="attention-title">
              <div className="panel-heading"><h2 id="attention-title">Atenção da equipe</h2><span className="panel-meta">Sinalizados pela IA</span></div>
              <div className="attention-list">
                <article className="attention-card">
                  <Avatar initials="MS" tone={0} label="Mariana Silva" />
                  <div className="attention-copy"><strong>Mariana Silva</strong><span className="attention-highlight">Avaliação 4/10 · Retorno necessário</span><small>Última interação há 12 minutos</small></div>
                  <button type="button" className="button-compact" onClick={() => setActiveConversation(customerNamed("Mariana Silva", 0))}>Ver conversa</button>
                </article>
                <article className="attention-card">
                  <Avatar initials="CO" tone={1} label="Carlos Oliveira" />
                  <div className="attention-copy"><strong>Carlos Oliveira</strong><span className="attention-highlight">7 dias sem check-in</span><small>Última interação há 2 horas</small></div>
                  <button type="button" className="button-compact" onClick={() => setActiveConversation(customerNamed("Carlos Oliveira", 1))}>Ver conversa</button>
                </article>
                <article className="attention-card">
                  <Avatar initials="AS" tone={2} label="Ana Souza" />
                  <div className="attention-copy"><strong>Ana Souza</strong><span className="attention-highlight">Plano vence em 3 dias</span><small>Última interação há 3 horas</small></div>
                  <button type="button" className="button-compact" onClick={() => setActiveConversation(customerNamed("Ana Souza", 2))}>Ver conversa</button>
                </article>
              </div>
            </section>
          </div>

          <section className="panel pipeline-panel" id="pipeline">
            <div className="panel-heading"><h2>Funil de vendas</h2><a className="text-link" href="/funil">Ver funil completo <Icon name="arrow" size={14} /></a></div>
            <div className="pipeline-grid">
              <article className="pipeline-stage"><div><span className="stage-dot dot-new" /><span>Novo</span></div><strong>18</strong></article>
              <article className="pipeline-stage"><div><span className="stage-dot dot-progress" /><span>Em atendimento</span></div><strong>12</strong></article>
              <article className="pipeline-stage"><div><span className="stage-dot dot-negotiation" /><span>Negociação</span></div><strong>8</strong></article>
              <article className="pipeline-stage"><div><span className="stage-dot dot-won" /><span>Fechado</span></div><strong>24</strong></article>
              <article className="pipeline-stage"><div><span className="stage-dot dot-lost" /><span>Perdido</span></div><strong>3</strong></article>
            </div>
          </section>
          <footer className="page-footer"><span>Dados demonstrativos</span></footer>
        </div>
      </main>

      <nav className="mobile-nav" aria-label="Navegação mobile">
        <a className="mobile-nav-item active" href="#overview"><Icon name="home" size={19} /><span>Visão geral</span></a>
        <a className="mobile-nav-item" href="/funil"><Icon name="funnel" size={19} /><span>Funil</span></a>
        <a className="mobile-nav-item" href="/conversas"><Icon name="chat" size={19} /><span>Conversas</span></a>
        <MobileLogout />
      </nav>

      {newCustomerOpen && <NewCustomerDialog onClose={() => setNewCustomerOpen(false)} onCreate={createCustomer} />}
      {activeConversation && <RecentConversationDialog customer={activeConversation} onClose={() => setActiveConversation(null)} />}
      {notice && <div className="toast" role="status">{notice}</div>}
    </div>
  );
}
