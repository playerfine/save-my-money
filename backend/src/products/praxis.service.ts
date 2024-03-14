import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

export interface PraxisResponse {
  products: Products;
}

export interface Products {
  quantity: number;
  collection: Collection[];
}

export interface Category {
  title: string;
  id: string;
}

export interface Promotion {
  price: number;
  group: string;
  priority: number;
  percentage: number;
  isExcludedByDiscountGroup: boolean;
  qualifiedQuantity: number;
  actionQuantity: number;
  amount: number;
  sameProducts: boolean;
  isTarget: boolean;
  isQualified: boolean;
  isPercentage: boolean;
}

export interface Collection {
  id: string;
  title: string;
  link: string;
  category: Category;
  image: string;
  ean: string;
  ecocheque: boolean;
  sustainability: boolean;
  discontinued: boolean;
  packagePriceFirst: boolean;
  onlineOnly: boolean;
  currency: string;
  regular: { price: number };
  promotions: Promotion[];
  unitsInPacket?: number;
  unitName?: string;
  deliveryModes: DeliveryMode[];
  availabilityStatus: string;
  brands: Brand[];
  parents: string[];
  discountClass?: string;
  disableStatus?: DisableStatus;
}

export interface DeliveryMode {
  code: string;
}

export interface Brand {
  code: string;
  name: string;
}

export interface DisableStatus {
  isDisabled: boolean;
}

const generatePraxisApi = (term: string) =>
  `https://www.praxis.nl/search-service/rest/v3/praxis/nl/search?page=1&term=${term}&viewSize=24`;

@Injectable()
export class PraxisService {
  constructor(private readonly httpService: HttpService) {}
  async search(searchTerm: string) {
    const { data } = await firstValueFrom(
      this.httpService.get<PraxisResponse>(generatePraxisApi(searchTerm)),
    );

    console.log(data.products.collection);

    return data.products.collection.map(({ title, image, regular }) => {
      return {
        title,
        src: image,
        price: regular.price,
      };
    });
  }
}
