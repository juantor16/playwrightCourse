import { Page, Locator, expect } from "@playwright/test"

export default class ViewCartPage {

    readonly page: Page;
    readonly productRow: Locator;
    readonly proceedToCheckoutButton: Locator;
    readonly signUpAndLoginCheckoutModalLink: Locator;
    readonly deleteItemButton: Locator;
    readonly reviewNameInput: Locator;
    readonly reviewEmailInput: Locator;
    readonly reviewMessageInput: Locator;
    readonly buttonReview: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productRow = page.locator('tr[id^="product-"]');
        this.proceedToCheckoutButton = page.getByText('Proceed To Checkout');
        this.signUpAndLoginCheckoutModalLink = page.getByRole('link', { name: 'Register / Login' });
        this.deleteItemButton = this.productRow.locator('.cart_quantity_delete');
        this.reviewNameInput = page.locator('#name');
        this.reviewEmailInput = page.locator('#email');
        this.reviewMessageInput = page.locator('#review');
        this.buttonReview = page.locator('#button-review')
    }

    async getProductDetails(amount: number) {
        for (let i = 1; i <= amount; i++) {
            const productRow = this.page.locator('tr[id^="product-' + i + '"]')
            await expect(productRow.locator('.cart_description')).toBeVisible()
            await expect(productRow.locator('.cart_price')).toBeVisible()
            await expect(productRow.locator('.cart_quantity')).toBeVisible()
            await expect(productRow.locator('.cart_total')).toBeVisible()
        }
    }

    async checkProductTitleContains(contains: string) {
        let amountOfRows = await this.productRow.count()
        for (let i = 0; i < amountOfRows; i++) {
            let currentRow = this.productRow.nth(i)
            await expect(currentRow.locator('.cart_description')).toContainText(contains)
        }
    }

    async submitAreview(reviewInfo: any){
        await this.reviewNameInput.fill(reviewInfo.name);
        await this.reviewEmailInput.fill(reviewInfo.email)
        await this.reviewMessageInput.fill(reviewInfo.message);
        await this.buttonReview.click()
    }
}
