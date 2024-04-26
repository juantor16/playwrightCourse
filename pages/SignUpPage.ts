import { Page, Locator, expect } from "@playwright/test"
import SignUpLoginPage from "./SignUpLoginPage";
import AccountCreatedPage from "./AccountCreatedPage";

export default class SignUpPage {

    readonly page: Page;
    readonly mrRadioButton: Locator;
    readonly passwordInput: Locator;
    readonly daysDropdown: Locator;
    readonly monthsDropdown: Locator;
    readonly yearsDropdown: Locator;
    readonly newsletterCheckbox: Locator;
    readonly specialOffersCheckbox: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly companyInput: Locator;
    readonly addressInput: Locator;
    readonly address2Input: Locator;
    readonly countryDropdown: Locator;
    readonly stateInput: Locator;
    readonly cityInput: Locator;
    readonly zipcodeInput: Locator;
    readonly mobileNumberInput: Locator;
    readonly createAccountButton: Locator;
    readonly signUpLoginPage: SignUpLoginPage;
    readonly accountCreatedPage: AccountCreatedPage;

    constructor(page: Page) {
        this.page = page;
        this.signUpLoginPage = new SignUpLoginPage(page);
        this.accountCreatedPage = new AccountCreatedPage(page);
        this.mrRadioButton = page.getByLabel('Mr.');
        this.passwordInput = page.getByLabel('Password');
        this.daysDropdown = page.locator('#days');
        this.monthsDropdown = page.locator('#months');
        this.yearsDropdown = page.locator('#years');
        this.newsletterCheckbox = page.getByLabel('Sign up for our newsletter!');
        this.specialOffersCheckbox = page.getByLabel('Receive special offers from our partners!');
        this.firstNameInput = page.getByLabel('First name');
        this.lastNameInput = page.getByLabel('Last name');
        this.companyInput = page.getByLabel('Company', { exact: true });
        this.addressInput = page.getByLabel('Address * (');
        this.address2Input = page.getByLabel('Address 2');
        this.countryDropdown = page.getByLabel('Country');
        this.stateInput = page.getByLabel('State');
        this.cityInput = page.getByLabel('City');
        this.zipcodeInput = page.locator('#zipcode');
        this.mobileNumberInput = page.getByLabel('Mobile Number *');
        this.createAccountButton = page.getByRole('button', { name: 'Create Account' });
    }

    async completeSignUp(userData: any) {
        await this.signUpLoginPage.signUpNameInput.fill(userData.fullName);
        const randomNumber = Math.floor(Math.random() * (999 - 10000) + 10000);
        await this.signUpLoginPage.signUpEmailAdressInput.fill(userData.emailAddress + randomNumber + userData.emailDomain);
        await this.signUpLoginPage.signUpButton.click();
        await expect(this.page.getByText('Enter Account Information')).toBeVisible();
        await this.mrRadioButton.check();
        await this.passwordInput.fill(userData.password);
        await this.daysDropdown.selectOption(userData.DOB.day);
        await this.monthsDropdown.selectOption(userData.DOB.month);
        await this.yearsDropdown.selectOption(userData.DOB.year);
        await this.newsletterCheckbox.check();
        await this.specialOffersCheckbox.check();
        await this.firstNameInput.fill(userData.firstName);
        await this.lastNameInput.fill(userData.lastName);
        await this.companyInput.fill(userData.companyName);
        await this.addressInput.fill(userData.address);
        await this.address2Input.fill(userData.address2);
        await this.countryDropdown.selectOption(userData.country);
        await this.stateInput.fill(userData.state);
        await this.cityInput.fill(userData.city);
        await this.zipcodeInput.fill(userData.zipCode);
        await this.mobileNumberInput.fill(userData.phoneNumber);
        await this.createAccountButton.click();
        await expect(this.page.getByText('Account Created!')).toBeVisible();
        await this.accountCreatedPage.continueButton.click();
        await expect(this.page.getByText('Logged in as ' + userData.fullName)).toBeVisible();
    }
}
