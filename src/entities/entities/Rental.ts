import { Column, Entity, Index, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Inventory, Customer, Payment } from "./";
@Index('rental_date', ['rentalDate', 'inventoryId', 'customerId'], {
  unique: true,
})
@Index('idx_fk_inventory_id', ['inventoryId'], {})
@Index('idx_fk_customer_id', ['customerId'], {})
@Index('idx_fk_staff_id', ['staffId'], {})
@Entity('rental', { schema: 'sakila' })
export class Rental {
  @PrimaryGeneratedColumn({ type: 'int', name: 'rental_id' })
  rentalId: number;

  @Column('datetime', { name: 'rental_date' })
  rentalDate: Date;

  @Column('mediumint', { name: 'inventory_id', unsigned: true })
  inventoryId: number;

  @Column('smallint', { name: 'customer_id', unsigned: true })
  customerId: number;

  @Column('datetime', { name: 'return_date', nullable: true })
  returnDate: Date | null;

  @Column('tinyint', { name: 'staff_id', unsigned: true })
  staffId: number;

  @Column('timestamp', {
    name: 'last_update',
    default: () => 'CURRENT_TIMESTAMP',
  })
  lastUpdate: Date;

  @ManyToOne(() => Inventory, (inventory) => inventory.rentals)
  @JoinColumn({ name: 'inventory_id' })
  inventory: Inventory;

  @ManyToOne(() => Customer, (customer) => customer.rentals)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @OneToMany(() => Payment, (payment) => payment.rental)
  payments: Payment[];
}
