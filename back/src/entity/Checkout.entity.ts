import { Column, Entity,JoinColumn,ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Shopping } from "./Shopping.entity";

export enum StatusCheckout {
    PAID = "PAID",
    DECLINED = "DECLINED",    
}

@Entity()
export class Checkout {

    @PrimaryGeneratedColumn()
    id_checkout!: number;

    @Column({
        type: "enum",
        enum: StatusCheckout
    })
    status!: StatusCheckout;

    @Column({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
    })
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