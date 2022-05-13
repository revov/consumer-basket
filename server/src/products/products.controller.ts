import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { orderBy } from 'lodash';
import {
  CreateProductDto,
  ProductHistoryItem,
  UpdateProductDto,
} from 'common/products.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PrismaService } from 'src/prisma.service';

@Controller('products')
export class ProductsController {
  constructor(private prisma: PrismaService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getProducts() {
    return this.prisma.product.findMany({
      select: {
        id: true,
        date: true,
        name: true,
        price: true,
        promoPrice: true,
        quantityInThePackage: true,
        store: true,
      },
      orderBy: [
        {
          date: 'desc',
        },
        {
          updatedAt: 'desc',
        },
      ],
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getProduct(@Param('id') id: string) {
    const product = await this.prisma.product.findUnique({
      where: {
        id: id,
      },
    });

    return {
      ...product,
      history: JSON.parse(product.history.toString() || '[]'),
    };
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
        history: JSON.stringify([
          {
            price: dto.price,
            promoPrice: dto.promoPrice,
            store: dto.store,
            quantityInThePackage: dto.quantityInThePackage,
            date: dto.date,
          },
        ] as ProductHistoryItem[]),
      },
    });
  }

  @UseGuards(JwtAuthGuard)
  @Put('update/:id')
  async updatProduct(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    const sortedPurchases = orderBy(
      dto.history,
      'date' as keyof typeof dto.history[0],
      'desc',
    );
    const lastPurchase = sortedPurchases[0];

    return this.prisma.product.update({
      data: {
        name: dto.name,
        history: JSON.stringify(dto.history),

        price: lastPurchase.price,
        promoPrice: lastPurchase.promoPrice,
        store: lastPurchase.store,
        quantityInThePackage: lastPurchase.quantityInThePackage,
        date: new Date(lastPurchase.date),
      },
      where: {
        id,
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
