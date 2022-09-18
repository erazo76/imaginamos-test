import {MigrationInterface, QueryRunner} from "typeorm";

export class addTimestampFields1663445581355 implements MigrationInterface {
    name = 'addTimestampFields1663445581355'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" ADD "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "order" ADD "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "updateAt"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "createAt"`);
    }

}
