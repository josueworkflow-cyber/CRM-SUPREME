"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent, type MouseEvent } from "react";
import BragancaLogo from "../../../assets/logo bragança.png";
import ArenaSupremeLogo from "../../../assets/logo horizontal sem fundo.png";
import ArenaSupremeMark from "../../../assets/apenas a logo sem fundo.png";
import { Icon } from "./icon";
import styles from "./login.module.css";
import { getRememberedEmail, startMockSession } from "../lib/mock-auth";

export function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState("");
  const submissionStarted = useRef(false);

  useEffect(() => {
    const rememberedEmail = getRememberedEmail();
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRemember(true);
    }
  }, []);

  function authenticate(form: HTMLFormElement) {
    if (submissionStarted.current || !form.reportValidity()) return;
    const formData = new FormData(form);
    const submittedEmail = String(formData.get("email") ?? "").trim();
    const submittedPassword = String(formData.get("password") ?? "");
    if (!submittedEmail || !submittedPassword) return;

    submissionStarted.current = true;
    setFeedback("");
    setSubmitting(true);
    startMockSession(submittedEmail, remember);
    window.setTimeout(() => router.replace("/"), 280);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    authenticate(event.currentTarget);
  }

  function submitFromButton(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    if (event.currentTarget.form) authenticate(event.currentTarget.form);
  }

  return (
    <main className={styles.scope}>
      <section className="login-brand-panel" aria-label="Arena Supreme CRM">
        <div className="login-brand-glow" aria-hidden="true" />
        <div className="login-brand-top">
          <Image className="login-logo" src={ArenaSupremeLogo} alt="Arena Supreme" priority />
        </div>

        <Image className="login-watermark" src={ArenaSupremeMark} alt="" aria-hidden="true" priority={false} />

        <div className="login-pitch">
          <h1>Atendimento inteligente,<br />resultados reais.</h1>
          <span className="login-accent-line" />
          <p>Atendimento, vendas e gestão<br className="desktop-break" /> em um só lugar.</p>
        </div>
        <small className="login-credit">
          <span>Desenvolvido por:</span>
          <Image className="login-credit-logo" src={BragancaLogo} alt="Bragança Automações" />
        </small>
      </section>

      <section className="login-main" aria-label="Acesso à conta">
        <div className="login-card">
          <div className="login-mobile-brand">
            <Image className="login-logo" src={ArenaSupremeLogo} alt="Arena Supreme" priority />
          </div>
          <div className="login-heading">
            <h2>Bem-vindo de volta</h2>
            <p>Entre na sua conta para acessar o CRM.</p>
          </div>

          <form className="login-form" onSubmit={submit} autoComplete="off">
            <label className="login-label" htmlFor="login-email">E-mail</label>
            <div className="login-input-wrap">
              <Icon name="mail" size={16} />
              <input
                id="login-email"
                name="email"
                type="email"
                placeholder="voce@email.com"
                autoComplete="off"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>

            <label className="login-label" htmlFor="login-password">Senha</label>
            <div className="login-input-wrap">
              <Icon name="lock" size={16} />
              <input
                id="login-password"
                name="password"
                type={passwordVisible ? "text" : "password"}
                placeholder="Digite sua senha"
                autoComplete="off"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
              <button
                className="password-visibility"
                type="button"
                aria-label={passwordVisible ? "Ocultar senha" : "Mostrar senha"}
                aria-pressed={passwordVisible}
                onClick={() => setPasswordVisible((visible) => !visible)}
              >
                <Icon name={passwordVisible ? "eyeOff" : "eye"} size={17} />
              </button>
            </div>

            <div className="login-options">
              <label className="remember-option">
                <input type="checkbox" checked={remember} onChange={(event) => setRemember(event.target.checked)} />
                <span className="custom-checkbox" aria-hidden="true"><Icon name="check" size={12} /></span>
                <span>Manter conectado</span>
              </label>
              <button className="forgot-link" type="button" onClick={() => setFeedback("Para redefinir sua senha, fale com o administrador da sua equipe.")}>Esqueci minha senha</button>
            </div>

            <button className="login-submit" type="submit" onClick={submitFromButton} disabled={submitting}>
              {submitting ? <><span className="login-button-spinner" aria-hidden="true" />Entrando...</> : "Entrar"}
            </button>
            {feedback && <p className="login-feedback" role="status">{feedback}</p>}
          </form>

          <div className="login-access-note"><Icon name="lock" size={12} /><span>Acesso demonstrativo · qualquer e-mail válido e senha</span></div>
        </div>
      </section>
    </main>
  );
}
