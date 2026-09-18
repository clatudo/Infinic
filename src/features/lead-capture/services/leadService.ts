"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { inngest } from "@/inngest/client";
import { LeadCapture } from "@/types/database.types";

export interface CreateLeadPayload {
    customer_name: string;
    customer_phone: string;
    customer_email?: string;
    device_brand: string;
    device_model: string;
    issue_description: string;
    service_type: "suporte_remoto" | "courier_pickup" | "home_service" | "b2b_corporate";
}

export async function createLead(payload: CreateLeadPayload): Promise<LeadCapture> {
    const supabase = await createServerSupabaseClient();

    const { data, error } = await supabase
        .from("lead_captures")
        .insert([
            {
                customer_name: payload.customer_name,
                customer_phone: payload.customer_phone,
                customer_email: payload.customer_email || null,
                device_brand: payload.device_brand,
                device_model: payload.device_model,
                issue_description: payload.issue_description,
                service_type: payload.service_type,
            },
        ])
        .select()
        .single();

    if (error) {
        throw new Error(`Erro ao registrar orçamento: ${error.message}`);
    }

    // Dispara o evento resiliente no Inngest
    try {
        await inngest.send({
            name: "app/orcamento.recebido",
            data: {
                nome: payload.customer_name,
                email: payload.customer_email || "Não informado",
                telefone: payload.customer_phone,
                mensagem: `Aparelho: ${payload.device_brand} ${payload.device_model} | Modalidade: ${payload.service_type} | Defeito: ${payload.issue_description}`,
            },
        });
    } catch (inngestError) {
        console.error("Aviso: Falha ao enviar evento para o Inngest:", inngestError);
    }

    return (
        data ?? {
            id: "",
            created_at: new Date().toISOString(),
            customer_name: payload.customer_name,
            customer_phone: payload.customer_phone,
            customer_email: payload.customer_email || null,
            device_brand: payload.device_brand,
            device_model: payload.device_model,
            issue_description: payload.issue_description,
            service_type: payload.service_type,
        }
    );
}