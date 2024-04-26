import { Page, Locator } from "@playwright/test"

export default class DeleteAccountPage {

    readonly page: Page;
    readonly continueButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.continueButton = page.getByRole('link', { name: 'Continue' })
    
    }
}
