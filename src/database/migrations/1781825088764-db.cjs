/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 * @typedef {import('typeorm').QueryRunner} QueryRunner
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class Db1781825088764 {
    name = 'Db1781825088764'

    /**
     * @param {QueryRunner} queryRunner
     */
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "tb_profiles" ("id" SERIAL NOT NULL, "url_photo_profile" character varying(250) NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_cac11ccfa0095e6b8e201423e6a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tb_profiles" ADD CONSTRAINT "FK_93260dd4afbc13c642d51a9331b" FOREIGN KEY ("userId") REFERENCES "tb_users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    /**
     * @param {QueryRunner} queryRunner
     */
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "tb_profiles" DROP CONSTRAINT "FK_93260dd4afbc13c642d51a9331b"`);
        await queryRunner.query(`DROP TABLE "tb_profiles"`);
    }
}
