import { test, expect } from '@playwright/test';
import HomePage from "../pages/HomePage"
import ContactUsPage from '../pages/contactUsPage';
import Utils from '../commons/Utils'

let homePage: HomePage;
let contactusPage: ContactUsPage;
let utils: Utils;

test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page)
  contactusPage = new ContactUsPage(page)
  utils = new Utils(page)
  await homePage.visit()
});

test('C6 - Formulario de contacto', async ({ page }) => {
  await homePage.goToContactUsPage();
  await utils.checkTextIsVisible('Get In Touch', true);
  await contactusPage.nameInput.fill('Juan');
  await contactusPage.emailInput.fill('UsuarioAtenea@gmail.com');
  await contactusPage.subjetInput.fill('Some Subject');
  await contactusPage.messageInput.fill('Some Message');
  await contactusPage.uploadFile('./data/stickers.png');
  await expect(contactusPage.fileInput).toHaveValue(/stickers\.png$/);
  await contactusPage.submitForm();
  await utils.checkTextIsVisible('Success! Your details have been submitted successfully.')
  await contactusPage.homeButton.click()
  await utils.checkUrlContains('https://automationexercise.com/')
})

test('C10 - verificar suscripcion en la pagina de inicio', async ({ page }) => {
  await page.goto('http://automationexercise.com');
  await expect(page.locator('#susbscribe_email')).toBeVisible();
  await page.locator('#susbscribe_email').fill('SomeTestq@email.com');
  await page.locator('#subscribe').click();
  await utils.checkTextIsVisible('You have been successfully subscribed!');
})


test('C11 - verificar suscripcion en la pagina de cart', async ({ page }) => {
  await page.goto('https://automationexercise.com/view_cart');
  await expect(page.locator('#susbscribe_email')).toBeVisible();
  await page.locator('#susbscribe_email').fill('SomeTestq@email.com');
  await page.locator('#subscribe').click();
  await utils.checkTextIsVisible('You have been successfully subscribed!');
})
