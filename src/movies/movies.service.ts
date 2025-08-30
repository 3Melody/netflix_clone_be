// movies.service.ts
import { Injectable } from '@nestjs/common';
import { TmdbService } from '../data/tmdb.service';

@Injectable()
export class MoviesService {
  constructor(private readonly tmdb: TmdbService) {}

  ChangeLanguage(language: string) {
    this.tmdb.changeLanguage(language);
    return { message: `Language changed to ${language}` };
  }

  async popular() {
    const data = await this.tmdb.getPopular();
    // แปลง TMDb raw response → card format
    return data.results.map(movie => ({
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      posterUrl: movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : null,
    }));
  }

  async nowPlaying() {
    const data = await this.tmdb.getNowPlaying();
    // แปลง TMDb raw response → card format
    return data.results.map(movie => ({
      id: movie.id,
      title: movie.title,
      posterUrl: movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : null,
    }));
  }

    async details(id: number) {
      const data = await this.tmdb.getDetails(id);
      
      return {
        id: data.id,
        title: data.title,
        posterUrl: data.poster_path
          ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
          : null,
        overview: data.overview,
        releaseDate: data.release_date,
        rating: data.vote_average,
        production_companies: data.production_companies,
        original_language: data.original_language,
      };
    }

    async getSearchMovie(query: string) {
      const data = await this.tmdb.getSearchMovie(query);
      return data.results.map(movie => ({
        id: movie.id,
        title: movie.title,
        posterUrl: movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : null,
      }));
    }
}
