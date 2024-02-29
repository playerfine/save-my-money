import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './products/products.controller';
import { PraxisService } from './products/praxis.service';
import { HttpModule } from '@nestjs/axios';
import { GammaService } from './products/gamma.service';
import { ProductsService } from './products/products.service';

@Module({
  imports: [HttpModule],
  controllers: [AppController, ProductsController],
  providers: [AppService, PraxisService, GammaService, ProductsService],
})
export class AppModule { }
