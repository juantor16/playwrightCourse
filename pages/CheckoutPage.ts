import { Page, Locator, expect } from "@playwright/test"

export default class CheckoutPage {

    readonly page: Page;
    readonly deliveryDetails: Locator
    readonly deliveryAddressFirstNameText: Locator;
    readonly companyNameText: Locator;
    readonly addressText: Locator;
    readonly addressTwoText: Locator;
    readonly countryNameText: Locator;
    readonly phoneNumberText: Locator;
    readonly placeOrderButton: Locator;
    readonly billingDetails: Locator;
    readonly billingFirstNameText: Locator;
    readonly billingCompanyNametext: Locator;
    readonly billingAddressText: Locator;
    readonly billingAddressTwoText: Locator;
    readonly billingCountryNameText: Locator;
    readonly billingPhoneNumberText: Locator;

    constructor(page: Page) {
        this.page = page;

        this.deliveryDetails = page.locator('#address_delivery')
        this.deliveryAddressFirstNameText = this.deliveryDetails.locator('.address_firstname');
        this.companyNameText = this.deliveryDetails.locator('.address_address1').nth(0)
        this.addressText = this.deliveryDetails.locator('.address_address1').nth(1)
        this.addressTwoText = this.deliveryDetails.locator('.address_address1').nth(2);
        this.countryNameText = this.deliveryDetails.locator('.address_country_name');
        this.phoneNumberText = this.deliveryDetails.locator('.address_phone')
        this.placeOrderButton = page.getByRole('link', { name: 'Place Order' })

        this.billingDetails = page.locator('#address_invoice');
        this.billingFirstNameText = this.billingDetails.locator('.address_firstname');
        this.billingCompanyNametext = this.billingDetails.locator('.address_address1').nth(0)
        this.billingAddressText = this.billingDetails.locator('.address_address1').nth(1)
        this.billingAddressTwoText = this.billingDetails.locator('.address_address1').nth(2);
        this.billingCountryNameText = this.billingDetails.locator('.address_country_name');
        this.billingPhoneNumberText = this.billingDetails.locator('.address_phone')
    }

    async checkDeliveryDetails(userData: any) {
        await expect(this.deliveryAddressFirstNameText).toHaveText(userData.prefix + " " + userData.fullName)
        await expect(this.companyNameText).toHaveText(userData.companyName)
        await expect(this.addressTwoText).toHaveText(userData.address2)
        await expect(this.addressText).toHaveText(userData.address)
        await expect(this.countryNameText).toHaveText(userData.country)
    }


    async checkBillingDetails(userData: any) {
        await expect(this.billingFirstNameText).toHaveText(userData.prefix + " " + userData.fullName)
        await expect(this.billingCompanyNametext).toHaveText(userData.companyName)
        await expect(this.billingAddressTwoText).toHaveText(userData.address2)
        await expect(this.billingAddressText).toHaveText(userData.address)
        await expect(this.billingCountryNameText).toHaveText(userData.country)

    }
}