
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository  } from 'typeorm';
import {
  Film,
  Actor,
  Customer,
  FilmActor,
  FilmCategory,
  FilmText,
  Inventory,
  Payment,
  Rental,
} from '../entities/entities';


@Injectable()
export class FilmService {
  constructor(
    @InjectRepository(Film)
    private filmRepository: Repository<Film>,
    // @InjectRepository(Inventory)
    // private readonly inventoryRepository: Repository<Inventory>,
    // @InjectRepository(Rental)
    // private readonly rentalRepository: Repository<Rental>,
  ) {}

  async getAllFilms(): Promise<Film[]> {
    return this.filmRepository.find();
  }
  async getAllFilmsWithRatesAndCosts(): Promise<
    { title: string; rentalRate: string; replacementCost: string }[]
  > {
    return this.filmRepository.find({
      select: ['title', 'rentalRate', 'replacementCost'],
    });
  }

  async getTopFilmsWithRentalCount(limit: number): Promise<any[]> {
    const query = this.filmRepository
      .createQueryBuilder('film')
      .leftJoinAndSelect('film.inventories', 'inventory')
      .leftJoinAndSelect('inventory.rentals', 'rental')
      .select('film.title', 'Films')
      .addSelect('COUNT(rental.rental_id)', 'Number of rentals')
      .groupBy('film.title')
      .orderBy('COUNT(rental.rental_id)', 'DESC')
      .limit(limit);

    return query.getRawMany();
  }

  async updateFilmRentalDuration(): Promise<void> {
    await this.filmRepository
      .createQueryBuilder()
      .update(Film)
      .set({ rentalDuration: () => 'ROUND(rental_duration * 1.1)' })
      .where(
        'film_id IN ' +
          '(SELECT film_id FROM rental GROUP BY film_id HAVING COUNT(rental_id) > 5)',
      )
      .execute();
  }

  async updateFilmRentalRate(): Promise<void> {
    const query = `
      UPDATE film
      SET rental_rate = LEAST(rental_rate * 1.05, 4.00)
      WHERE film_id IN (
        SELECT inventory.film_id
        FROM rental
        JOIN inventory ON rental.inventory_id = inventory.inventory_id
        GROUP BY inventory.film_id
        HAVING COUNT(DISTINCT rental.customer_id) > 10
      )
    `;

    await this.filmRepository.query(query);
  }

  
}


