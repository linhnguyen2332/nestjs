import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("idx_unique_manager", ["managerStaffId"], { unique: true })
@Index("idx_fk_address_id", ["addressId"], {})
@Entity("store", { schema: "sakila" })
export class Store {
  @PrimaryGeneratedColumn({ type: "tinyint", name: "store_id", unsigned: true })
  storeId: number;

  @Column("tinyint", { name: "manager_staff_id", unique: true, unsigned: true })
  managerStaffId: number;

  @Column("smallint", { name: "address_id", unsigned: true })
  addressId: number;

  @Column("timestamp", {
    name: "last_update",
    default: () => "CURRENT_TIMESTAMP",
  })
  lastUpdate: Date;
}
