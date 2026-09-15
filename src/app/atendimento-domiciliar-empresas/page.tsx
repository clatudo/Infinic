import React from "react";
import Link from "next/link";
import { Building2, Home, Truck, ShieldCheck, CheckCircle2, Clock, PhoneCall } from "lucide-react";

export const metadata = {
    title: "Atendimento em Domicílio e Empresas B2B",
    description: "Contratos de manutenção de T.I. corporativo com SLA, suporte presencial e serviço leva e traz com segurança.",
};

export default function EmpresasDomicilioPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
            <div className="max-w-3xl space-y-4">
                <span className="badge-warranty">CONTRATOS CORPORATIVOS & HOME OFFICE</span>
                <h1 className="heading-hero">Suporte Técnico Empresarial e em Domicílio</h1>
                <p className="text-zinc-600 text-base leading-relaxed">
                    Garanta que as operações do seu escritório, clínica ou home office não parem. Planos mensais com atendimento presencial, vistorias preventivas e faturamento facilitado.
                </p>
                <div className="pt-2 flex flex-wrap gap-4">
                    <Link href="/orcamento" className="btn-primary">Solicitar Proposta B2B</Link>
                    <a
                        href="https://wa.me/5511999998888?text=Ol%C3%A1!%20Gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20contratos%20corporativos%20B2B%20da%20Infinic."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-3 rounded-lg border border-zinc-300 font-bold text-sm bg-white hover:bg-zinc-100 flex items-center gap-2"
                    >
                        <PhoneCall className="w-4 h-4 text-emerald-600" />
                        Falar com Consultor Corporativo
                    </a>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="card-infinic space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-[#FACC15]/20 flex items-center justify-center text-[#18181B]">
                        <Building2 className="w-6 h-6" />
                    </div>
                    <h3 className="font-heading font-bold text-lg text-[#18181B]">Contratos B2B com SLA</h3>
                    <p className="text-xs text-zinc-600 leading-relaxed">
                        Tempo de resposta garantido em até 4 horas úteis para chamados críticos, inventário patrimonial e manutenção preventiva regular.
                    </p>
                </div>

                <div className="card-infinic space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-[#FACC15]/20 flex items-center justify-center text-[#18181B]">
                        <Truck className="w-6 h-6" />
                    </div>
                    <h3 className="font-heading font-bold text-lg text-[#18181B]">Malote Seguro Leva e Traz</h3>
                    <p className="text-xs text-zinc-600 leading-relaxed">
                        Coleta no endereço da sua empresa com recibo digital, número de lacre inviolável e seguro de transporte integrado.
                    </p>
                </div>

                <div className="card-infinic space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-[#FACC15]/20 flex items-center justify-center text-[#18181B]">
                        <Home className="w-6 h-6" />
                    </div>
                    <h3 className="font-heading font-bold text-lg text-[#18181B]">Visita Residencial Especializada</h3>
                    <p className="text-xs text-zinc-600 leading-relaxed">
                        Técnicos uniformizados e identificados para resolver lentidão de redes cabeadas/Wi-Fi, impressoras e estações de trabalho em domicílio.
                    </p>
                </div>
            </div>
        </div>
    );
}