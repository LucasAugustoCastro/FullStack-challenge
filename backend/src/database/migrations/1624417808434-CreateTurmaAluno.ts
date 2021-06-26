import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateTurmaAluno1624417808434 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'Turma_Aluno',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    { 
                        name: 'id_aluno',
                        type: 'uuid',

                    },
                    { 
                        name: 'id_turma',
                        type: 'uuid',

                    },
                    {
                        name: 'create_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                    },

                ]
            })
        );
        await queryRunner.createForeignKey(
            'Turma_Aluno',
            new TableForeignKey({
              name: 'TurmasAlunos',
              columnNames: ['id_turma'],
              referencedColumnNames: ['id'],
              referencedTableName: 'Turmas',
              onDelete: 'CASCADE',
              onUpdate: 'CASCADE',
            }),
          );
          await queryRunner.createForeignKey(
            'Turma_Aluno',
            new TableForeignKey({
              name: 'AlunosTurmas',
              columnNames: ['id_aluno'],
              referencedColumnNames: ['id'],
              referencedTableName: 'Alunos',
              onDelete: 'CASCADE',
              onUpdate: 'CASCADE',
            }),
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('Turma_Aluno', 'AlunosTurmas');
        await queryRunner.dropForeignKey('Turma_Aluno', 'TurmasAlunos');
        await queryRunner.dropTable('Turma_Aluno');
    }

}
