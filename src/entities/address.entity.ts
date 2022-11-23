import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("addresses")
export class Address {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ length: 2 })
  state: string;

  @Column({ length: 50 })
  city: string;

  @Column({ length: 256 })
  district: string;

  @Column({ length: 128 })
  number: string;

  @Column({ length: 8 })
  zipCode: string;
}
