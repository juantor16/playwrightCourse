import { Page, Locator } from "@playwright/test"

export default class PaymentPage {

    readonly page: Page;
    readonly cardName: Locator;
    readonly cardNumber: Locator;
    readonly cardCVC: Locator;
    readonly cardEdxpirationMonth: Locator;
    readonly cardExpirationYear: Locator;
    readonly payAndConfirmButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cardName = page.locator('input[name="name_on_card"]');
        this.cardNumber = page.locator('input[name="card_number"]');
        this.cardCVC = page.getByPlaceholder('ex.')
        this.cardEdxpirationMonth = page.getByPlaceholder('MM');
        this.cardExpirationYear = page.getByPlaceholder('YYY')
        this.payAndConfirmButton = page.getByRole('button', { name: 'Pay and Confirm Order' })
    }

    async completePayment(paymentDetails: any){
        await this.cardName.fill(paymentDetails.cardName);
        await this.cardNumber.fill(paymentDetails.cardNumber)
        await this.cardCVC.fill(paymentDetails.cvc)
        await this.cardEdxpirationMonth.fill(paymentDetails.expirationMonth)
        await this.cardExpirationYear.fill(paymentDetails.expirationYear)
        await this.payAndConfirmButton.click()
    }
}
