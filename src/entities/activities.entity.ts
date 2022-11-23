import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Student } from "./students.entity";

@Entity("activities")
export class Activities {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  title: string;

  @Column()
  url: string;

  @CreateDateColumn({ type: "date" })
  createdAt: Date;

  @UpdateDateColumn({ type: "date" })
  updatedAt: Date;

  @ManyToMany(() => Student, (student) => student.activities, {
    eager: true,
    onDelete: "CASCADE",
  })
  @JoinTable()
  student: Student[];
}
