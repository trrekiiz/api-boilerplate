import express from 'express'
import { getRedeemCodeById } from '../controllers/redeem'

const router = express.Router();

router.get('/:id', getRedeemCodeById);

export default router