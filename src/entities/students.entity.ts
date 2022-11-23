import { Exclude } from "class-transformer";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Activities } from "./activities.entity";
import { Feedback } from "./feedbacks.entity";
import { Grades } from "./grades.entity";
import { Responsibles } from "./responsible.entity";
import { Team } from "./teams.entiy";

@Entity("students")
export class Student {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ length: 150 })
  name: string;

  @Column({ length: 200, unique: true })
  email: string;

  @Column({ length: 150 })
  @Exclude()
  password: string;

  @Column({ default: "student" })
  type: string;

  @Column({ length: 50, unique: true })
  registration: string;

  @Column({ length: 25 })
  shift: string;

  @CreateDateColumn({ type: "date" })
  createdAt: Date;

  @UpdateDateColumn({ type: "date" })
  updatedAt: Date;

  @ManyToOne(() => Team, { onDelete: "SET NULL" })
  team: Team;

  @OneToMany(() => Feedback, (feedback: Feedback) => feedback.student, {
    eager: true,
    onDelete: "SET NULL",
  })
  feedbacks: Feedback[];

  @ManyToOne(() => Responsibles, { onDelete: "SET NULL" })
  responsibles: Responsibles;

  @ManyToMany(() => Grades, (grades) => grades.student)
  grades: Grades[];

  @ManyToMany(() => Activities, (activities) => activities.student)
  activities: Activities[];
}
