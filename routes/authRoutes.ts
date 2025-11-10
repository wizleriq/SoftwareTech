import express from 'express';
import { registerUser, loginUser, updateUser, getAllUsers} from '../controllers/authControllers';
import { verifyToken } from '../middleware/authMidddleware'

const router = express.Router();

router.get('/users', getAllUsers);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.patch('/update/:id', verifyToken, updateUser)

export default router;


