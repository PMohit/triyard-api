const { route } = require('../controllers/auth.controller');

const router = require('express').Router();
const authenticate = require('./../middlewares/authenticate');
const authRouter = require('./../controllers/auth.controller');
const userRouter = require('./../controllers/user.controller');
const productRouter = require('./../modules/products/product.route');

router.use('/auth', authRouter);
router.use('/user', authenticate, userRouter);
router.use('/product', productRouter);



module.exports = router;