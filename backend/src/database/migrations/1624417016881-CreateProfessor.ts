import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateProfessor1624417016881 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'Professores',
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
            'Professores',
            new TableForeignKey({
              name: 'ProfessoresPessoas',
              columnNames: ['id_pessoa'],
              referencedColumnNames: ['id'],
              referencedTableName: 'Pessoas',
              onDelete: 'CASCADE',
              onUpdate: 'CASCADE',
            }),
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('Professores', 'ProfessoresPessoas');
        await queryRunner.dropTable('Professores');
    }

}
