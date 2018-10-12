import bookshelf from '../lib/bookshelfs';

const redeemCodes = bookshelf.Model.extend({
  tableName: 'RedeemCodes',
  hasTimestamps: true,
});

export default redeemCodes