import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TaskEntity } from 'src/tasks/task.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 96, nullable: false })
  firstName: string;

  @Column({ type: 'varchar', length: 96, nullable: true })
  lastName: string;

  @Column({ type: 'varchar', length: 96, nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 96, nullable: false })
  password: string;

  // One user can have many tasks
  @OneToMany(() => TaskEntity, (task) => task.user)
  tasks: TaskEntity[];
}
