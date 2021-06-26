import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateEscola1624417263442 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'Escolas',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    { 
                        name: 'id_diretor',
                        type: 'uuid',

                    },
                    { 
                        name: 'nome',
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
            'Escolas',
            new TableForeignKey({
              name: 'EscolasDiretores',
              columnNames: ['id_diretor'],
              referencedColumnNames: ['id'],
              referencedTableName: 'Diretores',
              onDelete: 'CASCADE',
              onUpdate: 'CASCADE',
            }),
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('Escolas', 'EscolasDiretores');
        await queryRunner.dropTable('Escolas');

    }

}
