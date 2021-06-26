import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateTurma1624417389588 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'Turmas',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    { 
                        name: 'id_professor',
                        type: 'uuid',

                    },
                    { 
                        name: 'id_escola',
                        type: 'uuid',

                    },
                    { 
                        name: 'nome',
                        type: 'varchar',

                    },
                    { 
                        name: 'hora_inicio',
                        type: 'time with time zone',

                    },
                    { 
                        name: 'hora_fim',
                        type: 'time with time zone',

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
            'Turmas',
            new TableForeignKey({
              name: 'TurmasProfessor',
              columnNames: ['id_professor'],
              referencedColumnNames: ['id'],
              referencedTableName: 'Professores',
              onDelete: 'CASCADE',
              onUpdate: 'CASCADE',
            }),
          );
          await queryRunner.createForeignKey(
            'Turmas',
            new TableForeignKey({
              name: 'TurmasEscolas',
              columnNames: ['id_escola'],
              referencedColumnNames: ['id'],
              referencedTableName: 'Escolas',
              onDelete: 'CASCADE',
              onUpdate: 'CASCADE',
            }),
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('Turmas', 'TurmasProfessor');
        await queryRunner.dropForeignKey('Turmas', 'TurmasEscolas');
        await queryRunner.dropTable('Turmas');
    }
}
