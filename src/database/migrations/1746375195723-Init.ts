import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1746375195723 implements MigrationInterface {
  name = 'Init1746375195723';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "notification_attempts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "providerResponse" jsonb, "errorMessage" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "notificationId" uuid, CONSTRAINT "PK_f6abd34f351bbbf11c7ae8e7565" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."notifications_channel_enum" AS ENUM('EMAIL', 'SMS', 'PUSH')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."notifications_status_enum" AS ENUM('PENDING', 'RETRYING', 'SENT', 'FAILED')`,
    );
    await queryRunner.query(
      `CREATE TABLE "notifications" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "channel" "public"."notifications_channel_enum" NOT NULL, "recipient" character varying NOT NULL, "subject" character varying, "content" jsonb NOT NULL, "status" "public"."notifications_status_enum" NOT NULL DEFAULT 'PENDING', "retries" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6a72c3c0f683f6462415e653c3a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "notification_attempts" ADD CONSTRAINT "FK_73a92c5a86768b9f5b8835b03a9" FOREIGN KEY ("notificationId") REFERENCES "notifications"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "notification_attempts" DROP CONSTRAINT "FK_73a92c5a86768b9f5b8835b03a9"`,
    );
    await queryRunner.query(`DROP TABLE "notifications"`);
    await queryRunner.query(`DROP TYPE "public"."notifications_status_enum"`);
    await queryRunner.query(`DROP TYPE "public"."notifications_channel_enum"`);
    await queryRunner.query(`DROP TABLE "notification_attempts"`);
  }
}
