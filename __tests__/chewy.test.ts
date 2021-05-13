import * as employeeData from "./singInData.json"
import { ChewyPage } from "./pageObjects/chewy-page-object-model";
const chromedriver = require("chromedriver");
import { WebDriver, Builder, Capabilities } from "selenium-webdriver";
const driver:WebDriver = new Builder()
  .withCapabilities(Capabilities.chrome())
  .build();


describe("Chewy sign in, search an item and adding that to cart and checking out", ()=> {

    const page = new ChewyPage(driver);
    afterAll(async () => {
      await page.driver.quit();
    });
    
    test("returning customer can sign in to thier account", async () =>{
      await page.navigate();
      await page.clickOnAccountButton();
      await page.signIn();
      expect(await page.getHeaderText()).toContain(`Hi, ${employeeData.name}!`)
    });

    test("it can search and find items", async ()=> {
       await page.doSearch("Douxo");
        expect(await page.getresults()).toContain("Douxo");
        }) 

    test("it can add first found item to the shopping cart", async ()=> {
        expect(await page.addtoMyCart()).toEqual(1);
        }) 

    test("it can take the item to the checkout page", async ()=> {
        expect(await page.proceedToCheckoutButton()).toBeTruthy();
        })
})