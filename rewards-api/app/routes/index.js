import express from 'express';
import userTransactions from './user_transactions';
import userAdmin from './admin';

const router = express.Router();

router.get('/', (req, res) => {
  res.send({ date: new Date() })
});

router.use('/user_transactions', userTransactions);
router.use('/user_admin', userAdmin);

// Generate 404s
router.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err)
});

// Handle errors
router.use((err, req, res) => {
  res.status(err.status || 500);
  if (err.status === 500) {
    console.log(err.stack)
  }
  res.json({
    status: err.status,
    message: err.message,
    error: err.stack,
  })
});

export default router