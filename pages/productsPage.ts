import { Page, Locator, expect } from "@playwright/test"
import Utils from "../commons/Utils";

export default class ProductsPage {

    readonly page: Page;
    readonly utils: Utils;
    readonly productResultList: Locator;
    readonly viewProductFirstButton: Locator;
    readonly searchInputField: Locator;
    readonly submitSearch: Locator;
    readonly productTitle: Locator;
    readonly productImage: Locator;
    readonly overlayAddToCartButton: Locator;
    readonly continueShoppingModalButton: Locator;
    readonly viewCartModalButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.utils = new Utils(page)
        this.productResultList = page.locator('.product-image-wrapper ');
        this.viewProductFirstButton = this.productResultList.first().locator('a[href^="/product_details/"]');
        this.searchInputField = page.locator('#search_product');
        this.submitSearch = page.locator('#submit_search');
        this.productTitle = this.productResultList.locator('.productinfo p');
        this.productImage = this.productResultList.locator('img');
        this.overlayAddToCartButton = page.locator('.overlay-content .add-to-cart');
        this.continueShoppingModalButton = page.getByRole('button', { name: 'Continue Shopping' });
        this.viewCartModalButton = page.getByRole('link', { name: 'View Cart' });
    }

    async visit() {
        await this.page.goto('https://automationexercise.com/products');
        await this.page.waitForLoadState();
        await this.utils.checkUrlContains('/products');
    }

    async closeAd() {
        const isThereAnAd = await this.page.frameLocator('iframe[name^="aswift"][width=""]').locator('#ad_position_box').isVisible({ timeout: 10000 })
        let adContainer = await this.page.frameLocator('iframe[name^="aswift"][width=""]').frameLocator('iframe[name="ad_iframe"]').getByLabel('Close ad')
        if (isThereAnAd) {
            if (await adContainer.isVisible()) {
                await adContainer.click()
            } else {
                await this.page.frameLocator('iframe[name^="aswift"][width=""]').getByLabel('Close ad').click()
            }
        }
    }

    async addItemsToCart(numberOfElements: number) {
        for (let i = 0; i < numberOfElements; i++) {
            await this.productImage.nth(i).hover();
            await this.page.waitForTimeout(1000)
            await this.overlayAddToCartButton.nth(i).click();
            if (i + 1 === numberOfElements) {
                await this.viewCartModalButton.click()
            } else {
                await this.continueShoppingModalButton.click();
            }
        }
    }

    async searchForProduct(searchWord: string) {
        await this.searchInputField.fill(searchWord);
        await this.submitSearch.click();
        await this.page.waitForLoadState();
    }

    async checkResultsContain(resultWord: string) {
        // Obetner la cantidad de resultados basandonos en su titulo
        const count = await this.productTitle.count();

        // ver que tenemos por lo menos un resultado
        expect(count).toBeGreaterThan(0);

        // Verificar que todos los titulos contengan la palabra "Top"
        for (let i = 0; i < count; i++) {
            const text = await this.productTitle.nth(i).textContent();
            console.log("El titulo del producto es: ", text)
            expect(text).toContain(resultWord)
        }
    }

    async addAllItemsToCart() {
        let amountOfItemsFound = await this.productTitle.count();
        await this.addItemsToCart(amountOfItemsFound)
    }
}
