const ProductCtrl = require('./product.controller');
const router = require('express').Router();
const authenticate = require('./../../middlewares/authenticate');
const uploader = require('./../../middlewares/uploader');

router.route('/')
    .get(authenticate, ProductCtrl.get)
    .post(authenticate, uploader.single('img'), ProductCtrl.insert)

router.route('/search')
    .get(ProductCtrl.search)
    .post(ProductCtrl.search)

router.route('/:id')
    .get(authenticate, ProductCtrl.getById)
    .put(authenticate, uploader.single('img'), ProductCtrl.update)
    .delete(authenticate, ProductCtrl.remove);


module.exports = router;