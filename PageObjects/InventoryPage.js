const { By, WebDriver } = require('selenium-webdriver')
const Page = require('./Page')

class InventoryPage extends Page {
	// initialization
	constructor(driver) {
		super(driver)
	}

	pageTitleEl = By.css('.product_label')

	async openPage() {
		await this.openUrl('/inventory.html')
	}
	async getPageTitle () {
		return await this.driver.findElement(this.pageTitleEl).getText()
	}
	async Checkout() {
		await this.driver.findElement(By.css('.inventory_item:nth-child(1) .btn_primary')).click();
		// await driver.findElement(By.css('.inventory_item:nth-child(3) .btn_primary')).click();
	}
}

module.exports = InventoryPage