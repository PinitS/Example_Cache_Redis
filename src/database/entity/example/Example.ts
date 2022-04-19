import { ExampleRelation } from "./ExampleRelation";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
  AfterLoad,
} from "typeorm";

@Entity()
export class Example {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  firstName: string;

  @Column()
  lastName: string;

  fullName: string;

  @AfterLoad()
  setComputed() {
    this.fullName = this.firstName + ' ' + this.lastName;
  }

  @OneToMany(
    () => ExampleRelation,
    (exampleRelation) => exampleRelation.example,
    {
      cascade: true,
    }
  )
  exampleRelations: ExampleRelation[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
