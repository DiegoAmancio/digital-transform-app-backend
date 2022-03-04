import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class QuestionMigration implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'questions',
        columns: [
          {
            name: 'id',
            type: 'uuid_generate_v4()',
            isPrimary: true,
          },
          {
            name: 'alternatives',
            type: 'varchar[]',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'corrects',
            type: 'varchar[]',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamptz',
            isNullable: false,
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamptz',
            isNullable: false,
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
