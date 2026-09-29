export type ChatMessage = {
  id: string;
  sender: "client" | "agent";
  text: string;
  time: string;
  read?: boolean;
};

export type ConversationStatus = "Em atendimento" | "Aguardando equipe" | "Resolvida";

export type Conversation = {
  id: string;
  name: string;
  initials: string;
  tone: string;
  phone: string;
  preview: string;
  time: string;
  unread: number;
  status: ConversationStatus;
  owner: string;
  interest: string;
  value: string;
  summary: string;
  internalNote: string;
  withAi: boolean;
  claimed?: boolean;
  messages: ChatMessage[];
};

export type InboxFilter = "all" | "unread" | "ai";
export type StatusFilter = "Todos os status" | ConversationStatus;
