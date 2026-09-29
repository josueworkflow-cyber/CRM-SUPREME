import type { Customer, CustomerStage } from "./types";

export const initialCustomers: Customer[] = [
  { id: 1, name: "Mariana Silva", phone: "(11) 98765-4321", time: "há 12 min", message: "Qual o valor do plano?", stage: "Novo", owner: "João Silva" },
  { id: 2, name: "Carlos Oliveira", phone: "(21) 99786-5432", time: "há 2 horas", message: "Envio de proposta", stage: "Em atendimento", owner: "Ana Paula" },
  { id: 3, name: "Ana Souza", phone: "(11) 91234-5678", time: "há 3 horas", message: "Tirou dúvidas sobre horários", stage: "Negociação", owner: "Bruno Lima" },
  { id: 4, name: "Pedro Santos", phone: "(31) 99887-6655", time: "há 5 horas", message: "Solicitou avaliação física", stage: "Fechado", owner: "Ana Paula" },
  { id: 5, name: "Juliana Costa", phone: "(41) 99123-9988", time: "há 1 dia", message: "Pediu mais informações", stage: "Em atendimento", owner: "João Silva" },
];

export const stageClass: Record<CustomerStage, string> = {
  Novo: "stage-new",
  "Em atendimento": "stage-progress",
  Negociação: "stage-negotiation",
  Fechado: "stage-won",
};

export function getInitials(name: string) {
  return name.split(" ").slice(0, 2).map((part) => part[0]).join("").toUpperCase();
}
