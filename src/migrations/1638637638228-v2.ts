import { MigrationInterface, QueryRunner } from 'typeorm'

export class v21638637638228 implements MigrationInterface {
  name = 'v21638637638228'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "key_value" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isActive" boolean NOT NULL DEFAULT true, "key" character varying(32) NOT NULL, "value" text, CONSTRAINT "PK_cb0bd384c6d35a1355fab8760e5" PRIMARY KEY ("id"))`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "key_value"`)
  }
}
