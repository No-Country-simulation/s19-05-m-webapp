import { Column, Entity,Index,JoinColumn,ManyToOne, PrimaryColumn } from "typeorm";
import { Shopping } from "./Shopping.entity";

export enum StatusCheckout {
    PAID = "PAID",
    DECLINED = "DECLINED",
    PENDING = "PENDING"    
}

@Entity()
@Index(["id_checkout", "shopping_user", "shopping_products"], { unique: true })
export class Checkout {

    @PrimaryColumn()
    id_checkout!: string;

    @Column({
        type: "enum",
        enum: StatusCheckout
    })
    status!: StatusCheckout;

    @Column()
    date_checkout!: Date;

    @PrimaryColumn()
    shopping_user!: number;
    
    @PrimaryColumn()
    shopping_products!: number;

    @ManyToOne(() => Shopping, { eager: true })
    @JoinColumn([
        { name: "shopping_user", referencedColumnName: "user_id" },
        { name: "shopping_products", referencedColumnName: "products_id" }
    ])
    shopping!: Shopping;

}