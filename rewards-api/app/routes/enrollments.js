import express from 'express'
import { create } from '../controllers/enrollments'

const router = express.Router();

router.post('/', create);

export default router