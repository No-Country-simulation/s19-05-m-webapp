import { Column, Entity,JoinColumn,ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Shopping } from "./Shopping.entity";


@Entity()
export class Checkout {

    @PrimaryGeneratedColumn()
    id_checkout!: number;

    @Column()
    status!: string;

    @Column()
    date_checkout!: Date;

    @Column()
    shopping_user!: number;
    
    @Column()
    shopping_products!: number;

    @ManyToOne(() => Shopping)
    @JoinColumn([
        { name: "shopping_user", referencedColumnName: "user_id" },
        { name: "shopping_products", referencedColumnName: "products_id" }
    ])
    shopping!: Shopping[];

}