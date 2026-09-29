export type CustomerStage = "Novo" | "Em atendimento" | "Negociação" | "Fechado";

export type Customer = {
  id: number;
  name: string;
  phone: string;
  time: string;
  message: string;
  stage: CustomerStage;
  owner: string;
};
