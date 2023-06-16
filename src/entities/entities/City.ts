import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("idx_fk_country_id", ["countryId"], {})
@Entity("city", { schema: "sakila" })
export class City {
  @PrimaryGeneratedColumn({ type: "smallint", name: "city_id", unsigned: true })
  cityId: number;

  @Column("varchar", { name: "city", length: 50 })
  city: string;

  @Column("smallint", { name: "country_id", unsigned: true })
  countryId: number;

  @Column("timestamp", {
    name: "last_update",
    default: () => "CURRENT_TIMESTAMP",
  })
  lastUpdate: Date;
}
