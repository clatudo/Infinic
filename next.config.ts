import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  trailingSlash: true, // <-- Adicionar esta linha
  images: {
    unoptimized: true, // Obrigatório para export estático sem servidor Node ativo
  }
};

export default nextConfig;
