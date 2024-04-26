import { Page, Locator } from "@playwright/test"
import Utils from "../commons/Utils";

export default class ProductDetailsPage {

    readonly page: Page;
    readonly utils: Utils;
    readonly productInformationContainer: Locator;
    readonly productDetailName: Locator;
    readonly productCategory: Locator;
    readonly productPrice: Locator;
    readonly productAvailability: Locator;
    readonly productCondition: Locator;
    readonly productBrand: Locator;
    readonly quantityInput: Locator;
    readonly addToCartButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.utils = new Utils(page)
        this.productInformationContainer = page.locator('.product-information');
        this.productDetailName = this.productInformationContainer.locator('h2');
        this.productCategory = this.productInformationContainer.getByText('Category');
        this.productPrice = this.productInformationContainer.getByText('Rs.');
        this.productAvailability = this.productInformationContainer.getByText('Availability');
        this.productCondition = this.productInformationContainer.getByText('condition');
        this.productBrand = this.productInformationContainer.getByText('Brand');
        this.quantityInput = page.locator('#quantity');
        this.addToCartButton = page.getByRole('button', { name: 'Add to cart' });

    }

}
