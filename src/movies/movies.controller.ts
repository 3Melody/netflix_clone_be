// movies/movies.controller.ts
import { Controller, Get,Param } from '@nestjs/common';
import { MoviesService } from './movies.service';
@Controller('movies')
export class MoviesController {
  constructor(private readonly movies : MoviesService) {}
  
  @Get('popular')
  async popular() {
    return this.movies.popular();
  }

  @Get('now-playing')
  async nowPlaying() {
    return this.movies.nowPlaying(); 
  }

  @Get(':id')
  async details(@Param('id') id: number) {
    return this.movies.details(id);
  }
}
