import express from 'express'
import { create , get , update , getById , uploadPhoto } from '../controllers/user_transactions'

const router = express.Router();

router.post('/', create);
router.post('/photo', uploadPhoto);
router.get('/', get);
router.get('/:id', getById);
router.patch('/', update);

export default router