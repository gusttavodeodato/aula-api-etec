/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 * @typedef {import('typeorm').QueryRunner} QueryRunner
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class Db1776993858070 {
    name = 'Db1776993858070'

    /**
     * @param {QueryRunner} queryRunner
     */
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "tb_directors" ("id" SERIAL NOT NULL, "name" character varying(60) NOT NULL, "sex" "public"."tb_directors_sex_enum" NOT NULL, "date_nasc" date NOT NULL, "nacionality" character varying(50) NOT NULL, "photo_director" character varying(80), "created_at" date NOT NULL DEFAULT now(), "deleted_at" date, CONSTRAINT "PK_4f1f964b2c794201e5668d084f3" PRIMARY KEY ("id"))`);
    }

    /**
     * @param {QueryRunner} queryRunner
     */
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "tb_directors"`);
    }
}
