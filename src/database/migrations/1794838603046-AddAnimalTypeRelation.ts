import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAnimalTypeRelation1794838603046 implements MigrationInterface {
    name = 'AddAnimalTypeRelation1794838603046'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pet_supplies" RENAME COLUMN "petCategory" TO "animal_type_id"`);
        await queryRunner.query(`ALTER TYPE "public"."pet_supplies_petcategory_enum" RENAME TO "pet_supplies_animal_type_id_enum"`);
        await queryRunner.query(`CREATE TABLE "animal_types" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, CONSTRAINT "UQ_c2244fb7e3ec29cf951533563ac" UNIQUE ("name"), CONSTRAINT "PK_c4dd2b1389ccbade422c3d9a2f4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "pet_supplies" DROP COLUMN "animal_type_id"`);
        await queryRunner.query(`ALTER TABLE "pet_supplies" ADD "animal_type_id" uuid`);
        await queryRunner.query(`ALTER TABLE "pet_supplies" ADD CONSTRAINT "FK_71dacfb770aba6bda5d04ad5c0b" FOREIGN KEY ("animal_type_id") REFERENCES "animal_types"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pet_supplies" DROP CONSTRAINT "FK_71dacfb770aba6bda5d04ad5c0b"`);
        await queryRunner.query(`ALTER TABLE "pet_supplies" DROP COLUMN "animal_type_id"`);
        await queryRunner.query(`ALTER TABLE "pet_supplies" ADD "animal_type_id" "public"."pet_supplies_animal_type_id_enum" NOT NULL`);
        await queryRunner.query(`DROP TABLE "animal_types"`);
        await queryRunner.query(`ALTER TYPE "public"."pet_supplies_animal_type_id_enum" RENAME TO "pet_supplies_petcategory_enum"`);
        await queryRunner.query(`ALTER TABLE "pet_supplies" RENAME COLUMN "animal_type_id" TO "petCategory"`);
    }

}
