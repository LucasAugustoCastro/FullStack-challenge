import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateDiretor1624417175377 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'Diretores',
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
            'Diretores',
            new TableForeignKey({
              name: 'DiretoresPessoas',
              columnNames: ['id_pessoa'],
              referencedColumnNames: ['id'],
              referencedTableName: 'Pessoas',
              onDelete: 'CASCADE',
              onUpdate: 'CASCADE',
            }),
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('Diretores', 'DiretoresPessoas');
        await queryRunner.dropTable('Diretores');
    }
}
