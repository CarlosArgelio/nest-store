import {MigrationInterface, QueryRunner} from "typeorm";

export class orders1711729413657 implements MigrationInterface {
    name = 'orders1711729413657'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "order_item" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "quantity" integer NOT NULL, "productId" uuid, "orderId" uuid, CONSTRAINT "PK_d01158fe15b1ead5c26fd7f4e90" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "customerId" uuid, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`COMMENT ON COLUMN "categories"."created_at" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "categories"."updated_at" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "products"."created_at" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "products"."updated_at" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "brands"."created_at" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "brands"."updated_at" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."created_at" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."updated_at" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "customers"."created_at" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "customers"."updated_at" IS NULL`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD CONSTRAINT "FK_904370c093ceea4369659a3c810" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD CONSTRAINT "FK_646bf9ece6f45dbe41c203e06e0" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_e5de51ca888d8b1f5ac25799dd1" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_e5de51ca888d8b1f5ac25799dd1"`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP CONSTRAINT "FK_646bf9ece6f45dbe41c203e06e0"`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP CONSTRAINT "FK_904370c093ceea4369659a3c810"`);
        await queryRunner.query(`COMMENT ON COLUMN "customers"."updated_at" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "customers"."created_at" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."updated_at" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."created_at" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "brands"."updated_at" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "brands"."created_at" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "products"."updated_at" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "products"."created_at" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "categories"."updated_at" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "categories"."created_at" IS NULL`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TABLE "order_item"`);
    }

}
