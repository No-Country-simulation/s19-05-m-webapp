import { Column, Entity,JoinColumn,ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Shopping } from "./Shopping.entity";

export enum StatusCheckout {
    PENDING = "PENDING",
    PAID = "PAID",
    CANCELED = "CANCELED",    
}

@Entity()
export class Checkout {

    @PrimaryGeneratedColumn()
    id_checkout!: number;

    @Column({
        type: "enum",
        enum: StatusCheckout,
        default: StatusCheckout.PENDING,
    })
    status!: StatusCheckout;

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