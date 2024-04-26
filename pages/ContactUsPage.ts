import { Page, Locator } from "@playwright/test"

export default class ContactUsPage {

    readonly page: Page;
    readonly nameInput: Locator;
    readonly emailInput: Locator;
    readonly subjetInput: Locator;
    readonly messageInput: Locator;
    readonly fileInput: Locator;
    readonly submitButton: Locator;
    readonly homeButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.nameInput = page.getByPlaceholder('Name');
        this.emailInput = page.getByPlaceholder('Email', { exact: true });
        this.subjetInput = page.getByPlaceholder('Subject');
        this.messageInput = page.getByPlaceholder('Your Message Here');
        this.fileInput = page.locator('input[name="upload_file"]');
        this.submitButton = page.getByRole('button', { name: 'Submit' });
        this.homeButton = page.locator('#form-section a')
    }

    async uploadFile(filePath: string){
        await this.fileInput.setInputFiles(filePath)
    }

    async submitForm(){
        this.page.on('dialog', dialog => dialog.accept());
        this.submitButton.click();
    }
}
