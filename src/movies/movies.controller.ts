// movies/movies.controller.ts
import { Controller, Get,HttpException,HttpStatus,Param, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
@Controller('movies')
export class MoviesController {
  constructor(private readonly movies : MoviesService) {}

  @Get('ChangeLanguage')
  async ChangeLanguage(@Query('language') language: string) {
    try {
      return this.movies.ChangeLanguage(language);
    } catch (error) {
      throw new HttpException("Failed to change language", error.message);
    }
  }
  
  
  @Get('popular')
  async popular() {
    try {
      return this.movies.popular();
    } catch (error) {
       throw new HttpException("Failed to fetch movies", error.message);
    }
  }

  @Get('now-playing')
  async nowPlaying() {
    try {
    return this.movies.nowPlaying(); 
    } catch (error) {
      throw new HttpException("Failed to fetch movies", error.message);
    }
  }

  @Get('details/:id')
  async details(@Param('id') id: number) {
    try {
    return this.movies.details(id);
    } catch (error) {
      throw new HttpException("Failed to fetch movie details", error.message);
    }
  }

  @Get('search/:query')
  async getSearchMovie(@Param('query') query: string) {
    try {
      return this.movies.getSearchMovie(query);
    } catch (error) {
      throw new HttpException("Failed to search movies", error.message);
    }
  }
}
