import { serve } from "inngest/next";
import { inngest, enviarNotificacaoOrcamento } from "@/inngest/client";

// Cria a rota de API do Inngest para escutar e executar as funções
export const { GET, POST, PUT } = serve({
    client: inngest,
    functions: [enviarNotificacaoOrcamento],
});
