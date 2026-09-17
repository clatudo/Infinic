"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
    Search,
    ShieldCheck,
    Clock,
    CheckCircle2,
    AlertTriangle,
    Loader2,
    Smartphone,
    Calendar,
    FileText,
    HelpCircle,
    PhoneCall,
    ArrowRight,
    RotateCcw,
} from "lucide-react";
import { useTrackOS } from "@/features/os-tracking/hooks/useTrackOS";
import { ServiceOrderPublicView } from "@/types/database.types";
import { SITE_CONFIG } from "@/lib/constants";

// ==============================================================================
// ETAPAS DO FLUXO OPERACIONAL DE MANUTENÇÃO
// ==============================================================================

interface OrderStepConfig {
    key: ServiceOrderPublicView["status"];
    label: string;
    description: string;
}

const ORDER_STEPS: readonly OrderStepConfig[] = [
    {
        key: "received",
        label: "Recebido",
        description: "Equipamento recebido e protocolado na triagem inicial.",
    },
    {
        key: "analyzing",
        label: "Em Diagnóstico",
        description: "Avaliação técnica em bancada e testes de componentes.",
    },
    {
        key: "waiting_approval",
        label: "Aguardando Aprovação",
        description: "Orçamento emitido aguardando liberação do cliente.",
    },
    {
        key: "repairing",
        label: "Em Reparo",
        description: "Substituição de peças e procedimentos laboratoriais.",
    },
    {
        key: "ready",
        label: "Pronto para Retirada",
        description: "Reparo concluído, calibrado e aprovado no controle de qualidade.",
    },
    {
        key: "delivered",
        label: "Entregue",
        description: "Entregue ao cliente com garantia ativada de 90 dias.",
    },
] as const;

function getStepIndex(status: ServiceOrderPublicView["status"]): number {
    return ORDER_STEPS.findIndex((step) => step.key === status);
}

// ==============================================================================
// CONTEÚDO PRINCIPAL (COM CLIENT HOOKS & USE SEARCH PARAMS)
// ==============================================================================

function StatusOsContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const initialOs = searchParams.get("os") || "";

    const [inputVal, setInputVal] = useState<string>(initialOs);
    const [activeQuery, setActiveQuery] = useState<string>(initialOs);

    useEffect(() => {
        if (initialOs) {
            setInputVal(initialOs);
            setActiveQuery(initialOs);
        }
    }, [initialOs]);

    const { data: order, isLoading, isError, error, refetch } = useTrackOS(activeQuery);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const clean = inputVal.trim().toUpperCase();
        if (clean) {
            setActiveQuery(clean);
            router.push(`/status-os?os=${encodeURIComponent(clean)}`, { scroll: false });
        }
    };

    const currentStepIdx = order ? getStepIndex(order.status) : -1;

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
            {/* Cabeçalho */}
            <div className="text-center max-w-2xl mx-auto space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FACC15]/20 text-[#854D0E] border border-[#FACC15]/40 text-xs font-bold uppercase tracking-wider">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#854D0E]" />
                    Portal de Transparência Técnica
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-[#18181B] font-heading">
                    Rastreamento de Ordem de Serviço
                </h1>
                <p className="text-sm sm:text-base text-[#52525B]">
                    Acompanhe cada fase da manutenção do seu equipamento em tempo real direto do nosso laboratório.
                </p>
            </div>

            {/* Formulário de Busca */}
            <div className="bg-white p-4 sm:p-6 rounded-2xl border border-zinc-200/90 shadow-xs max-w-2xl mx-auto">
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                        <input
                            type="text"
                            value={inputVal}
                            onChange={(e) => setInputVal(e.target.value)}
                            placeholder="Digite o número da O.S. (ex: INF-2026-1001)"
                            className="w-full px-4 py-3.5 rounded-xl border border-zinc-300 text-sm font-semibold text-[#18181B] placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#FACC15] uppercase tracking-wider"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading || !inputVal.trim()}
                        className="btn-primary text-xs uppercase tracking-wider px-6 py-3.5 disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Buscando...
                            </>
                        ) : (
                            <>
                                <Search className="w-4 h-4 mr-1.5" />
                                Rastrear
                            </>
                        )}
                    </button>
                </form>
            </div>

            {/* Estado: Carregando */}
            {isLoading && (
                <div className="text-center py-16 bg-white rounded-2xl border border-zinc-200 shadow-2xs">
                    <Loader2 className="w-10 h-10 text-[#18181B] animate-spin mx-auto mb-4" />
                    <p className="text-base font-bold text-[#18181B]">Consultando banco de dados...</p>
                    <p className="text-xs text-[#52525B] mt-1">Buscando protocolo {activeQuery}</p>
                </div>
            )}

            {/* Estado: Erro de Rede ou RPC */}
            {isError && (
                <div className="p-6 rounded-2xl bg-red-50 border border-red-200 text-red-900 max-w-2xl mx-auto">
                    <div className="flex items-start gap-3">
                        <AlertTriangle className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
                        <div className="space-y-2">
                            <h3 className="text-sm font-bold">Falha ao se comunicar com o sistema</h3>
                            <p className="text-xs text-red-700">{error.message}</p>
                            <button
                                type="button"
                                onClick={() => refetch()}
                                className="inline-flex items-center gap-1.5 text-xs font-bold text-red-800 hover:underline pt-1"
                            >
                                <RotateCcw className="w-3.5 h-3.5" />
                                Tentar novamente
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Estado: Não Encontrado */}
            {!isLoading && !isError && activeQuery && order === null && (
                <div className="text-center py-16 bg-white rounded-2xl border border-zinc-200 max-w-2xl mx-auto space-y-4">
                    <div className="w-14 h-14 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
                        <AlertTriangle className="w-7 h-7" />
                    </div>
                    <div className="space-y-1">
                        <h3 className="text-lg font-bold text-[#18181B]">Ordem de Serviço Não Encontrada</h3>
                        <p className="text-sm text-[#52525B] max-w-md mx-auto">
                            Não localizamos nenhum registro ativo sob o protocolo <strong>"{activeQuery}"</strong>. Verifique o comprovante impresso ou a mensagem enviada pelo WhatsApp.
                        </p>
                    </div>
                    <div className="pt-2">
                        <a
                            href={`https://wa.me/${SITE_CONFIG.whatsapp.number}?text=${encodeURIComponent(`Olá! Não consegui localizar minha O.S. número ${activeQuery}. Poderiam me auxiliar?`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-xs font-bold text-[#18181B] bg-zinc-100 hover:bg-zinc-200 px-4 py-2.5 rounded-lg transition-colors"
                        >
                            <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
                            Solicitar Apoio de um Atendente
                        </a>
                    </div>
                </div>
            )}

            {/* Estado: Sucesso e Exibição de Dados */}
            {!isLoading && order && (
                <div className="space-y-8 animate-in fade-in-50">

                    {/* Card Resumo do Equipamento */}
                    <div className="bg-white rounded-2xl border border-zinc-200 p-6 sm:p-8 shadow-sm">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-zinc-200 gap-4">
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold uppercase tracking-wider text-[#52525B]">Protocolo Oficial</span>
                                    <span className="px-2.5 py-0.5 rounded-md bg-[#18181B] text-[#FACC15] font-mono text-xs font-bold">
                                        {order.order_number}
                                    </span>
                                </div>
                                <h2 className="text-xl sm:text-2xl font-extrabold text-[#18181B] mt-1 font-heading">
                                    {order.device_brand} {order.device_model}
                                </h2>
                                <p className="text-xs text-[#52525B] mt-0.5">Titular: {order.customer_name}</p>
                            </div>

                            {/* Status Badge */}
                            <div className="flex flex-col sm:items-end">
                                <span className="text-xs text-[#52525B]">Status do Dispositivo</span>
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-[#FACC15] text-[#18181B] mt-1">
                                    <span className="w-2 h-2 rounded-full bg-[#18181B] animate-pulse" />
                                    {ORDER_STEPS[currentStepIdx]?.label || order.status}
                                </span>
                            </div>
                        </div>

                        {/* Linha do Tempo Visual de 6 Etapas */}
                        <div className="py-8">
                            <p className="text-xs font-bold uppercase tracking-wider text-[#52525B] mb-6">
                                Progresso no Laboratório
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
                                {ORDER_STEPS.map((step, idx) => {
                                    const isCompleted = idx < currentStepIdx;
                                    const isCurrent = idx === currentStepIdx;

                                    return (
                                        <div
                                            key={step.key}
                                            className={`p-3.5 rounded-xl border transition-all ${isCurrent
                                                ? "bg-[#FACC15]/10 border-[#FACC15] shadow-xs"
                                                : isCompleted
                                                    ? "bg-emerald-50/60 border-emerald-200"
                                                    : "bg-zinc-50 border-zinc-200 opacity-60"
                                                }`}
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                                                    Etapa 0{idx + 1}
                                                </span>
                                                {isCompleted ? (
                                                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                                ) : isCurrent ? (
                                                    <span className="w-2.5 h-2.5 rounded-full bg-[#FACC15] ring-4 ring-[#FACC15]/30 animate-ping" />
                                                ) : (
                                                    <Clock className="w-3.5 h-3.5 text-zinc-400" />
                                                )}
                                            </div>
                                            <h4 className="text-xs font-bold text-[#18181B] leading-tight">
                                                {step.label}
                                            </h4>
                                            <p className="text-[11px] text-[#52525B] mt-1 leading-snug">
                                                {step.description}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Laudo e Diagnóstico */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-zinc-200">
                            <div className="bg-[#F4F4F5] p-4 rounded-xl border border-zinc-200">
                                <span className="text-xs font-bold text-[#52525B] uppercase flex items-center gap-1.5 mb-2">
                                    <FileText className="w-4 h-4 text-[#18181B]" />
                                    Defeito Relatado na Entrada
                                </span>
                                <p className="text-sm text-[#18181B] font-medium leading-relaxed">
                                    {order.reported_defect}
                                </p>
                            </div>

                            <div className="bg-[#F4F4F5] p-4 rounded-xl border border-zinc-200">
                                <span className="text-xs font-bold text-[#52525B] uppercase flex items-center gap-1.5 mb-2">
                                    <ShieldCheck className="w-4 h-4 text-[#854D0E]" />
                                    Laudo do Especialista
                                </span>
                                <p className="text-sm text-[#18181B] font-medium leading-relaxed">
                                    {order.technical_diagnosis || "Aparelho em bancada. Testes elétricos e térmicos em execução pela engenharia."}
                                </p>
                            </div>
                        </div>

                        {/* Garantia de 90 Dias e Datas */}
                        <div className="mt-6 pt-6 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#52525B]">
                            <div className="flex items-center gap-2">
                                <span className="badge-warranty">[90 DIAS DE GARANTIA]</span>
                                {order.warranty_until && (
                                    <span>Cobertura válida até {new Date(order.warranty_until).toLocaleDateString("pt-BR")}</span>
                                )}
                            </div>
                            <div className="flex items-center gap-4">
                                <span>Entrada: {new Date(order.created_at).toLocaleDateString("pt-BR")}</span>
                                <span>Última atualização: {new Date(order.updated_at).toLocaleDateString("pt-BR")}</span>
                            </div>
                        </div>
                    </div>

                    {/* Ações e Dúvidas com o Técnico */}
                    <div className="p-6 rounded-2xl bg-[#18181B] text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="space-y-1 text-center sm:text-left">
                            <h3 className="text-base font-bold">Deseja autorizar orçamento ou tirar dúvidas?</h3>
                            <p className="text-xs text-zinc-400">
                                Nosso time técnico está à disposição com a bancada conectada ao sistema.
                            </p>
                        </div>
                        <a
                            href={`https://wa.me/${SITE_CONFIG.whatsapp.number}?text=${encodeURIComponent(`Olá! Estou acompanhando a O.S. ${order.order_number} (${order.device_brand} ${order.device_model}) e gostaria de falar sobre o reparo.`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary text-xs uppercase tracking-wider shrink-0"
                        >
                            Falar com o Técnico Responsável
                        </a>
                    </div>

                </div>
            )}
        </div>
    );
}

// ==============================================================================
// DEFAULT EXPORT COM SUSPENSE BOUNDARY (Obrigatório no Next.js App Router)
// ==============================================================================

export default function StatusOsPage() {
    return (
        <Suspense
            fallback={
                <div className="max-w-5xl mx-auto px-4 py-20 text-center">
                    <Loader2 className="w-10 h-10 text-[#18181B] animate-spin mx-auto mb-4" />
                    <p className="text-sm font-bold text-[#18181B]">Carregando portal de ordens de serviço...</p>
                </div>
            }
        >
            <StatusOsContent />
        </Suspense>
    );
}