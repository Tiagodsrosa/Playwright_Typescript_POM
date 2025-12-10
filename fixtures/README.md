# Fixtures Module

Esta pasta contém as "fixtures" customizadas do projeto. No Playwright, fixtures são usadas para estabelecer o ambiente de cada teste, fornecendo "serviços" prontos para uso (como Pages instanciadas ou utilitários).

# Arquivo pom.ts

Este arquivo implementa o padrão de Injeção de Dependência para o Page Object Model (POM).

Objetivo:
Evitar a repetição de código const page = new ProductsPage(page) em cada teste.

Como usar:
Nos arquivos de teste (.spec.ts), importe test deste arquivo em vez do @playwright/test.

```typescript
import { test } from '../fixtures/pom';

test('Exemplo', async ({ productsPage, navbar }) => {
    // productsPage e navbar já vêm instanciados e prontos
    await navbar.navigateToHome();
});
```

# Arquivo manual-test.fixture.ts

Este arquivo cria uma fixture especializada para execução de testes manuais dentro da infraestrutura automatizada.

Objetivo:
Pausar a execução do navegador e exibir um overlay HTML com instruções passo-a-passo, aguardando o testador clicar em "Passou" ou "Falhou".

Funcionalidades:
1. Injeta HTML/CSS na página.
2. Aguarda indefinidamente (timeout: 0) pela interação humana.
3. Registra o resultado no relatório final do Playwright.