/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 * @typedef {import('typeorm').QueryRunner} QueryRunner
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class Db1776564917781 {
    name = 'Db1776564917781'

    /**
     * @param {QueryRunner} queryRunner
     */
    async up(queryRunner) {
        await queryRunner.query(`CREATE TYPE "public"."tb_actors_sex_enum" AS ENUM('M', 'F')`);
        await queryRunner.query(`CREATE TABLE "tb_actors" ("id" SERIAL NOT NULL, "name" character varying(60) NOT NULL, "sex" "public"."tb_actors_sex_enum" NOT NULL, "date_nasc" date NOT NULL, "nacionality" character varying(50) NOT NULL, "photo_actor" character varying(80), "created_at" date NOT NULL DEFAULT now(), "deleted_at" date, CONSTRAINT "PK_ce2e51ab9421993c97431c9713f" PRIMARY KEY ("id"))`);
    }

    /**
     * @param {QueryRunner} queryRunner
     */
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "tb_actors"`);
        await queryRunner.query(`DROP TYPE "public"."tb_actors_sex_enum"`);
    }
}
