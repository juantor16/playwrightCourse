import { Page, Locator, expect } from "@playwright/test"

export default class HomePage {

    readonly page: Page;
    readonly signUpAndLoginButton: Locator;
    readonly signUpHeader: Locator;
    readonly deleteAccountButton: Locator;
    readonly usernameText: Locator;
    readonly logoutButton: Locator;
    readonly contactUsButton: Locator;
    readonly productsButton: Locator;
    readonly cartButton: Locator;
 
    constructor(page: Page) {
        this.page = page;
        this.signUpAndLoginButton = page.getByRole('link', { name: 'Signup / Login' });
        this.signUpHeader = page.getByRole('heading', { name: 'New User Signup!' });
        this.deleteAccountButton = page.getByRole('link', { name: 'Delete Account' });
        this.usernameText = page.getByText('Logged in as', { exact: false });
        this.logoutButton = page.getByRole('link', { name: 'Logout' });
        this.contactUsButton = page.getByRole('link', { name: 'Contact us' })
        this.productsButton = page.getByRole('link', { name: 'Products' })
        this.cartButton = page.getByRole('link', { name: 'Cart' })
    }

    async visit() {
        await this.page.goto('https://automationexercise.com/');
        await this.page.waitForLoadState();
        await expect(this.page).toHaveTitle('Automation Exercise');
    }

    async goToLoginAndSignUpPage() {
        await this.signUpAndLoginButton.click()
    }

    async checkUsername(username: string) {
        await expect(this.usernameText).toBeVisible();
        await expect(this.usernameText).toContainText(username);
    }

    async logout() {
        await this.logoutButton.click();
    }

    async goToContactUsPage() {
        await this.contactUsButton.click()
        expect(this.page.url()).toContain('contact_us')
    }

}
