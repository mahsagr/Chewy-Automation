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

}


