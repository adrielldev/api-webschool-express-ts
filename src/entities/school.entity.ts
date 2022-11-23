import { Exclude } from "class-transformer";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Address } from "./address.entity";
import { Team } from "./teams.entiy";

@Entity("schools")
export class School {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ length: 150 })
  name: string;

  @Column({ length: 200, unique: true })
  email: string;

  @Column({ length: 150 })
  @Exclude()
  password: string;

  @Column({ default: "school" })
  type: string;

  @Column({ length: 56 })
  director: string;

  @OneToOne(() => Address, { eager: true, onDelete: "CASCADE" })
  @JoinColumn()
  address: Address;

  @OneToMany(() => Team, (team) => team.school, {
    eager: true,
    onDelete: "CASCADE",
  })
  teams: Team[];
}
