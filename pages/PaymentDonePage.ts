import { Page, Locator, expect } from "@playwright/test"

export default class PaymentDonePage {

    readonly page: Page;
    readonly downloadInvoiceButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.downloadInvoiceButton = page.locator('a.check_out');
    }

    async downloadInvoice(){
        const downloadPromise = this.page.waitForEvent('download');
        await this.downloadInvoiceButton.click();

        const download = await downloadPromise;
        expect(download.suggestedFilename()).toMatch('invoice.txt')
    }
}
