import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from "typeorm";
import { User } from "./Users.entity";
import { Product } from "./Product.entity";
import { Checkout } from "./Checkout.entity";

export enum StateShopping {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

@Entity()
@Index(["user_id", "products_id"], { unique: true })
export class Shopping {
  @PrimaryColumn()
  user_id!: number;

  @PrimaryColumn()
  products_id!: number;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  date_shopping!: Date;

  @Column({
    type: "enum",
    enum: StateShopping,
    default: StateShopping.ACTIVE,
  })
  state!: StateShopping;

  @Column()
  quantity!: number;

  @ManyToOne(() => User, (user) => user.id_users)
  @JoinColumn({ name: "user_id" })
  users!: User;

  @ManyToOne(() => Product, (product) => product.id_product)
  @JoinColumn({ name: "products_id" })
  products!: Product;

  @OneToMany(() => Checkout, (checkout) => checkout.shopping)
  checkout!: Checkout;
}
