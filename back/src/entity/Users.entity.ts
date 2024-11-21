import {
  Entity,
  Column,
  JoinColumn,
  PrimaryGeneratedColumn,
  OneToOne,
} from "typeorm";
import { Role } from "./Role.entity";

@Entity() //por aca podemos ponerle "users" si queremos
export class User {
  @PrimaryGeneratedColumn()
  id_users!: number;

  @Column({
    type: "varchar",
    length: 45,
  })
  name!: string;

  @Column({
    type: "varchar",
    length: 45,
  })
  email!: string;

  @Column({
    default: true,
  })
  active!: boolean;

  @Column({
    type: "varchar",
    length: 50,
  })
  address!: string;

  @Column({
    type: "varchar",
    length: 20,
  })
  phone!: string;

  @OneToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: "role" })
  role!: Role;
}
