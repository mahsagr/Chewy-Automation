import { ChewyPage } from "./pageObjects/chewy-page-object-model";
const chromedriver = require("chromedriver");
import { WebDriver, Builder, Capabilities, promise } from "selenium-webdriver";
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
    
    test("Brands Naivgation Works", async () =>{
      await page.navigate();
      await page.clickOnBrandsButton();
      expect(await page.getHeaderTextBrand()).toContain("Shop by Brand");
    })
  })