import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
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

  @OneToMany(() => Platforms, (platform) => platform.product)
  platforms!: Platforms[];

}
