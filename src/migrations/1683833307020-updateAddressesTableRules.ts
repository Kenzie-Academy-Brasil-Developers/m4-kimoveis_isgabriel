import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateAddressesTableRules1683833307020 implements MigrationInterface {
    name = 'UpdateAddressesTableRules1683833307020'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" ALTER COLUMN "number" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" ALTER COLUMN "number" SET NOT NULL`);
    }

}
