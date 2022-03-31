import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUserQuizResponse1647803403939 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'userQuizResponses',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },

          {
            name: 'responses',
            type: 'varchar[]',
            isNullable: false,
          },
          {
            name: 'complete',
            type: 'boolean',
            isNullable: false,
          },
          {
            name: 'lastQuestion',
            type: 'int',
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
    await queryRunner.dropTable('userQuizResponses');
  }
}
