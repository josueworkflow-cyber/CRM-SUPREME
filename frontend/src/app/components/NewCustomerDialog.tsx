import type { FormEvent } from "react";
import { Icon } from "../../components/icon";

type NewCustomerDialogProps = {
  onClose: () => void;
  onCreate: (name: string, phone: string) => void;
};

export function NewCustomerDialog({ onClose, onCreate }: NewCustomerDialogProps) {
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    onCreate(String(data.get("name") ?? "").trim(), String(data.get("phone") ?? "").trim());
  }

  return (
    <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="modal" role="dialog" aria-modal="true" aria-labelledby="new-customer-title">
        <div className="modal-topline">
          <div><span className="eyebrow">CADASTRO RÁPIDO</span><h2 id="new-customer-title">Novo cliente</h2></div>
          <button type="button" className="icon-button" aria-label="Fechar" onClick={onClose}><Icon name="close" /></button>
        </div>
        <p className="modal-copy">Adicione um contato à sua lista de atendimento.</p>
        <form onSubmit={submit} className="customer-form">
          <label>Nome<input name="name" placeholder="Nome do cliente" required autoFocus /></label>
          <label>Telefone<input name="phone" placeholder="(00) 00000-0000" inputMode="tel" /></label>
          <div className="modal-actions"><button type="button" className="button-secondary" onClick={onClose}>Cancelar</button><button type="submit" className="button-primary">Cadastrar cliente</button></div>
        </form>
      </section>
    </div>
  );
}
