import { MigrationInterface, QueryRunner } from 'typeorm';

export class alterField1709247316907 implements MigrationInterface {
  name = 'alterField1709247316907';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "brand_model" DROP COLUMN "createdAt"`,
    );
    await queryRunner.query(
      `ALTER TABLE "brand_model" DROP COLUMN "updatedAt"`,
    );
    await queryRunner.query(
      `ALTER TABLE "category_model" DROP COLUMN "createdAt"`,
    );
    await queryRunner.query(
      `ALTER TABLE "category_model" DROP COLUMN "updatedAt"`,
    );
    await queryRunner.query(
      `ALTER TABLE "costumer_model" DROP COLUMN "createdAt"`,
    );
    await queryRunner.query(
      `ALTER TABLE "costumer_model" DROP COLUMN "updatedAt"`,
    );
    await queryRunner.query(
      `ALTER TABLE "brand_model" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "brand_model" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "category_model" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "category_model" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "costumer_model" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "costumer_model" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "product_model"."created_at" IS NULL`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "product_model"."updated_at" IS NULL`,
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
      `COMMENT ON COLUMN "product_model"."updated_at" IS NULL`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "product_model"."created_at" IS NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "costumer_model" DROP COLUMN "updated_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "costumer_model" DROP COLUMN "created_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "category_model" DROP COLUMN "updated_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "category_model" DROP COLUMN "created_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "brand_model" DROP COLUMN "updated_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "brand_model" DROP COLUMN "created_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "costumer_model" ADD "updatedAt" TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "costumer_model" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "category_model" ADD "updatedAt" TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "category_model" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "brand_model" ADD "updatedAt" TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "brand_model" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP`,
    );
  }
}
