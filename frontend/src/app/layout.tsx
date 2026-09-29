import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AuthGate } from "../components/auth-gate";
import "./globals.css";

export const metadata: Metadata = {
  title: "Arena Supreme",
  description: "Painel de atendimento e relacionamento com clientes da Arena Supreme.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body><AuthGate>{children}</AuthGate></body>
    </html>
  );
}
