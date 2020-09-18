import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  type: 'income' | 'outcome';
  value: number;
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    const { total } = this.transactionsRepository.getBalance();

    if (type == 'outcome' && total < value) {
      throw Error('You do not have enough balance');
    }

    const createTransaction = this.transactionsRepository.create({
      title,
      type,
      value,
    });

    return createTransaction;
  }
}

export default CreateTransactionService;
