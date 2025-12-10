import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

/**
 * Carrega as variáveis de ambiente do arquivo .env
 * Certifique-se de ter instalado o dotenv: npm install dotenv
 * O path.resolve garante que o Playwright encontre o arquivo na raiz
 */
dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * Configuração Playwright Otimizada
 */
export default defineConfig({
  testDir: './tests',
  
  /* Padrão Glob para encontrar arquivos de teste (Mais robusto que Regex) */
  testMatch: ['**/*.spec.ts'],

  /* Executa testes em paralelo */
  fullyParallel: true,
  
  /* Falha no CI se houver test.only */
  forbidOnly: !!process.env.CI,
  
  /* Retentativas */
  retries: process.env.CI ? 2 : 0,
  
  /* Workers */
  workers: process.env.CI ? 1 : undefined,
  
  /* Reporter HTML */
  reporter: 'html',
  
  /* Timeout global para cada teste (30 segundos) */
  timeout: 30 * 1000,

  /* CONFIGURAÇÃO DE SETUP GLOBAL
     Aponta para o arquivo de login. 
     NOTA: Passamos como string para evitar erros de 'require' em módulos ES.
  */
  globalSetup: './utils/global-setup',

  /* CONFIGURAÇÃO GLOBAL (Aplicada a todos os projetos) */
  use: {
    /* URL base do sistema */
    baseURL: 'http://automationexercise.com',

    /* Trace apenas na falha */
    trace: 'on-first-retry',

    /* SESSÃO GLOBAL: Lê o arquivo gerado pelo globalSetup */
    storageState: 'playwright/.auth/auth.json',

    /* Ver o navegador rodando */
    headless: false,

    /* Define a resolução padrão para Full HD (1920x1080) --- */
    //viewport: { width: 1920, height: 1080 },

    /* Câmera lenta para debug */
    launchOptions: {
      slowMo: 300
    },
    
    /* Tira screenshot apenas se falhar */
    screenshot: 'only-on-failure',
  },

  /* PROJETOS (Navegadores) */
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        /* Sobrescreve o viewport padrão do dispositivo Desktop Chrome */
        viewport: { width: 1920, height: 1080 },
      },
    },
  ],
});