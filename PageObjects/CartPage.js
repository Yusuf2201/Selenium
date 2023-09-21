const { By, WebDriver } = require('selenium-webdriver')
const Page = require('./Page')

class CartPage extends Page {
	// initialization
	constructor(driver) {
		super(driver)
	}
	Barang = By.css('.inventory_item_name')
	Barang3 = By.css('.inventory_item_name:nth-child(2)')
	

	async openPage() {
		await this.openUrl('cart.html')
	}
	async LanjutCheckout() {
		await this.driver.findElement(By.id('shopping_cart_container')).click();
		await this.driver.findElement(By.css('.btn_action')).click();
	}
	async barang () {
		return await this.driver.findElement(this.Barang).getText()
	}
	async barang3 () {
		return await this.driver.findElement(this.Barang3).getText()
	}


}
module.exports = CartPage