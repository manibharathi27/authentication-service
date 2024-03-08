import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'users'})
export class UserDto {
    @ApiProperty({
        description: 'Unique Id of the User',
        required: true
     })
    @PrimaryGeneratedColumn({name: 'id'})
    id: number;

    @ApiProperty({
        description: 'User name of the User',
        required: true
     })
    @Column({name: 'user_name'})
    userName: string;

    @ApiProperty({
        description: 'password of the User',
        required: true
     })
    @Column({name: 'password'})
    password: string;

    @ApiProperty({
        description: 'email id of the User',
        required: true
     })
    @Column({name: 'email_id'})
    emailId: string;

    @ApiProperty({
        description: 'phone number of the User',
        required: true
     })
    @Column({name: 'phone_number'})
    phoneNumber: string;

    @ApiProperty({
        description: 'active flag of the User'
     })
    @Column({ name: 'is_active', default: true })
    isActive: boolean;
}