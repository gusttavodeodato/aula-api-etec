/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 * @typedef {import('typeorm').QueryRunner} QueryRunner
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class Db1776564442219 {
    name = 'Db1776564442219'

    /**
     * @param {QueryRunner} queryRunner
     */
    async up(queryRunner) {
        await queryRunner.query(`CREATE TYPE "public"."tb_users_typeuser_enum" AS ENUM('admin', 'comum')`);
        await queryRunner.query(`CREATE TABLE "tb_users" ("id" SERIAL NOT NULL, "name" character varying(80) NOT NULL, "email" character varying(50) NOT NULL, "password" character varying(20) NOT NULL, "typeUser" "public"."tb_users_typeuser_enum" NOT NULL, "createdAt" date NOT NULL DEFAULT now(), "deletedAt" date, CONSTRAINT "UQ_142ce3112f446974f1c96a5d3ff" UNIQUE ("email"), CONSTRAINT "PK_a2c23e0679749c22ffa6c2be910" PRIMARY KEY ("id"))`);
    }

    /**
     * @param {QueryRunner} queryRunner
     */
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "tb_users"`);
        await queryRunner.query(`DROP TYPE "public"."tb_users_typeuser_enum"`);
    }
}
