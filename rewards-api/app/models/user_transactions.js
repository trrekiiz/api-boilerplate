import bookshelf from '../lib/bookshelfs';

const userTransaction = bookshelf.Model.extend({
  tableName: 'UserTransactions',
  hasTimestamps: true,
});

export default userTransaction