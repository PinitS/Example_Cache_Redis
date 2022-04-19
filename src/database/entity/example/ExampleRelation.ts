import { Example } from "./Example";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";

@Entity()
export class ExampleRelation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  exampleId: number;

  @ManyToOne(() => Example, (example) => example.exampleRelations, {
    onDelete: "CASCADE",
  })
  example: Example;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
