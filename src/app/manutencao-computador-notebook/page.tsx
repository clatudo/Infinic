import React from "react";
import Link from "next/link";
import { Laptop, HardDrive, Cpu, Sparkles, Wrench, ShieldCheck } from "lucide-react";

export const metadata = {
    title: "Manutenção de Computador e Notebook",
    description: "Limpeza térmica, upgrade de SSD NVMe e memória RAM, formatação com backup e reparo de carcaça.",
};

const PC_SERVICES = [
    {
        title: "Upgrade para SSD NVMe M.2",
        desc: "Aumente em até 10x a velocidade de inicialização e abertura de programas do seu computador.",
        icon: HardDrive,
    },
    {
        title: "Limpeza Preventiva & Pasta Térmica",
        desc: "Remoção de poeira e aplicação de pasta térmica de alta condutividade para evitar superaquecimento.",
        icon: Sparkles,
    },
    {
        title: "Recuperação de Dobradiças e Carcaça",
        desc: "Reconstrução plástica estrutural de suportes rompidos sem necessidade de trocar a tampa inteira.",
        icon: Wrench,
    },
    {
        title: "Reparo de Placa-Mãe e Fontes",
        desc: "Diagnóstico de trilhas rompidas, capacitores estufados e curto na linha de alimentação de 19V.",
        icon: Cpu,
    },
];

export default function ComputadorNotebookPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
            <div className="max-w-3xl space-y-4">
                <span className="badge-warranty">[90 DIAS DE GARANTIA]</span>
                <h1 className="heading-hero">Manutenção de Notebooks, MacBooks e Desktops</h1>
                <p className="text-zinc-600 text-base leading-relaxed">
                    Desde lentidão e travamentos até reconstrução mecânica e recuperação eletrônica de circuitos. Diagnósticos claros sem termos técnicos confusos.
                </p>
                <div className="pt-2 flex flex-wrap gap-4">
                    <Link href="/orcamento" className="btn-primary">Orçar Manutenção de Computador</Link>
                    <Link href="/atendimento-domiciliar-empresas" className="px-5 py-3 rounded-lg border border-zinc-300 font-bold text-sm bg-white hover:bg-zinc-100">Solicitar Leva e Traz</Link>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {PC_SERVICES.map((serv, i) => {
                    const Icon = serv.icon;
                    return (
                        <div key={i} className="card-infinic">
                            <div className="w-12 h-12 rounded-xl bg-[#FACC15]/20 flex items-center justify-center text-[#18181B] mb-4">
                                <Icon className="w-6 h-6" />
                            </div>
                            <h3 className="font-heading font-bold text-base text-[#18181B] mb-2">{serv.title}</h3>
                            <p className="text-xs text-zinc-600 leading-relaxed">{serv.desc}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}