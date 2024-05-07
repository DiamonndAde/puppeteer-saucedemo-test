const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    // Case 1: Invalid Login
    await page.goto("https://www.saucedemo.com");
    await page.type("#user-name", "invalid_username");
    await page.type("#password", "invalid_password");
    await page.click("#login-button");
    await page.waitForSelector(".error-message-container");
    const errorMessage = await page.$eval(".error-message-container h3", (el) =>
      el.textContent.trim()
    );
    console.log("Case 1 - Invalid Login:", errorMessage);

    // Case 2: Valid Login
    await page.goto("https://www.saucedemo.com");
    await page.type("#user-name", "standard_user");
    await page.type("#password", "secret_sauce");
    await page.click("#login-button");
    await page.waitForSelector("#inventory_container");

    // Add products to cart
    console.log("Case 2 - Valid Login: Adding products to cart");
    await page.click("#add-to-cart-sauce-labs-backpack");
    await page.click("#add-to-cart-sauce-labs-bike-light");

    // View product detail
    console.log("Case 2 - Valid Login: Viewing product details");
    await page.click("#item_4_img_link");
    await page.goBack();
    await page.click("#item_0_img_link");
    await page.goBack();

    // Sort products
    console.log("Case 2 - Valid Login: Sorting products");
    await page.select("select.product_sort_container", "lohi");

    // Checkout a product
    console.log("Case 2 - Valid Login: Checking out products");
    await page.click(".shopping_cart_link");

    // Wait for cart page to load
    console.log("Case 2 - Valid Login: Waiting for cart page to load");
    await page.waitForSelector("#cart_contents_container");

    // Checkout
    console.log("Case 2 - Valid Login: Proceeding to checkout");
    await page.click("#checkout");
    await page.waitForSelector(".checkout_info");
    await page.type("#first-name", "John");
    await page.type("#last-name", "Doe");
    await page.type("#postal-code", "100123");
    await page.click("#continue");
    await page.waitForSelector(".summary_info");
    await page.click("#finish");
    await page.waitForSelector(".complete-header");
    const completeHeader = await page.$eval(".complete-header", (el) =>
      el.textContent.trim()
    );
    console.log("Case 2 - Valid Login:", completeHeader);

    console.log("Case 2 - Valid Login: Operations completed successfully");
  } catch (error) {
    console.error("Error occurred:", error);
  } finally {
    await browser.close();
  }
})();
