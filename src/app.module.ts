import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { parse } from 'pg-connection-string';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ENV } from './environment';

const postgresConfig = parse(ENV.DATABASE_URL);

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: postgresConfig.host,
      port: +postgresConfig.port,
      username: postgresConfig.user,
      password: postgresConfig.password,
      database: postgresConfig.database,
      synchronize: false,
      ssl: {
        rejectUnauthorized: false,
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
