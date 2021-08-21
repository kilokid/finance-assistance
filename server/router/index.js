import { Router } from 'express';

const router = new Router();

router.post('/registration');
router.post('/login');
router.post('/logout');
router.get('/activate/:link');
router.get('/refresh');
router.get('/users');

export { router };
