import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("language", { schema: "sakila" })
export class Language {
  @PrimaryGeneratedColumn({
    type: "tinyint",
    name: "language_id",
    unsigned: true,
  })
  languageId: number;

  @Column("char", { name: "name", length: 20 })
  name: string;

  @Column("timestamp", {
    name: "last_update",
    default: () => "CURRENT_TIMESTAMP",
  })
  lastUpdate: Date;
}
