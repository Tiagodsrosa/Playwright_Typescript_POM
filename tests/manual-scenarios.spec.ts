import { test } from '../fixtures/manual-test.fixture';

test.describe('Manual Testing Execution', () => {

    // Critical: Disable timeout for manual tests.
    // Since these tests rely on human interaction speed (reading instructions, clicking pass/fail),
    // we cannot enforce the standard 30s limit.
    test.setTimeout(0);

    test.beforeEach(async ({ page }) => {
        // Pre-condition: Navigate to the base URL before each scenario.
        // Note: Global Setup has already handled authentication, so the user is logged in.
        await page.goto('/');
    });

    /**
     * TC-M01: Validate Home Page Layout
     * Type: Visual Inspection / UI
     * This test guides the human tester to visually verify key elements of the Home Page.
     */
    test('TC-M01: Validar Layout da Home', async ({ runManualTest }) => {
        const testTitle = 'CT-M01: Validar Layout da Home';

        // Define the steps using HTML for better rendering in the helper overlay
        const manualSteps = [
            // Context Block
            `<strong>Objetivo:</strong> Garantir que os elementos visuais principais (Cabeçalho, Carrossel e Rodapé) sejam carregados corretamente.`,

            `<strong>Pré-Condições:</strong><br>
             1. O navegador está aberto.<br>
             2. O usuário acessou a URL: http://automationexercise.com`,

            // Execution Steps in Gherkin format with syntax highlighting (Colors matching standard IDEs)
            `<strong>Passos de Execução (Gherkin):</strong><br>
             <span style="color: #0366d6"><strong>Dado</strong></span> que estou na página inicial do Automation Exercise<br>
             <span style="color: #6f42c1"><strong>Quando</strong></span> analiso a estrutura visual da página<br>
             <span style="color: #22863a"><strong>Então</strong></span> devo ver o logo "Automation Exercise" no topo esquerdo<br>
             <span style="color: #22863a"><strong>E</strong></span> o carrossel de imagens deve estar visível e alternando<br>
             <span style="color: #22863a"><strong>E</strong></span> o rodapé contendo o texto "Subscription" deve estar visível ao rolar a página`,

            // Acceptance Criteria
            `<strong>Resultado Esperado:</strong> O layout deve estar consistente, sem imagens quebradas e sem sobreposição de textos.`
        ];

        // Execute the manual test runner which pauses automation and shows the overlay
        await runManualTest(testTitle, manualSteps);
    });

    /**
     * TC-M02: Mobile Responsiveness Test
     * Type: UX / Responsiveness
     * Validates the adaptive design capabilities of the application by manually resizing the window.
     */
    test('TC-M02: Teste de Responsividade Mobile', async ({ runManualTest }) => {
        const testTitle = 'CT-M02: Responsividade';

        const manualSteps = [
            'Redimensione a janela do navegador para ficar estreita (modo celular).',
            'Verifique se o menu virou um "hambúrguer" (três riscos).',
            'Clique no menu e veja se as opções abrem corretamente.',
            '<strong>Validação:</strong> O site é utilizável em tela pequena?'
        ];

        await runManualTest(testTitle, manualSteps);
    });
});