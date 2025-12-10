#  Test Specifications (Specs)
Esta pasta contém os arquivos de especificação de teste `(.spec.ts).` Cada arquivo representa um conjunto de cenários automatizados agrupados por funcionalidade.

# Estrutura e Padrões
Utilizamos o framework Playwright com TypeScript.
Todos os testes automatizados aqui seguem o padrão `Page Object Model (POM)` através de injeção de dependência `(Fixtures)`.

# Arquivos Disponíveis

## logout.spec.ts
Foco: Validação de segurança e encerramento de sessão.
Este teste é único porque depende inteiramente do Login Global.
1. Ele assume que o navegador já abre autenticado (graças ao `auth.json`).
2. Acessa a área logada.
3. Realiza o logout.
4. Valida se o usuário foi redirecionado para a tela de login e se a sessão foi destruída.

## products.spec.ts
- Foco: Fluxo de compras (E-commerce).
- Este arquivo testa as funcionalidades críticas de negócio usando os Page Objects ProductsPage e CartPage.
- Cenários Cobertos:
    - TC-12: Add Products in Cart: Adiciona múltiplos produtos ao carrinho e valida nome, preço e total.
    - TC-13: Verify Product Quantity: Acessa detalhes de um produto, altera a quantidade, adiciona ao carrinho e valida o cálculo final.

Nota: Estes testes incluem uma etapa de limpeza (tearDown) que esvazia o carrinho ao final da execução para garantir isolamento.

## manual-scenarios.spec.ts
- Foco: Testes Híbridos (Manuais + Infraestrutura de Automação).
- Este arquivo utiliza uma Fixture Customizada `(runManualTest)` para permitir que testes manuais sejam executados e reportados dentro da mesma pipeline dos testes automatizados.
- Como funciona: Ao rodar este teste (com `npm run test:ui`), o navegador pausa e exibe um overlay com instruções passo-a-passo. O testador humano executa a ação e clica em "Passou" ou "Falhou" na tela. O Playwright captura esse clique e gera o relatório final.

# Como Executar
- Para rodar todos os testes: `npx playwright test`
- Para rodar apenas um arquivo específico: `npx playwright test tests/products.spec.ts`
- Para rodar com interface gráfica (Recomendado): `npm run test:ui`