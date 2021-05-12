import * as employeeData from "../singInData.json"

import {
    Builder,
    By,
    Capabilities,
    until,
    WebDriver,
    WebElement,
  } from "selenium-webdriver";
import { Driver } from "selenium-webdriver/chrome";

const fs = require("fs");
const chromedriver = require("chromedriver");


export class ChewyPage {
    driver:WebDriver
    url:string = "https://www.chewy.com/"
    accountButton: By = By.css("a[title*='your account']")
    siginunderAccount: By = By.css(".sfw-header-drop-account__sign-in")
    EmailAddressField: By = By.css("label[for*='username']")
    PasswordField: By = By.css("label[for*='password']")
    EmailAddressInput: By = By.name("username")
    PasswordInput: By = By.name("password")
    SigninButton: By = By.name("submitForm")
    hiAccountName: By = By.css(".sfw-header-nav-trigger--account__label")
    searchField:By = By.css("#search-autocomplete");
    result:By = By.css(".results-products");
    firstProduct: By =  By.css("article[data-position*='1']");
    addToCart: By = By.css(".js-add-cart");
    itemInCart: By = By.css(".sfw-header-nav-cart__badge");
    ProceedToCheckout: By = By.css("div.upsell__actions a.cw-btn--action");
    Placeorderbutton: By =By.css("button[data-event-category*='checkout']")
    brandNavigation:By = By.css("#core-nav-1");
    dealsNavigation:By = By.css ("#core-nav-2");
    brandHeader:By = By.xpath("//div[@id='page-content']/h1");
    dealsItem:By = By.xpath("//div[@id='tns1-item0']/a/div[2]/p")


    constructor(driver: WebDriver) {
        this.driver = driver;
    }

    async navigate(){
        await this.driver.get(this.url)   
    }

    async clickOnAccountButton(){
        await this.driver.wait(until.elementLocated(this.accountButton));
        await this.driver.findElement(this.accountButton).click();
        await this.driver.wait(until.elementLocated(this.siginunderAccount));
        await this.driver.findElement(this.siginunderAccount).click();
    }

    async signIn(): Promise<void> {
        await this.driver.wait(until.elementLocated(this.EmailAddressField));
        await this.driver.findElement(this.EmailAddressField).click();
        await this.driver.findElement(this.EmailAddressInput).sendKeys(employeeData.EmailAddress);
        await this.driver.findElement(this.PasswordField).click();
        await this.driver.findElement(this.PasswordInput).sendKeys(employeeData.Password);
        await this.driver.findElement(this.SigninButton).click();
    }

    async doSearch(searchItem:String){
        await this.driver.wait(until.elementLocated(this.searchField));
        await this.driver.findElement(this.searchField).sendKeys(`${searchItem}\n`);
    }
    async getresults(){
        await this.driver.wait(until.elementLocated(this.result));
        return await (this.driver.findElement(this.result)).getText();
    }

    async getHeaderText() {
        await this.driver.wait(until.elementLocated(this.hiAccountName));
        return await (this.driver.findElement(this.hiAccountName)).getText();
    }

    async addtoMyCart() {    
        await this.driver.wait(until.elementLocated(this.firstProduct));
        await this.driver.findElement(this.firstProduct).click();
        await this.driver.wait(until.elementLocated(this.addToCart));
        const tt = this.driver.findElement(this.itemInCart);
        let count1:number =+ await this.driver.findElement(this.itemInCart).getText();
        await this.driver.findElement(this.addToCart).click();
        await this.driver.wait(until.elementLocated(this.itemInCart));
        let count2:number =+ await this.driver.findElement(this.itemInCart).getText();
        return count2-count1;
    }

    async proceedToCheckoutButton() {    
        await this.driver.wait(until.elementLocated(this.ProceedToCheckout));
        await this.driver.findElement(this.ProceedToCheckout).click();
        await this.driver.wait(until.elementLocated(this.Placeorderbutton));
        return await (await (this.driver.findElement(this.Placeorderbutton))).isDisplayed();

    }

    async clickOnDealsButton(){
        await this.driver.wait(until.elementLocated(this.dealsNavigation));
        await this.driver.findElement(this.dealsNavigation).click();
        await this.driver.wait(until.elementLocated(this.dealsItem))
    }
    async clickOnBrandsButton() {
        await this.driver.wait(until.elementLocated(this.brandNavigation));
        await (await this.driver.findElement(this.brandNavigation)).click();
        await this.driver.wait(until.elementLocated(this.brandHeader))
    }
    async getHeaderTextBrand() {
        await this.driver.wait(until.elementLocated(this.brandHeader));
        return await (this.driver.findElement(this.brandHeader)).getText();
    }
    async getItemText() {
        await this.driver.wait(until.elementLocated(this.dealsItem));
        return await (this.driver.findElement(this.dealsItem)).getText();
}
}
