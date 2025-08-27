// movies.service.ts
import { Injectable } from '@nestjs/common';
import { TmdbService } from '../data/tmdb.service';

@Injectable()
export class MoviesService {
  constructor(private readonly tmdb: TmdbService) {}

  async popular() {
    const data = await this.tmdb.getPopular();
    // แปลง TMDb raw response → card format
    return data.results.map(movie => ({
      id: movie.id,
      title: movie.title,
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
        return this.tmdb.getDetails(id);
    }
}
