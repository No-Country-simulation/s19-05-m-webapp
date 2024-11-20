import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Role } from "./Role.entity";

export enum ActiveStatus {
  INACTIVE = 0,
  ACTIVE = 1,
}

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
    type: "tinyint",
  })
  active!: ActiveStatus;

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

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: "role_id" })
  role!: Role;
}
