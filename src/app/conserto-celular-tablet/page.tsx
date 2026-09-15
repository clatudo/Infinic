import React from "react";
import Link from "next/link";
import { Smartphone, BatteryCharging, ShieldAlert, Cpu, Database, CheckCircle2, ShieldCheck, ArrowRight } from "lucide-react";

export const metadata = {
    title: "Conserto de Celular e Tablet",
    description: "Troca de telas originais, substituição de bateria, desoxidação e reparos em placas de iPhones, iPads e Androids.",
};

const SERVICES = [
    {
        title: "Troca de Tela & Display",
        desc: "Substituição com módulos originais e calibração de TrueTone e biometria na hora.",
        time: "Até 1h30min",
        icon: Smartphone,
    },
    {
        title: "Bateria Nova com Saúde 100%",
        desc: "Baterias seladas com chip controlador de carga contra sobretensão.",
        time: "Até 45 minutos",
        icon: BatteryCharging,
    },
    {
        title: "Desoxidação & Aparelhos Molhados",
        desc: "Banho ultrassônico químico para remoção de resíduos e corrosão mineral.",
        time: "Até 24 horas",
        icon: ShieldAlert,
    },
    {
        title: "Microssolda em Placa Lógica",
        desc: "Reparo de curto, circuito integrado de carga (Tristar/Hydra) e áudio.",
        time: "Sob laudo",
        icon: Cpu,
    },
    {
        title: "Recuperação de Dados e Memória",
        desc: "Extração de fotos, conversas e documentos de aparelhos que não iniciam.",
        time: "Sob consulta",
        icon: Database,
    },
];

export default function CelularTabletPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
            <div className="max-w-3xl space-y-4">
                <span className="badge-warranty">[90 DIAS DE GARANTIA]</span>
                <h1 className="heading-hero">Reparo Especializado de Celulares & Tablets</h1>
                <p className="text-zinc-600 text-base leading-relaxed">
                    Recuperamos seu iPhone, iPad ou smartphone Android com peças homologadas, bancada aterrada contra descargas eletrostáticas (ESD) e laudo formal de calibração.
                </p>
                <div className="pt-2 flex flex-wrap gap-4">
                    <Link href="/orcamento" className="btn-primary">Solicitar Orçamento Deste Aparelho</Link>
                    <Link href="/status-os" className="px-5 py-3 rounded-lg border border-zinc-300 font-bold text-sm bg-white hover:bg-zinc-100">Consultar Minha OS</Link>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {SERVICES.map((s, idx) => {
                    const Icon = s.icon;
                    return (
                        <div key={idx} className="card-infinic flex flex-col justify-between">
                            <div className="space-y-3">
                                <div className="w-12 h-12 rounded-xl bg-[#FACC15]/20 flex items-center justify-center text-[#18181B]">
                                    <Icon className="w-6 h-6" />
                                </div>
                                <h3 className="font-heading font-bold text-lg text-[#18181B]">{s.title}</h3>
                                <p className="text-xs text-zinc-600 leading-relaxed">{s.desc}</p>
                            </div>
                            <div className="pt-4 mt-4 border-t border-zinc-100 flex items-center justify-between text-xs font-bold">
                                <span className="text-zinc-500">Tempo estimado:</span>
                                <span className="text-[#854D0E] bg-[#FACC15]/20 px-2.5 py-0.5 rounded-full">{s.time}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}