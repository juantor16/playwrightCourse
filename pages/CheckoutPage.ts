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

    constructor(page: Page) {
        this.page = page;
        this.deliveryDetails = page.locator('#address_delivery')
        this.deliveryAddressFirstNameText = this.deliveryDetails.locator('.address_firstname');
        this.companyNameText = page.locator('#address_delivery .address_address1').nth(0)
        this.addressText = page.locator('#address_delivery .address_address1').nth(1)
        this.addressTwoText = page.locator('#address_delivery .address_address1').nth(2);
        this.countryNameText = page.locator('#address_delivery .address_country_name');
        this.phoneNumberText = page.locator('#address_delivery .address_phone')
        this.placeOrderButton = page.getByRole('link', { name: 'Place Order' })
    }

    async checkDeliveryDetails(userData: any) {
        await expect(this.deliveryAddressFirstNameText).toHaveText(userData.prefix + " " + userData.fullName)
        await expect(this.companyNameText).toHaveText(userData.companyName)
        await expect(this.addressTwoText).toHaveText(userData.address2)
        await expect(this.addressText).toHaveText(userData.address)
        await expect(this.countryNameText).toHaveText(userData.country)

    }
}