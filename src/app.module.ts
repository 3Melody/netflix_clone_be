import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { MoviesModule } from './movies/movies.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule,MoviesModule,   
     ConfigModule.forRoot({
      isGlobal: true, // ให้ทุก module ใช้ได้เลย
      envFilePath: '.env',
    }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
