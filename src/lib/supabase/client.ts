import { createBrowserClient } from "@supabase/ssr";
import { Database } from "@/types/database.types";

const rawSupabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!rawSupabaseUrl || !supabaseAnonKey) {
    throw new Error(
        "Variáveis de ambiente ausentes: Assegure a definição de NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY no arquivo .env.local."
    );
}

// Higieniza a URL caso contenha /rest/v1 ou barras adicionais no final
const supabaseUrl = rawSupabaseUrl.replace(/\/rest\/v1\/?$/, "").replace(/\/+$/, "");

export const createClient = () => {
    return createBrowserClient<Database>(supabaseUrl, supabaseAnonKey);
};