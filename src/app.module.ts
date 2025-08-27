import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { MoviesModule } from './movies/movies.module';

@Module({
  imports: [HttpModule,MoviesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
