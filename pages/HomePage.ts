import { Page, Locator, expect } from "@playwright/test"
import DeleteAccountPage from "./DeleteAccountPage";

export default class HomePage {

    readonly page: Page;
    readonly deleteAccountPage: DeleteAccountPage;
    readonly signUpAndLoginButton: Locator;
    readonly signUpHeader: Locator;
    readonly deleteAccountButton: Locator;
    readonly usernameText: Locator;
    readonly logoutButton: Locator;
    readonly contactUsButton: Locator;
    readonly productsButton: Locator;
    readonly cartButton: Locator;
    readonly womenCategoryLink: Locator;
    readonly dressCategoryLink: Locator;
    readonly brandLink: Locator;
    readonly recommendedSection: Locator;
    readonly recommendedProductListTitles: Locator;
    readonly subscriptionEmailInput: Locator;
    readonly subscriptionEmailButton: Locator;
    readonly scrollUpArrowLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.deleteAccountPage = new DeleteAccountPage(page);
        this.signUpAndLoginButton = page.getByRole('link', { name: 'Signup / Login' });
        this.signUpHeader = page.getByRole('heading', { name: 'New User Signup!' });
        this.deleteAccountButton = page.getByRole('link', { name: 'Delete Account' });
        this.usernameText = page.getByText('Logged in as', { exact: false });
        this.logoutButton = page.getByRole('link', { name: 'Logout' });
        this.contactUsButton = page.getByRole('link', { name: 'Contact us' })
        this.productsButton = page.getByRole('link', { name: 'Products' })
        this.cartButton = page.getByRole('link', { name: 'Cart' })
        this.womenCategoryLink = page.getByRole('link', { name: 'Women' });
        this.dressCategoryLink = page.getByRole('link', { name: 'Dress' });
        this.brandLink = page.locator('.brands-name a');
        this.recommendedSection = page.locator('.recommended_items');
        this.recommendedProductListTitles = page.locator('.recommended_items .item.active p')
        this.subscriptionEmailInput = page.locator('#susbscribe_email')
        this.subscriptionEmailButton = page.locator('#subscribe')
        this.scrollUpArrowLink = page.locator('#scrollUp')
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

    async filterByBrand(brand: string) {
        await this.brandLink.filter({ hasText: brand }).click()
    }

    async deleteAccount() {
        await this.deleteAccountButton.click();
        await expect(this.page.getByText('Account Deleted!')).toBeVisible();
        await this.deleteAccountPage.continueButton.click();
        await this.page.waitForLoadState();
        expect(this.page.url()).toBe('https://automationexercise.com/');
    }

}
