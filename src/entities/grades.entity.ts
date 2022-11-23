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

@Entity("grades")
export class Grades {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  matter: string;

  @Column({ type: "decimal", precision: 4, scale: 2 })
  grade: number;

  @CreateDateColumn({ type: "date" })
  createdAt: Date;

  @UpdateDateColumn({ type: "date" })
  updatedAt: Date;

  @ManyToMany(() => Student, (student) => student.grades, {
    eager: true,
    onDelete: "CASCADE",
  })
  @JoinTable()
  student: Student[];
}
