import { MigrationInterface, QueryRunner } from 'typeorm';

export class addRelationOneToOne1709249170274 implements MigrationInterface {
  name = 'addRelationOneToOne1709249170274';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "customer_model" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "customerId" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "lastName" character varying(50) NOT NULL, "phone" character varying(255) NOT NULL, CONSTRAINT "PK_f4a18bc510ecae4e591935c3dda" PRIMARY KEY ("customerId"))`,
    );
    await queryRunner.query(`ALTER TABLE "user_model" DROP COLUMN "createdAt"`);
    await queryRunner.query(`ALTER TABLE "user_model" DROP COLUMN "updatedAt"`);
    await queryRunner.query(
      `ALTER TABLE "user_model" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_model" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_model" ADD "customerCustomerId" uuid`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_model" ADD CONSTRAINT "UQ_f4493b15cec3ca18905f00779b2" UNIQUE ("customerCustomerId")`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "brand_model"."created_at" IS NULL`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "brand_model"."updated_at" IS NULL`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "category_model"."created_at" IS NULL`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "category_model"."updated_at" IS NULL`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "product_model"."created_at" IS NULL`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "product_model"."updated_at" IS NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_model" ADD CONSTRAINT "FK_f4493b15cec3ca18905f00779b2" FOREIGN KEY ("customerCustomerId") REFERENCES "customer_model"("customerId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_model" DROP CONSTRAINT "FK_f4493b15cec3ca18905f00779b2"`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "product_model"."updated_at" IS NULL`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "product_model"."created_at" IS NULL`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "category_model"."updated_at" IS NULL`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "category_model"."created_at" IS NULL`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "brand_model"."updated_at" IS NULL`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "brand_model"."created_at" IS NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_model" DROP CONSTRAINT "UQ_f4493b15cec3ca18905f00779b2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_model" DROP COLUMN "customerCustomerId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_model" DROP COLUMN "updated_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_model" DROP COLUMN "created_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_model" ADD "updatedAt" TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_model" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(`DROP TABLE "customer_model"`);
  }
}
