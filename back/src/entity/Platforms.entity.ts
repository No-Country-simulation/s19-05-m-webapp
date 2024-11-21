import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product.entity";

@Entity()
export class Platforms {

    @PrimaryGeneratedColumn()
    idPlatform!: number;

    @Column({ length: 50 })
    name: string;
    
    @Column({ length: 50 })
    model: string;

    @ManyToOne(() => Product, (product) => product.id_product)
    product: Product;

}