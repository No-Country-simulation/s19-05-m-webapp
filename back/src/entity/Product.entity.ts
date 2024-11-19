import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
  
@Entity()
  export class Product {
    @PrimaryGeneratedColumn()
    productId!: string;
  
    @Column()
    name!: string;
  
    @Column('float')
    price!: number;
  
    @Column()
    unitOfMeasurement!: string;
  
    @Column()
    description!: string;
  
    @Column()
    stock!: number;
  
    @Column()
    imgUrl!: string;
  
  }