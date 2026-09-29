import type { Conversation } from "./types";

export const initialConversations: Conversation[] = [
  {
    id: "mariana", name: "Mariana Silva", initials: "MS", tone: "tone-2", phone: "(11) 98765-4321",
    preview: "Legal! Posso conhecer a academia amanhã às 18h?", time: "14:32", unread: 0,
    status: "Em atendimento", owner: "João Silva", interest: "Plano anual", value: "R$ 1.499,90",
    summary: "Interesse no plano anual. Pediu uma visita amanhã às 18h.",
    internalNote: "Prefere contato após as 18h. Tem interesse nas aulas coletivas.", withAi: false,
    messages: [
      { id: "m1", sender: "client", text: "Oi! Queria saber mais sobre o plano anual.", time: "14:28" },
      { id: "m2", sender: "agent", text: "Olá, Mariana! O plano anual custa R$ 1.499,90 e inclui musculação e aulas coletivas.", time: "14:29", read: true },
      { id: "m3", sender: "client", text: "Legal! Posso conhecer a academia amanhã às 18h?", time: "14:32" },
    ],
  },
  {
    id: "carlos", name: "Carlos Oliveira", initials: "CO", tone: "tone-1", phone: "(21) 99768-5432",
    preview: "Vocês têm plano familiar?", time: "13:17", unread: 2,
    status: "Aguardando equipe", owner: "Ana Paula", interest: "Plano familiar", value: "A definir",
    summary: "Perguntou sobre planos para mais de uma pessoa.",
    internalNote: "Confirmar valores para dependentes antes de responder.", withAi: true,
    messages: [
      { id: "c1", sender: "client", text: "Oi, gostaria de conhecer os planos da academia.", time: "13:12" },
      { id: "c2", sender: "agent", text: "Claro, Carlos! Você procura um plano individual ou para a família?", time: "13:14", read: true },
      { id: "c3", sender: "client", text: "Vocês têm plano familiar?", time: "13:17" },
    ],
  },
  {
    id: "ana", name: "Ana Souza", initials: "AS", tone: "tone-0", phone: "(11) 91234-5678",
    preview: "Quais são os horários das aulas de funcional?", time: "11:03", unread: 1,
    status: "Aguardando equipe", owner: "Bruno Lima", interest: "Aulas de funcional", value: "Plano mensal",
    summary: "Quer saber os horários das aulas de funcional.",
    internalNote: "Enviar grade de horários da unidade escolhida.", withAi: false,
    messages: [
      { id: "a1", sender: "agent", text: "Bom dia, Ana! Como posso ajudar?", time: "10:56", read: true },
      { id: "a2", sender: "client", text: "Quais são os horários das aulas de funcional?", time: "11:03" },
    ],
  },
  {
    id: "juliana", name: "Juliana Costa", initials: "JC", tone: "tone-4", phone: "(41) 99123-9988",
    preview: "Tem desconto para pagamento anual?", time: "10:21", unread: 2,
    status: "Em atendimento", owner: "João Silva", interest: "Plano anual", value: "R$ 1.499,90",
    summary: "Comparando o plano mensal com o pagamento anual.",
    internalNote: "A IA sugeriu explicar as opções de pagamento.", withAi: true,
    messages: [
      { id: "j1", sender: "client", text: "Estou pensando em fechar o plano anual.", time: "10:15" },
      { id: "j2", sender: "agent", text: "Posso te explicar todas as condições, Juliana!", time: "10:18", read: true },
      { id: "j3", sender: "client", text: "Tem desconto para pagamento anual?", time: "10:21" },
    ],
  },
  {
    id: "pedro", name: "Pedro Santos", initials: "PS", tone: "tone-3", phone: "(31) 99887-6655",
    preview: "Obrigado pelo retorno!", time: "Ontem", unread: 0,
    status: "Resolvida", owner: "Ana Paula", interest: "Plano trimestral", value: "R$ 399,90",
    summary: "Dúvidas sobre o plano trimestral foram respondidas.",
    internalNote: "Aguardando retorno caso queira agendar uma visita.", withAi: false,
    messages: [
      { id: "p1", sender: "client", text: "Queria saber se posso visitar antes de fechar o plano.", time: "Ontem" },
      { id: "p2", sender: "agent", text: "Pode sim, Pedro. A equipe da recepção pode te receber hoje até as 20h.", time: "Ontem", read: true },
      { id: "p3", sender: "client", text: "Obrigado pelo retorno!", time: "Ontem" },
    ],
  },
];
