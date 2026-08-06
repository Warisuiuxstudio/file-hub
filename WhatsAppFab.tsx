import { MessageCircle } from "lucide-react";
import { profile } from "@/lib/portfolio";

export function WhatsAppFab() {
  return (
    <a
      href={profile.whatsapp}
      target="_blank"
      rel="noreferrer noopener"
      aria-label="Chat on WhatsApp"
      className="animate-pulse-ring fixed bottom-6 right-6 z-50 grid size-14 place-items-center rounded-full bg-[oklch(0.72_0.19_145)] text-[oklch(0.14_0.02_150)] shadow-luxe transition-transform hover:scale-110"
    >
      <MessageCircle className="size-6" />
    </a>
  );
}