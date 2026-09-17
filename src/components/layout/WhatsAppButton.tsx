import React from "react";
import { MessageCircle } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants.js";

interface WhatsAppButtonProps {
    phoneNumber?: string;
    defaultMessage?: string;
}

export function WhatsAppButton({
    defaultMessage = "Olá! Gostaria de falar com um técnico da Infinic para tirar dúvidas sobre meu aparelho.",
}: WhatsAppButtonProps) {
    const encoded = encodeURIComponent(defaultMessage);
    const url = `https://wa.me/${SITE_CONFIG.whatsapp.number}?text=${encoded}`;

    return (
        <div className="fixed bottom-6 right-6 z-50 flex items-center group">
            <div className="hidden sm:flex items-center mr-3 px-3 py-1.5 rounded-lg bg-[#18181B] text-white text-xs font-semibold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 border border-zinc-700 pointer-events-none">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping mr-2" />
                Falar com Técnico no WhatsApp
            </div>

            <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Atendimento via WhatsApp Infinic"
                className="relative flex items-center justify-center w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-emerald-400/50"
            >
                <span className="absolute -inset-1 rounded-full bg-emerald-500 opacity-35 animate-ping pointer-events-none" />
                <MessageCircle className="w-8 h-8 relative z-10 fill-current text-white" />
            </a>
        </div>
    );
}