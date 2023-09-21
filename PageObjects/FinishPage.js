const { By, WebDriver, until } = require('selenium-webdriver')
const Page = require('./Page')

class FinishPage extends Page {
	// initialization
	constructor(driver) {
		super(driver)
	}
	Selesai = By.css('.complete-header')

	async openPage() {
		await this.openUrl('checkout-complete.html')
	}
	async Logout() {
		await this.driver.findElement(By.css('.bm-burger-button')).click()
        const logout = await this.driver.findElement(By.id('logout_sidebar_link'))
        await this.driver.wait(until.elementIsVisible(logout),);
        await logout.click()
        await new Promise(done => setTimeout(done, 2000));
    }
	async selesai () {
		return await this.driver.findElement(this.Selesai).getText()
	}



}
module.exports = FinishPage