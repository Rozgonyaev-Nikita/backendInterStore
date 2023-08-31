import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Rating } from "./rating";

@Entity()
export class Products {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: "Default Title" })
  title: string;

  @Column({ default: "Default Description" })
  description: string;

  @Column("double precision", { default: 0 })
  price: number;

  @Column({ default: "other" })
  // category: Category;
  category: string;

  @Column({ nullable: true })
  image: string;

  // @Column({ nullable: true })
  // rating: Rating;

  @OneToOne(() => Rating)
  @JoinColumn()
  rating: Rating;
}
