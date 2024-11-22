import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
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

  @OneToOne(() => User, (user) => user.role)
  users!: User;
}
