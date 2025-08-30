// data/tmdb.service.ts
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class TmdbService {
  private readonly key: any;
  private readonly baseUrlMVDB: any;

  constructor(
    private readonly http: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.key = this.configService.get<string>('TMDB_API_KEY');
    this.baseUrlMVDB = this.configService.get<string>('TMDB_BASE_URL');
  }

  private keyword: string;
  private langeuage: string;
  private genreId: number;

  
  param() {
    if (this.keyword) {
      return { api_key: this.key, query: this.keyword , language: this.langeuage || 'en-US'};
    } else if (this.genreId) {
      return { api_key: this.key , language: this.langeuage || 'en-US' , with_genres: this.genreId };
    } else {
      return { api_key: this.key , language: this.langeuage || 'en-US' };
    }
  }

  private async tmdbGetParams(path: string) {
    const res = await firstValueFrom(
      this.http.get(`${this.baseUrlMVDB}${path}`, {
        params: this.param(),
      }),
    );
    return res.data;
  }

  async changeLanguage(language: string) {
    this.langeuage = language;
  }

  async getPopular( ) {
    return this.tmdbGetParams('/movie/popular');
  }

  async getNowPlaying() {
    return this.tmdbGetParams('/movie/now_playing');
  }

  async getDetails(id: number) {
    return this.tmdbGetParams(`/movie/${id}`);
  }

  async getSearchMovie(query: string) {
    this.keyword = query;
    return this.tmdbGetParams('/search/movie');
  }

  async getTopRated() {
    return this.tmdbGetParams('/movie/top_rated');
  }

  async getGenres() {
    return this.tmdbGetParams('/genre/movie/list');
  }

  async getMovieByGenre(genreId: number) {
    this.genreId = genreId;
    this.keyword = '';
    return this.tmdbGetParams('/discover/movie');
  }

  async getMovieVideos(id: number) {
    return this.tmdbGetParams(`/movie/${id}/videos`);
  }
}
