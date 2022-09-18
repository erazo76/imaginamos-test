import {MigrationInterface, QueryRunner} from "typeorm";

export class createRelations1663449821612 implements MigrationInterface {
    name = 'createRelations1663449821612'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "technicId"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "technicId" integer`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_caabe91507b3379c7ba73637b84" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_d3412a9db8ad398d70831c2c21c" FOREIGN KEY ("technicId") REFERENCES "technic"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_d3412a9db8ad398d70831c2c21c"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_caabe91507b3379c7ba73637b84"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "technicId"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "technicId" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "userId" character varying(255) NOT NULL`);
    }

}
