import { createClient } from "@/lib/supabase/client";
import { ServiceOrderPublicView } from "@/types/database.types";

export async function fetchServiceOrderByNumber(
    orderNumber: string
): Promise<ServiceOrderPublicView | null> {
    const cleanNumber = orderNumber.trim().toUpperCase();

    if (!cleanNumber) {
        return null;
    }

    const supabase = createClient();

    const { data, error } = await supabase.rpc("get_service_order_by_number", {
        p_order_number: cleanNumber,
    });

    if (error) {
        throw new Error(`Falha na consulta da O.S.: ${error.message}`);
    }

    if (!data || data.length === 0) {
        return null;
    }

    return data[0];
}