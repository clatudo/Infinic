import React from "react";
import Link from "next/link";
import { ShieldCheck, Lock, Award, ChevronRight, MapPin, Phone, Mail } from "lucide-react";
import { InfinicLogo } from "./Navbar";
import { SITE_CONFIG } from "@/lib/constants.js";

export function Footer() {
    return (
        <footer className="bg-[#18181B] text-white pt-16 pb-12 border-t-4 border-[#FACC15] mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-zinc-800">

                    {/* Identidade */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="bg-white/10 p-2 rounded-lg inline-block backdrop-blur-sm">
                            <InfinicLogo />
                        </div>

                        <p className="text-zinc-400 text-sm leading-relaxed max-w-md">
                            Assistência técnica especializada em smartphones, tablets, notebooks e computadores. Diagnóstico laboratorial de precisão, peças homologadas e garantia total de 90 dias.
                        </p>

                        <div className="inline-flex items-center gap-2.5 bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-xs text-zinc-300">
                            <ShieldCheck className="w-5 h-5 text-[#FACC15] shrink-0" />
                            <span>
                                <strong className="text-white block">Garantia Segura de 90 Dias</strong>
                                Certificado formal e atendimento prioritário em caso de anomalia.
                            </span>
                        </div>

                        <div className="flex items-center gap-3 pt-1">
                            <div className="flex items-center gap-1.5 text-xs text-zinc-400 bg-zinc-900 px-3 py-1.5 rounded-md border border-zinc-800">
                                <Lock className="w-3.5 h-3.5 text-[#FACC15]" />
                                Dados Protegidos
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-zinc-400 bg-zinc-900 px-3 py-1.5 rounded-md border border-zinc-800">
                                <Award className="w-3.5 h-3.5 text-[#FACC15]" />
                                Técnicos Certificados
                            </div>
                        </div>
                    </div>

                    {/* Especialidades */}
                    <div className="space-y-3">
                        <h3 className="font-heading font-bold text-white text-base tracking-wider uppercase border-l-2 border-[#FACC15] pl-2">
                            Especialidades
                        </h3>
                        <ul className="space-y-2.5 text-sm text-zinc-400">
                            <li>
                                <Link href="/conserto-celular-tablet" className="hover:text-[#FACC15] transition-colors flex items-center gap-1.5">
                                    <ChevronRight className="w-3.5 h-3.5 text-[#FACC15]" />
                                    Troca de Tela & Bateria
                                </Link>
                            </li>
                            <li>
                                <Link href="/conserto-celular-tablet" className="hover:text-[#FACC15] transition-colors flex items-center gap-1.5">
                                    <ChevronRight className="w-3.5 h-3.5 text-[#FACC15]" />
                                    Desoxidação Química
                                </Link>
                            </li>
                            <li>
                                <Link href="/manutencao-computador-notebook" className="hover:text-[#FACC15] transition-colors flex items-center gap-1.5">
                                    <ChevronRight className="w-3.5 h-3.5 text-[#FACC15]" />
                                    Upgrade SSD & Memória RAM
                                </Link>
                            </li>
                            <li>
                                <Link href="/manutencao-computador-notebook" className="hover:text-[#FACC15] transition-colors flex items-center gap-1.5">
                                    <ChevronRight className="w-3.5 h-3.5 text-[#FACC15]" />
                                    Reparo em Placa-Mãe
                                </Link>
                            </li>
                            <li>
                                <Link href="/atendimento-domiciliar-empresas" className="hover:text-[#FACC15] transition-colors flex items-center gap-1.5">
                                    <ChevronRight className="w-3.5 h-3.5 text-[#FACC15]" />
                                    Suporte T.I. Corporativo B2B
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Rotas */}
                    <div className="space-y-3">
                        <h3 className="font-heading font-bold text-white text-base tracking-wider uppercase border-l-2 border-[#FACC15] pl-2">
                            Navegação
                        </h3>
                        <ul className="space-y-2.5 text-sm text-zinc-400">
                            <li>
                                <Link href="/status-os" className="hover:text-[#FACC15] transition-colors">
                                    Rastrear Ordem de Serviço
                                </Link>
                            </li>
                            <li>
                                <Link href="/orcamento" className="hover:text-[#FACC15] transition-colors">
                                    Solicitar Orçamento Online
                                </Link>
                            </li>
                            <li>
                                <Link href="/atendimento-domiciliar-empresas" className="hover:text-[#FACC15] transition-colors">
                                    Atendimento Leva e Traz
                                </Link>
                            </li>
                            <li>
                                <Link href="/sobre-nos" className="hover:text-[#FACC15] transition-colors">
                                    Estrutura & Laboratório
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contato */}
                    <div className="space-y-3">
                        <h3 className="font-heading font-bold text-white text-base tracking-wider uppercase border-l-2 border-[#FACC15] pl-2">
                            Contato & Suporte
                        </h3>
                        <div className="space-y-2.5 text-sm text-zinc-400">
                            <p className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-[#FACC15] shrink-0" />
                                <a href={`tel:${SITE_CONFIG.whatsapp.number}`} className="hover:text-white">{SITE_CONFIG.whatsapp.display}</a>
                            </p>
                            <p className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-[#FACC15] shrink-0" />
                                <span>contato@infinic.com.br</span>
                            </p>
                            <div className="pt-2 border-t border-zinc-800 text-xs">
                                <p className="text-zinc-300 font-semibold mb-1">Horário de Funcionamento:</p>
                                <p>Segunda a Sexta: 08:00h às 17:00h</p>
                                <p>Sábados: 08:00h às 11:30h</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
                    <p>© {new Date().getFullYear()} Infinic Assistência Técnica. Todos os direitos reservados.</p>
                    <div className="flex items-center gap-6">
                        <Link href="/sobre-nos" className="hover:text-zinc-300">Termos de Garantia</Link>
                        <Link href="/sobre-nos" className="hover:text-zinc-300">Política de Privacidade</Link>
                        <Link href="/status-os" className="hover:text-[#FACC15] font-semibold">Portal do Cliente OS</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}