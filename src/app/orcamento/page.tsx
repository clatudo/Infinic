"use client";

import React, { useState, useId, useRef, useEffect } from "react";
import Link from "next/link";
import {
    Smartphone,
    Laptop,
    Building2,
    CheckCircle2,
    ShieldCheck,
    ArrowRight,
    Send,
    Loader2,
    Truck,
    Store,
    Home,
    MessageCircle,
    FileCheck,
    AlertCircle,
    Mouse
} from "lucide-react";
import { useCreateLead } from "@/features/lead-capture/hooks/useCreateLead";
import { LeadCapture } from "@/types/database.types";
import { SITE_CONFIG } from "@/lib/constants";

// ==============================================================================
// BASE DE CONHECIMENTO EM CASCATA (Marca > Modelos > Defeitos)
// ==============================================================================

type DeviceCategoryKey = "smartphone" | "notebook" | "tablet" | "computador";

interface CategoryOption {
    key: DeviceCategoryKey;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
}

const CATEGORIES: readonly CategoryOption[] = [
    { key: "smartphone", label: "Smartphone", icon: Smartphone },
    { key: "tablet", label: "Tablet / iPad", icon: Smartphone },
    { key: "notebook", label: "Notebook", icon: Laptop },
    { key: "computador", label: "PC Desktop / Gamer", icon: Building2 },
];

const BRANDS_BY_CATEGORY: Record<DeviceCategoryKey, string[]> = {
    smartphone: ["Apple (iPhone)", "Samsung", "Motorola", "Xiaomi", "Asus", "Outra Marca"],
    tablet: ["Apple (iPad)", "Samsung Galaxy Tab", "Lenovo", "Amazon Fire", "Outra Marca"],
    notebook: ["Dell", "Lenovo", "Acer", "HP", "Asus", "Outra Marca"],
    computador: ["Custom Desktop (PC Gamer)", "Dell", "HP", "Lenovo", "All-in-One", "Outro"],
};

const COMMON_ISSUES: readonly string[] = [
    "Tela quebrada / Sem imagem / Toque falhando",
    "Vírus / Propagandas invasivas / Travamentos",
    "Bateria descarregando rápido / Não carrega",
    "Formatação e reinstalação do Windows / Outros",
    "Aparelho não liga após queda ou curto",
    "Contato com água / Oxidação",
    "Lentidão extrema / Precisa de Upgrade SSD e RAM",
    "Conector de carga frouxo ou danificado",
    "Reparo em carcaça, teclado ou dobradiça quebrada",
    "Outro problema não listado",
];

const SERVICE_TYPES = [
    {
        key: "courier_pickup",
        title: "Serviço Leva e Traz",
        desc: "Coleta e entrega no seu endereço.",
        icon: Truck,
    },
    {
        key: "suporte_remoto",
        title: "Suporte Remoto",
        desc: "Atendimento a distância via internet.",
        icon: Mouse,
    },
    {
        key: "home_service",
        title: "Atendimento em Domicílio",
        desc: "Técnico presencial em sua residência para diagnóstico.",
        icon: Home,
    },
    {
        key: "b2b_corporate",
        title: "Corporativo",
        desc: "Suporte para empresas",
        icon: Building2,
    },
    /*{
        key: "store_dropoff",
        title: "Entrega em Balcão",
        desc: "Traga em nosso laboratório central e acompanhe a triagem.",
        icon: Store,
    },*/
] as const;

// ==============================================================================
// COMPONENTE PRINCIPAL
// ==============================================================================

export default function OrcamentoPage() {
    const [step, setStep] = useState<number>(1);

    // Estados dos Campos em Cascata
    const [category, setCategory] = useState<DeviceCategoryKey>("smartphone");
    const [brand, setBrand] = useState<string>("");
    const [model, setModel] = useState<string>("");
    const [issue, setIssue] = useState<string>("");
    const [details, setDetails] = useState<string>("");
    const [serviceType, setServiceType] = useState<
        "suporte_remoto" | "courier_pickup" | "home_service" | "b2b_corporate"
    >("courier_pickup");

    // Dados de Contato
    const [name, setName] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    const [formError, setFormError] = useState<string | null>(null);
    const [createdLead, setCreatedLead] = useState<LeadCapture | null>(null);
    const [fieldErrors, setFieldErrors] = useState<{
        brand?: boolean;
        model?: boolean;
        issue?: boolean;
        name?: boolean;
        phone?: boolean;
    }>({});

    const formTopRef = useRef<HTMLDivElement>(null);

    const scrollToFormTop = () => {
        setTimeout(() => {
            if (formTopRef.current) {
                formTopRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
            } else {
                window.scrollTo({ top: 0, behavior: "smooth" });
            }
        }, 50);
    };

    const scrollToPageTop = () => {
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }, 50);
    };

    // Quando o orçamento for concluído e avançar para a tela final (Passo 3), rola até o topo absoluto
    useEffect(() => {
        if (step === 3) {
            scrollToPageTop();
        }
    }, [step]);

    const showError = (errorMessage: string) => {
        setFormError(errorMessage);
        scrollToFormTop();
    };

    const { mutate: submitLead, isPending } = useCreateLead();

    const handleCategoryChange = (newCat: DeviceCategoryKey) => {
        setCategory(newCat);
        setBrand("");
        setModel("");
        setFieldErrors({});
    };

    const handleProceedToStep2 = () => {
        const errors: { brand?: boolean; model?: boolean; issue?: boolean } = {};
        if (!brand) errors.brand = true;
        if (!model.trim()) errors.model = true;
        if (!issue) errors.issue = true;

        if (errors.brand || errors.model || errors.issue) {
            setFieldErrors((prev) => ({ ...prev, ...errors }));
            if (errors.brand) {
                showError("Por favor, selecione a marca do dispositivo.");
            } else if (errors.model) {
                showError("Por favor, informe o modelo aproximado.");
            } else {
                showError("Por favor, selecione o defeito apresentado.");
            }
            return;
        }

        setFieldErrors({});
        setFormError(null);
        setStep(2);
        scrollToFormTop();
    };

    const handleFinalSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const errors: { name?: boolean; phone?: boolean } = {};
        if (!name.trim()) {
            errors.name = true;
        }
        if (!phone.trim() || phone.replace(/\D/g, "").length < 10) {
            errors.phone = true;
        }

        if (errors.name || errors.phone) {
            setFieldErrors((prev) => ({ ...prev, ...errors }));
            if (errors.name) {
                showError("Por favor, preencha o campo Nome Completo.");
            } else {
                showError("Por favor, preencha o campo WhatsApp/Telefone com DDD válido.");
            }
            return;
        }

        setFieldErrors({});
        setFormError(null);

        const fullIssueDescription = `${issue}${details.trim() ? ` - Detalhes adicionais: ${details.trim()}` : ""}`;

        submitLead(
            {
                customer_name: name.trim(),
                customer_phone: phone.trim(),
                customer_email: email.trim() || undefined,
                device_brand: brand,
                device_model: model.trim(),
                issue_description: fullIssueDescription,
                service_type: serviceType,
            },
            {
                onSuccess: (data) => {
                    setCreatedLead(data);
                    setStep(3);
                    scrollToPageTop();
                },
                onError: (err) => {
                    showError(`Não foi possível enviar o orçamento: ${err.message}`);
                },
            }
        );
    };

    // URL Parametrizada de WhatsApp com Payload do Orçamento
    const whatsappPayloadMessage = encodeURIComponent(
        `Olá equipe Infinic! Acabei de enviar um pedido de orçamento via site.\n\n` +
        `*Dispositivo:* ${brand} ${model}\n` +
        `*Defeito:* ${issue}\n` +
        `*Modalidade:* ${serviceType}\n` +
        `*Meu Nome:* ${name}`
    );

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
            {/* Top Banner de Conversão */}
            <div className="text-center max-w-2xl mx-auto space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FACC15]/20 text-[#854D0E] border border-[#FACC15]/40 text-xs font-bold uppercase tracking-wider">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#854D0E]" />
                    Diagnóstico Sem Custo & 90 Dias de Garantia
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-[#18181B] font-heading">
                    Solicitação de Orçamento Rápido
                </h1>
                <p className="text-sm sm:text-base text-[#52525B]">
                    Preencha os dados do seu aparelho em menos de 1 minuto e receba a prévia de valores e disponibilidade técnica.
                </p>
            </div>

            {/* Âncora de Rolagem com compensação para Header Sticky */}
            <div ref={formTopRef} className="scroll-mt-24 sm:scroll-mt-28" />

            {/* Indicador de Passos */}
            {step < 3 && (
                <div className="flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-wider">
                    <span className={`px-3 py-1.5 rounded-lg border ${step === 1 ? "bg-[#18181B] text-white border-[#18181B]" : "bg-white text-zinc-400 border-zinc-200"}`}>
                        1. Dispositivo & Defeito
                    </span>
                    <ArrowRight className="w-4 h-4 text-zinc-400" />
                    <span className={`px-3 py-1.5 rounded-lg border ${step === 2 ? "bg-[#18181B] text-white border-[#18181B]" : "bg-white text-zinc-400 border-zinc-200"}`}>
                        2. Atendimento & Contato
                    </span>
                </div>
            )}

            {/* Mensagem de Erro de Validação */}
            {formError && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-900 text-xs sm:text-sm font-semibold flex items-center gap-3 shadow-sm animate-in fade-in slide-in-from-top-2 duration-300">
                    <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                    <span>{formError}</span>
                </div>
            )}

            {/* PASSO 1: DISPOSITIVO EM CASCATA */}
            {step === 1 && (
                <div className="bg-white rounded-2xl border border-zinc-200 p-6 sm:p-8 space-y-6 shadow-sm">

                    {/* Categoria */}
                    <div className="space-y-2">
                        <label className="text-xs font-extrabold uppercase tracking-wider text-[#18181B] block">
                            1. Qual é o tipo de dispositivo?
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {CATEGORIES.map((cat) => {
                                const Icon = cat.icon;
                                const isSelected = category === cat.key;
                                return (
                                    <button
                                        key={cat.key}
                                        type="button"
                                        onClick={() => handleCategoryChange(cat.key)}
                                        className={`p-3.5 rounded-xl border flex flex-col items-center justify-center gap-2 text-center transition-all ${isSelected
                                            ? "border-[#18181B] bg-zinc-100 font-bold text-[#18181B] ring-2 ring-[#FACC15]"
                                            : "border-zinc-200 hover:bg-zinc-50 text-[#52525B]"
                                            }`}
                                    >
                                        <Icon className="w-5 h-5 text-[#18181B]" />
                                        <span className="text-xs">{cat.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Marca */}
                    <div className="space-y-2">
                        <label className={`text-xs font-extrabold uppercase tracking-wider block transition-colors ${fieldErrors.brand ? "text-red-600" : "text-[#18181B]"}`}>
                            2. Qual é a marca do aparelho? {fieldErrors.brand && "(Selecione uma marca)"}
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                            {BRANDS_BY_CATEGORY[category].map((b) => (
                                <button
                                    key={b}
                                    type="button"
                                    onClick={() => {
                                        setBrand(b);
                                        if (fieldErrors.brand) setFieldErrors((prev) => ({ ...prev, brand: false }));
                                    }}
                                    className={`px-3.5 py-2.5 rounded-lg border text-xs font-bold transition-all text-left ${brand === b
                                        ? "bg-[#18181B] text-[#FACC15] border-[#18181B]"
                                        : fieldErrors.brand
                                            ? "bg-red-50/40 border-red-300 text-red-900 hover:bg-red-50"
                                            : "bg-zinc-50 border-zinc-200 text-[#18181B] hover:bg-zinc-100"
                                        }`}
                                >
                                    {b}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Modelo */}
                    <div className="space-y-2">
                        <label className={`text-xs font-extrabold uppercase tracking-wider block transition-colors ${fieldErrors.model ? "text-red-600 font-extrabold" : "text-[#18181B]"}`}>
                            3. Qual é o modelo exato ou aproximado?
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                value={model}
                                onChange={(e) => {
                                    setModel(e.target.value);
                                    if (fieldErrors.model) setFieldErrors((prev) => ({ ...prev, model: false }));
                                }}
                                placeholder="Ex: iPhone 13 128GB, Dell Inspiron 15 3000, Galaxy S22..."
                                className={`w-full px-4 py-3 rounded-lg border text-sm font-medium transition-all ${fieldErrors.model
                                    ? "border-red-500 bg-red-50/50 text-red-900 focus:outline-none ring-2 ring-red-400/50 pr-10"
                                    : "border-zinc-300 text-[#18181B] focus:outline-none focus:ring-2 focus:ring-[#FACC15]"
                                    }`}
                            />
                            {fieldErrors.model && (
                                <AlertCircle className="w-5 h-5 text-red-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                            )}
                        </div>
                        {fieldErrors.model && (
                            <p className="text-xs text-red-600 font-bold flex items-center gap-1 animate-in fade-in slide-in-from-top-1">
                                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                                <span>Preencha este campo com o modelo do aparelho</span>
                            </p>
                        )}
                    </div>

                    {/* Defeito Apresentado */}
                    <div className="space-y-2">
                        <label className={`text-xs font-extrabold uppercase tracking-wider block transition-colors ${fieldErrors.issue ? "text-red-600" : "text-[#18181B]"}`}>
                            4. O que está acontecendo com o aparelho? {fieldErrors.issue && "(Selecione uma opção)"}
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {COMMON_ISSUES.map((iss) => (
                                <button
                                    key={iss}
                                    type="button"
                                    onClick={() => {
                                        setIssue(iss);
                                        if (fieldErrors.issue) setFieldErrors((prev) => ({ ...prev, issue: false }));
                                    }}
                                    className={`p-3 rounded-lg border text-xs font-semibold text-left transition-all ${issue === iss
                                        ? "bg-[#FACC15]/20 border-[#FACC15] text-[#854D0E] font-bold"
                                        : fieldErrors.issue
                                            ? "bg-red-50/40 border-red-300 text-red-900 hover:bg-red-50"
                                            : "bg-zinc-50 border-zinc-200 text-[#18181B] hover:bg-zinc-100"
                                        }`}
                                >
                                    {iss}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Detalhes Adicionais */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-[#52525B] uppercase block">
                            Informações complementares (Opcional):
                        </label>
                        <textarea
                            rows={3}
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
                            placeholder="Ex: Caiu de uma altura de 1 metro ontem à tarde. A tela pisca e o aparelho esquenta na lateral..."
                            className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 text-sm text-[#18181B] focus:outline-none focus:ring-2 focus:ring-[#FACC15]"
                        />
                    </div>

                    {/* Botão Avançar */}
                    <div className="pt-4 border-t border-zinc-200 flex justify-end">
                        <button
                            type="button"
                            onClick={handleProceedToStep2}
                            className="btn-primary text-xs uppercase tracking-wider px-8 py-3.5 flex items-center gap-2"
                        >
                            <span>Avançar para Atendimento</span>
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}

            {/* PASSO 2: MODALIDADE E DADOS DE CONTATO */}
            {step === 2 && (
                <form onSubmit={handleFinalSubmit} noValidate className="bg-white rounded-2xl border border-zinc-200 p-6 sm:p-8 space-y-6 shadow-sm">

                    {/* Modalidade de Atendimento */}
                    <div className="space-y-2">
                        <label className="text-xs font-extrabold uppercase tracking-wider text-[#18181B] block">
                            Como prefere que o atendimento seja realizado?
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {SERVICE_TYPES.map((st) => {
                                const Icon = st.icon;
                                const isSelected = serviceType === st.key;
                                return (
                                    <button
                                        key={st.key}
                                        type="button"
                                        onClick={() => setServiceType(st.key)}
                                        className={`p-4 rounded-xl border flex items-start gap-3 text-left transition-all ${isSelected
                                            ? "border-[#18181B] bg-zinc-100 ring-2 ring-[#FACC15]"
                                            : "border-zinc-200 hover:bg-zinc-50"
                                            }`}
                                    >
                                        <div className="p-2 rounded-lg bg-white border border-zinc-200 shrink-0 text-[#18181B]">
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-[#18181B]">{st.title}</h4>
                                            <p className="text-xs text-[#52525B] mt-0.5">{st.desc}</p>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Dados Pessoais de Contato */}
                    <div className="space-y-4 pt-2">
                        <label className="text-xs font-extrabold uppercase tracking-wider text-[#18181B] block">
                            Seus Dados para Envio do Orçamento
                        </label>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className={`text-xs font-bold block mb-1 transition-colors ${fieldErrors.name ? "text-red-600 font-extrabold" : "text-[#52525B]"}`}>
                                    Nome Completo *
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => {
                                            setName(e.target.value);
                                            if (fieldErrors.name) setFieldErrors((prev) => ({ ...prev, name: false }));
                                        }}
                                        placeholder="Ex: Carlos Oliveira"
                                        className={`w-full px-4 py-3 rounded-lg border text-sm font-medium transition-all ${fieldErrors.name
                                            ? "border-red-500 bg-red-50/50 text-red-900 focus:outline-none ring-2 ring-red-400/50 pr-10"
                                            : "border-zinc-300 text-[#18181B] focus:outline-none focus:ring-2 focus:ring-[#FACC15]"
                                            }`}
                                    />
                                    {fieldErrors.name && (
                                        <AlertCircle className="w-5 h-5 text-red-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                    )}
                                </div>
                                {fieldErrors.name && (
                                    <p className="text-xs text-red-600 font-bold mt-1.5 flex items-center gap-1 animate-in fade-in slide-in-from-top-1">
                                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                                        <span>Preencha este campo com seu nome completo</span>
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className={`text-xs font-bold block mb-1 transition-colors ${fieldErrors.phone ? "text-red-600 font-extrabold" : "text-[#52525B]"}`}>
                                    WhatsApp / Telefone com DDD *
                                </label>
                                <div className="relative">
                                    <input
                                        type="tel"
                                        value={phone}
                                        onChange={(e) => {
                                            setPhone(e.target.value);
                                            if (fieldErrors.phone) setFieldErrors((prev) => ({ ...prev, phone: false }));
                                        }}
                                        placeholder="Ex: (11) 98888-7777"
                                        className={`w-full px-4 py-3 rounded-lg border text-sm font-medium transition-all ${fieldErrors.phone
                                            ? "border-red-500 bg-red-50/50 text-red-900 focus:outline-none ring-2 ring-red-400/50 pr-10"
                                            : "border-zinc-300 text-[#18181B] focus:outline-none focus:ring-2 focus:ring-[#FACC15]"
                                            }`}
                                    />
                                    {fieldErrors.phone && (
                                        <AlertCircle className="w-5 h-5 text-red-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                    )}
                                </div>
                                {fieldErrors.phone && (
                                    <p className="text-xs text-red-600 font-bold mt-1.5 flex items-center gap-1 animate-in fade-in slide-in-from-top-1">
                                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                                        <span>Preencha este campo com seu WhatsApp (com DDD)</span>
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="text-xs font-bold text-[#52525B] block mb-1">E-mail para Cópia do Laudo (Opcional)</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Ex: carlos@empresa.com.br"
                                className="w-full px-4 py-3 rounded-lg border border-zinc-300 text-sm font-medium text-[#18181B] focus:outline-none focus:ring-2 focus:ring-[#FACC15]"
                            />
                        </div>
                    </div>

                    {/* Ações: Voltar / Enviar */}
                    <div className="pt-4 border-t border-zinc-200 flex items-center justify-between">
                        <button
                            type="button"
                            onClick={() => {
                                setFormError(null);
                                setStep(1);
                                scrollToFormTop();
                            }}
                            className="text-xs font-bold text-[#52525B] hover:text-[#18181B]"
                        >
                            ← Voltar e alterar aparelho
                        </button>

                        <button
                            type="submit"
                            disabled={isPending}
                            className="btn-primary text-xs uppercase tracking-wider px-8 py-3.5 flex items-center gap-2 disabled:opacity-50"
                        >
                            {isPending ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    <span>Enviando para o Laboratório...</span>
                                </>
                            ) : (
                                <>
                                    <Send className="w-4 h-4" />
                                    <span>Finalizar e Receber Orçamento</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            )}

            {/* PASSO 3: SUCESSO E TRANSIÇÃO WHATSAPP */}
            {step === 3 && createdLead && (
                <div className="bg-white rounded-2xl border border-zinc-200 p-6 sm:p-10 text-center space-y-6 shadow-sm animate-in zoom-in-95">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-9 h-9" />
                    </div>

                    <div className="space-y-2">
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#18181B] font-heading">
                            Orçamento Cadastrado com Sucesso!
                        </h2>
                        <p className="text-sm text-[#52525B] max-w-lg mx-auto">
                            Olá, <strong>{createdLead.customer_name}</strong>. Nossa equipe técnica já registrou os dados do seu <strong>{createdLead.device_brand} {createdLead.device_model}</strong> em nosso banco de dados.
                        </p>
                    </div>

                    <div className="p-4 rounded-xl bg-[#F4F4F5] border border-zinc-200 max-w-md mx-auto text-xs text-left space-y-2 text-[#52525B]">
                        <div className="flex justify-between">
                            <span className="font-bold text-[#18181B]">Dispositivo:</span>
                            <span>{createdLead.device_brand} {createdLead.device_model}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-bold text-[#18181B]">Defeito:</span>
                            <span className="truncate max-w-[200px]">{createdLead.issue_description}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-bold text-[#18181B]">Garantia Padrão:</span>
                            <span className="font-bold text-[#854D0E]">90 Dias Cobertos</span>
                        </div>
                    </div>

                    {/* CTA de Aceleração com WhatsApp Parametrizado */}
                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                        <a
                            href={`https://wa.me/${SITE_CONFIG.whatsapp.number}?text=${whatsappPayloadMessage}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all transform hover:scale-105"
                        >
                            <MessageCircle className="w-4 h-4" />
                            Priorizar Atendimento pelo WhatsApp
                        </a>

                        <Link
                            href="/"
                            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-[#18181B] font-bold text-xs uppercase tracking-wider transition-colors"
                        >
                            Voltar ao Início
                        </Link>
                    </div>
                </div>
            )
            }
        </div >
    );
}