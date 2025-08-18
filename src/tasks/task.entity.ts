import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/users/user.entity';

@Entity()
export class TaskEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 96, nullable: false })
  title: string;

  @Column({ type: 'varchar', length: 256, nullable: false })
  description: string;

  @Column({ type: 'boolean', nullable: false })
  completed: boolean;

  @Column()
  priority: 'low' | 'medium' | 'high';

  // Many tasks belong to one user
  @ManyToOne(() => User, (user) => user.tasks, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' }) // foreign key lives here
  user: User;
}
