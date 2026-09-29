import type { FormEvent } from "react";
import { Avatar } from "../../../components/avatar";
import { Icon } from "../../../components/icon";
import type { Conversation } from "../types";

type ChatPanelProps = {
  conversation: Conversation;
  messageDraft: string;
  onDraftChange: (value: string) => void;
  onSendMessage: () => void;
  onTakeConversation: () => void;
  onBack: () => void;
  onNotify: (message: string) => void;
};

export function ChatPanel({ conversation, messageDraft, onDraftChange, onSendMessage, onTakeConversation, onBack, onNotify }: ChatPanelProps) {
  function submitMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSendMessage();
  }

  return (
    <section className="inbox-panel chat-panel" aria-label={`Conversa com ${conversation.name}`}>
      <header className="chat-header">
        <button type="button" className="icon-button conversation-back-button" aria-label="Voltar para as conversas" onClick={onBack}><Icon name="arrow" size={17} /></button>
        <Avatar initials={conversation.initials} tone={conversation.tone} className="chat-header-avatar" label={conversation.name} />
        <div className="chat-header-person"><strong>{conversation.name}</strong><span><Icon name="whatsapp" size={12} /> <i /> {conversation.status} <b>•</b> {conversation.owner}</span></div>
        <button type="button" className="row-action chat-more-button" aria-label="Mais opções" onClick={() => onNotify(`Opções da conversa com ${conversation.name}`)}><Icon name="more" /></button>
        <button type="button" className="button-secondary take-chat-button" onClick={onTakeConversation} disabled={Boolean(conversation.claimed)}><Icon name="user" size={14} /><span>{conversation.claimed ? "Atendimento assumido" : "Assumir atendimento"}</span></button>
      </header>

      <div className="chat-date-divider"><span>Hoje</span></div>
      <div className="chat-messages" aria-live="polite">
        {conversation.messages.map((message) => (
          <div className={`chat-message-row ${message.sender === "agent" ? "from-agent" : "from-client"}`} key={message.id}>
            <div className="chat-bubble"><p>{message.text}</p><span>{message.time}{message.sender === "agent" && <Icon name="check" size={12} />}</span></div>
          </div>
        ))}
      </div>

      <form className="message-composer" onSubmit={submitMessage}>
        <button type="button" className="composer-tool" aria-label="Anexar arquivo" onClick={() => onNotify("O envio de anexos será conectado em breve.")}><Icon name="paperclip" size={17} /></button>
        <label className="visually-hidden" htmlFor="message-draft">Digite uma mensagem</label>
        <input id="message-draft" value={messageDraft} onChange={(event) => onDraftChange(event.target.value)} placeholder="Digite uma mensagem..." />
        <button type="button" className="composer-tool emoji-tool" aria-label="Inserir emoji" onClick={() => onDraftChange(`${messageDraft}${messageDraft ? " " : ""}🙂`)}><Icon name="smile" size={17} /></button>
        <button type="submit" className="send-message-button" aria-label="Enviar mensagem"><Icon name="send" size={16} /></button>
      </form>
    </section>
  );
}
