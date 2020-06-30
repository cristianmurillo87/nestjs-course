import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";

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
}