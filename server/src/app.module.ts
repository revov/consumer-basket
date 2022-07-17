import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AuthModule } from './auth/auth.module';
import { join } from 'path';
import { PrismaService } from './prisma.service';
import { ProductsController } from './products/products.controller';
import { CategoriesController } from './categories/categories.controller';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', '..', 'client', 'build'),
    }),
    AuthModule,
  ],
  controllers: [ProductsController, CategoriesController],
  providers: [PrismaService],
})
export class AppModule {}
