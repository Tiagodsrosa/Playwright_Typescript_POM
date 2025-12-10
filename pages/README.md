# Pages Module (Page Object Model)
Esta pasta contém as classes de Page Objects, que são a representação em código das telas da sua aplicação.

# O Padrão POM
O objetivo de usar Page Objects é separar a lógica de teste (o que estamos validando) da lógica de implementação (como encontrar um botão na página).
- Se o ID de um botão mudar, você altera apenas no arquivo da Page.
- Os testes `(.spec.ts)` permanecem intactos.

# Arquivos Disponíveis

## CartPage.ts
Gerencia interações na página de Carrinho `(/view_cart)`.

Principais Métodos:
- `verifyProductInCart()`: Valida se um produto específico está na tabela com preço e quantidade corretos.
- `removeAllProducts()`: Limpa o carrinho deletando item por item.

## ProductsPage.ts
Gerencia a página de listagem de produtos `(/products)` e a página de detalhes do produto.

## Principais Métodos:
- `addProductToCartByIndex()`: Lida com a complexidade de fazer hover no card do produto antes de clicar em adicionar.
- `setProductQuantity()`: Altera a quantidade na tela de detalhes antes de adicionar ao carrinho.

# Exemplo de Uso (via Fixture)

```typescript
test('Exemplo de Compra', async ({ productsPage, cartPage }) => {
    // A fixture 'productsPage' já vem instanciada
    await productsPage.navigateToProducts();
    await productsPage.addProductToCartByIndex(0);
    
    await productsPage.clickViewCart();
    
    // A fixture 'cartPage' valida o resultado
    await cartPage.verifyProductInCart('Blue Top', 'Rs. 500', '1', 'Rs. 500');
});
```