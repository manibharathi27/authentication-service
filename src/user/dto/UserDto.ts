import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'users'})
export class UserDto {
    @PrimaryGeneratedColumn({name: 'id'})
    id: number;

    @Column({name: 'user_name'})
    userName: string;

    @Column({name: 'password'})
    password: string;

    @Column({name: 'email_id'})
    emailId: string;

    @Column({name: 'phone_number'})
    phoneNumber: string;

    @Column({ name: 'is_active', default: true })
    isActive: boolean;
}