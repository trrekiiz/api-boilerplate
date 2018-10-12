import bookshelf from '../lib/bookshelfs';

const enrollments = bookshelf.Model.extend({
  tableName: 'Enrollments',
  hasTimestamps: true,
});

export default enrollments