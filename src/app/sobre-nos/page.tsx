import React from "react";
import Link from "next/link";
import { ShieldCheck, Award, Lock, CheckCircle2, Cpu, Wrench } from "lucide-react";

export const metadata = {
    title: "Sobre a Infinic",
    description: "Conheça a infraestrutura, instrumentação de bancada e os termos de garantia da Infinic Assistência Técnica.",
};

export default function SobreNosPage() {
    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-4">
                <span className="badge-warranty">ENGENHARIA E PRECISÃO</span>
                <h1 className="heading-hero">Sobre a Infinic Assistência Técnica</h1>
                <p className="text-zinc-600 text-base leading-relaxed">
                    Nossa missão é combater a obsolescência prematura de eletrônicos através de diagnóstico técnico aprofundado, peças com procedência auditada e total respeito à privacidade dos seus dados.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="card-infinic space-y-3">
                    <h3 className="font-heading font-bold text-lg text-[#18181B] flex items-center gap-2">
                        <Cpu className="w-5 h-5 text-[#FACC15]" />
                        Estrutura de Bancada Antiestática
                    </h3>
                    <p className="text-xs text-zinc-600 leading-relaxed">
                        Nosso laboratório conta com mantas e pulseiras com aterramento ESD certificado, microscópios ópticos trinoculares de zoom contínuo, estações de solda por indução e maquinário automatizado de laminação a vácuo.
                    </p>
                </div>

                <div className="card-infinic space-y-3">
                    <h3 className="font-heading font-bold text-lg text-[#18181B] flex items-center gap-2">
                        <Lock className="w-5 h-5 text-[#FACC15]" />
                        Protocolo Rígido de Privacidade
                    </h3>
                    <p className="text-xs text-zinc-600 leading-relaxed">
                        Seus arquivos, fotos e dados corporativos não são acessados. Reparos de hardware que não exigem testes de software são conduzidos sem necessidade de senha de usuário, sob ambiente com gravação de segurança 24h.
                    </p>
                </div>
            </div>

            {/* Termos de Garantia Formal */}
            <div className="bg-white rounded-2xl border border-zinc-200 p-8 space-y-4">
                <h2 className="font-heading font-bold text-xl text-[#18181B]">
                    Termos e Condições da Garantia de 90 Dias
                </h2>
                <ul className="space-y-3 text-xs text-zinc-600">
                    <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span><strong>Cobertura Integral:</strong> A garantia cobre defeitos de fabricação dos componentes substituídos e eventuais anomalias da mão de obra executada durante o prazo legal de 90 dias.</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span><strong>Laudo com Selo de Garantia:</strong> Cada equipamento recebe lacres de segurança invioláveis na tampa de acesso interno após a montagem e aprovação no controle de qualidade.</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span><strong>Exclusões:</strong> Não são cobertos danos decorrentes de novas quedas, quebra de vidro após entrega, contato acidental com líquidos ou intervenção por terceiros não autorizados.</span>
                    </li>
                </ul>
                <div className="pt-4 border-t border-zinc-100 flex justify-end">
                    <Link href="/orcamento" className="btn-primary text-xs uppercase">
                        Solicitar Orçamento Agora
                    </Link>
                </div>
            </div>
        </div>
    );
}