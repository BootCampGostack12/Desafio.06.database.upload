import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AlterTransactionDropField1598765292888
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('transactions', 'category');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'transactions',
            new TableColumn({
                name: 'category',
                type: 'varchar',
            }),
        );
    }
}
