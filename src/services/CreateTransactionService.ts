import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Transaction from '../models/Transaction';
import Category from '../models/Category';

interface RequestDTO {
    title: string;
    value: number;
    type: string;
    category: string;
}

class CreateTransactionService {
    public async execute({
        title,
        value,
        type,
        category,
    }: RequestDTO): Promise<Transaction> {
        const transactionRepository = getRepository(Transaction);
        const categoryRepository = getRepository(Category);

        const transactionExists = await transactionRepository.findOne({
            where: { title },
        });

        const categoryExists = await categoryRepository.findOne({
            where: { title: category },
        });

        // Caso não exista
        if (!transactionExists || !categoryExists) {
            let categoryObj = categoryRepository.create({
                title: category,
            });

            categoryObj = await categoryRepository.save(categoryObj);

            const transactionObj = transactionRepository.create({
                title,
                value,
                type: 'income',
                category_id: categoryObj.id,
            });

            await transactionRepository.save(transactionObj);
        }
    }
}

export default CreateTransactionService;
