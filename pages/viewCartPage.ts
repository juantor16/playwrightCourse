import { Page, Locator, expect } from "@playwright/test"

export default class ViewCartPage {

    readonly page: Page;
    readonly productRow: Locator;
    readonly proceedToCheckoutButton: Locator;
    readonly signUpAndLoginCheckoutModalLink: Locator;
    readonly deleteItemButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productRow = page.locator('tr[id^="product-"]');
        this.proceedToCheckoutButton = page.getByText('Proceed To Checkout');
        this.signUpAndLoginCheckoutModalLink = page.getByRole('link', { name: 'Register / Login' });
        this.deleteItemButton = this.productRow.locator('.cart_quantity_delete');
    }

    async getProductDetails(amount:number){
        for (let i = 1; i <= amount; i++) {
            const productRow = this.page.locator('tr[id^="product-' + i + '"]')
            await expect(productRow.locator('.cart_description')).toBeVisible()
            await expect(productRow.locator('.cart_price')).toBeVisible()
            await expect(productRow.locator('.cart_quantity')).toBeVisible()
            await expect(productRow.locator('.cart_total')).toBeVisible()
          }
    }
}
