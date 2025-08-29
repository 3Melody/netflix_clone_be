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
  param() {
    if (this.keyword) {
      return { api_key: this.key, query: this.keyword };
    } else {
      return { api_key: this.key };
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

  async getPopular() {
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
}
