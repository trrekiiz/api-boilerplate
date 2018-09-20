import express from 'express'
import { create , get , update} from '../controllers/user_transactions'

const router = express.Router();

router.post('/', create);
router.get('/', get);
router.patch('/', update);

export default router