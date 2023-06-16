import { Column, Entity, Index, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { Film, Rental } from "./"
@Index('idx_fk_film_id', ['filmId'], {})
@Index('idx_store_id_film_id', ['storeId', 'filmId'], {})
@Entity('inventory', { schema: 'sakila' })
export class Inventory {
  @PrimaryGeneratedColumn({
    type: 'mediumint',
    name: 'inventory_id',
    unsigned: true,
  })
  inventoryId: number;

  @Column('smallint', { name: 'film_id', unsigned: true })
  filmId: number;
  @ManyToOne(() => Film, (film) => film.inventories)
  @JoinColumn({ name: 'film_id' })
  film: Film;
  @Column('tinyint', { name: 'store_id', unsigned: true })
  storeId: number;

  @Column('timestamp', {
    name: 'last_update',
    default: () => 'CURRENT_TIMESTAMP',
  })
  lastUpdate: Date;

  @Column()
  film_id: number;

  @OneToMany(() => Rental, (rental) => rental.inventory)
  rentals: Rental[];
}
