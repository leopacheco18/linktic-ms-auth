import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users', schema: 'linktic' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: 'buyer' })
  role: string;
}
