import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateAluno1624416540830 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'Alunos',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    { 
                        name: 'id_pessoa',
                        type: 'uuid',

                    },
                    { 
                        name: 'nome_responsavel',
                        type: 'varchar',

                    },
                    { 
                        name: 'telefone_responsavel',
                        type: 'varchar',

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
            'Alunos',
            new TableForeignKey({
              name: 'AlunosPessoas',
              columnNames: ['id_pessoa'],
              referencedColumnNames: ['id'],
              referencedTableName: 'Pessoas',
              onDelete: 'CASCADE',
              onUpdate: 'CASCADE',
            }),
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('Alunos', 'AlunosPessoas');
        await queryRunner.dropTable('Alunos');
    }

}
