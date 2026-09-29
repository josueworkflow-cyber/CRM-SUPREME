import type { DragEvent } from "react";
import Link from "next/link";
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
  const params = new URLSearchParams({
    cliente: opportunity.name,
    plano: opportunity.plan,
    valor: opportunity.price,
    responsavel: opportunity.owner,
    oportunidade: opportunity.id,
    nota: opportunity.note,
  });

  return (
    <article
      className={`opportunity-card${isDragging ? " is-dragging" : ""}`}
      draggable
      onDragStart={(event) => onDragStart(event, opportunity)}
    >
      <Link className="opportunity-card-link" href={`/conversas?${params.toString()}`} aria-label={`Abrir conversa de ${opportunity.name}`}>
        <div className="opportunity-main">
          <Avatar initials={getInitials(opportunity.name)} tone={avatarTones[index % avatarTones.length]} label={opportunity.name} />
          <div className="opportunity-customer"><strong>{opportunity.name}</strong><span>{opportunity.plan}</span></div>
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
      </Link>
      <button
        type="button"
        className="owner-initials"
        title={`Editar oportunidade de ${opportunity.name}`}
        aria-label={`Editar oportunidade de ${opportunity.name}`}
        draggable={false}
        onClick={() => onOpen(opportunity)}
      >
        {opportunity.ownerInitials}
      </button>
    </article>
  );
}
