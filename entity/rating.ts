import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Products } from "./products";

@Entity()
export class Rating {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("double precision", { default: 0 })
  rate: number;

  @Column({ default: 0 })
  count: number;

  @OneToOne(() => Products, (products) => products.rating)
  product: Products;
}
