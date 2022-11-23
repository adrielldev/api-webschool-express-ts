import { Exclude } from "class-transformer";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { teamSchema } from "../schemas/team.schema";
import { Feedback } from "./feedbacks.entity";
import { Team } from "./teams.entiy";

@Entity("teachers")
export class Teacher {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ length: 150 })
  name: string;

  @Column({ length: 200, unique: true })
  email: string;

  @Column({ length: 150 })
  @Exclude()
  password: string;

  @Column({ default: "teacher" })
  type: string;

  @Column({ length: 25 })
  shift: string;

  @Column({ length: 50 })
  matter: string;

  @ManyToMany(() => Team, (teams) => teams.teachers)
  @JoinTable()
  teams: Team[];

  @CreateDateColumn({ type: "date" })
  createdAt: Date;

  @UpdateDateColumn({ type: "date" })
  updatedAt: Date;

  @OneToMany(() => Feedback, (feedback) => feedback.teacher, {
    onDelete: "SET NULL",
  })
  feedbacks: Feedback[];
}
