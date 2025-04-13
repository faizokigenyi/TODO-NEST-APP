import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TaskEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 96,
    nullable: false,
    // unique: true,
  })
  title: string;

  @Column({
    type: 'varchar',
    length: 256,
    nullable: false,
  })
  description: string;

  @Column({ type: 'boolean', nullable: false })
  completed: boolean;

  @Column()
  priority: 'low' | 'medium' | 'high';
}
