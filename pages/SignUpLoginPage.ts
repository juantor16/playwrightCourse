import { Page, Locator, expect } from "@playwright/test"

export default class SignUpLoginPage {

    readonly page: Page;
    readonly signUpNameInput: Locator;
    readonly signUpEmailAdressInput: Locator;
    readonly signUpButton: Locator;
    readonly loginHeader: Locator;
    readonly loginEmailAdressInput: Locator;
    readonly loginPasswordInput: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.signUpNameInput = page.getByPlaceholder('Name');
        this.signUpEmailAdressInput = page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address');
        this.signUpButton = page.getByRole('button', { name: 'Signup' });
        this.loginHeader = page.getByRole('heading', { name: 'Login to your account' });
        this.loginEmailAdressInput = page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address');
        this.loginPasswordInput = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
    }

    async login(userEmail: string, password: string) {
        await expect(this.loginHeader).toBeVisible();
        await this.loginEmailAdressInput.fill(userEmail);
        await this.loginPasswordInput.fill(password);
        await this.loginButton.click();
    }

    async checkLoginHeader(){
        await expect(this.loginHeader).toBeVisible();
    }

    async signUp(username: string, email: string){
        await this.signUpNameInput.fill(username);
        await this.signUpEmailAdressInput.fill(email);
        await this.signUpButton.click();
    }
}
