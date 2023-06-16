import { Column, Entity, Index, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Payment, Rental } from "./";
@Index('idx_fk_store_id', ['storeId'], {})
@Index('idx_fk_address_id', ['addressId'], {})
@Index('idx_last_name', ['lastName'], {})
@Entity('customer', { schema: 'sakila' })
export class Customer {
  @PrimaryGeneratedColumn({
    type: 'smallint',
    name: 'customer_id',
    unsigned: true,
  })
  customerId: number;

  @Column('tinyint', { name: 'store_id', unsigned: true })
  storeId: number;

  @Column('varchar', { name: 'first_name', length: 45 })
  firstName: string;

  @Column('varchar', { name: 'last_name', length: 45 })
  lastName: string;

  @Column('varchar', { name: 'email', nullable: true, length: 50 })
  email: string | null;

  @Column('smallint', { name: 'address_id', unsigned: true })
  addressId: number;

  @Column('tinyint', { name: 'active', width: 1, default: () => "'1'" })
  active: boolean;

  @Column('datetime', { name: 'create_date' })
  createDate: Date;

  @Column('timestamp', {
    name: 'last_update',
    default: () => 'CURRENT_TIMESTAMP',
  })
  lastUpdate: Date;
  @OneToMany(() => Payment, (payment) => payment.customer)
  payments: Payment[];

  @OneToMany(() => Rental, (rental) => rental.customer)
  rentals: Rental[];
}
