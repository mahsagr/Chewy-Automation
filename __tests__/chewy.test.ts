import * as employeeData from "./singInData.json"
import { ChewyPage } from "./pageObjects/chewy-page-object-model";
const chromedriver = require("chromedriver");
import { WebDriver, Builder, Capabilities } from "selenium-webdriver";
const driver:WebDriver = new Builder()
  .withCapabilities(Capabilities.chrome())
  .build();


describe("Chewy page tests suites", ()=> {

    const page = new ChewyPage(driver);
    beforeEach(async () => {
      await page.navigate();
    });
    afterAll(async () => {
      await page.driver.quit();
    });
    
    test("siginingin returning customer", async () =>{
      await page.navigate();
      await page.clickOnAccountButton();
      await page.signIn();
      expect(await page.getHeaderText()).toContain(`Hi, ${employeeData.name}!`)

    });

    test("the search an item and adds it to the cart", async ()=> {
       await page.doSearch("Douxo");
        expect(await page.getresults()).toContain("Douxo");
        expect(await page.addtoMyCart()).toEqual(1);
        })
})