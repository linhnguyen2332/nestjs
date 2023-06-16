import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
  Category,
} from '../entities/entities';

@Injectable()
export class ActorService {
  constructor(
    @InjectRepository(Actor)
    private actorRepository: Repository<Actor>,
  ) // @InjectRepository(Film)
  // private filmRepository: Repository<Film>,
  // @InjectRepository(Inventory)
  // private readonly inventoryRepository: Repository<Inventory>,
  // @InjectRepository(Rental)
  // private readonly rentalRepository: Repository<Rental>,
  // @InjectRepository(Category)
  // private readonly categoryRepository: Repository<Rental>,
  // @InjectRepository(FilmCategory)
  // private readonly filmCategoryRepository: Repository<Rental>,
  {}

  async getAverageRentalDurationByActorAndCategory(): Promise<any[]> {
    const query = `
      SELECT a.actor_id, c.name AS category_name, AVG(DATEDIFF(r.return_date, r.rental_date)) AS avg_rental_duration
      FROM actor a
      JOIN film_actor fa ON a.actor_id = fa.actor_id
      JOIN film_category fc ON fa.film_id = fc.film_id
      JOIN category c ON fc.category_id = c.category_id
      JOIN inventory i ON fc.film_id = i.film_id
      JOIN rental r ON i.inventory_id = r.inventory_id
      WHERE a.actor_id IN (
        SELECT fa.actor_id
        FROM film_actor fa
        JOIN film_category fc ON fa.film_id = fc.film_id
        GROUP BY fa.actor_id
        HAVING COUNT(DISTINCT fc.category_id) > 0
      )
      GROUP BY a.actor_id, c.category_id;
    `;

    return this.actorRepository.query(query);
  }

  async findActors(): Promise<Actor[]> {
    return this.actorRepository
      .createQueryBuilder('actor')
      .distinct(true)
      .select(['actor.first_name', 'actor.last_name'])
      .innerJoin('actor.filmActors', 'filmActor')
      .innerJoin('filmActor.film', 'film')
      .where('film.rating = :rating', { rating: 'PG-13' })
      .andWhere('film.length > :length', { length: 120 })
      .andWhere((qb) => {
        const subQuery = qb
          .subQuery()
          .select('filmActor.actor_id')
          .from(FilmActor, 'filmActor')
          .innerJoin('filmActor.film', 'film')
          .where('film.rating = :rating', { rating: 'R' })
          .andWhere('film.length < :length', { length: 90 })
          .getQuery();
        return 'actor.actor_id IN ' + subQuery;
      })
      .getRawMany();
  }

  async getActorsWithFilmCount(): Promise<any[]> {
    const subQuery = this.actorRepository
      .createQueryBuilder('actor')
      .select('actor.actor_id')
      .innerJoin('film_actor', 'fa', 'fa.actor_id = actor.actor_id')
      .groupBy('actor.actor_id')
      .having('COUNT(*) > :count', { count: 20 });

    return this.actorRepository
      .createQueryBuilder('actor')
      .select(
        'CONCAT(actor.first_name, " ", actor.last_name)',
        'full_name_actor',
      )
      .from('(' + subQuery.getQuery() + ')', 'data')
      .innerJoin('actor', 'a', 'a.actor_id = data.actor_id')
      .getRawMany();
  }
}
