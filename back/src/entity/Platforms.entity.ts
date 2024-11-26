import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product.entity";

@Entity()
export class Platforms {

    @PrimaryGeneratedColumn()
    id_platform!: number;

    @Column({ length: 50 })
    name: string;
    
    @Column({ length: 50 })
    model: string;

    @ManyToOne(() => Product, (product) => product.id_product)
    @JoinColumn({ name: "product"})
    product: Product;

}