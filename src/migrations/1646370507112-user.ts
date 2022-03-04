import {MigrationInterface, QueryRunner} from "typeorm";

export class user1646370507112 implements MigrationInterface {
    name = 'user1646370507112'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "nickname" character varying NOT NULL, "password" character varying NOT NULL, "phone" character varying(11) NOT NULL, "email" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
