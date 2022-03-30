import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddQuizUserResponse1648609907511 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'userQuizResponses',
      new TableColumn({
        name: 'quizId',
        type: 'uuid',
      }),
    );
    await queryRunner.addColumn(
      'userQuizResponses',
      new TableColumn({
        name: 'userId',
        type: 'decimal',
        isPrimary: true,
        precision: 30,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('userQuizResponses', 'quizId');
    await queryRunner.dropColumn('userQuizResponses', 'userId');
  }
}
