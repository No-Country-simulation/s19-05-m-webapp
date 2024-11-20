import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Role } from "./Role.entity";

export enum ActiveStatus {
  INACTIVE = 0,
  ACTIVE = 1,
}

@Entity() //por aca podemos ponerle "users" si queremos
export class User {
  @PrimaryColumn({
    type: "varchar",
    length: 100,
  })
  id_users!: string;

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
