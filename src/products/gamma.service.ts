import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';

@Injectable()
export class GammaService {
  async scrape() {
    const browser = await puppeteer.launch({ headless: false });
    const [page] = await browser.pages();
    await page.goto('https://www.gamma.nl/assortiment/zoeken?text=schroeven');
    // await page.waitForNavigation();
    const productsElements = await page.evaluate(() => {
      const products = document.querySelectorAll('.product-row-row-tile');
      return Array.from(products).map((product) => {
        const [_, productImage, productContent] = product.children;
        const titleElement = productContent.querySelector(
          '.product-tile-name > a',
        );
        console.log(titleElement?.textContent);
        const price = product.childNodes;
        return { price };
      });
    });
    // console.log(productsElements);
    return productsElements;
  }
}
