import {MigrationInterface, QueryRunner} from "typeorm";

export class community1649386696146 implements MigrationInterface {
    name = 'community1649386696146'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "community" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "phone" character varying NOT NULL, "location" character varying NOT NULL, "city" character varying NOT NULL, "cep" character varying NOT NULL, "latitude" integer NOT NULL, "email" character varying NOT NULL, "banner" character varying NOT NULL, "photo" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "adminId" integer, CONSTRAINT "REL_c82fe9d81fd4c5acc6c98b40fe" UNIQUE ("adminId"), CONSTRAINT "PK_cae794115a383328e8923de4193" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD "communityId" integer`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_9da479465ea980eca3c3d5f4cea" FOREIGN KEY ("communityId") REFERENCES "community"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "community" ADD CONSTRAINT "FK_c82fe9d81fd4c5acc6c98b40fe2" FOREIGN KEY ("adminId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "community" DROP CONSTRAINT "FK_c82fe9d81fd4c5acc6c98b40fe2"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_9da479465ea980eca3c3d5f4cea"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "communityId"`);
        await queryRunner.query(`DROP TABLE "community"`);
    }

}
