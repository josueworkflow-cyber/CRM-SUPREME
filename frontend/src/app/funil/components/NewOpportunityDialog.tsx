import type { FormEvent } from "react";
import { Icon } from "../../../components/icon";
import { owners, stages } from "../data";
import type { StageId } from "../types";

type NewOpportunityDialogProps = {
  stage: StageId;
  onClose: () => void;
  onCreate: (formData: FormData) => void;
};

export function NewOpportunityDialog({ stage, onClose, onCreate }: NewOpportunityDialogProps) {
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onCreate(new FormData(event.currentTarget));
  }

  return (
    <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="modal" role="dialog" aria-modal="true" aria-labelledby="new-opportunity-title">
        <div className="modal-topline">
          <div><span className="eyebrow">FUNIL DE VENDAS</span><h2 id="new-opportunity-title">Nova oportunidade</h2></div>
          <button type="button" className="icon-button" aria-label="Fechar" onClick={onClose}><Icon name="close" /></button>
        </div>
        <p className="modal-copy">Registre o interesse e defina a próxima etapa do atendimento.</p>
        <form className="customer-form" onSubmit={submit}>
          <label>Cliente<input name="name" placeholder="Nome do cliente" required autoFocus /></label>
          <div className="form-row">
            <label>Plano<select name="plan" defaultValue="Plano mensal"><option>Plano mensal</option><option>Plano trimestral</option><option>Plano anual</option></select></label>
            <label>Valor (R$)<input name="price" placeholder="149,90" required inputMode="decimal" /></label>
          </div>
          <div className="form-row">
            <label>Responsável<select name="owner" defaultValue="João Silva">{owners.map((owner) => <option key={owner}>{owner}</option>)}</select></label>
            <label>Etapa<select name="stage" defaultValue={stage}>{stages.map((item) => <option value={item.id} key={item.id}>{item.label}</option>)}</select></label>
          </div>
          <div className="modal-actions"><button type="button" className="button-secondary" onClick={onClose}>Cancelar</button><button type="submit" className="button-primary">Adicionar ao funil</button></div>
        </form>
      </section>
    </div>
  );
}
