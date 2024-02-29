import {MigrationInterface, QueryRunner} from "typeorm";

export class alterNameField1709246075457 implements MigrationInterface {
    name = 'alterNameField1709246075457'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_model" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "product_model" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "product_model" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "product_model" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`COMMENT ON COLUMN "brand_model"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "category_model"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "costumer_model"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "user_model"."createdAt" IS NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "user_model"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "costumer_model"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "category_model"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "brand_model"."createdAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "product_model" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "product_model" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "product_model" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "product_model" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`);
    }

}
