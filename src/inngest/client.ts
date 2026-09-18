import { Inngest } from "inngest";

// Cria o cliente do Inngest responsável por escutar os eventos do site Infinic
export const inngest = new Inngest({ id: "infinic-site" });

// Esta é a função resiliente que cuida do envio do e-mail
export const enviarNotificacaoOrcamento = inngest.createFunction(
    { id: "enviar-alerta-orcamento", name: "Alerta de Novo Orçamento" },
    { event: "app/orcamento.recebido" }, // Nome do evento que o Supabase vai disparar
    async ({ event, step }) => {

        // Pegamos os dados enviados pelo formulário
        const { nome, email, telefone, mensagem } = event.data;

        // Tentativa resiliente de envio usando o Loops.so
        await step.run("enviar-email-loops", async () => {
            const response = await fetch("https://loops.so", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${process.env.LOOPS_API_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    // Substitua pelo ID do ID do seu template transacional criado no Loops
                    transactionalId: "cmu69y7uq0sn40jxtivng409i",
                    email: "onlineproducoes@gmail.com", // O e-mail onde VOCÊ quer receber o aviso
                    dataVariables: {
                        nomeCliente: nome,
                        emailCliente: email,
                        telefoneCliente: telefone,
                        mensagemCliente: mensagem,
                    },
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Falha ao enviar e-mail para o Loops: ${errorText}`);
            }

            return { success: true };
        });
    }
);
