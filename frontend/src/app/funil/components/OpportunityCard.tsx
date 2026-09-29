import type { DragEvent } from "react";
import { Avatar } from "../../../components/avatar";
import { Icon } from "../../../components/icon";
import { avatarTones } from "../data";
import type { Opportunity } from "../types";

type OpportunityCardProps = {
  opportunity: Opportunity;
  index: number;
  onOpen: (opportunity: Opportunity) => void;
  onDragStart: (event: DragEvent<HTMLElement>, opportunity: Opportunity) => void;
  isDragging: boolean;
};

function getInitials(name: string) {
  return name.split(" ").slice(0, 2).map((part) => part[0]).join("").toUpperCase();
}

export function OpportunityCard({ opportunity, index, onOpen, onDragStart, isDragging }: OpportunityCardProps) {
  return (
    <article
      className={`opportunity-card${isDragging ? " is-dragging" : ""}`}
      draggable
      role="button"
      tabIndex={0}
      aria-label={`Abrir oportunidade de ${opportunity.name}`}
      onClick={() => onOpen(opportunity)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onOpen(opportunity);
        }
      }}
      onDragStart={(event) => onDragStart(event, opportunity)}
    >
      <div className="opportunity-main">
        <Avatar initials={getInitials(opportunity.name)} tone={avatarTones[index % avatarTones.length]} label={opportunity.name} />
        <div className="opportunity-customer"><strong>{opportunity.name}</strong><span>{opportunity.plan}</span></div>
        <span className="owner-initials" title={`Responsável: ${opportunity.owner}`}>{opportunity.ownerInitials}</span>
      </div>
      <strong className="opportunity-price">{opportunity.price}</strong>
      {opportunity.aiFlag ? (
        <div className="opportunity-signal-stack">
          <span className="ai-attention"><Icon name="assistant" size={14} /> Atenção da IA</span>
          <span className="opportunity-signal"><Icon name={opportunity.signal} size={15} /> {opportunity.note}</span>
        </div>
      ) : (
        <div className={`opportunity-signal signal-${opportunity.signal}`}>
          <Icon name={opportunity.signal} size={15} />
          <span>{opportunity.note}</span>
          {opportunity.accent && <strong>{opportunity.accent}</strong>}
        </div>
      )}
    </article>
  );
}
