import { Exclude } from "class-transformer";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Student } from "./students.entity";

@Entity("responsibles")
export class Responsibles {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ default: "responsible" })
  type: string;

  @CreateDateColumn({ type: "date" })
  createdAt: Date;

  @UpdateDateColumn({ type: "date" })
  updatedAt: Date;

  @OneToMany(() => Student, (student) => student.responsibles, {
    eager: true,
    onDelete: "CASCADE",
  })
  student: Student[];
}
