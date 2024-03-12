import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersTable1710250807261 implements MigrationInterface {

    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE IF NOT EXISTS users
            (
                id SERIAL PRIMARY KEY NOT NULL,
                user_name VARCHAR(250) NOT NULL,
                password VARCHAR(250) NOT NULL,
                email_id VARCHAR(250) NOT NULL,
                phone_number VARCHAR(250) NOT NULL,
                is_email_confirmed boolean NOT NULL DEFAULT false,
                is_active boolean NOT NULL DEFAULT true
            );`
        )
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `DROP TABLE "users"`
        )
    }

}
