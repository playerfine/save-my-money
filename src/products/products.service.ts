import { Injectable } from '@nestjs/common';
import { PraxisService } from './praxis.service';
import { GammaService } from './gamma.service';

@Injectable()
export class ProductsService {
  constructor(
    private praxisService: PraxisService,
    private gammaService: GammaService,
  ) { }

  async search(searchTerm: string) {
    const productsPraxis = await this.praxisService.search(searchTerm);
    const productsGamma = await this.gammaService.search(searchTerm);

    const products = await Promise.all([productsPraxis, productsGamma]);

    return products.flat();
  }
}
