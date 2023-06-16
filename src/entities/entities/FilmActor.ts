import { Column, Entity, Index, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Actor, Film, FilmCategory } from "./";
@Index('idx_fk_film_id', ['filmId'], {})
@Entity('film_actor', { schema: 'sakila' })
export class FilmActor {
  @Column('smallint', { primary: true, name: 'actor_id', unsigned: true })
  actorId: number;

  @Column('smallint', { primary: true, name: 'film_id', unsigned: true })
  filmId: number;

  @Column('timestamp', {
    name: 'last_update',
    default: () => 'CURRENT_TIMESTAMP',
  })
  lastUpdate: Date;

  @ManyToOne(() => Actor, (actor) => actor.filmActors)
  @JoinColumn({ name: 'actor_id' })
  actor: Actor;

  @ManyToOne(() => Film, (film) => film.filmActors)
  @JoinColumn({ name: 'film_id' })
  film: Film;

  @OneToMany(() => FilmCategory, (filmCategory) => filmCategory.filmActor)
  filmCategories: FilmCategory[];
}
