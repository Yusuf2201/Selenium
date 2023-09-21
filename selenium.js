const { Builder, Browser, By, Key, until } = require('selenium-webdriver');

async function Gas() {
  const driver = await new Builder()
    .forBrowser(Browser.CHROME)
    .build();

  try {
    // Masuk ke halaman
    await driver.get('https://www.saucedemo.com/v1');
    await new Promise(done => setTimeout(done, 2000));

    // Login dulu 
    await driver.findElement(By.id('user-name')).sendKeys('standard_user');
    await driver.findElement(By.id('password')).sendKeys('secret_sauce', Key.RETURN);
    await new Promise(done => setTimeout(done, 1000));

    // Melakukan filter data dari nama z-a
    await driver
      .findElement(By.css('.product_sort_container option[value="za"]'))
      .click();
    await new Promise(done => setTimeout(done, 2000));

    // masukkan barang ke keranjang
    // barang 1
    await driver.findElement(By.css('.inventory_item:nth-child(1) .btn_primary')).click();
    await new Promise(done => setTimeout(done, 2000));

    // barang 2
    await driver.findElement(By.css('.inventory_item:nth-child(2) .btn_primary')).click();
    await new Promise(done => setTimeout(done, 2000));

    // barang 3
    await driver.findElement(By.css('.inventory_item:nth-child(3) .btn_primary')).click();
    await new Promise(done => setTimeout(done, 2000));

    // Checkout
    await driver.findElement(By.id('shopping_cart_container')).click();
    await driver.findElement(By.css('.btn_action')).click();
    await new Promise(done => setTimeout(done, 2000));

    // Isi Checkout Form
    await driver.findElement(By.id('first-name')).sendKeys('Yusuf');
    await driver.findElement(By.id('last-name')).sendKeys('Dwi');
    await driver.findElement(By.id('postal-code')).sendKeys('55652', Key.RETURN);
    await new Promise(done => setTimeout(done, 2000));

    // melihat rincian belanja
    await driver.findElement(By.css('.btn_action')).click();
    await new Promise(done => setTimeout(done, 2000));

    // masuk ke halaman finish atau selesai melakukan transaksi

     // Logout
    await new Promise(done => setTimeout(done, 2000));
    await driver.findElement(By.css('.bm-burger-button')).click()
    const logout = await driver.findElement(By.id('logout_sidebar_link'))
    await driver.wait(until.elementIsVisible(logout),);
    await logout.click()
    await new Promise(done => setTimeout(done, 2000));
  } finally {
    // menutup browser walau ada kesalahan
    await driver.quit();
  }
}

Gas();
