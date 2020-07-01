import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Task } from "../tasks/task.entity";

@Entity()
@Unique(['username']) // Columns that should have unique values
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    salt: string;

    // Users can have many task
    // when eager is true, the array of task belonging to one user
    // can be retrieved with user.tasks
    // only one side of the relationship can be eager (in User, eager must be false) 
    @OneToMany(type => Task, task => task.user, {eager: true})
    tasks: Task[]

    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
    }
}