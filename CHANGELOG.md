# Histórico de Modificações do Projeto (CHANGELOG)

Este documento registra detalhadamente todas as alterações realizadas no código-fonte do projeto Infinic, especificando data/hora, arquivos modificados, motivação técnica, o que foi alterado e o que foi inserido.

---

## [2026-09-16 23:23] - Ajuste de conformidade de tipos Supabase

### Arquivo Modificado
- [`src/types/database.types.ts`](file:///e:/Projetos/infinic/src/types/database.types.ts)

### Motivação Técnica
O `@supabase/supabase-js` (versão 2.116.0) e o `@supabase/ssr` requerem que o tipo passado no generic (`Database['public']`) implemente o formato `GenericSchema`. Sem as chaves `Relationships` em cada tabela e sem as definições de `Views`, `Enums` e `CompositeTypes`, o cliente tipava todo o schema e as chamadas `.from()` e `.rpc()` como `never`.

### O que foi alterado / removido
- O retorno da função RPC `get_service_order_by_number` foi ajustado de `ServiceOrder[]` para `ServiceOrderPublicView[]`.

### O que foi inserido
- Propriedade `Relationships: []` em `public.Tables.service_orders`.
- Propriedade `Relationships: []` em `public.Tables.lead_captures`.
- Objeto de schema `Views: { [_ in never]: never }`.
- Objeto de schema `Enums: { [_ in never]: never }`.
- Objeto de schema `CompositeTypes: { [_ in never]: never }`.

---

## [2026-09-16 23:29] - Correção de tipagem em página de teste e Navbar

### 1. Arquivo: [`src/app/teste/page.tsx`](file:///e:/Projetos/infinic/src/app/teste/page.tsx)
- **Motivação Técnica**: O TypeScript acusou `TS2345` pois `process.env.NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY` possuem tipo `string | undefined`, enquanto `createClient` requer `string`.
- **O que foi alterado**: Linhas de leitura das variáveis de ambiente.
- **O que foi inserido**: Operador de fallback `|| ""` para assegurar tipagem `string`.

### 2. Arquivo: [`src/components/layout/Navbar.tsx`](file:///e:/Projetos/infinic/src/components/layout/Navbar.tsx)
- **Motivação Técnica**: O array `NAV_ITEMS` estava com `as const`. Como somente um item possuía a propriedade opcional `badge`, o TypeScript inferiu uma união onde `badge` não existia em todos os elementos, disparando erro `TS2339`.
- **O que foi alterado**: Tipagem da constante `NAV_ITEMS` (removido `as const`).
- **O que foi inserido**: Interface explícita `NavItem` com a propriedade opcional `badge?: string`.

---

## [2026-09-16 23:31] - Adequação do schema Supabase para tipos literais (GenericSchema)

### Arquivo Modificado
- [`src/types/database.types.ts`](file:///e:/Projetos/infinic/src/types/database.types.ts)

### Motivação Técnica
Em TypeScript, `interface` não possui assinatura de índice de string implícita (diferente de `type`), o que fazia com que `Database['public']` não satisfizesse `GenericSchema` do `@supabase/supabase-js 2.116`. Isso levava o cliente Supabase a inferir o schema como `never`, causando erros no `.insert()` de `leadService.ts` e no `.rpc()` de `osService.ts`.

### O que foi alterado
- Conversão de `interface ServiceOrder`, `interface ServiceOrderPublicView`, `interface LeadCapture` e `interface Database` para declarações `type`.
- Retorno da função `get_service_order_by_number` ajustado para `ServiceOrderPublicView[]`.

### O que foi inserido
- Tipo auxiliar `Json`.
- Propriedade `Relationships: []` em `service_orders` e `lead_captures`.
- Chaves de schema `Views`, `Enums` e `CompositeTypes` tipadas com `{ [_ in never]: never }`.

---

## [2026-09-17 08:50] - UX/UI da Página de Orçamento: Rolagem automática e destaque de campos obrigatórios

### Arquivo Modificado
- [`src/app/orcamento/page.tsx`](file:///e:/Projetos/infinic/src/app/orcamento/page.tsx)

### Motivação Técnica
1. **Visibilidade do feedback de erro**: Ao clicar em "Avançar para Atendimento" com a rolagem no final da página, os alertas de validação eram renderizados fora do campo de visão do usuário, exigindo rolagem manual para identificar os campos faltantes.
2. **Posicionamento pós-conclusão**: Na transição assíncrona para a tela de confirmação (Passo 3), o usuário permanecia posicionado no rodapé da página ao invés de visualizar o banner inicial e o card de sucesso no topo.
3. **Substituição de validação nativa do navegador**: Os atributos HTML5 `required` dentro do `<form>` disparavam os tooltips nativos do navegador ("Preencha este campo"), que bloqueavam o handler customizado do React, não seguiam o design system e tinham baixa visibilidade.

### O que foi alterado
- Importações do React atualizadas para incluir `useRef` e `useEffect`.
- Função `handleProceedToStep2`: agora valida os campos `brand`, `model` e `issue` atualizando o estado granular `fieldErrors`, disparando `showError` e rolando até o topo do formulário.
- Função `handleFinalSubmit`: atualizada para validar `name` e `phone` via React (com sanitização de caracteres não-numéricos no telefone), populando `fieldErrors`.
- Tag `<form>` no Passo 2: recebeu o atributo `noValidate` para desativar os tooltips nativos do navegador.
- Inputs dos Passos 1 e 2 (`brand`, `model`, `issue`, `name`, `phone`): agora alternam dinamicamente suas classes CSS com base no estado `fieldErrors`.
- Botão "Voltar e alterar aparelho": atualizado para rolar suavemente ao topo do formulário ao alternar para o Passo 1.

### O que foi inserido
- Estado `fieldErrors` (`{ brand?: boolean; model?: boolean; issue?: boolean; name?: boolean; phone?: boolean }`) para controle visual campo a campo.
- Referência `formTopRef` com âncora HTML `<div ref={formTopRef} className="scroll-mt-24 sm:scroll-mt-28" />`, compensando a altura do menu de navegação fixo (*sticky header*).
- Função `scrollToFormTop`: rola suavemente a viewport até a âncora `formTopRef`.
- Função `scrollToPageTop`: executa rolagem suave para as coordenadas `(0, 0)` da janela.
- Hook `useEffect` monitorando `step === 3` para garantir rolagem ao topo absoluto assim que a tela de confirmação for montada.
- Função `showError`: atualiza `formError` e aciona `scrollToFormTop` imediatamente.
- Componentes visuais de erro nos inputs:
  - Bordas avermelhadas (`border-red-500`) com fundo sutil (`bg-red-50/50`) e anel de foco (`ring-red-400/50`).
  - Ícone flutuante `AlertCircle` posicionado à direita do campo inválido.
  - Mensagens textuais de apoio em vermelho logo abaixo de cada campo com erro (`animate-in fade-in slide-in-from-top-1`).
  - Limpeza imediata do erro individual no evento `onChange` / `onClick` de cada elemento.

---

## [2026-09-17 21:25] - Integração com Google Analytics 4, Pipeline de Deploy FTP e Export Estático

### Arquivos Modificados / Criados
- [`.env.local`](file:///e:/Projetos/infinic/.env.local) *(Modificado)*
- [`package.json`](file:///e:/Projetos/infinic/package.json) *(Modificado)*
- [`src/app/layout.tsx`](file:///e:/Projetos/infinic/src/app/layout.tsx) *(Modificado)*
- [`src/components/GoogleAnalytics.tsx`](file:///e:/Projetos/infinic/src/components/GoogleAnalytics.tsx) *(Novo)*
- [`next.config.ts`](file:///e:/Projetos/infinic/next.config.ts) *(Modificado)*
- [`.github/workflows/deploy.yml`](file:///e:/Projetos/infinic/.github/workflows/deploy.yml) *(Novo)*

### Motivação Técnica
1. **Métricas e Telemetria Unificada**: Centralizar o rastreamento do Google Analytics 4 (GA4) no layout raiz da aplicação para que todas as páginas e rotas sejam monitoradas automaticamente, sem duplicação de scripts e desacoplando o ID de medição via variável de ambiente.
2. **Exportação Estática para Hospedagem Web**: Adequar o Next.js para geração de arquivos estáticos (`HTML`/`CSS`/`JS`), viabilizando a hospedagem em servidores tradicionais com suporte a FTP/cPanel sem necessidade de runtime Node.js dedicado.
3. **Automação de CI/CD**: Automatizar o ciclo de compilação e deploy via GitHub Actions disparado a cada `push` na branch `main`, garantindo que os segredos de ambiente sejam injetados durante o build e os arquivos estáticos sejam transferidos para o diretório `/public_html/`.

### O que foi alterado
- **`src/app/layout.tsx`**: Inclusão do componente `<GoogleAnalytics />` logo no início do `<body>` do `RootLayout`, recebendo dinamicamente `process.env.NEXT_PUBLIC_GA_ID`.
- **`next.config.ts`**:
  - Adicionada flag `output: 'export'` para direcionar o resultado do `next build` para a pasta `./out/`.
  - Adicionada configuração `images: { unoptimized: true }`, obrigatória para o componente `next/image` funcionar em compilações totalmente estáticas.
- **`.github/workflows/deploy.yml`**:
  - Ajustado parâmetro `local-dir` de `./build/` para `./out/`, refletindo o diretório de saída gerado pelo Next.js em modo export.
  - Correção na sintaxe do step `actions/setup-node` (`node-version: '20'`).

### O que foi inserido
- **Dependência**: Pacote oficial `@next/third-parties` instalado e referenciado em `package.json`.
- **Variável de Ambiente**: Chave `NEXT_PUBLIC_GA_ID` definida em `.env.local`.
- **Componente**: [`src/components/GoogleAnalytics.tsx`](file:///e:/Projetos/infinic/src/components/GoogleAnalytics.tsx) criado como implementação alternativa modular via `next/script`.
- **Workflow GitHub Actions**: [`.github/workflows/deploy.yml`](file:///e:/Projetos/infinic/.github/workflows/deploy.yml) com pipeline completa de checkout, cache de pacotes npm, injeção das variáveis de ambiente (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_GA_ID`), execução de `npm run build` e envio dos arquivos via `SamKirkland/FTP-Deploy-Action@v4.3.5`.

---

## [2026-09-17 23:30] - Adequação do Inngest v4, Integração com Loops.so e Compatibilidade com Static Export (Deploy FTP)

### Arquivos Modificados / Removidos
- [`src/inngest/client.ts`](file:///e:/Projetos/infinic/src/inngest/client.ts) *(Modificado)*
- [`src/features/lead-capture/services/leadService.ts`](file:///e:/Projetos/infinic/src/features/lead-capture/services/leadService.ts) *(Restaurado e Validado)*
- `src/app/api/inngest/route.ts` *(Removido para compatibilidade estática)*
- `src/app/api/v1/inngest/route.ts` *(Removido para compatibilidade estática)*

### Motivação Técnica
1. **Conformidade com Inngest SDK v4**: O pacote `inngest` instalado (`^4.20.0`) alterou a assinatura da função `inngest.createFunction` para exigir apenas 2 argumentos (o objeto de opções unificado com `triggers` e a função de callback `handler`). O padrão anterior de 3 argumentos causava o erro `TS2554: Expected 2 arguments, but got 3` e impedia a inferência dos tipos de contexto `event` e `step`.
2. **Correção de Endpoint da API do Loops.so**: A chamada `fetch` para envio de e-mails transacionais utilizava a URL genérica `"https://loops.so"`, necessitando ser atualizada para o endpoint oficial de transações `"https://app.loops.so/api/v1/transactional"`.
3. **Resolução de Incompatibilidade de Static Export com CI/CD FTP**: O pipeline de deploy do GitHub Actions falhou com `exit code 1` ao executar `npm run build`. O log revelou o erro `export const dynamic = "force-static" not configured on route "/api/v1/inngest" with "output: export"`. Como a aplicação utiliza `output: 'export'` no `next.config.ts` para distribuição estática via FTP (`public_html`) sem runtime Node.js ativo no servidor, rotas de API dinâmicas de servidor (`/api/...`) e Server Actions (`"use server"`) são rejeitadas pelo compilador do Next.js.
4. **Resolução de Falha no Supabase Database Webhook**: No painel do Supabase, tentativas de criar Database Webhooks automáticos falharam com `ERROR: 3F000: schema "supabase_functions" does not exist` e `ERROR: 42883: function supabase_functions.http_request() does not exist` devido à falta de migrações internas da UI. A arquitetura foi ajustada para utilizar a extensão nativa `pg_net` (`net.http_post`) via Trigger PostgreSQL no Supabase, garantindo disparo assíncrono e não-bloqueante direto para o Loops, mantendo a chave de API segura no banco sem expor ao frontend.

### O que foi alterado
- **`src/inngest/client.ts`**:
  - Parâmetro `createFunction` ajustado para a assinatura de 2 argumentos: `{ id, name, triggers: [{ event: "app/orcamento.recebido" }] }` no primeiro argumento e a função handler no segundo argumento.
  - URL de requisição ao Loops atualizada de `"https://loops.so"` para `"https://app.loops.so/api/v1/transactional"`.
- **`src/features/lead-capture/services/leadService.ts`**:
  - Garantida a persistência direta via cliente do navegador `@supabase/ssr` (`createClient`), assegurando 100% de compatibilidade com export estático (`output: 'export'`).
  - Remoção de diretivas de Server Action (`"use server"`), mantendo a execução independente de servidor Node.js.

### O que foi inserido / Padronizado
- **Script SQL de Notificação via Supabase (`pg_net`)**:
  - Criada Trigger PostgreSQL e função `enviar_email_loops_orcamento` no Supabase utilizando `net.http_post` da extensão `pg_net`.
  - Disparo automático de requisição HTTP POST para a API do Loops a cada novo `INSERT` na tabela `lead_captures`, transmitindo variáveis (`nomeCliente`, `emailCliente`, `telefoneCliente`, `mensagemCliente`) de forma assíncrona.
- **Validação de Build Local**:
  - Cache corrompido `.next` expurgado.
  - Execução bem-sucedida de `npm run build` com compilação de todas as 10 rotas estáticas para o diretório `./out/` (código de saída 0).
