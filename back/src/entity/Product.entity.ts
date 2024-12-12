import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Platforms } from "./Platforms.entity";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id_product!: number;

  @Column({ length: 45 })
  title!: string;

  @Column("float")
  price!: number;

  @Column({ default: true })
  available!: boolean;

  @Column()
  description!: string;

  @Column({ length: 20 })
  type!: string;

  @Column()
  image!: string;

  @Column({ length: 20 })
  genre!: string;

  @Column("integer")
  stock!: number;

  @ManyToMany(() => Platforms, (platform) => platform.products, {
    cascade: true, //cascade hace que se actualice la relacion cuando se actualice el product
  })
  @JoinTable({
    name: "product_platform", //tbla intermedia automatica de typeorm
    joinColumn: {
      name: "product_id",
      referencedColumnName: "id_product",
    },
    inverseJoinColumn: {
      name: "platform_id",
      referencedColumnName: "id_platform",
    },
  })
  platforms!: Platforms[];
}
