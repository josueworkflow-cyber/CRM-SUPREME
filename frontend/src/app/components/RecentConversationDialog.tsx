import { Avatar } from "../../components/avatar";
import { Icon } from "../../components/icon";
import { stageClass } from "../data";
import type { Customer } from "../types";

type RecentConversationDialogProps = {
  customer: Customer;
  onClose: () => void;
};

function initials(name: string) {
  return name.split(" ").slice(0, 2).map((part) => part[0]).join("").toUpperCase();
}

export function RecentConversationDialog({ customer, onClose }: RecentConversationDialogProps) {
  return (
    <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="modal conversation-modal" role="dialog" aria-modal="true" aria-labelledby="conversation-title">
        <div className="modal-topline">
          <div className="conversation-person"><Avatar initials={initials(customer.name)} label={customer.name} /><div><h2 id="conversation-title">{customer.name}</h2><span>{customer.phone || "Telefone não informado"}</span></div></div>
          <button type="button" className="icon-button" aria-label="Fechar" onClick={onClose}><Icon name="close" /></button>
        </div>
        <div className="conversation-status"><span className={`stage-badge ${stageClass[customer.stage]}`}>{customer.stage}</span><span>Responsável: {customer.owner}</span></div>
        <div className="message-preview"><span className="message-time">Última interação · {customer.time}</span><p>{customer.message}</p></div>
        <div className="conversation-note"><Icon name="assistant" /> Prévia demonstrativa. O histórico do WhatsApp será conectado em uma próxima etapa.</div>
        <div className="modal-actions"><button type="button" className="button-primary" onClick={onClose}>Voltar ao painel</button></div>
      </section>
    </div>
  );
}
