import {MigrationInterface, QueryRunner, Table} from "typeorm";

export default class CreatePessoas1624333573080 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
        await queryRunner.createTable(
            new Table({
                name: 'Pessoas',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    { 
                        name: 'nome',
                        type: 'varchar',

                    },
                    { 
                        name: 'cpf',
                        type: 'varchar',

                    },
                    { 
                        name: 'email',
                        type: 'varchar',

                    },
                    { 
                        name: 'telefone',
                        type: 'varchar',

                    },
                    { 
                        name: 'password',
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
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('Pessoas');
    }

}
