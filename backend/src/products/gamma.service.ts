import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';

@Injectable()
export class GammaService {
  async search(searchTerm: string) {
    const browser = await puppeteer.launch({ headless: true });
    const [page] = await browser.pages();
    console.log(searchTerm);
    await page.goto(
      `https://www.gamma.nl/assortiment/zoeken?text=${searchTerm}`,
    );
    const productsElements = await page.evaluate(() => {
      const products = document.querySelectorAll('.product-row-row-tile');
      return Array.from(products).map((product) => {
        const [, productImage, productContent] = product.children;

        const titleElement = productContent.querySelector(
          '.product-tile-name > a',
        );
        const imageSrc = productImage
          .querySelector('img')
          ?.getAttribute('data-src');

        const priceElements = productContent.querySelector(
          '.product-tile-price',
        )?.children;

        const [priceCurrent, priceDecimal] = priceElements || [];
        const price =
          (priceCurrent?.textContent ?? '') + (priceDecimal?.textContent ?? '');

        return {
          title: titleElement?.textContent,
          src: imageSrc,
          price,
          store: 'gamma',
        };
      });
    });

    return productsElements;
  }
}
