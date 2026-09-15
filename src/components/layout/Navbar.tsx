"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Smartphone,
    Laptop,
    Building2,
    Info,
    Search,
    Menu,
    X,
    ShieldCheck,
    Award,
    Clock,
    ChevronRight,
    CheckCircle2,
    Phone,
} from "lucide-react";

export function InfinicLogo() {
    return (
        <Link
            href="/"
            className="inline-flex items-center gap-2.5 focus:outline-none focus:ring-2 focus:ring-[#FACC15] rounded-md p-1 transition-opacity hover:opacity-95"
            aria-label="Infinic Assistência Técnica"
        >
            <div className="flex items-center h-8 md:h-9">
                <svg
                    viewBox="0 0 100 45"
                    className="h-full w-auto fill-current text-[#FACC15] drop-shadow-sm"
                    aria-hidden="true"
                >
                    <path
                        d="M 30,7.5 C 17.58,7.5 7.5,17.58 7.5,30 C 7.5,42.42 17.58,52.5 30,52.5 C 40.23,52.5 48.81,45.66 51.48,36.21 L 52.5,32.61 L 53.52,36.21 C 56.19,45.66 64.77,52.5 75,52.5 C 87.42,52.5 97.5,42.42 97.5,30 C 97.5,17.58 87.42,7.5 75,7.5 C 64.77,7.5 56.19,14.34 53.52,23.79 L 52.5,27.39 L 51.48,23.79 C 48.81,14.34 40.23,7.5 30,7.5 Z M 30,17.5 C 36.9,17.5 42.5,23.1 42.5,30 C 42.5,36.9 36.9,42.5 30,42.5 C 23.1,42.5 17.5,36.9 17.5,30 C 17.5,23.1 23.1,17.5 30,17.5 Z M 75,17.5 C 81.9,17.5 87.5,23.1 87.5,30 C 87.5,36.9 81.9,42.5 75,42.5 C 68.1,42.5 62.5,36.9 62.5,30 C 62.5,23.1 68.1,17.5 75,17.5 Z"
                        transform="scale(0.85) translate(4, -2)"
                    />
                </svg>
                <div className="h-2/3 w-[2px] bg-[#FACC15] mx-2.5 rounded-full opacity-90" />
                <span className="font-heading font-extrabold tracking-wider text-[#18181B] text-xl md:text-2xl uppercase">
                    INFINIC
                </span>
            </div>
        </Link>
    );
}

const NAV_ITEMS = [
    { label: "Celular & Tablet", href: "/conserto-celular-tablet", icon: Smartphone },
    { label: "Computador & Notebook", href: "/manutencao-computador-notebook", icon: Laptop },
    { label: "Empresas & Domicílio", href: "/atendimento-domiciliar-empresas", icon: Building2, badge: "B2B" },
    { label: "Sobre Nós", href: "/sobre-nos", icon: Info },
] as const;

export function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    return (
        <header className={`header-sticky transition-all duration-200 ${isScrolled ? "bg-white/95 shadow-sm py-2" : "bg-[#F4F4F5]/90 py-3"}`}>
            {/* Barra Informativa Superior */}
            <div className="hidden lg:block bg-[#18181B] text-white text-xs py-1.5 px-4 mb-2 -mt-3">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-6">
                        <span className="inline-flex items-center gap-1.5 text-zinc-300">
                            <ShieldCheck className="w-3.5 h-3.5 text-[#FACC15]" />
                            Serviço Leva e Traz: buscamos e entregamos seu aparelho
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-zinc-300">
                            <Award className="w-3.5 h-3.5 text-[#FACC15]" />
                            Peças de Padrão Premium & Diagnóstico sem custo
                        </span>
                    </div>
                    <div className="flex items-center gap-4 text-zinc-300">
                        <span className="inline-flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-[#FACC15]" />
                            Seg - Sex: 08h às 17h | Sáb: 08h às 11h30
                        </span>
                        <a href="tel:08005559876" className="hover:text-[#FACC15] font-semibold flex items-center gap-1">
                            <Phone className="w-3 h-3 text-[#FACC15]" />
                            17 99100-4101
                        </a>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between gap-4">
                    <InfinicLogo />

                    {/* Navegação Desktop */}
                    <nav className="hidden md:flex items-center gap-1 lg:gap-2">
                        {NAV_ITEMS.map((item) => {
                            const isActive = pathname === item.href;
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${isActive
                                        ? "text-[#18181B] bg-white shadow-xs border-b-2 border-[#FACC15]"
                                        : "text-zinc-700 hover:text-[#18181B] hover:bg-zinc-200/60"
                                        }`}
                                >
                                    <Icon className={`w-4 h-4 ${isActive ? "text-[#18181B]" : "text-zinc-500"}`} />
                                    <span>{item.label}</span>
                                    {item.badge && (
                                        <span className="ml-1 px-1.5 py-0.5 text-[10px] font-bold bg-[#FACC15] text-[#18181B] rounded">
                                            {item.badge}
                                        </span>
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Ações Rápidas Desktop */}
                    <div className="hidden md:flex items-center gap-3">
                        <Link
                            href="/status-os"
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold text-[#18181B] bg-white border border-zinc-300 hover:bg-zinc-100 transition-colors shadow-2xs"
                        >
                            <Search className="w-3.5 h-3.5 text-zinc-700" />
                            Rastrear O.S.
                        </Link>

                        <Link href="/orcamento" className="btn-primary text-xs uppercase tracking-wider">
                            Solicitar Orçamento
                        </Link>
                    </div>

                    {/* Botão Mobile */}
                    <div className="flex items-center gap-2 md:hidden">
                        <Link
                            href="/status-os"
                            className="p-2 text-zinc-700 hover:text-[#18181B] rounded-lg bg-white border border-zinc-200"
                            aria-label="Rastrear OS"
                        >
                            <Search className="w-5 h-5" />
                        </Link>

                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            type="button"
                            className="p-2 rounded-lg text-zinc-800 hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-[#FACC15]"
                            aria-expanded={isMobileMenuOpen}
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Menu Mobile */}
            {isMobileMenuOpen && (
                <div className="md:hidden border-t border-zinc-200 bg-white px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2">
                    <div className="space-y-1">
                        {NAV_ITEMS.map((item) => {
                            const isActive = pathname === item.href;
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center justify-between px-3 py-3 rounded-lg text-base font-medium ${isActive ? "bg-zinc-100 text-[#18181B] font-bold border-l-4 border-[#FACC15]" : "text-zinc-700 hover:bg-zinc-50"
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <Icon className="w-5 h-5 text-zinc-500" />
                                        <span>{item.label}</span>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-zinc-400" />
                                </Link>
                            );
                        })}
                    </div>

                    <div className="mt-5 pt-4 border-t border-zinc-200 flex flex-col gap-3">
                        <Link
                            href="/status-os"
                            className="flex items-center justify-center gap-2 w-full py-3 rounded-lg text-sm font-bold text-[#18181B] bg-zinc-100 border border-zinc-300"
                        >
                            <Search className="w-4 h-4" />
                            Consultar Status de O.S.
                        </Link>

                        <Link href="/orcamento" className="btn-primary w-full text-center py-3 text-sm">
                            Solicitar Orçamento Grátis
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}