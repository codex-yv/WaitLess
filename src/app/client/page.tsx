import { Sparkles } from "lucide-react";
import { Header } from "@/components/client/Header";
import { Timeline } from "@/components/client/Timeline";
import { ActionButtons } from "@/components/client/ActionButtons";
import { Footer } from "@/components/client/Footer";
import { ThemeProvider } from "@/contexts/ThemeContext";
import ClientPageContent from "./ClientPageContent.tsx";

export const metadata = {
  title: "WaitLess — You're in line",
  description: "Track your queue position in real time with WaitLess. Live updates, estimated wait time, and smooth queue management.",
};

export default function ClientPage() {
  return (
    <ThemeProvider>
      <ClientPageContent />
    </ThemeProvider>
  );
}
