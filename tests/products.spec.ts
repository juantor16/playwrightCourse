import { test, expect } from '@playwright/test';
import Utils from '../commons/Utils'
import ProductsPage from '../pages/productsPage';
import ProductDetailsPage from '../pages/productDetailsPAge';
import HomePage from '../pages/HomePage';

let utils: Utils;
let productsPage: ProductsPage;
let productDetailsPage: ProductDetailsPage;
let homePage: HomePage;

test.beforeEach(async ({ page }) => {
  utils = new Utils(page);
  productsPage = new ProductsPage(page);
  productDetailsPage = new ProductDetailsPage(page);
  homePage = new HomePage(page);
  await productsPage.visit()
});

test('C8 - Verificar todos los productos y la pagina de detalles de productos', async ({ page }) => {
  expect((await productsPage.productResultList.all()).length).toBeGreaterThan(0);
  await productsPage.productResultList.first().locator('a[href^="/product_details/"]').click()
  await page.waitForLoadState();
  await productsPage.closeAd();
  await utils.checkUrlContains('product_details');
  await expect(productDetailsPage.productDetailName).toBeVisible();
  await expect(productDetailsPage.productCategory).toBeVisible();
  await expect(productDetailsPage.productPrice).toBeVisible();
  await expect(productDetailsPage.productAvailability).toBeVisible();
  await expect(productDetailsPage.productCondition).toBeVisible();
  await expect(productDetailsPage.productBrand).toBeVisible();
})

test.skip('C9 - verificar que la funcionalidade de busqueda devuelve resultados esperados', async ({ page }) => {
  await productsPage.searchInputField.fill("Top");
  await productsPage.submitSearch.click();
  await page.waitForLoadState();
  await utils.checkUrlContains('products?search=Top');

  // Obetner la cantidad de resultados basandonos en su titulo
  const count = await productsPage.productTitle.count();

  // ver que tenemos por lo menos un resultado
  expect(count).toBeGreaterThan(0);

  // Verificar que todos los titulos contengan la palabra "Top"
  for (let i = 0; i < count; i++) {
    const text = await productsPage.productTitle.nth(i).textContent();
    console.log("El titulo del producto es: ", text)
    expect(text).toContain('Top')
  }
})

test('C18 - verificar categorias de los productos',async ({page})=>{
  await homePage.womenCategoryLink.click({force:true})
  await homePage.dressCategoryLink.click()
  await productsPage.closeAd()
  await utils.checkTextIsVisible('Women - dress Products');
})