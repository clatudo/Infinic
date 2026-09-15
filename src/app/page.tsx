"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    ShieldCheck,
    Search,
    ArrowRight,
    Smartphone,
    Laptop,
    Building2,
    CheckCircle2,
    Lock,
    Truck,
    Cpu,
    Clock,
    Star,
    ChevronDown,
    HelpCircle,
    Award,
    Zap,
    RotateCcw,
    Sparkles,
    PhoneCall,
    ShieldQuestion,
} from "lucide-react";

// ==============================================================================
// CONTRATOS E TIPAGEM ESTÁTICA (TypeScript Estrito)
// ==============================================================================


interface ModalityItem {
    id: string;
    step: string;
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    tag: string;
}

interface ServiceCardItem {
    id: string;
    title: string;
    category: string;
    description: string;
    features: string[];
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    badge: string;
}

interface MetricItem {
    value: string;
    label: string;
    subtext: string;
}

interface TestimonialItem {
    id: string;
    clientName: string;
    device: string;
    comment: string;
    rating: number;
    date: string;
}

interface FaqItem {
    id: string;
    question: string;
    answer: string;
}

// ==============================================================================
// DADOS INSTITUCIONAIS E DE CONVERSÃO
// ==============================================================================

const MODALITIES: readonly ModalityItem[] = [
    {
        id: "leva-e-traz",
        step: "01",
        title: "Serviço Leva e Traz",
        description:
            "Buscamos e entregamos seu celular, tablet, notebook ou computador no seu endereço com total agilidade e segurança.",
        icon: Truck,
        tag: "Comodidade Total",
    },
    {
        id: "atendimento-local",
        step: "02",
        title: "Formatação no Local",
        description:
            "Atendimento presencial agendado na sua residência ou empresa para formatação limpa, reinstalação de sistema e backups.",
        icon: Clock,
        tag: "No seu Endereço",
    },
    {
        id: "suporte-remoto",
        step: "03",
        title: "Suporte Remoto",
        description:
            "Diagnóstico e correção à distância para lentidão, limpeza de vírus, instalação de programas e configurações gerais.",
        icon: Zap,
        tag: "Atendimento Imediato",
    },
] as const;

const SERVICES: readonly ServiceCardItem[] = [
    {
        id: "smartphone-tablet",
        category: "Mobile",
        title: "Celulares e Tablets",
        description:
            "Recuperação completa de iPhones, iPads e smartphones Android com peças de especificação homologada.",
        features: [
            "Troca de tela expressa em até 2 horas",
            "Substituição de bateria",
            "Recuperação de aparelhos que molharam",
            "Recuperação de dados e reparo em conectores V8, Tipo-C e Lightning",
        ],
        href: "/conserto-celular-tablet",
        icon: Smartphone,
        badge: "Mais Procurado",
    },
    {
        id: "computador-notebook",
        category: "Computação",
        title: "Computadores & Notebooks",
        description:
            "Diagnóstico avançado para notebooks corporativos e desktops gamers. Orientação e Suporte em Aplicativos.",
        features: [
            "Limpeza preventiva e substituição com pasta de alta condutividade",
            "Upgrade para SSDs NVMe e expansão de memória RAM",
            "Trocas de LCDs/Displays e troca de teclados",
            "Formatação limpa com backup total de arquivos",
        ],
        href: "/manutencao-computador-notebook",
        icon: Laptop,
        badge: "Especialidade",
    },
    {
        id: "suporte-softwares",
        category: "Software & Apoio",
        title: "Softwares & Dúvidas do Dia a Dia",
        description:
            "Orientação prática e suporte no que você precisar no computador ou celular. Ajudamos a destravar suas tarefas cotidianas com total paciência e clareza.",
        features: [
            "Ajuda prática em Word, Excel e Pacote Office",
            "Configuração de contas de e-mail e navegadores",
            "Instalação de impressoras, periféricos e programas",
            "Organização de arquivos, pastas e backup em nuvem",
        ],
        href: "/orcamento",
        icon: HelpCircle,
        badge: "Suporte Prático",
    },
] as const;

const METRICS: readonly MetricItem[] = [
    {
        value: "+15.000",
        label: "Equipamentos Recuperados",
        subtext: "Smartphones, Tablets, PCs, Notebooks e placas recuperadas com sucesso",
    },
    {
        value: "90 Dias",
        label: "Garantia Contratual",
        subtext: "Laudo técnico impresso e cobertura completa em peças e mão de obra",
    },
    {
        value: "2 Horas",
        label: "Tempo Médio de Reparo",
        subtext: "Agilidade máxima para serviços de tela, conector e bateria",
    },
    {
        value: "4.9 / 5.0",
        label: "Avaliação Média dos Clientes",
        subtext: "Índice de recomendação baseado em mais de 2.200 avaliações",
    },
] as const;

const TESTIMONIALS: readonly TestimonialItem[] = [
    {
        id: "dep-1",
        clientName: "Rodrigo Mendonça",
        device: "iPhone 14 Pro Max",
        comment:
            "Minha tela quebrou feio e precisei de reparo rápido para trabalhar. O serviço Leva e Traz buscou em 40 minutos e no mesmo dia meu aparelho voltou intacto com a vedação refeita. A garantia de 90 dias dá muita tranquilidade!",
        rating: 5,
        date: "Há 3 dias",
    },
    {
        id: "dep-2",
        clientName: "Carla Silveira (Diretora na NexaTech)",
        device: "Contrato Corporativo (18 MacBooks)",
        comment:
            "Fechamos o contrato B2B da nossa agência com a Infinic. O atendimento técnico em domicílio e os upgrades de SSD mudaram o ritmo da nossa equipe sem interromper a operação. Profissionais exemplares.",
        rating: 5,
        date: "Há 1 semana",
    },
    {
        id: "dep-3",
        clientName: "Marcos Vinicius",
        device: "Notebook Dell Inspiron",
        comment:
            "Outras duas assistências disseram que a placa-mãe estava perdida por causa de curto. A equipe da Infinic fez o reparo microscópico na placa e salvou meu notebook por um terço do valor de um novo. Recomendo de olhos fechados.",
        rating: 5,
        date: "Há 2 semanas",
    },
] as const;

const FAQS: readonly FaqItem[] = [
    {
        id: "faq-1",
        question: "Como funciona a garantia de 90 dias da Infinic?",
        answer:
            "Todos os reparos executados pela Infinic acompanham certificado de garantia de 90 dias corridos conforme o Código de Defesa do Consumidor, cobrindo eventuais falhas nos componentes substituídos e na mão de obra técnica. Qualquer anomalia apresentada é atendida com prioridade máxima.",
    },
    {
        id: "faq-2",
        question: "Meus arquivos, fotos e dados pessoais permanecem seguros?",
        answer:
            "Sim, temos protocolo rígido de segurança e privacidade. Não solicitamos senhas de acesso aos dados pessoais para serviços que não exijam teste de sistema, e quando necessário, o procedimento é realizado sob termo formal de confidencialidade.",
    },
    {
        id: "faq-3",
        question: "Como solicito o serviço de Leva e Traz?",
        answer:
            "Basta informar seu endereço no formulário de orçamento ou entrar em contato pelo WhatsApp. Um portador credenciado realiza a coleta do seu aparelho com total segurança e fornece na hora o protocolo impresso e digital de entrada com o número da sua O.S.",
    },
    {
        id: "faq-4",
        question: "O diagnóstico e orçamento têm algum custo?",
        answer:
            "Não. O orçamento inicial e o diagnóstico de são 100% gratuitos e sem compromisso. Nossos especialistas avaliam o aparelho, identificam as peças necessárias e fornecem o valor final discriminado antes de qualquer intervenção.",
    },
    {
        id: "faq-5",
        question: "Quais peças são utilizadas nos reparos?",
        answer:
            "Trabalhamos exclusivamente com peças de procedência atestada (Padrão Premium e Linhas Originais de Reposição), garantindo fidelidade de cores em displays, touch screen de resposta imediata, taxas de atualização nominais e máxima durabilidade. Mas para quem busca preço nós também oferecemos algumas peças mais em conta, dependendo do modelo do aparelho e conforme estoque disponível.",
    },
    {
        id: "faq-6",
        question: "Quais são as formas de pagamento disponíveis?",
        answer:
            "Aceitamos cartões de crédito em até 12 vezes, Pix com confirmação instantânea, cartões de débito.",
    },
] as const;

// ==============================================================================
// COMPONENTE PRINCIPAL: HOME PAGE
// ==============================================================================

export default function HomePage(): React.ReactElement {
    const router = useRouter();
    const [osQuery, setOsQuery] = useState<string>("");
    const [openFaqId, setOpenFaqId] = useState<string | null>("faq-1");

    const handleOsSearch = (e: React.FormEvent): void => {
        e.preventDefault();
        const cleanOs = osQuery.trim();
        if (cleanOs) {
            router.push(`/status-os?os=${encodeURIComponent(cleanOs)}`);
        } else {
            router.push("/status-os");
        }
    };

    const toggleFaq = (id: string): void => {
        setOpenFaqId((prev) => (prev === id ? null : id));
    };

    return (
        <div className="flex flex-col w-full bg-[#F4F4F5] text-[#18181B] selection:bg-[#FACC15] selection:text-[#18181B]">
            {/* ========================================================================
          1. HERO SECTION COM BARRA DE RASTREIO DE O.S. EM DESTAQUE
      ======================================================================== */}
            <section className="relative overflow-hidden bg-white border-b border-zinc-200/80 pt-10 pb-16 lg:py-5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                        {/* Bloco Esquerdo: Chamada de Conversão e Elementos de Confiança */}
                        <div className="lg:col-span-7 space-y-6 text-left">

                            {/* Badge de Garantia Exigida no Design System */}
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FACC15]/10 text-[#854D0E] border border-[#FACC15]/30 text-xs font-bold tracking-wide uppercase">
                                <ShieldCheck className="w-4 h-4 text-[#854D0E] shrink-0" />
                                <span>[90 DIAS DE GARANTIA] EM TODAS AS PEÇAS TROCADAS</span>
                            </div>

                            {/* H1 Rigoroso: 2.5rem no desktop, line-height 1.6, Montserrat/Heading */}
                            <h1 className="heading-hero text-[#18181B]">
                                Assistência Técnica Especializada em Celulares, Tablets, Notebooks e PCs
                            </h1>

                            <p className="text-base sm:text-lg text-[#52525B] leading-relaxed max-w-2xl font-sans">
                                Diagnósticos laboratoriais de precisão, peças com procedência homologada e atendimento sob medida. Opções de <strong>Leva e Traz</strong> ou suporte presencial na sua empresa ou residência.
                            </p>

                            {/* Barra de Rastreio de OS Visível na Hero Section */}
                            <div className="p-4 sm:p-5 rounded-xl bg-[#F4F4F5] border border-zinc-300/80 shadow-xs max-w-xl">
                                <div className="flex items-center justify-between gap-2 mb-2.5">
                                    <label htmlFor="hero-os-search" className="text-xs font-bold uppercase tracking-wider text-[#18181B] flex items-center gap-1.5">
                                        <Search className="w-3.5 h-3.5 text-[#18181B]" />
                                        Acompanhe sua Ordem de Serviço
                                    </label>
                                    <span className="text-[11px] text-[#52525B] font-medium hidden sm:inline">
                                        Status em tempo real
                                    </span>
                                </div>

                                <form onSubmit={handleOsSearch} className="flex flex-col sm:flex-row gap-2">
                                    <div className="relative flex-1">
                                        <input
                                            id="hero-os-search"
                                            type="text"
                                            value={osQuery}
                                            onChange={(e) => setOsQuery(e.target.value)}
                                            placeholder="Ex: INF-2026-8840"
                                            className="w-full px-3.5 py-3 rounded-lg border border-zinc-300 text-sm font-medium text-[#18181B] placeholder-zinc-400 bg-white focus:outline-none focus:ring-2 focus:ring-[#FACC15] focus:border-transparent transition-all"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#18181B] text-white text-sm font-bold hover:bg-zinc-800 transition-colors shrink-0 shadow-xs"
                                    >
                                        <span>Consultar</span>
                                        <ArrowRight className="w-4 h-4 text-[#FACC15]" />
                                    </button>
                                </form>
                            </div>

                            {/* Botões de Ação Imediata */}
                            <div className="flex flex-wrap items-center gap-3.5 pt-1">
                                <Link
                                    href="/orcamento"
                                    className="btn-primary text-sm tracking-wide"
                                >
                                    Solicitar Orçamento Grátis
                                </Link>

                                <Link
                                    href="/atendimento-domiciliar-empresas"
                                    className="inline-flex items-center justify-center px-5 py-3 rounded-lg text-sm font-bold text-[#18181B] bg-white border border-zinc-300 hover:bg-zinc-100 hover:scale-105 active:scale-95 transition-all shadow-2xs"
                                >
                                    Agendar Leva e Traz / B2B
                                </Link>
                            </div>

                            {/* Checklist de Procedência e Confiabilidade */}
                            <div className="pt-3 border-t border-zinc-200/80 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-[#52525B]">
                                <span className="flex items-center gap-1.5 font-medium">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                                    Peças de Padrão Premium
                                </span>
                                <span className="flex items-center gap-1.5 font-medium">
                                    <Lock className="w-4 h-4 text-[#18181B] shrink-0" />
                                    Privacidade Absoluta de Dados
                                </span>
                                <span className="flex items-center gap-1.5 font-medium">
                                    <Award className="w-4 h-4 text-[#854D0E] shrink-0" />
                                    Técnicos Certificados
                                </span>
                            </div>
                        </div>

                        {/* Bloco Direito: Card de Soluções e Capacidades Técnicas */}
                        <div className="lg:col-span-5">
                            <div className="relative mx-auto max-w-md bg-[#F4F4F5] rounded-2xl p-6 sm:p-7 border border-zinc-300 shadow-xl overflow-hidden">
                                <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#FACC15]/25 rounded-full blur-3xl pointer-events-none" />

                                {/* Topo do Card */}
                                <div className="flex items-center justify-between pb-4 border-b border-zinc-300/80">
                                    <div className="flex items-center gap-2.5">
                                        <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                                        <span className="text-xs font-extrabold uppercase tracking-wider text-[#18181B]">
                                            Nossas Soluções
                                        </span>
                                    </div>
                                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#FACC15] text-[#18181B]">
                                        Orçamento Grátis
                                    </span>
                                </div>

                                {/* Lista de Soluções Balanceada: Mobile, PC/Notebook e Logística */}
                                <div className="space-y-4 my-5">
                                    {/* 1. Celulares e Tablets */}
                                    <div className="p-3.5 rounded-xl bg-white border border-zinc-200 shadow-2xs flex items-start gap-3.5">
                                        <div className="p-2.5 rounded-lg bg-[#F4F4F5] text-[#18181B]">
                                            <Smartphone className="w-5 h-5 text-[#18181B]" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-[#18181B]">Smartphones & Tablets</h4>
                                            <p className="text-xs text-[#52525B] mt-0.5">
                                                Troca de telas, baterias homologadas, conectores e recuperação de aparelhos molhados.
                                            </p>
                                        </div>
                                    </div>

                                    {/* 2. Computadores e Notebooks */}
                                    <div className="p-3.5 rounded-xl bg-white border border-zinc-200 shadow-2xs flex items-start gap-3.5">
                                        <div className="p-2.5 rounded-lg bg-[#F4F4F5] text-[#18181B]">
                                            <Laptop className="w-5 h-5 text-[#18181B]" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-[#18181B]">Notebooks & Computadores</h4>
                                            <p className="text-xs text-[#52525B] mt-0.5">
                                                Upgrades de SSD e memória, troca de fontes e HDs, limpeza preventiva e aplicação de pasta térmica.
                                            </p>
                                        </div>
                                    </div>

                                    {/* 3. Atendimento Flexível / Coleta */}
                                    <div className="p-3.5 rounded-xl bg-white border border-zinc-200 shadow-2xs flex items-start gap-3.5">
                                        <div className="p-2.5 rounded-lg bg-[#F4F4F5] text-[#18181B]">
                                            <Truck className="w-5 h-5 text-[#18181B]" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-[#18181B]">Coleta & Atendimento Local</h4>
                                            <p className="text-xs text-[#52525B] mt-0.5">
                                                Modalidade Leva e Traz ou suporte técnico remoto ou presencial para residências e empresas.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Rodapé do Card */}
                                <div className="pt-4 border-t border-zinc-300/80 flex items-center justify-between text-xs text-[#52525B]">
                                    <span className="flex items-center gap-1 font-semibold text-[#18181B]">
                                        <ShieldQuestion className="w-4 h-4 text-emerald-600" />
                                        Dúvidas? Tire agora mesmo pelo WhatsApp
                                    </span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ========================================================================
          2. MODALIDADES DE ATENDIMENTO (4 PILARES ESTRATÉGICOS)
      ======================================================================== */}
            <section className="py-16 sm:py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
                    <span className="text-xs font-extrabold uppercase tracking-widest text-[#854D0E] bg-[#FACC15]/20 px-3 py-1 rounded-full border border-[#FACC15]/40">
                        Flexibilidade no Suporte
                    </span>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#18181B]">
                        Modalidades de Atendimento Pensadas para a sua Rotina
                    </h2>
                    <p className="text-sm sm:text-base text-[#52525B] font-sans">
                        Soluções práticas e seguras para o conserto e manutenção dos seus equipamentos.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {MODALITIES.map((item) => {
                        const IconComp = item.icon;
                        return (
                            <div
                                key={item.id}
                                className="card-infinic flex flex-col justify-between relative group"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="w-12 h-12 rounded-lg bg-[#FACC15]/20 flex items-center justify-center text-[#18181B] group-hover:bg-[#FACC15] transition-colors">
                                            <IconComp className="w-6 h-6 text-[#18181B]" />
                                        </div>
                                        <span className="font-heading font-extrabold text-2xl text-zinc-300 group-hover:text-[#FACC15] transition-colors">
                                            {item.step}
                                        </span>
                                    </div>

                                    <span className="inline-block px-2 py-0.5 text-[10px] font-bold text-[#854D0E] bg-[#FACC15]/15 rounded uppercase tracking-wider mb-2">
                                        {item.tag}
                                    </span>

                                    <h3 className="text-lg font-bold text-[#18181B] mb-2 font-heading">
                                        {item.title}
                                    </h3>

                                    <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>

                                <div className="pt-4 mt-4 border-t border-zinc-100 flex items-center gap-1 text-xs font-bold text-[#18181B] group-hover:text-[#EAB308] transition-colors">
                                    <span>Conhecer detalhes</span>
                                    <ArrowRight className="w-3.5 h-3.5" />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* ========================================================================
          3. GRID DE SERVIÇOS EM DESTAQUE (CATEGORIAS PRINCIPAIS)
      ======================================================================== */}
            <section className="py-16 sm:py-10 bg-white border-y border-zinc-200/80">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                        <div>
                            <span className="text-xs font-extrabold uppercase tracking-widest text-[#854D0E] bg-[#FACC15]/20 px-3 py-1 rounded-full border border-[#FACC15]/40">
                                Catálogo de Especialidades
                            </span>
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#18181B] mt-3">
                                Soluções Completas de Manutenção e Reparo
                            </h2>
                            <p className="text-sm sm:text-base text-[#52525B] mt-1 max-w-2xl font-sans">
                                Técnicos treinados para diagnósticos a nível de componente em smartphones, tablets, computadores e servidores.
                            </p>
                        </div>

                        <Link
                            href="/orcamento"
                            className="inline-flex items-center gap-2 text-sm font-bold text-[#18181B] hover:text-[#EAB308] transition-colors shrink-0"
                        >
                            <span>Ver tabela detalhada de serviços</span>
                            <ArrowRight className="w-4 h-4 text-[#FACC15]" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {SERVICES.map((serv) => {
                            const ServiceIcon = serv.icon;
                            return (
                                <div
                                    key={serv.id}
                                    className="bg-[#F4F4F5] rounded-xl border border-zinc-300/80 p-6 sm:p-7 flex flex-col justify-between shadow-sm hover:shadow-md transition-all hover:border-[#FACC15]"
                                >
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="w-12 h-12 rounded-xl bg-white border border-zinc-200 flex items-center justify-center text-[#18181B] shadow-2xs">
                                                <ServiceIcon className="w-6 h-6 text-[#18181B]" />
                                            </div>
                                            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#FACC15] text-[#18181B]">
                                                {serv.badge}
                                            </span>
                                        </div>

                                        <div>
                                            <span className="text-xs font-bold text-[#52525B] uppercase tracking-wider">
                                                {serv.category}
                                            </span>
                                            <h3 className="text-xl font-extrabold text-[#18181B] font-heading mt-0.5">
                                                {serv.title}
                                            </h3>
                                        </div>

                                        <p className="text-sm text-[#52525B] leading-relaxed">
                                            {serv.description}
                                        </p>

                                        <div className="space-y-2.5 pt-2 border-t border-zinc-200">
                                            {serv.features.map((feat, index) => (
                                                <div key={index} className="flex items-start gap-2.5 text-xs text-[#18181B] font-medium">
                                                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                                    <span>{feat}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="pt-6 mt-6 border-t border-zinc-200">
                                        <Link
                                            href={serv.href}
                                            className="btn-primary w-full text-center text-xs tracking-wider"
                                        >
                                            Solicitar Atendimento para esta Categoria
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ========================================================================
          4. PROVA SOCIAL, MÉTRICAS E DEPOIMENTOS DE CLIENTES
      ======================================================================== */}
            {/* 4. COMPROMISSOS PRÁTICOS E COMO FUNCIONA */}
            <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                {/* Bloco 1: 4 Pilares de Confiança (Sem métricas inventadas) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
                    <div className="bg-white p-5 sm:p-6 rounded-xl border border-zinc-200 shadow-2xs text-center flex flex-col justify-center">
                        <span className="font-heading font-extrabold text-2xl text-[#18181B]">
                            Custo Zero
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-[#18181B] mt-1">
                            Avaliação sem Compromisso
                        </span>
                        <span className="text-[11px] text-[#52525B] mt-1">
                            Você só autoriza e paga se aprovar o orçamento prévio.
                        </span>
                    </div>

                    <div className="bg-white p-5 sm:p-6 rounded-xl border border-zinc-200 shadow-2xs text-center flex flex-col justify-center">
                        <span className="font-heading font-extrabold text-2xl text-[#18181B]">
                            90 Dias
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-[#18181B] mt-1">
                            Garantia em Serviços
                        </span>
                        <span className="text-[11px] text-[#52525B] mt-1">
                            Cobertura completa para as peças trocadas e mão de obra.
                        </span>
                    </div>

                    <div className="bg-white p-5 sm:p-6 rounded-xl border border-zinc-200 shadow-2xs text-center flex flex-col justify-center">
                        <span className="font-heading font-extrabold text-2xl text-[#18181B]">
                            Sigilo Total
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-[#18181B] mt-1">
                            Privacidade de Arquivos
                        </span>
                        <span className="text-[11px] text-[#52525B] mt-1">
                            Seus dados, fotos e documentos preservados com segurança.
                        </span>
                    </div>

                    <div className="bg-white p-5 sm:p-6 rounded-xl border border-zinc-200 shadow-2xs text-center flex flex-col justify-center">
                        <span className="font-heading font-extrabold text-2xl text-[#18181B]">
                            Até 12x
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-[#18181B] mt-1">
                            Facilidade no Pagamento
                        </span>
                        <span className="text-[11px] text-[#52525B] mt-1">
                            Opções via Pix com desconto ou parcelamento no cartão.
                        </span>
                    </div>
                </div>

                {/* Bloco 2: Como Funciona o Atendimento (Substitui os depoimentos fictícios) */}
                <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
                    <span className="text-xs font-extrabold uppercase tracking-widest text-[#854D0E] bg-[#FACC15]/20 px-3 py-1 rounded-full border border-[#FACC15]/40">
                        Transparência do Início ao Fim
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-[#18181B]">
                        Como funciona o atendimento na prática
                    </h2>
                    <p className="text-sm text-[#52525B]">
                        Sem burocracia, sem termos complexos e com acompanhamento direto em cada etapa.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="card-infinic flex flex-col justify-between">
                        <div className="space-y-3">
                            <span className="font-heading font-extrabold text-3xl text-[#FACC15]">01</span>
                            <h3 className="text-lg font-bold text-[#18181B]">Contato e Agendamento</h3>
                            <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed">
                                Você informa o modelo do equipamento e o defeito apresentado via WhatsApp ou formulário. Combinamos a retirada pelo Leva e Traz ou a visita para formatação.
                            </p>
                        </div>
                        <div className="pt-4 mt-4 border-t border-zinc-100 text-xs text-[#854D0E] font-bold">
                            Passo inicial rápido
                        </div>
                    </div>

                    <div className="card-infinic flex flex-col justify-between">
                        <div className="space-y-3">
                            <span className="font-heading font-extrabold text-3xl text-[#FACC15]">02</span>
                            <h3 className="text-lg font-bold text-[#18181B]">Diagnóstico e Aprovação</h3>
                            <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed">
                                Testamos o aparelho para identificar a causa exata. Passamos o orçamento discriminado com valor final. O serviço só inicia após sua autorização explícita.
                            </p>
                        </div>
                        <div className="pt-4 mt-4 border-t border-zinc-100 text-xs text-emerald-600 font-bold">
                            Sem custos surpresa
                        </div>
                    </div>

                    <div className="card-infinic flex flex-col justify-between">
                        <div className="space-y-3">
                            <span className="font-heading font-extrabold text-3xl text-[#FACC15]">03</span>
                            <h3 className="text-lg font-bold text-[#18181B]">Execução, Testes e Devolução</h3>
                            <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed">
                                Realizamos a manutenção, fazemos os testes de conformidade e entregamos seu equipamento pronto para uso, acompanhado da garantia de 90 dias.
                            </p>
                        </div>
                        <div className="pt-4 mt-4 border-t border-zinc-100 text-xs text-[#18181B] font-bold">
                            Garantia assegurada
                        </div>
                    </div>
                </div>
            </section>

            {/* ========================================================================
          5. FAQ SANFONADO (ACCORDION INTERATIVO)
      ======================================================================== */}
            <section className="py-16 sm:py-20 bg-white border-t border-zinc-200/80">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 space-y-2">
                        <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-[#854D0E] bg-[#FACC15]/20 px-3 py-1 rounded-full border border-[#FACC15]/40">
                            <HelpCircle className="w-3.5 h-3.5 text-[#854D0E]" />
                            Dúvidas Frequentes
                        </span>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#18181B]">
                            Perguntas e Respostas sobre os Reparos
                        </h2>
                        <p className="text-sm text-[#52525B] max-w-xl mx-auto">
                            Tudo o que você precisa saber sobre nossos processos, termos de garantia e protocolos técnicos.
                        </p>
                    </div>

                    <div className="space-y-3.5">
                        {FAQS.map((faq) => {
                            const isOpen = openFaqId === faq.id;

                            return (
                                <div
                                    key={faq.id}
                                    className="rounded-xl border border-zinc-200 bg-[#F4F4F5] overflow-hidden transition-colors"
                                >
                                    <button
                                        type="button"
                                        onClick={() => toggleFaq(faq.id)}
                                        className="w-full flex items-center justify-between p-4 sm:p-5 text-left focus:outline-none focus:ring-2 focus:ring-[#FACC15]"
                                        aria-expanded={isOpen}
                                    >
                                        <span className="text-sm sm:text-base font-bold text-[#18181B] pr-4 font-heading">
                                            {faq.question}
                                        </span>
                                        <div className={`p-1.5 rounded-full bg-white transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>
                                            <ChevronDown className="w-4 h-4 text-[#18181B]" />
                                        </div>
                                    </button>

                                    {isOpen && (
                                        <div className="px-4 pb-5 sm:px-5 sm:pb-5 pt-1 text-xs sm:text-sm text-[#52525B] leading-relaxed border-t border-zinc-200/60 bg-white">
                                            {faq.answer}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    <div className="mt-8 p-4 rounded-xl bg-[#F4F4F5] border border-zinc-200 text-center flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                        <span className="text-[#52525B]">
                            Ainda tem alguma dúvida pontual sobre o seu modelo específico?
                        </span>
                        <Link
                            href="/orcamento"
                            className="font-bold text-[#18181B] hover:text-[#EAB308] underline underline-offset-4 shrink-0"
                        >
                            Falar agora com um consultor técnico
                        </Link>
                    </div>
                </div>
            </section>

            {/* ========================================================================
          6. BANNER DE CHAMADA FINAL (CALL TO ACTION)
      ======================================================================== */}
            <section className="py-16 bg-[#18181B] text-white border-t-4 border-[#FACC15]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800 text-[#FACC15] border border-zinc-700 text-xs font-bold uppercase tracking-wider">
                        <Sparkles className="w-3.5 h-3.5" />
                        Recupere seu Aparelho Hoje Mesmo
                    </div>

                    <h2 className="text-2xl sm:text-4xl font-extrabold max-w-2xl mx-auto leading-tight font-heading">
                        Seu dispositivo novo de novo, com diagnóstico sem custo e 90 dias de garantia.
                    </h2>

                    <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto">
                        Envie as características do problema pelo nosso formulário em cascata ou agende uma coleta via motoboy credenciado.
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                        <Link
                            href="/orcamento"
                            className="btn-primary text-sm uppercase tracking-wider px-8 py-3.5 shadow-lg"
                        >
                            Solicitar Orçamento Online
                        </Link>

                        <Link
                            href="/status-os"
                            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-zinc-800 text-white font-bold text-sm hover:bg-zinc-700 transition-colors border border-zinc-700"
                        >
                            <Search className="w-4 h-4 text-[#FACC15]" />
                            Consultar Status de O.S.
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}