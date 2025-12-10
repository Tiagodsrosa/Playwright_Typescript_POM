# Relatório de Testes (playwright-report)
Esta pasta contém o relatório HTML gerado automaticamente após a execução dos testes. É um site estático completo que permite navegar pelos resultados, ver screenshots, vídeos e traces de depuração.

## O que tem aqui?
1. index.html: O arquivo principal. Ao abri-lo, você vê a lista de todos os testes executados, filtráveis por status (Passou, Falhou, Pulou).
2. data/: Subpasta contendo os dados brutos (JSONs, imagens, vídeos) que alimentam o relatório visual.
3. trace/: Se configurado, contém os arquivos de "Trace Viewer", que permitem viajar no tempo e ver o que aconteceu passo-a-passo durante o teste.

## Como Visualizar
Embora seja um HTML, ele pode não abrir corretamente se você apenas clicar duas vezes no arquivo devido a políticas de segurança de navegadores modernos (CORS).

A maneira correta de abrir o relatório é rodar o comando no terminal: npx playwright show-report

Isso iniciará um servidor local e abrirá o relatório no seu navegador padrão.

## Integração Contínua (CI)
No GitHub Actions (ver .github/workflows/playwright.yml), esta pasta é salva como um Artefato.

Isso significa que, após a execução dos testes na nuvem, você pode baixar um arquivo .zip contendo esta pasta para analisar falhas que ocorreram no servidor de CI.

## Boas Práticas
Ignorar no Git: Esta pasta é sempre regenerada e pode conter arquivos binários pesados. Ela deve estar no .gitignore.

# Resultados Brutos (test-results)
Esta pasta contém os artefatos brutos gerados durante a execução de cada teste individual. Diferente do playwright-report (que é um site consolidado), esta pasta organiza os arquivos por teste e por navegador.

## O que tem aqui?
Sempre que você roda os testes, o Playwright cria subpastas aqui com uma nomenclatura específica:
nome-do-teste-navegador-retry

Dentro dessas subpastas, você pode encontrar:
1. Screenshots (.png): Se configurado para tirar prints (em falha ou sempre).
2. Vídeos (.webm): A gravação da tela durante a execução do teste.
3. Traces (.zip): Arquivos de rastreamento que contêm toda a rede, console e snapshots do DOM para depuração.

## Diferença para o playwright-report
- test-results: São os arquivos "crus". Útil se você precisa pegar apenas um vídeo específico ou um arquivo de trace para enviar para alguém.
- playwright-report: É o visualizador amigável que lê esses dados e os apresenta em formato de página web.

## Boas Práticas
- Ignorar no Git: Esta pasta cresce muito rápido, pois salva arquivos de mídia pesados. Ela deve ser obrigatoriamente listada no .gitignore.
- Limpeza: É seguro deletar esta pasta a qualquer momento para liberar espaço em disco. O Playwright a recriará na próxima execução.

# Documentação de Configuração do Projeto

Este documento detalha os arquivos de configuração que residem na raiz do projeto e orquestram a execução dos testes automatizados.

1. `playwright.config.ts`

Função: O cérebro da automação.

Este é o arquivo mais importante do framework. Ele define como os testes devem se comportar globalmente.

Principais Configurações Ativas:
- Global Setup: Aponta para `utils/global-setup.ts` para realizar o login antes de tudo.
- Viewport: Define a resolução Full HD (1920x1080) para todos os navegadores.
- StorageState: Define que os testes devem ler a sessão de `playwright/.auth/auth.json`.
- TestMatch: Procura por qualquer arquivo terminando em `.spec.ts`.
- Dotenv: Carrega as variáveis do arquivo `.env` automaticamente.

2. `.env`

Função: Variáveis de Ambiente Locais (Segurança).

Armazena segredos e credenciais que não devem ser compartilhados publicamente.

Conteúdo Necessário:
```typescript
USER_EMAIL=seu-email@teste.com
USER_PASSWORD=sua-senha
```

⚠️ Atenção: Este arquivo é ignorado pelo Git para proteger suas senhas. Se você clonar este projeto, precisará criar este arquivo manualmente.

3. `package.json`

Função: Manifesto do Projeto Node.js.

Define as dependências instaladas e os scripts de atalho para execução.

Scripts Personalizados (`npm run <script>`):

- `test`: Executa todos os testes em modo headless (sem interface).
    - Comando: npx playwright test
- `test:ui`: (Recomendado) Abre a interface gráfica interativa do Playwright.
    - Comando Interno: `npx playwright test --ui`
    - Nota: Devido ao `globalSetup` configurado no config.ts, o login ocorre automaticamente antes da UI abrir.

4. `.gitignore`

Função: Regras de exclusão do Git.

Define quais arquivos e pastas não devem ser enviados para o repositório remoto (GitHub).

O que está sendo ignorado:
- `node_modules/`: Dependências pesadas.
- `.env`: Credenciais de segurança.
- `playwright/.auth/`: Sessões de login ativas (cookies).
- `test-results/` e `playwright-report/`: Relatórios gerados a cada execução.

5. `package-lock.json`

Função: Trava de Versões.

Este arquivo é gerado automaticamente pelo NPM. Ele garante que todos os desenvolvedores que baixarem o projeto tenham exatamente as mesmas versões das bibliotecas instaladas (até a última dependência da dependência), prevenindo o clássico erro "funciona na minha máquina".

Dica: Nunca edite este arquivo manualmente. Ele é atualizado comandos `npm install`.

# Arquitetura do Projeto

Esta árvore demonstra a organização final dos arquivos e suas responsabilidades.

playwright-typescript-pom/
│
├── 📂 .github/workflows/       # Integração Contínua (CI)
│   └── playwright.yml          # Pipeline que roda os testes no GitHub Actions
│
├── 📂 components/              # Elementos de UI compartilhados (Fragmentos)
│   ├── Navbar.ts               # Lógica do Menu Superior
│   └── README.md               # Documentação dos componentes
│
├── 📂 fixtures/                # Injeção de Dependência (Serviços)
│   ├── manual-test.fixture.ts  # Fixture para rodar testes manuais/híbridos
│   ├── pom.ts                  # Fixture que injeta Pages e Components
│   └── README.md               # Documentação das fixtures
│
├── 📂 pages/                   # Page Objects (Representação das Telas)
│   ├── CartPage.ts             # Lógica da página de Carrinho
│   ├── ProductsPage.ts         # Lógica da página de Produtos/Detalhes
│   └── README.md               # Documentação dos Page Objects
│
├── 📂 playwright/              # Diretório de trabalho do Framework
│   └── .auth/                  # Armazena a sessão (cookies) do Login Global
│       └── auth.json           # Arquivo gerado automaticamente (GitIgnored)
│
├── 📂 tests/                   # Especificações de Teste (Cenários)
│   ├── logout.spec.ts          # Teste de Logout (Segurança)
│   ├── manual-scenarios.spec.ts# Testes Manuais (Visual/Responsividade)
│   ├── products.spec.ts        # Testes de E-commerce (Fluxo Crítico)
│   └── README.md               # Documentação dos cenários
│
├── 📂 utils/                   # Scripts Auxiliares e Helpers
│   ├── global-setup.ts         # Script de Login Global (Executa antes de tudo)
│   ├── manualTestHelper.ts     # Motor visual para testes manuais
│   └── README.md               # Documentação dos utilitários
│
├── 📄 .env                     # Variáveis de Ambiente (Segurança - GitIgnored)
├── 📄 .gitignore               # Regras de exclusão do Git
├── 📄 package.json             # Dependências e Scripts (npm run test:ui)
├── 📄 playwright.config.ts     # Configuração Global (Full HD, BaseURL, etc)
└── 📄 README.md                # Documentação Raiz do Projeto
