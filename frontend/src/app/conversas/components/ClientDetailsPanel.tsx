import type { FormEvent } from "react";
import { Avatar } from "../../../components/avatar";
import { Icon } from "../../../components/icon";
import type { Conversation } from "../types";

type ClientDetailsPanelProps = {
  conversation: Conversation;
  noteDraft: string;
  onNoteChange: (value: string) => void;
  onSave: () => void;
  onNotify: (message: string) => void;
};

export function ClientDetailsPanel({ conversation, noteDraft, onNoteChange, onSave, onNotify }: ClientDetailsPanelProps) {
  function submitNote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSave();
  }

  return (
    <aside className="inbox-panel client-details-panel" aria-label="Detalhes do cliente">
      <div className="details-heading"><h2>Detalhes do cliente</h2><button type="button" className="row-action details-more-button" aria-label="Mais detalhes" onClick={() => onNotify(`Mais detalhes de ${conversation.name}`)}><Icon name="more" /></button></div>
      <div className="client-identity">
        <Avatar initials={conversation.initials} tone={conversation.tone} className="client-detail-avatar" label={conversation.name} />
        <div><strong>{conversation.name}</strong><span><Icon name="whatsapp" size={12} /> {conversation.phone}</span></div>
      </div>
      <span className={`status-pill ${conversation.status === "Resolvida" ? "status-done" : ""}`}><i />{conversation.status}<Icon name="chevron" size={12} /></span>

      <div className="client-fields">
        <div className="client-field"><Icon name="user" size={15} /><span>Responsável</span><strong><span className="owner-chip">{conversation.owner.split(" ").map((part) => part[0]).join("")}</span>{conversation.owner}</strong></div>
        <div className="client-field"><Icon name="assistant" size={15} /><span>Interesse</span><strong>{conversation.interest}</strong></div>
        <div className="client-field"><Icon name="percent" size={15} /><span>Valor</span><strong>{conversation.value}</strong></div>
      </div>

      <section className="conversation-summary"><h3><Icon name="document" size={15} />Resumo da conversa</h3><p>{conversation.summary}</p></section>
      <form className="internal-note-form" onSubmit={submitNote}>
        <label htmlFor="internal-note"><Icon name="calendar" size={15} />Observações internas</label>
        <small>Visível apenas para a equipe</small>
        <textarea id="internal-note" value={noteDraft} onChange={(event) => onNoteChange(event.target.value)} rows={3} />
        <button type="submit" className="button-primary">Salvar observação</button>
      </form>
    </aside>
  );
}
