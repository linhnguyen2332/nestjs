import { Controller, Get, Query, Post, Put } from '@nestjs/common';
import { FilmService } from '../services/film.service';

@Controller('films')
export class FilmController {
  constructor(private filmService: FilmService) {}

  @Get('all-titles')
  async getAllFilms() {
    const films = await this.filmService.getAllFilms();
    const titles = films.map((film) => film.title);
    return titles;
  }

  @Get('rate-and-cost')
  async getAllFilmsWithRatesAndCosts() {
    return this.filmService.getAllFilmsWithRatesAndCosts();
  }

  @Get('top-rental')
  async getTopFilmsWithRentalCount(
    @Query('limit') limit: number,
  ): Promise<any[]> {
    return this.filmService.getTopFilmsWithRentalCount(limit);
  }

  @Put('update-rental-duration')
  async updateRentalDuration(): Promise<void> {
    return this.filmService.updateFilmRentalDuration();
  }

  @Put('update-rental-rate')
  async updateRentalRate(): Promise<void> {
    await this.filmService.updateFilmRentalRate();
  }
}
