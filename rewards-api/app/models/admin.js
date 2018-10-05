import bookshelf from '../lib/bookshelfs';

const userAdmin = bookshelf.Model.extend({
  tableName: 'Admins',
  hasTimestamps: true,
});

export default userAdmin