import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateProductDto } from 'dto/products.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PrismaService } from 'src/prisma.service';
import { ProductHistoryItem } from './product-history-item';

@Controller('products')
export class ProductsController {
  constructor(private prisma: PrismaService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getProducts() {
    return this.prisma.product.findMany({
      include: {
        category: true,
      },
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createProduct(@Body() dto: CreateProductDto) {
    return this.prisma.product.create({
      data: {
        name: dto.name,
        price: dto.price,
        promoPrice: dto.promoPrice,
        store: dto.store,
        quantityInThePackage: dto.quantityInThePackage,
        date: new Date(dto.date),
        categoryId: dto.categoryId,
        history: JSON.stringify([] as ProductHistoryItem[]),
      },
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  async deleteProduct(@Param('id') id: string) {
    return this.prisma.product.delete({
      where: {
        id: id,
      },
    });
  }
}
