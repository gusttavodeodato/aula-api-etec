/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 * @typedef {import('typeorm').QueryRunner} QueryRunner
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class Db1776565077609 {
    name = 'Db1776565077609'

    /**
     * @param {QueryRunner} queryRunner
     */
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "tb_premiacoes" ("id" SERIAL NOT NULL, "name_premiacao" character varying(30) NOT NULL, "valor_premio" numeric NOT NULL, "created_at" date NOT NULL DEFAULT now(), "deleted_at" date, CONSTRAINT "PK_1760854c54e386232d6d8199083" PRIMARY KEY ("id"))`);
    }

    /**
     * @param {QueryRunner} queryRunner
     */
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "tb_premiacoes"`);
    }
}
