import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product.entity";

@Entity()
export class Platforms {
  @PrimaryGeneratedColumn()
  id_platform!: number;

  @Column({ length: 50 /* unique: true */ }) //pa que no se repitan los nombres
  name: string;

  @Column({ length: 50 })
  model: string;

  @ManyToMany(() => Product, (product) => product.platforms)
  products!: Product[];
}
