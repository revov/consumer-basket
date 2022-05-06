import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { join } from 'path';

// const postgresConfig = parse(ENV.DATABASE_URL);

@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: postgresConfig.host,
    //   port: +postgresConfig.port,
    //   username: postgresConfig.user,
    //   password: postgresConfig.password,
    //   database: postgresConfig.database,
    //   synchronize: false,
    //   ssl: {
    //     rejectUnauthorized: false,
    //   },
    // }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client', 'build'),
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
