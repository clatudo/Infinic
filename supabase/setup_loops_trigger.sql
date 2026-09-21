-- 1. Habilitar a extensão pg_net (caso ainda não esteja habilitada)
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

-- 2. Criar ou atualizar a função de disparo HTTP para o Loops.so
CREATE OR REPLACE FUNCTION public.enviar_email_loops_orcamento()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    PERFORM net.http_post(
        url := 'https://app.loops.so/api/v1/transactional',
        headers := jsonb_build_object(
            'Content-Type', 'application/json',
            'Authorization', 'Bearer 88beb0315c6faa95497fa0477fd2c481'
        ),
        body := jsonb_build_object(
            'transactionalId', 'cmu69y7uq0sn40jxtivng409i',
            'email', 'onlineproducoes@gmail.com',
            'dataVariables', jsonb_build_object(
                'nomeCliente', NEW.customer_name,
                'emailCliente', COALESCE(NEW.customer_email, 'Não informado'),
                'telefoneCliente', NEW.customer_phone,
                'mensagemCliente', CONCAT_WS(' | ',
                    'Aparelho: ' || COALESCE(NEW.device_brand, '') || ' ' || COALESCE(NEW.device_model, ''),
                    'Modalidade: ' || COALESCE(NEW.service_type, ''),
                    'Defeito: ' || COALESCE(NEW.issue_description, '')
                )
            )
        )
    );
    RETURN NEW;
END;
$$;

-- 3. Criar a trigger na tabela lead_captures
DROP TRIGGER IF EXISTS trg_enviar_email_loops_orcamento ON public.lead_captures;

CREATE TRIGGER trg_enviar_email_loops_orcamento
AFTER INSERT ON public.lead_captures
FOR EACH ROW
EXECUTE FUNCTION public.enviar_email_loops_orcamento();
