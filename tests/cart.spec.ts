import { test, expect } from '@playwright/test';
import Utils from '../commons/Utils';
import ProductsPage from '../pages/productsPage';
import ViewCartPage from '../pages/viewCartPage';
import ProductDetailsPage from '../pages/productDetailsPAge';
import SignUpPage from '../pages/SignUpPage';
import * as testData from '../tests/fixtures/TestData.json'
import HomePage from '../pages/HomePage';
import CheckoutPage from '../pages/checkoutPage';
import PaymentPage from '../pages/PaymentPage'
import DeleteAccountPage from '../pages/DeleteAccountPage';
import SignUpLoginPage from '../pages/SignUpLoginPage';

let utils: Utils;
let productsPage: ProductsPage;
let viewCartPage: ViewCartPage;
let productDetailsPage: ProductDetailsPage;
let signUpPage: SignUpPage;
let homepage: HomePage;
let checkoutPage: CheckoutPage;
let paymentPage: PaymentPage;
let deleteAccountPage: DeleteAccountPage;
let signUpLoginPage: SignUpLoginPage;

test.beforeEach(async ({ page }) => {
  utils = new Utils(page);
  productsPage = new ProductsPage(page);
  viewCartPage = new ViewCartPage(page);
  productDetailsPage = new ProductDetailsPage(page);
  signUpPage = new SignUpPage(page);
  homepage = new HomePage(page);
  checkoutPage = new CheckoutPage(page);
  paymentPage = new PaymentPage(page);
  deleteAccountPage = new DeleteAccountPage(page);
  signUpLoginPage = new SignUpLoginPage(page);
  await productsPage.visit();
});

test('C12 - Agregar mas de un elemento al carrito', async ({ page }) => {
  await productsPage.addItemsToCart(2);
  const amount = await viewCartPage.productRow.count();
  console.log("Cantidad es: ", amount)
  await expect(amount).toBe(2);
  await viewCartPage.getProductDetails(amount);
})

test('C13 - verificar la cantidad de productos en el carrito de compras', async ({ page }) => {
  await productsPage.productResultList.first().locator('a[href^="/product_details/"]').click();
  await page.waitForLoadState();
  await productsPage.closeAd();
  await utils.checkUrlContains('product_details');
  await productDetailsPage.quantityInput.fill('4');
  await productDetailsPage.addToCartButton.click();
  await productsPage.viewCartModalButton.click();
  await expect(viewCartPage.productRow.first().locator('.cart_quantity')).toHaveText('4')
})

test('C14 - crear orden: Registro durante el checkout', async ({ page }) => {
  await productsPage.addItemsToCart(1);
  await viewCartPage.proceedToCheckoutButton.click();
  await viewCartPage.signUpAndLoginCheckoutModalLink.click();
  await signUpPage.completeSignUp(testData.usuarioNuevo);
  await homepage.cartButton.click();
  await viewCartPage.proceedToCheckoutButton.click();
  await checkoutPage.checkDeliveryDetails(testData.usuarioNuevo);
  await checkoutPage.placeOrderButton.click();
  await productsPage.closeAd()
  await paymentPage.completePayment(testData.paymentDetails);
  await utils.checkTextIsVisible('Congratulations! Your order has been confirmed!')
  await homepage.deleteAccount();
})

test('C15 - crear orden: Registro antes el checkout', async ({ page }) => {
  await homepage.goToLoginAndSignUpPage()
  await signUpPage.completeSignUp(testData.usuarioNuevo);
  await productsPage.visit()
  await productsPage.addItemsToCart(1);
  await viewCartPage.proceedToCheckoutButton.click();
  await checkoutPage.checkDeliveryDetails(testData.usuarioNuevo);
  await checkoutPage.placeOrderButton.click();
  await productsPage.closeAd()
  await paymentPage.completePayment(testData.paymentDetails);
  await utils.checkTextIsVisible('Congratulations! Your order has been confirmed!')
  await homepage.deleteAccount();
})

test('C16 - crear orden: Login antes el checkout', async ({ page }) => {
  await homepage.goToLoginAndSignUpPage();
  await signUpLoginPage.login(testData.usuarioCreado.emailAddress, testData.usuarioCreado.password);
  await homepage.checkUsername(testData.usuarioCreado.userName);
  await productsPage.visit()
  await productsPage.addItemsToCart(1);
  await viewCartPage.proceedToCheckoutButton.click();
  await checkoutPage.checkDeliveryDetails(testData.usuarioCreado);
  await checkoutPage.placeOrderButton.click();
  await productsPage.closeAd()
  await paymentPage.completePayment(testData.paymentDetails);
  await utils.checkTextIsVisible('Congratulations! Your order has been confirmed!')
})


test('C17 - crear orden: Login antes el checkout', async ({ page }) => {
  await productsPage.addItemsToCart(1);
  await utils.checkUrlContains('view_cart')
  await viewCartPage.deleteItemButton.click();
  await utils.checkTextIsVisible('Cart is empty!');
})


test('C20 - Buscar productos y ver el carrito despues',async ({page})=>{
  await productsPage.searchForProduct("Polo");
  await utils.checkUrlContains('products?search=Polo');
  await utils.checkTextIsVisible('Searched Products');
  await productsPage.checkResultsContain('Polo')
  await productsPage.addAllItemsToCart()
  await homepage.cartButton.click()
  await viewCartPage.checkProductTitleContains('Polo')
  await homepage.goToLoginAndSignUpPage()
  await signUpLoginPage.login(testData.usuarioCreado.emailAddress, testData.usuarioCreado.password);
  await homepage.checkUsername(testData.usuarioCreado.userName);
  await homepage.cartButton.click()
  await viewCartPage.checkProductTitleContains('Polo')
})

test('C21 - Buscar productos y veririficar el carrito despues de loguearse',async ({page})=>{
  expect((await productsPage.productResultList.all()).length).toBeGreaterThan(0);
  await productsPage.productResultList.first().locator('a[href^="/product_details/"]').click()
  await page.waitForLoadState();
  await productsPage.closeAd();
  await utils.checkUrlContains('product_details');
  await utils.checkTextIsVisible('Write Your Review');
  await viewCartPage.submitAreview(testData.reviewInfo);
  await utils.checkTextIsVisible('Thank you for your review');
})

test('C22 - Agregar productos de seccion de recomendados',async ({page})=>{
  await homepage.visit()
  await homepage.recommendedSection.scrollIntoViewIfNeeded();
  let productName;
  productName = await homepage.recommendedProductListTitles.first().textContent()
  await homepage.recommendedProductListTitles.first().click()
  await homepage.recommendedSection.locator('.item.active .fa-shopping-cart').first().click()
  await productsPage.viewCartModalButton.click()
  await viewCartPage.checkProductTitleContains(productName)
})