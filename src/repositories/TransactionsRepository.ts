/* eslint-disable no-param-reassign */
import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
    income: number;
    outcome: number;
    total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
    public async getBalance(): Promise<Balance> {
        const transactions = await this.find();

        return transactions.reduce(
            (result: Balance, items: Transaction) => {
                if (items.type === 'income') {
                    result.income += Number(items.value);
                    result.total += Number(items.value);
                }
                if (items.type === 'outcome') {
                    result.outcome += Number(items.value);
                    result.total -= Number(items.value);
                }
                return result;
            },
            {
                income: 0,
                outcome: 0,
                total: 0,
            },
        );
    }
}

export default TransactionsRepository;
