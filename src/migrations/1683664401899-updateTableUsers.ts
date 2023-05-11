import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTableUsers1683664401899 implements MigrationInterface {
    name = "UpdateTableUsers1683664401899";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "users" RENAME COLUMN "nome" TO "name"`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "users" RENAME COLUMN "name" TO "nome"`
        );
    }
}
