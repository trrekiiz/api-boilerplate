import express from 'express'
import { create, signIn } from '../controllers/admin'

const router = express.Router();

router.post('/', create);
router.post('/signin', signIn);

export default router