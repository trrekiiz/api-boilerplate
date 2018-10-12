import express from 'express';
import userTransactions from './user_transactions';
import userAdmin from './admin';
import enrollments from './enrollments';
import redeem from './redeemcodes';
import cors from 'cors'

const router = express.Router();

router.get('/', (req, res) => {
  res.send({ date: new Date() });
});


router.use('/user_transactions', userTransactions , (req, res) => {
  res.send({ user: `user_transaction` });
});
router.use('/user_admin', userAdmin);
router.use('/enroll' , enrollments);
router.use('/redeem' , redeem);

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