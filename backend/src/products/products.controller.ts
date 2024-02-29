import { Controller, Get } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) { }

  @Get()
  async searchByTerm() {
    console.log(await this.productsService.search('mdf'));
  }
}
