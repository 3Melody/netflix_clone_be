// movies/movies.controller.ts
import { Controller, Get,HttpException,HttpStatus,Param } from '@nestjs/common';
import { MoviesService } from './movies.service';
@Controller('movies')
export class MoviesController {
  constructor(private readonly movies : MoviesService) {}
  
  @Get('popular')
  async popular() {
    try {
      return this.movies.popular();
    } catch (error) {
       throw new HttpException("Failed to fetch movies", HttpStatus.BAD_GATEWAY);
    }
  }

  @Get('now-playing')
  async nowPlaying() {
    try {
    return this.movies.nowPlaying(); 
    } catch (error) {
      throw new HttpException("Failed to fetch movies", HttpStatus.BAD_GATEWAY);
    }
  }

  @Get('details/:id')
  async details(@Param('id') id: number) {
    try {
    return this.movies.details(id);
    } catch (error) {
      throw new HttpException("Failed to fetch movie details", HttpStatus.BAD_GATEWAY);
    }
  }
}
