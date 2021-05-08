import {
    Builder,
    By,
    Capabilities,
    until,
    WebDriver,
    WebElement,
  } from "selenium-webdriver";

const fs = require("fs");
const chromedriver = require("chromedriver");


export class ChewyPage {
    driver:WebDriver
    url:string = "https://www.chewy.com/"
    searchField:By = By.css("#search-autocomplete");
    result:By = By.css(".results-products");

    constructor(driver: WebDriver) {
        this.driver = driver;
    }

    async navigate(){
        await this.driver.get(this.url)
    }
    async doSearch(searchItem:String){
        await this.driver.wait(until.elementLocated(this.searchField));
        await this.driver.findElement(this.searchField).sendKeys(`${searchItem}\n`);
    }
     async getresults(){
        await this.driver.wait(until.elementLocated(this.result));
        return await (this.driver.findElement(this.result)).getText();
    }




}


