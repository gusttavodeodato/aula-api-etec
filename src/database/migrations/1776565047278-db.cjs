/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 * @typedef {import('typeorm').QueryRunner} QueryRunner
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class Db1776565047278 {
    name = 'Db1776565047278'

    /**
     * @param {QueryRunner} queryRunner
     */
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "tb_generos" ("id" SERIAL NOT NULL, "name_genero" character varying(60) NOT NULL, "created_at" date NOT NULL DEFAULT now(), "deleted_at" date, CONSTRAINT "PK_26004d2136916f518c79a84c832" PRIMARY KEY ("id"))`);
    }

    /**
     * @param {QueryRunner} queryRunner
     */
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "tb_generos"`);
    }
}
