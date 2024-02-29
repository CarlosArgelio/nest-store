import { MigrationInterface, QueryRunner } from 'typeorm';

export class modifyFieldsProducts1709245889076 implements MigrationInterface {
  name = 'modifyFieldsProducts1709245889076';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `COMMENT ON COLUMN "brand_model"."createdAt" IS NULL`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "category_model"."createdAt" IS NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_model" DROP COLUMN "createdAt"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_model" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_model" DROP COLUMN "updatedAt"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_model" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "costumer_model"."createdAt" IS NULL`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "user_model"."createdAt" IS NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `COMMENT ON COLUMN "user_model"."createdAt" IS NULL`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "costumer_model"."createdAt" IS NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_model" DROP COLUMN "updatedAt"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_model" ADD "updatedAt" TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_model" DROP COLUMN "createdAt"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_model" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "category_model"."createdAt" IS NULL`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "brand_model"."createdAt" IS NULL`,
    );
  }
}
