import {
  Entity,
  Column,
  JoinColumn,
  PrimaryGeneratedColumn,
  OneToOne,
} from "typeorm";
import { Role } from "./Role.entity";

@Entity()
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
    type: "varchar",
    length: 100, // Longitud suficiente para un hash (e.g., bcrypt)
  })
  password!: string;

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

  @OneToOne(() => Role, (role) => role.id_role)
  @JoinColumn({ name: "role" })
  role!: Role;
}
