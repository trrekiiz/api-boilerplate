import express from 'express'
import { create , get , update , getById , uploadPhoto } from '../controllers/user_transactions'
import authMiddleware from '../middlewares/authorization';
import cors from 'cors';

const router = express.Router();


router.post('/', create);
router.options('/*', cors());
router.post('/photo', uploadPhoto);
router.get('/', authMiddleware, get);
router.get('/:id', authMiddleware,getById);
router.patch('/:id', authMiddleware,update);

export default router