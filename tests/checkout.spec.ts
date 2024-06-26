import { test, expect } from '@playwright/test';
import Utils from '../commons/Utils';
import ProductsPage from '../pages/productsPage';
import ViewCartPage from '../pages/viewCartPage';
import ProductDetailsPage from '../pages/productDetailsPAge';
import SignUpPage from '../pages/SignUpPage';
import * as testData from './fixtures/TestData.json'
import HomePage from '../pages/HomePage';
import CheckoutPage from '../pages/checkoutPage';
import PaymentPage from '../pages/PaymentPage'
import DeleteAccountPage from '../pages/DeleteAccountPage';
import SignUpLoginPage from '../pages/SignUpLoginPage';
import PaymentDonePage from '../pages/PaymentDonePage';

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
let paymentDonePage: PaymentDonePage;

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
  paymentDonePage = new PaymentDonePage(page);
  await productsPage.visit();
});

test('C23 - Verificar detalles de direccion en la checkout page', async ({ page }) => {
  await homepage.goToLoginAndSignUpPage()
  await signUpPage.completeSignUp(testData.usuarioNuevo);
  await productsPage.visit()
  await productsPage.addItemsToCart(1);
  await viewCartPage.proceedToCheckoutButton.click();
  await checkoutPage.checkDeliveryDetails(testData.usuarioNuevo);
  await checkoutPage.checkBillingDetails(testData.usuarioNuevo)
  await homepage.deleteAccount();
})

test('C24 - Descargar recibo despues de hacer la compra', async ({ page }) => {
  await productsPage.addItemsToCart(1);
  await viewCartPage.proceedToCheckoutButton.click();
  await viewCartPage.signUpAndLoginCheckoutModalLink.click();
  await signUpPage.completeSignUp(testData.usuarioNuevo);
  await homepage.cartButton.click()
  await viewCartPage.proceedToCheckoutButton.click();
  await checkoutPage.checkDeliveryDetails(testData.usuarioNuevo);
  await checkoutPage.checkBillingDetails(testData.usuarioNuevo)
  await checkoutPage.placeOrderButton.click();
  await productsPage.closeAd()
  await paymentPage.completePayment(testData.paymentDetails);
  await utils.checkTextIsVisible('Congratulations! Your order has been confirmed!')
  await paymentDonePage.downloadInvoice();
})