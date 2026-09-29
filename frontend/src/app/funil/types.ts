export type StageId = "new" | "in-progress" | "negotiation" | "closed" | "lost";
export type SignalIcon = "chat" | "calendar" | "assistant" | "clock" | "document" | "checkCircle" | "xCircle";

export type FunnelStage = { id: StageId; label: string };

export type Opportunity = {
  id: string;
  name: string;
  plan: string;
  price: string;
  owner: string;
  ownerInitials: string;
  stage: StageId;
  note: string;
  signal: SignalIcon;
  accent?: string;
  aiFlag?: boolean;
};
