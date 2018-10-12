import express from 'express'
import { create, signIn } from '../controllers/admin'
import { getNumberOfApprove } from '../controllers/user_transactions'

const router = express.Router();

router.post('/', create);
router.post('/signin', signIn);
router.get('/approve' , getNumberOfApprove);

export default router