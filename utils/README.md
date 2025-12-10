#  Utilities (Utils)
Esta pasta contém scripts auxiliares e funções de suporte que não são testes em si, mas fornecem a infraestrutura necessária para a execução do projeto.

#  Arquivos Disponíveis

#  global-setup.ts
Função: Script de Autenticação Global.

Este script é executado uma única vez antes de qualquer teste começar (configurado no playwright.config.ts).

O que ele faz:
1. Lê as credenciais seguras do arquivo .env (ou GitHub Secrets).
2. Abre um navegador Chromium (Full HD).
3. Acessa o site e realiza o login.
4. Salva o estado da sessão (cookies) no arquivo playwright/.auth/auth.json.

Importante: Se este script falhar, nenhum teste será executado.

#  manualTestHelper.ts
Função: Motor de Interface para Testes Manuais.

Este arquivo contém a lógica de injeção de HTML/CSS/JS usada pela fixture de testes manuais.

O que ele faz:
1. Cria um overlay (caixa de diálogo) HTML sobre o site.
2. Renderiza os passos do teste formatados.
3. Adiciona botões interativos "Passou" / "Falhou".
4. Captura o clique do usuário e comunica o resultado de volta para o Playwright (Node.js).