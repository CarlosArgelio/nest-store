import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1709236872513 implements MigrationInterface {
  name = 'init1709236872513';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "brand_model" ("brandId" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP, CONSTRAINT "UQ_b3f5b555c3fdfc58b86156438c4" UNIQUE ("name"), CONSTRAINT "PK_b2d539cb7b85da59c0e0d71eb3f" PRIMARY KEY ("brandId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "category_model" ("categoryId" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "image" character varying(255) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP, CONSTRAINT "UQ_7a74e5af71dca4bb150ac3b0b82" UNIQUE ("name"), CONSTRAINT "UQ_2b6be74aeff81aabf942e4fd565" UNIQUE ("image"), CONSTRAINT "PK_9823e61f51c699e4d2290781c5a" PRIMARY KEY ("categoryId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "product_model" ("productId" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(255) NOT NULL, "description" text NOT NULL, "price" integer NOT NULL, "image" character varying NOT NULL, "stock" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP, CONSTRAINT "UQ_5701a6c3e9d8aee30703df70a6d" UNIQUE ("title"), CONSTRAINT "PK_0d1428dc1db13055b392442b1f9" PRIMARY KEY ("productId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "costumer_model" ("customerId" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "lastName" character varying(50) NOT NULL, "phone" character varying(255) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP, CONSTRAINT "PK_815c84dad5623bec2caf324a376" PRIMARY KEY ("customerId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_model" ("userId" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(255) NOT NULL, "password" text NOT NULL, "role" "user_model_role_enum" NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP, CONSTRAINT "UQ_864bd044bba869304084843358e" UNIQUE ("email"), CONSTRAINT "PK_4c45d8c361e22bb10f46be68f34" PRIMARY KEY ("userId"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user_model"`);
    await queryRunner.query(`DROP TABLE "costumer_model"`);
    await queryRunner.query(`DROP TABLE "product_model"`);
    await queryRunner.query(`DROP TABLE "category_model"`);
    await queryRunner.query(`DROP TABLE "brand_model"`);
  }
}
