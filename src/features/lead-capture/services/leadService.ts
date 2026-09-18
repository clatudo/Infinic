import { createClient } from "@/lib/supabase/client";
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
    const supabase = createClient();

    const { error } = await supabase
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
        ]);

    if (error) {
        throw new Error(`Erro ao registrar orçamento: ${error.message}`);
    }

    return {
        id: "",
        created_at: new Date().toISOString(),
        customer_name: payload.customer_name,
        customer_phone: payload.customer_phone,
        customer_email: payload.customer_email || null,
        device_brand: payload.device_brand,
        device_model: payload.device_model,
        issue_description: payload.issue_description,
        service_type: payload.service_type,
    };
}