import { ChewyPage } from "./pageObjects/chewy-page-object-model";
const chromedriver = require("chromedriver");
import { WebDriver, Builder, Capabilities, promise } from "selenium-webdriver";
const driver:WebDriver = new Builder()
  .withCapabilities(Capabilities.chrome())
  .build();

    describe("Chewy deals page", ()=> {

        const page = new ChewyPage(driver);
        afterAll(async () => {
          await page.driver.quit();
        });
    
    test("Deals Navigation Works,and has dog deals", async () =>{
      await page.navigate();
      await page.clickOnDealsButton();
      expect(await page.getItemText()).toContain("Dog Deals");
    })
  })