import { Controller, Get, Query } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  async searchByTerm(@Query('search') query: string) {
    return await this.productsService.search(query);
  }
}
