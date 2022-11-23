import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { School } from "./school.entity";
import { Student } from "./students.entity";
import { Teacher } from "./teachers.entity";

@Entity("teams")
export class Team {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  name: string;

  @OneToMany(() => Student, (student) => student.team, {
    eager: true,
    onDelete: "CASCADE",
  })
  students: Student[];

  @OneToMany(()=> Teacher, (teacher)=>  teacher.name)
  teacher: Teacher[];

  @ManyToOne(() => School, { onDelete: "CASCADE" })
  school: School;

  @ManyToMany(()=> Teacher, (teachers) => teachers.teams)
  teachers: Teacher[]
}
