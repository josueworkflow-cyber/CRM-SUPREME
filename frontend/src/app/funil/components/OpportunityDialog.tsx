import { Avatar } from "../../../components/avatar";
import { Icon } from "../../../components/icon";
import { owners, stages } from "../data";
import type { Opportunity, StageId } from "../types";

type OpportunityDialogProps = {
  opportunity: Opportunity;
  onClose: () => void;
  onMove: (id: string, stage: StageId) => void;
  onAssign: (id: string, owner: string) => void;
};

function getInitials(name: string) {
  return name.split(" ").slice(0, 2).map((part) => part[0]).join("").toUpperCase();
}

export function OpportunityDialog({ opportunity, onClose, onMove, onAssign }: OpportunityDialogProps) {
  return (
    <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="modal opportunity-dialog" role="dialog" aria-modal="true" aria-labelledby="opportunity-dialog-title">
        <div className="modal-topline">
          <div className="opportunity-dialog-person">
            <Avatar initials={getInitials(opportunity.name)} tone={2} label={opportunity.name} />
            <div><span className="eyebrow">OPORTUNIDADE</span><h2 id="opportunity-dialog-title">{opportunity.name}</h2></div>
          </div>
          <button type="button" className="icon-button" aria-label="Fechar" onClick={onClose}><Icon name="close" /></button>
        </div>
        <div className="opportunity-dialog-plan"><span>{opportunity.plan}</span><strong>{opportunity.price}</strong></div>
        <label className="dialog-field">Etapa
          <select value={opportunity.stage} onChange={(event) => onMove(opportunity.id, event.target.value as StageId)}>
            {stages.map((stage) => <option value={stage.id} key={stage.id}>{stage.label}</option>)}
          </select>
        </label>
        <label className="dialog-field">Responsável
          <select value={opportunity.owner} onChange={(event) => onAssign(opportunity.id, event.target.value)}>
            {owners.map((owner) => <option value={owner} key={owner}>{owner}</option>)}
          </select>
        </label>
        <div className="modal-actions"><button type="button" className="button-primary" onClick={onClose}>Concluir</button></div>
      </section>
    </div>
  );
}
