import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("informations")
export class Information {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  message: string;

  @CreateDateColumn({ type: "date" })
  createdAt: Date;

  @UpdateDateColumn({ type: "date" })
  updatedAt: Date;
}
