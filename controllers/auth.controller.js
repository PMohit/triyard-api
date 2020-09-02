const express = require('express');
const router = express.Router();
const UserModel = require('./../models/user.model');
const mapUserReq = require('./../helpers/mapUserReq');
const jwt = require('jsonwebtoken');
const config = require('./../configs');
const passwordHash = require('password-hash');

function createToken(data) {
    let token = jwt.sign(data, config.jwtSecret);
    return token;
}

router.post('/login', function (req, res, next) {
    // console.log('req.body >>', req.body);
    UserModel
        .findOne({ username: req.body.username })
        .exec(function (err, user) {
            if (err) {
                return next(err);
            }
            if (user) {
                var isPasswordMatch = passwordHash.verify(req.body.password, user.password);
                if (isPasswordMatch) {
                    let token = createToken({ _id: user._id });
                    res.json({
                        user,
                        token
                    });
                } else {
                    next({
                        mg: 'Invalid Password',
                        status: 400
                    })
                }
            } else {
                next({
                    msg: "Invalid Username",
                    status: 400
                })
            }
        })


})

router.post('/register', function (req, res, next) {
    const newUser = new UserModel();
    const newMappedUser = mapUserReq(newUser, req.body);

    newMappedUser.password = passwordHash.generate(req.body.password);
    newMappedUser.save()
        .then(function (data) {
            res.json(data);
        })
        .catch(function (err) {
            next(err);
        })
})

router.get('/forgot-password', function (req, res, next) {
    res.end('from forgot-password endpoint');
})



module.exports = router;