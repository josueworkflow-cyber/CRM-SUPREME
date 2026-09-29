import type { Metadata } from "next";
import { LoginScreen } from "../../components/login-screen";

export const metadata: Metadata = {
  title: "Arena Supreme",
};

export default function LoginPage() {
  return <LoginScreen />;
}
