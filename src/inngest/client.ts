import { Inngest } from "inngest";

// Cria o cliente do Inngest responsável por escutar os eventos do site Infinic
export const inngest = new Inngest({ id: "infinic-site" });

// Esta é a função resiliente que cuida do envio do e-mail
export const enviarNotificacaoOrcamento = inngest.createFunction(
    {
        id: "enviar-alerta-orcamento",
        name: "Alerta de Novo Orçamento",
        triggers: [{ event: "app/orcamento.recebido" }],
    },
    async ({ event, step }) => {
        // Forçamos o TypeScript a entender a estrutura dos dados recebidos
        const data = event.data as {
            nome: string;
            email: string;
            telefone: string;
            mensagem: string;
        };

        // Tentativa resiliente de envio usando o Loops.so
        await step.run("enviar-email-loops", async () => {
            const response = await fetch("https://loops.so", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${process.env.LOOPS_API_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    transactionalId: "cmu69y7uq0sn40jxtivng409i", // <-- Cole seu ID do Loops aqui
                    email: "onlineproducoes@gmail.com", // <-- Seu e-mail de administrador
                    dataVariables: {
                        nomeCliente: data.nome,
                        emailCliente: data.email,
                        telefoneCliente: data.telefone,
                        mensagemCliente: data.mensagem,
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



// Certifique-se de substituir pelo seu ID real do Loops abaixo (ex: cl...)
//transactionalId: "cmu69y7uq0sn40jxtivng409i",
//email: "onlineproducoes@gmail.com", // O e-mail onde VOCÊ quer receber o aviso
