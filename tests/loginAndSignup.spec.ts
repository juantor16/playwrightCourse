import { test, expect } from '@playwright/test';
import HomePage from "../pages/HomePage"
import SignUpLoginPage from '../pages/SignUpLoginPage';
import SignUpPage from '../pages/SignUpPage';
import AccountCreatedPage from '../pages/AccountCreatedPage';
import DeleteAccountPage from '../pages/DeleteAccountPage';
import Utils from '../commons/Utils'
import * as testData from '../tests/fixtures/TestData.json'

let homepage: HomePage;
let signUpLoginPage: SignUpLoginPage;
let signUpPage: SignUpPage;
let accountCreatedPage: AccountCreatedPage;
let deleteAccountPage: DeleteAccountPage;
let utils: Utils;

test.beforeEach( async ({page}) => {
  homepage = new HomePage(page)
  signUpLoginPage = new SignUpLoginPage(page);
  signUpPage = new SignUpPage(page);
  accountCreatedPage = new AccountCreatedPage(page);
  deleteAccountPage = new DeleteAccountPage(page);
  utils = new Utils(page)
  await homepage.visit()
  await homepage.goToLoginAndSignUpPage();
});

test('C1 - Registro de Usuario', async ({ page }) => {
  await expect(homepage.signUpHeader).toBeVisible();
  await signUpPage.completeSignUp(testData.usuarioNuevo);
  await homepage.deleteAccountButton.click();
  await expect(page.getByText('Account Deleted!')).toBeVisible();
  await deleteAccountPage.continueButton.click();
  await page.waitForLoadState();
  expect(page.url()).toBe('https://automationexercise.com/');
});

test('C2 - Inicio de Sesión de Usuario con correo electrónico y contraseña correctos', async ({ page }) => {
  await signUpLoginPage.login(testData.usuarioCreado.emailAddress, testData.usuarioCreado.password);
  await homepage.checkUsername(testData.usuarioCreado.userName);
});

test('C3 - Inicio de Sesión de Usuario con correo electrónico y contraseña incorrectos', async ({ page }) => {
  await signUpLoginPage.checkLoginHeader();
  await signUpLoginPage.login(testData.usuarioCreado.emailAddress, "pass");
  await utils.checkTextIsVisible('Your email or password is incorrect!');
});

test('C4 - Cierre de Sesión de Usuario', async ({ page }) => {
  await signUpLoginPage.login(testData.usuarioCreado.emailAddress, testData.usuarioCreado.password);
  await homepage.checkUsername(testData.usuarioCreado.userName);
  await homepage.logout()
  await utils.checkUrlContains('/login')
});

test('C5 - Registro de Usuario con un correo electrónico ya existente', async ({ page }) => {
  await signUpLoginPage.signUp(testData.usuarioCreado.userName, testData.usuarioCreado.emailAddress);
  await utils.checkTextIsVisible('Email address already exist!')
});