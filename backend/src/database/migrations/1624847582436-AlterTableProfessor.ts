import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export default class AlterTableProfessor1624847582436 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.addColumn(
            'Professores',
            new TableColumn({
                name: 'id_escola',
                type: 'uuid',
                isNullable: true,
            }),
        );
        await queryRunner.createForeignKey(
            'Professores',
            new TableForeignKey({
              name: 'EscolaProfessores',
              columnNames: ['id_escola'],
              referencedColumnNames: ['id'],
              referencedTableName: 'Escolas',
              onDelete: 'SET NULL',
              onUpdate: 'CASCADE',
            }),
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('Professores', 'EscolaProfessores');
        await queryRunner.dropColumn('Professores', 'id_escola');
    }

}
