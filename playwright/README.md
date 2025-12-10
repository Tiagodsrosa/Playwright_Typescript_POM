# Pasta Playwright

Esta pasta atua como um diretório de trabalho interno para o framework Playwright no seu projeto.

# Conteúdo Típico

Embora a estrutura possa variar conforme a execução, geralmente você encontrará aqui:
1. .auth/: (Configurado neste projeto) Armazena os arquivos de sessão de usuário (cookies/local storage) para o login global.
2. .cache/: O Playwright usa esta pasta para armazenar cache de binários de navegadores ou metadados de execução para acelerar testes futuros.
3. reports/ ou test-results/: Dependendo da configuração no playwright.config.ts, relatórios intermediários ou traces de debug podem ser salvos aqui.

## Authentication State (.auth)
Esta pasta é usada para armazenar os arquivos de estado de autenticação (sessão) gerados pelo Playwright.

## O Arquivo auth.json
Quando você roda o comando npm run test:ui (ou executa o script global-setup), o Playwright abre um navegador, realiza o login no sistema e salva "o estado" desse navegador (Cookies e Local Storage) dentro do arquivo auth.json nesta pasta.

## Como funciona?

1. Geração: O script utils/global-setup.ts faz o login e salva o arquivo aqui.
2. Consumo: O arquivo playwright.config.ts lê este arquivo e o injeta em todos os testes.
3. Resultado: Seus testes não precisam repetir o passo de login, economizando tempo e recursos.

## Segurança Crítica

Este arquivo contém tokens de sessão reais.
Se alguém tiver acesso a este arquivo, pode acessar sua conta no sistema sem precisar da senha.

Por isso:
1. Esta pasta JAMAIS deve ser enviada para o GitHub.
2. Ela deve estar listada no seu arquivo .gitignore.
3. No ambiente de CI (GitHub Actions), este arquivo é gerado dinamicamente a cada execução e descartado logo depois.

# Boas Práticas

- Não Versionar: A maior parte do conteúdo desta pasta é gerada dinamicamente e específica da máquina onde os testes rodaram. Recomenda-se que ela (ou suas subpastas geradas) esteja no .gitignore.
- Não Editar Manualmente: Evite alterar arquivos aqui manualmente, pois eles serão sobrescritos na próxima execução de teste.