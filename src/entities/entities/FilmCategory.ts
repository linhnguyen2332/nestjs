import { Column, Entity, Index, ManyToOne, JoinColumn } from 'typeorm';
import { Film, Category, FilmActor } from './';
@Index('fk_film_category_category', ['categoryId'], {})
@Entity('film_category', { schema: 'sakila' })
export class FilmCategory {
  @Column('smallint', { primary: true, name: 'film_id', unsigned: true })
  filmId: number;

  @Column('tinyint', { primary: true, name: 'category_id', unsigned: true })
  categoryId: number;

  @Column('timestamp', {
    name: 'last_update',
    default: () => 'CURRENT_TIMESTAMP',
  })
  lastUpdate: Date;

  @ManyToOne(() => Film, (film) => film.filmCategories)
  @JoinColumn({ name: 'film_id' })
  film: Film;

  @ManyToOne(() => Category, (category) => category.filmCategories)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToOne(() => FilmActor, (filmActor) => filmActor.filmCategories)
  @JoinColumn({ name: 'film_id' })
  filmActor: FilmActor;
}

