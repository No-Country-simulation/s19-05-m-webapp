import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  idProduct!: number;

  @Column()
  title!: string;

  @Column("float")
  price!: number;

  @Column()
  available!: boolean;

  @Column()
  description!: string;
  
  @Column()
  type!: string;
  
  @Column()
  image!: string;
  
  @Column()
  genre!: string;

  @Column()
  stock!: number;

}
