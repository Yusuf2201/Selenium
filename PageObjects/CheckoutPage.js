const { By, WebDriver } = require('selenium-webdriver')
const Page = require('./Page')

class CheckoutPage extends Page {
	// initialization
	constructor(driver) {
		super(driver)
	}

	// element locators
	NamaAwal = By.css('#first-name')
	NamaAkhir = By.css('#last-name')
    KodePos = By.css('#postal-code')
	submitSO = By.css('.btn_primary.cart_button')
	errorEl = By.css('h3[data-test="error"]')
	Tittle = By.css('.subheader')

	/**
	 * fungsi ini digunakan untuk melakukan login
	 * @param {string} awal
	 * @param {string} akhir
     * @param {number} kode
	 */

	async test (awal, akhir, kode ) {
		await this.driver.findElement(this.NamaAwal).sendKeys(awal);
        await this.driver.findElement(this.NamaAkhir).sendKeys(akhir);
        await this.driver.findElement(this.KodePos).sendKeys(kode);
		await this.driver.findElement(this.submitSO).click()
	}
	async getErrorMessage () {
		return await this.driver.findElement(this.errorEl).getText()
	}
    async lanjut () {
		await this.driver.findElement(this.NamaAwal).sendKeys('yusuf');
        await this.driver.findElement(this.NamaAkhir).sendKeys('dwi');
        await this.driver.findElement(this.KodePos).sendKeys('55652');
		await this.driver.findElement(this.submitSO).click()
    }
	async openPage() {
		await this.openUrl('checkout-step-one.html')
	}

	async GetTittle () {
		return await this.driver.findElement(this.Tittle).getText()
	}
	
}
module.exports = CheckoutPage

