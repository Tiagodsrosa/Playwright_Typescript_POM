# GitHub Actions Workflows

Esta pasta contém a configuração de Integração Contínua (CI) para o projeto de Automação. O objetivo é garantir que os testes sejam executados automaticamente na nuvem a cada alteração no código.

# Arquivo playwright.yml

Este é o arquivo de definição principal do workflow. Ele instrui o GitHub Actions sobre como montar o ambiente e executar os testes Playwright.

# Etapas do Workflow:

1. Gatilho (Trigger): O workflow é ativado a cada push ou pull_request nas branches main ou master.
2. Ambiente: Executa em uma máquina virtual Linux (ubuntu-latest).
3. Setup: Instala o Node.js e as dependências do projeto (npm ci).
4. Browsers: Instala os binários dos navegadores necessários (Chromium, Firefox, WebKit).
5. Testes: Executa a suíte de testes Playwright usando as configurações do playwright.config.ts.
6. Artefatos: Faz o upload do diretório playwright-report para que os resultados possam ser analisados após a execução.

# Configuração de Segurança (Secrets)

Como este projeto requer autenticação para executar os testes de login, é necessário configurar as GitHub Secrets no repositório. O workflow foi configurado para injetar essas credenciais como variáveis de ambiente durante a execução.

# Como Configurar as Secrets

1. Vá para a página principal do seu repositório no GitHub.
2. Navegue até Settings > Secrets and variables > Actions.
3. Clique em New repository secret.
4. Adicione as seguintes chaves (exatamente como escrito abaixo):
- `USER_EMAIL`: O e-mail utilizado para login no sistema.
- `USER_PASSWORD`: A senha da conta de teste.

# Nota: O workflow mapeia automaticamente essas secrets para as variáveis de ambiente do sistema. Isso permite que o script utils/global-setup.ts acesse os dados de forma segura via process.env sem expô-los no código fonte.