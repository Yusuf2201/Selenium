const { By, WebDriver } = require('selenium-webdriver')
const Page = require('./Page')

class OverviewPage extends Page {
	// initialization
	constructor(driver) {
		super(driver)
	}
	async Overview () { await this.driver.findElement(By.css('.btn_action')).click();
	}
	Judul = By.css('.subheader')

	async openPage() {
		await this.openUrl('checkout-step-two.html')
	}
	async judul() {
		return await this.driver.findElement(this.Judul).getText()
	}
	
}
module.exports = OverviewPage