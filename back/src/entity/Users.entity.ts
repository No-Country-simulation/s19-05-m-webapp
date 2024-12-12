import {
  Entity,
  Column,
  JoinColumn,
  PrimaryGeneratedColumn,
  OneToOne,
} from "typeorm";

export enum RoleName {
  ADMIN = "ADMINISTRATOR",
  CLIENT = "USER", //o cliente
}
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

  @Column({
    type: "enum",
    enum: RoleName,
    default: RoleName.CLIENT, //por default "user"
  })
  role!: RoleName;
}
