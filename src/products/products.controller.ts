import { Controller, Get } from '@nestjs/common';
import { PraxisService } from './praxis.service';
import { GammaService } from './gamma.service';

@Controller('products')
export class ProductsController {
  constructor(
    private praxisService: PraxisService,
    private gammaService: GammaService,
  ) { }

  @Get()
  async searchByTerm() {
    this.gammaService.scrape();
  }
}
