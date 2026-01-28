-- ============================================
-- VetAcademy - Supabase Row Level Security (RLS)
-- Execute este script no SQL Editor do Supabase
-- ============================================

-- 1. Habilitar RLS na tabela medications_
ALTER TABLE medications_ ENABLE ROW LEVEL SECURITY;

-- 2. Política: Apenas usuários autenticados podem ler medicamentos
CREATE POLICY "Authenticated users can read medications"
ON medications_
FOR SELECT
TO authenticated
USING (true);

-- 3. Bloquear acesso anônimo completamente
CREATE POLICY "Deny anonymous access"
ON medications_
FOR ALL
TO anon
USING (false);

-- ============================================
-- OPCIONAL: Políticas adicionais de segurança
-- ============================================

-- 4. Apenas admins podem inserir novos medicamentos
-- (Requer uma tabela de perfis com campo is_admin)
-- CREATE POLICY "Only admins can insert medications"
-- ON medications_
-- FOR INSERT
-- TO authenticated
-- WITH CHECK (
--   EXISTS (
--     SELECT 1 FROM profiles
--     WHERE profiles.id = auth.uid()
--     AND profiles.is_admin = true
--   )
-- );

-- 5. Apenas admins podem atualizar medicamentos
-- CREATE POLICY "Only admins can update medications"
-- ON medications_
-- FOR UPDATE
-- TO authenticated
-- USING (
--   EXISTS (
--     SELECT 1 FROM profiles
--     WHERE profiles.id = auth.uid()
--     AND profiles.is_admin = true
--   )
-- );

-- 6. Apenas admins podem deletar medicamentos
-- CREATE POLICY "Only admins can delete medications"
-- ON medications_
-- FOR DELETE
-- TO authenticated
-- USING (
--   EXISTS (
--     SELECT 1 FROM profiles
--     WHERE profiles.id = auth.uid()
--     AND profiles.is_admin = true
--   )
-- );

-- ============================================
-- Verificar políticas aplicadas
-- ============================================
-- SELECT * FROM pg_policies WHERE tablename = 'medications_';
