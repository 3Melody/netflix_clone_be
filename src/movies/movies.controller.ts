// movies/movies.controller.ts
import { Controller, Get,HttpException,HttpStatus,Param, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
@Controller('movies')
export class MoviesController {
  constructor(private readonly movies : MoviesService) {}

  @Get('ChangeLanguage')
  async ChangeLanguage(@Query('language') language: string) {
    try {
      return  this.movies.ChangeLanguage(language);
    } catch (error) {
      throw new HttpException("Failed to change language", error.message);
    }
  }
  
  
  @Get('popular')
  async popular() {
    try {
      return await this.movies.popular();
    } catch (error) {
       throw new HttpException("Failed to fetch movies", error.message);
    }
  }

  @Get('now-playing')
  async nowPlaying() {
    try {
    return await this.movies.nowPlaying(); 
    } catch (error) {
      throw new HttpException("Failed to fetch movies", error.message);
    }
  }

  @Get('details/:id')
  async details(@Param('id') id: number) {
    try {
    return await this.movies.details(id);
    } catch (error) {
      throw new HttpException("Failed to fetch movie details", error.message);
    }
  }

  @Get('search/:query')
  async getSearchMovie(@Param('query') query: string) {
     try {
      return await this.movies.getSearchMovie(query);
    } catch (error) {
      throw new HttpException("Failed to search movies", error.message);
    }
  }

  @Get('top-rated')
  async topRated() {
    try {
      return await this.movies.topRated();
    } catch (error) {
      throw new HttpException("Failed to fetch top rated movies", error.message);
    }
  }

  @Get('genres')
  async genres() {
    try {
      return await this.movies.genres();
    } catch (error) {
      throw new HttpException("Failed to fetch genres", error.message);
    }
  }

  @Get('genres/:id')

  async moviesByGenre(@Param('id') id: number) {
    try {
      return await this.movies.getMovieByGenre(id);
    } catch (error) {
      throw new HttpException("Failed to fetch movies by genre", error.message);
    }
  }

  @Get('videos/:id')
  async movieVideos(@Param('id') id: number) {
    try {
      return await this.movies.getMovieVideos(id);
    } catch (error) {
      throw new HttpException("Failed to fetch movie videos", error.message);
    }
  }
}
