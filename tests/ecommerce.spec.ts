import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { CartPage } from '../pages/CartPage';

test.describe('Fluxo de Compra - Sauce Demo', () => {
  
  test('Deve fazer login e adicionar um produto ao carrinho com sucesso', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const cartPage = new CartPage(page);

    // 1. Acessa o site
    await loginPage.navigate();

    // 2. Realiza o login (usando as credenciais padrão do site)
    await loginPage.login('standard_user', 'secret_sauce');

    // 3. Valida se o login deu certo checando o título da página de produtos
    await expect(cartPage.productTitle).toHaveText('Products');

    // 4. Adiciona o primeiro produto do catálogo ao carrinho
    await cartPage.addFirstProductToCart();

    // 5. Valida se o carrinho agora exibe a quantidade "1"
    const cartCount = await cartPage.getCartItemsCount();
    expect(cartCount).toBe('1');
  });

});