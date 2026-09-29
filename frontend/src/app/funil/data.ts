import type { FunnelStage, Opportunity } from "./types";

export const stages: FunnelStage[] = [
  { id: "new", label: "Novo" },
  { id: "in-progress", label: "Em atendimento" },
  { id: "negotiation", label: "Negociação" },
  { id: "closed", label: "Fechado" },
  { id: "lost", label: "Perdido" },
];

export const owners = ["João Silva", "Ana Paula", "Bruno Lima"];

export const avatarTones = ["tone-0", "tone-1", "tone-2", "tone-3", "tone-4"];

export const initialOpportunities: Opportunity[] = [
  { id: "op-1", name: "Mariana Silva", plan: "Plano mensal", price: "R$ 149,90", owner: "João Silva", ownerInitials: "JS", stage: "new", note: "Primeiro contato", signal: "chat", accent: "Hoje" },
  { id: "op-2", name: "Lucas Pereira", plan: "Plano trimestral", price: "R$ 399,90", owner: "Ana Paula", ownerInitials: "AP", stage: "new", note: "Aguardando contato", signal: "chat" },
  { id: "op-3", name: "Beatriz Lima", plan: "Plano mensal", price: "R$ 149,90", owner: "Bruno Lima", ownerInitials: "BL", stage: "new", note: "Novo interesse", signal: "chat" },
  { id: "op-4", name: "Carlos Oliveira", plan: "Plano anual", price: "R$ 1.499,90", owner: "Ana Paula", ownerInitials: "AP", stage: "in-progress", note: "Visita agendada", signal: "calendar", accent: "Amanhã" },
  { id: "op-5", name: "Juliana Costa", plan: "Plano mensal", price: "R$ 149,90", owner: "João Silva", ownerInitials: "JS", stage: "in-progress", note: "Retornar hoje", signal: "clock", aiFlag: true },
  { id: "op-6", name: "Ana Souza", plan: "Plano anual", price: "R$ 1.499,90", owner: "Bruno Lima", ownerInitials: "BL", stage: "negotiation", note: "Proposta enviada", signal: "document" },
  { id: "op-7", name: "Rafael Mendes", plan: "Plano trimestral", price: "R$ 399,90", owner: "Ana Paula", ownerInitials: "AP", stage: "negotiation", note: "Aguardando resposta", signal: "chat" },
  { id: "op-8", name: "Pedro Santos", plan: "Plano anual", price: "R$ 1.499,90", owner: "João Silva", ownerInitials: "JS", stage: "closed", note: "Matrícula concluída", signal: "checkCircle" },
  { id: "op-9", name: "Camila Rocha", plan: "Plano mensal", price: "R$ 149,90", owner: "Bruno Lima", ownerInitials: "BL", stage: "closed", note: "Matrícula concluída", signal: "checkCircle" },
  { id: "op-10", name: "Bruno Alves", plan: "Plano mensal", price: "R$ 149,90", owner: "Ana Paula", ownerInitials: "AP", stage: "lost", note: "Sem interesse no momento", signal: "xCircle" },
];
