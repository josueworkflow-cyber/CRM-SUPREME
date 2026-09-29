import { Icon } from "../../../components/icon";
import { Avatar } from "../../../components/avatar";
import type { Conversation, InboxFilter, StatusFilter } from "../types";

type ConversationListProps = {
  conversations: Conversation[];
  visibleConversations: Conversation[];
  activeId: string;
  search: string;
  inboxFilter: InboxFilter;
  statusFilter: StatusFilter;
  unreadCount: number;
  filtersOpen: boolean;
  onSearchChange: (value: string) => void;
  onInboxFilterChange: (filter: InboxFilter) => void;
  onStatusFilterChange: (filter: StatusFilter) => void;
  onFiltersOpenChange: (open: boolean) => void;
  onSelect: (conversation: Conversation) => void;
};

const statusOptions: StatusFilter[] = ["Todos os status", "Em atendimento", "Aguardando equipe", "Resolvida"];

export function ConversationList({
  conversations,
  visibleConversations,
  activeId,
  search,
  inboxFilter,
  statusFilter,
  unreadCount,
  filtersOpen,
  onSearchChange,
  onInboxFilterChange,
  onStatusFilterChange,
  onFiltersOpenChange,
  onSelect,
}: ConversationListProps) {
  return (
    <aside className="inbox-panel conversation-list-panel" aria-label="Lista de conversas">
      <div className="inbox-search-row">
        <label className="inbox-search"><Icon name="search" size={16} /><span className="visually-hidden">Buscar conversa</span><input value={search} onChange={(event) => onSearchChange(event.target.value)} placeholder="Buscar conversa" /></label>
        <div className="filter-menu-wrap">
          <button type="button" className={`icon-button inbox-filter-button${filtersOpen ? " active" : ""}`} aria-label="Filtros avançados" aria-expanded={filtersOpen} onClick={() => onFiltersOpenChange(!filtersOpen)}><Icon name="filter" size={15} /></button>
          {filtersOpen && <div className="inbox-filter-menu"><strong>Status da conversa</strong>{statusOptions.map((status) => <button type="button" className={statusFilter === status ? "chosen" : ""} key={status} onClick={() => { onStatusFilterChange(status); onFiltersOpenChange(false); }}>{status}</button>)}</div>}
        </div>
      </div>

      <div className="inbox-tabs" role="tablist" aria-label="Filtrar conversas">
        <button type="button" role="tab" aria-selected={inboxFilter === "all"} className={inboxFilter === "all" ? "selected" : ""} onClick={() => onInboxFilterChange("all")}>Todas <span>{conversations.length}</span></button>
        <button type="button" role="tab" aria-selected={inboxFilter === "unread"} className={inboxFilter === "unread" ? "selected" : ""} onClick={() => onInboxFilterChange("unread")}>Não lidas <span>{unreadCount}</span></button>
        <button type="button" role="tab" aria-selected={inboxFilter === "ai"} className={inboxFilter === "ai" ? "selected" : ""} onClick={() => onInboxFilterChange("ai")}>Com IA</button>
      </div>

      <div className="conversation-list-scroll">
        {visibleConversations.map((conversation) => (
          <button type="button" key={conversation.id} className={`conversation-list-item${activeId === conversation.id ? " selected" : ""}`} onClick={() => onSelect(conversation)} aria-current={activeId === conversation.id ? "true" : undefined}>
            <Avatar initials={conversation.initials} tone={conversation.tone} className="conversation-avatar" label={conversation.name} />
            <span className="conversation-item-copy">
              <span className="conversation-item-top"><strong>{conversation.name}</strong><time>{conversation.time}</time></span>
              <span className="conversation-preview">{conversation.preview}</span>
              <span className="conversation-item-meta">{conversation.withAi && <span className="ai-mini-tag"><Icon name="assistant" size={11} /> Com IA</span>}{conversation.unread > 0 && <span className="unread-count">{conversation.unread}</span>}</span>
            </span>
          </button>
        ))}
        {visibleConversations.length === 0 && <div className="empty-inbox">Nenhuma conversa encontrada.</div>}
      </div>
    </aside>
  );
}
