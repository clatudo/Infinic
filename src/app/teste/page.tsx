import { createClient } from '@supabase/supabase-js'

// Cria o cliente usando as variáveis do seu arquivo .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default async function TestPage() {
    // Faz uma consulta boba apenas para ver se o banco responde
    const { data, error } = await supabase.from('lead_captures').select('*').limit(1)

    // Se o erro for apenas que a tabela não existe, a conexão deu certo!
    // Se o erro for de autenticação (invalid API key) ou rede, algo está errado.
    console.log("--- TESTE DO SUPABASE ---")
    console.log("Dados:", data)
    console.log("Erro encontrado:", error)

    return (
        <div style={{ padding: 20 }}>
            <h1>Testando Conexão do Supabase</h1>
            <p>Olhe o terminal onde o projeto está rodando para ver o resultado!</p>
        </div>
    )
}
