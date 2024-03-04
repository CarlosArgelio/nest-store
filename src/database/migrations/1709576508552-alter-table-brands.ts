import {MigrationInterface, QueryRunner} from "typeorm";

export class alterTableBrands1709576508552 implements MigrationInterface {
    name = 'alterTableBrands1709576508552'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "brandId" uuid`);
        await queryRunner.query(`ALTER TABLE "brands" ADD "image" character varying(255) NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "products"."created_at" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "products"."updated_at" IS NULL`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "image"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "image" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "UQ_6445f71e09c4942ed552e66d13d" UNIQUE ("image")`);
        await queryRunner.query(`COMMENT ON COLUMN "brands"."created_at" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "brands"."updated_at" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "categories"."created_at" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "categories"."updated_at" IS NULL`);
        await queryRunner.query(`ALTER TABLE "categories" DROP CONSTRAINT "UQ_85fbd016e0cef28827c19b1ae23"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "image"`);
        await queryRunner.query(`ALTER TABLE "categories" ADD "image" text`);
        await queryRunner.query(`ALTER TABLE "categories" ADD CONSTRAINT "UQ_85fbd016e0cef28827c19b1ae23" UNIQUE ("image")`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."created_at" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."updated_at" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "customers"."created_at" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "customers"."updated_at" IS NULL`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_ea86d0c514c4ecbb5694cbf57df" FOREIGN KEY ("brandId") REFERENCES "brands"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_ea86d0c514c4ecbb5694cbf57df"`);
        await queryRunner.query(`COMMENT ON COLUMN "customers"."updated_at" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "customers"."created_at" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."updated_at" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."created_at" IS NULL`);
        await queryRunner.query(`ALTER TABLE "categories" DROP CONSTRAINT "UQ_85fbd016e0cef28827c19b1ae23"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "image"`);
        await queryRunner.query(`ALTER TABLE "categories" ADD "image" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "categories" ADD CONSTRAINT "UQ_85fbd016e0cef28827c19b1ae23" UNIQUE ("image")`);
        await queryRunner.query(`COMMENT ON COLUMN "categories"."updated_at" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "categories"."created_at" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "brands"."updated_at" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "brands"."created_at" IS NULL`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "UQ_6445f71e09c4942ed552e66d13d"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "image"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "image" character varying NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "products"."updated_at" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "products"."created_at" IS NULL`);
        await queryRunner.query(`ALTER TABLE "brands" DROP COLUMN "image"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "brandId"`);
    }

}
