import type { Metadata, Viewport } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/providers/QueryProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";

// Otimização e carregamento sem layout shift da tipografia para corpo e interface
const inter = Inter({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-inter",
    display: "swap",
});

// Otimização e carregamento da tipografia institucional para títulos e elementos de destaque
const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["600", "700", "800"],
    variable: "--font-montserrat",
    display: "swap",
});

export const viewport: Viewport = {
    themeColor: "#F4F4F5",
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
};

export const metadata: Metadata = {
    title: {
        default: "Infinic | Assistência Técnica Especializada em Smartphones, Tablets e Computadores",
        template: "%s | Infinic Assistência Técnica",
    },
    description:
        "Assistência técnica de precisão para celulares, tablets, notebooks e computadores. Modalidades Leva e Traz, Domicílio e Atendimento Corporativo com 90 dias de garantia e peças de padrão premium.",
    keywords: [
        "assistência técnica especializada",
        "conserto celular",
        "manutenção de computadores",
        "reparo de notebooks",
        "troca de tela smartphone",
        "recuperação de dados",
        "garantia 90 dias",
        "infinic suporte",
    ],
    authors: [{ name: "Infinic Suporte" }],

    metadataBase: new URL(
        process.env.NEXT_PUBLIC_SITE_URL || "https://www.infinic.com.br"
    ),
    alternates: {
        canonical: "/",
    },

    openGraph: {
        title: "Infinic | Assistência Técnica Especializada",
        description:
            "Serviço técnico com rastreamento em tempo real de ordens de serviço, peças de procedência certificada e garantia de 90 dias.",
        url: "https://www.infinic.com.br",
        siteName: "Infinic",
        locale: "pt_BR",
        type: "website",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    icons: {
        icon: "/favicon.ico",
    },
};

interface RootLayoutProps {
    children: React.ReactNode;
}


export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html
            lang="pt-BR"
            className={`${inter.variable} ${montserrat.variable} scroll-smooth`}
            suppressHydrationWarning
        >
            <body className="min-h-screen bg-[#F4F4F5] text-[#18181B] font-sans antialiased selection:bg-[#FACC15] selection:text-[#18181B]">
                <QueryProvider>
                    <div className="flex min-h-screen flex-col">
                        <Navbar />
                        <main className="flex-1">
                            {children}
                        </main>
                        <Footer />
                        <WhatsAppButton />
                    </div>
                </QueryProvider>
            </body>
        </html>
    );
}
