import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id_user!: number;
  @Column()
  name!: string;
  @Column()
  user!: string;
  @Column()
  password!: string;
  @Column()
  email!: string;
}
