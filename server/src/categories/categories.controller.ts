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
import { CreateUpdateCategoryDto } from 'common/categories.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PrismaService } from 'src/prisma.service';

@Controller('categories')
export class CategoriesController {
  constructor(private prisma: PrismaService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getCategories() {
    return this.prisma.category.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getCategory(@Param('id') id: string) {
    const category = await this.prisma.category.findUnique({
      where: {
        id: id,
      },
    });

    return category;
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createCategory(@Body() dto: CreateUpdateCategoryDto) {
    return this.prisma.category.create({
      data: {
        name: dto.name,
        description: dto.description,
      },
    });
  }

  @UseGuards(JwtAuthGuard)
  @Put('update/:id')
  async updatCategory(
    @Param('id') id: string,
    @Body() dto: CreateUpdateCategoryDto,
  ) {
    return this.prisma.category.update({
      data: {
        name: dto.name,
        description: dto.description,
      },
      where: {
        id,
      },
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  async deleteCategory(@Param('id') id: string) {
    return this.prisma.category.delete({
      where: {
        id: id,
      },
    });
  }
}
