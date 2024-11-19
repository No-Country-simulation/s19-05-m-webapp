import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export const enum UserStatus {
  "active",
  "inactive",
  "pending",
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId!: string;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  active!: UserStatus;

  @Column()
  address!: string;

  @Column()
  phone!: number;

  @Column()
  role!: string;
}
