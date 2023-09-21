const { By, WebDriver } = require('selenium-webdriver')
const { expect } = require('chai')
const SetupDriver = require('./utils/SetupDriver')
const LoginPage = require('./PageObjects/LoginPage')
const InventoryPage = require('./PageObjects/InventoryPage')
const CartPage = require('./PageObjects/CartPage')
const CheckoutPage = require('./PageObjects/CheckoutPage')
const OverviewPage = require('./PageObjects/OverviewPage')
const FinishPage = require('./PageObjects/FinishPage')

describe('coba integrasi selenium dan mocha', function () {
	/** @type {WebDriver} */ let driver
	/** @type {LoginPage} */ let loginPage
	/** @type {InventoryPage} */ let inventoryPage
    /** @type {CartPage} */ let cartPage
	/** @type {CheckoutPage} */ let checkoutPage
	/** @type {OverviewPage} */ let overviewPage
	/** @type {FinishPage} */ let finishPage

	before(async function () {
		driver = await SetupDriver()
		loginPage = new LoginPage(driver)
		inventoryPage = new InventoryPage(driver)
        cartPage = new CartPage(driver)
		checkoutPage = new CheckoutPage(driver)
		overviewPage = new OverviewPage(driver)
		finishPage = new FinishPage(driver)
       
	})

    describe("Test Positif", () => {
    it('coba login dengan user yang benar memakai standar user', async function () {
		await loginPage.openPage()
		await loginPage.loginProcess('standard_user', 'secret_sauce')

		const productTitle = await inventoryPage.getPageTitle()
		expect(productTitle).to.be.equal('Products')
	})
    it('coba login dengan user yang benar memakai user yang kekunci', async function () {
        await loginPage.openPage();
        await loginPage.loginProcess('locked_out_user', 'secret_sauce');
    
        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).to.include('Epic sadface: Sorry, this user has been locked out.');
    });
   
    it('coba login dengan user yang benar memakai user yang bermasalah', async function () {
		await loginPage.openPage()
		await loginPage.loginProcess('problem_user', 'secret_sauce')

		const productTitle = await inventoryPage.getPageTitle()
		expect(productTitle).to.be.equal('Products')
	})
    it('coba login dengan user yang benar memakai performance_glitch_user', async function () {
		await loginPage.openPage()
		await loginPage.loginProcess('performance_glitch_user', 'secret_sauce')

		const productTitle = await inventoryPage.getPageTitle()
		expect(productTitle).to.be.equal('Products')
	})
  
    })
    describe("Test Negatif", () => {
	it('coba login dengan user yang salah (username salah dan pasword salah)', async function () {
		await loginPage.openPage()
		await loginPage.loginProcess('yusuf', '1234')
		const errorMessage = await loginPage.getErrorMessage()
		expect(errorMessage).to.include('Username and password do not match any user')
	})
    it('coba login dengan user yang salah (username salah dan pasword benar)', async function () {
		await loginPage.openPage()
		await loginPage.loginProcess('yusuf', 'secret_sauce')
		const errorMessage = await loginPage.getErrorMessage()
		expect(errorMessage).to.include('Username and password do not match any user in this service')
	})

    it('coba login dengan user yang salah (username benar dan pasword salah)', async function () {
		await loginPage.openPage()
		await loginPage.loginProcess('standard_user', '1234')
		const errorMessage = await loginPage.getErrorMessage()
		expect(errorMessage).to.include('Username and password do not match any user in this service')
	})

    it('coba login dengan user yang salah (username kosong dan pasword benar)', async function () {
		await loginPage.openPage()
		await loginPage.loginProcess('', 'secret_sauce')
		const errorMessage = await loginPage.getErrorMessage()
		expect(errorMessage).to.include('Username is required')
	})
    it('coba login dengan user yang salah (username benar dan pasword kosong)', async function () {
		await loginPage.openPage()
		await loginPage.loginProcess('standard_user', '')
		const errorMessage = await loginPage.getErrorMessage()
		expect(errorMessage).to.include('Password is required')
	})   

    it('coba login dengan user yang salah (username kosong dan pasword kosong)', async function () {
		await loginPage.openPage()
		await loginPage.loginProcess('', '')
		const errorMessage = await loginPage.getErrorMessage()
		expect(errorMessage).to.include('Username is required')
	}) 
    })
describe("Inventori Page tes positif", () => {
    it('MENCOBA memasukkan barang ke-1 di keranjang ', async function () {
        await loginPage.openPage()
		    await loginPage.login() 
        await driver.findElement(By.css('.inventory_item:nth-child(1) .btn_primary')).click();        
        
        const Produk = await cartPage.barang()
		expect(Produk).to.be.equal('Sauce Labs Backpack')
    // })
	// it('MENCOBA memasukkan barang urutan ke-3 di keranjang ', async function () {
    //     await loginPage.openPage()
	// 	await loginPage.login() 
    //     await driver.findElement(By.css('.inventory_item:nth-child(3) .btn_primary')).click();        
        
    //     const Produk = await cartPage.barang3()
	// 	expect(Produk).to.be.equal('Sauce Labs Bolt T-Shirt')
    // })
	})
	
	describe("Cart Page tes positif", () => {
	it('MENCOBA melakukan checkout ', async function () {
		await loginPage.openPage()
		await loginPage.login() 
		// await inventoryPage.Checkout()
		await driver.findElement(By.id('shopping_cart_container')).click();
    	await driver.findElement(By.css('.btn_action')).click();
		const fiks = await checkoutPage.GetTittle()
		expect(fiks).to.be.equal('Checkout: Your Information')
		})
	})

	describe("Checkout Page tes positif", () => {
		it('Memasukkan data yang benar ', async function () {
			await loginPage.openPage()
			await loginPage.login() 
			// await inventoryPage.Checkout()
			await cartPage.LanjutCheckout()
			await checkoutPage.test('yusuf', 'dwi', '55652');
			const check = await overviewPage.judul()
			expect(check).to.be.equal('Checkout: Overview')
			
		})
    })

	describe("Checkout Page tes negatif", () => {
		it('Memasukkan nama awal kosong dan lainnya benar ', async function () {
			await loginPage.openPage()
			await loginPage.login() 
			// await inventoryPage.Checkout()
			await cartPage.LanjutCheckout()

			await checkoutPage.test('', 'dwi', '55652');

			const errorMessage = await checkoutPage.getErrorMessage()
			expect(errorMessage).to.include('Error: First Name is required')
		})
		it('Memasukkan nama akhir kosong dan lainnya benar ', async function () {
			await loginPage.openPage()
			await loginPage.login() 
			// await inventoryPage.Checkout()
			await cartPage.LanjutCheckout()

			await checkoutPage.test('yusuf', '', '55652');

			const errorMessage = await checkoutPage.getErrorMessage()
			expect(errorMessage).to.include('Error: Last Name is required')
		})
		it('Memasukkan kode pos kosong dan lainnya bear ', async function () {
			await loginPage.openPage()
			await loginPage.login() 
			// await inventoryPage.Checkout()
			await cartPage.LanjutCheckout()

			await checkoutPage.test('yusuf', 'dwi', '');

			const errorMessage = await checkoutPage.getErrorMessage()
			expect(errorMessage).to.include('Error: Postal Code is required')
		})
		it('Memasukkan inputan semua ', async function () {
			await loginPage.openPage()
			await loginPage.login() 
			// await inventoryPage.Checkout()
			await cartPage.LanjutCheckout()

			await checkoutPage.test('', '', '');

			const errorMessage = await checkoutPage.getErrorMessage()
			expect(errorMessage).to.include('Error: First Name is required')
		})
    })
	describe("Overview Page tes positif", () => {
		it('Melihat rincian belanja ', async function () {
			await loginPage.openPage()
			await loginPage.login() 
			// await inventoryPage.Checkout()
			await cartPage.LanjutCheckout()
			await checkoutPage.lanjut()
			await overviewPage.Overview()

			const checkOverview = await finishPage.selesai()
			expect(checkOverview).to.be.equal('THANK YOU FOR YOUR ORDER')
		})
	})

	describe("Finish Page tes positif", () => {
		it('Melakukan Logout ', async function () {
			await loginPage.openPage()
			await loginPage.login() 
			// await inventoryPage.Checkout()
			await cartPage.LanjutCheckout()
			await checkoutPage.lanjut()
			await overviewPage.Overview()
			await finishPage.Logout()

			const logout = await loginPage.Us()
			expect(logout).to.be.equal('Accepted usernames are:')
	
		})
	})


	afterEach(async function () {
		await driver.sleep(2000)
	})

	after(async function () {
		await driver.close()
	})
})