import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { User } from "./Users.entity";

export enum RoleName {
  ADMIN = "administrator",
  CLIENT = "user", //o cliente
}

@Entity() //tambien podemos asignar un nombre diferente
export class Role {
  @PrimaryGeneratedColumn()
  id_role!: number;

  @Column({
    type: "enum",
    enum: RoleName,
  })
  name!: RoleName;

  @OneToMany(() => User, (user) => user.role)
  users!: User[];
}
