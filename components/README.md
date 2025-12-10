# Components Module

Esta pasta contém "Componentes", que são partes reutilizáveis da interface do usuário que aparecem em múltiplas páginas (ex: Cabeçalho, Rodapé, Modais).

# Por que separar Componentes de Pages?

No padrão Page Object Model (POM), uma "Page" representa uma tela inteira. No entanto, elementos como a barra de navegação (Navbar) existem tanto na Home quanto na página de Produtos.

Ao isolar a Navbar aqui, evitamos duplicar o código de navegação em HomePage.ts, ProductsPage.ts, etc.

# Arquivo Navbar.ts

Representa o cabeçalho superior do site Automation Exercise.

# Funcionalidades:
1. Navegação para Home: Clica no logo/botão Home e valida o título.
2. Navegação para Produtos: Clica no link Products e valida o título.
3. Navegação para Carrinho: Clica no link Cart e valida a URL.

# Como usar em um Teste:

Recomendamos usar através da fixture customizada (ver pasta fixtures), mas pode ser instanciado manualmente:

const navbar = new Navbar(page);
await navbar.navigateToProducts();