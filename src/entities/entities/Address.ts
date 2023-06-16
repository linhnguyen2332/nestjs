import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("idx_fk_city_id", ["cityId"], {})
@Entity("address", { schema: "sakila" })
export class Address {
  @PrimaryGeneratedColumn({
    type: "smallint",
    name: "address_id",
    unsigned: true,
  })
  addressId: number;

  @Column("varchar", { name: "address", length: 50 })
  address: string;

  @Column("varchar", { name: "address2", nullable: true, length: 50 })
  address2: string | null;

  @Column("varchar", { name: "district", length: 20 })
  district: string;

  @Column("smallint", { name: "city_id", unsigned: true })
  cityId: number;

  @Column("varchar", { name: "postal_code", nullable: true, length: 10 })
  postalCode: string | null;

  @Column("varchar", { name: "phone", length: 20 })
  phone: string;

  @Column("timestamp", {
    name: "last_update",
    default: () => "CURRENT_TIMESTAMP",
  })
  lastUpdate: Date;
}
