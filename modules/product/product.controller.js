const ProductQuery = require('./product.query');
const productQuery = require('./product.query');
const fs = require('fs');
const path = require('path');



function get(req, res, next) {
    const condition = {};
    ProductQuery.fetch(condition)
        .then(function (data) {
            res.json(data);
        })
        .catch(function (err) {
            next(err);
        })
}

function getById(req, res, next) {
    ProductQuery.fetch({ _id: req.params.id })
        .then(function (data) {
            res.json(data[0]);
        })
        .catch(function (err) {
            next(err);
        })
}
function insert(req, res, next) {
    console.log('req.body>>', req.body);
    console.log('req.file >>', req.file);
    if (req.fileErr) {
        return next({
            msg: 'invalid file format',
            status: 400
        })
    }
    //
    const data = req.body;
    if (req.file) {
        const mimeType = req.file.mimetype.split('/')[0];
        if (mimeType !== 'image') {
            // fs.unlik/


            fs.unlink(path.join(process.cwd(), 'uploads/images/' + req.file.filename), function (err, done) {
                if (err) {
                    console.log("error remvoving")
                } else {
                    console.log('file removed')
                }
            })
            return next({
                msg: "invalid file format",
                status: 400
            })
        }
        data.images = req.file.filename
    }
    data.supplier = req.loggedInUser._id;
    productQuery.save(data)
        .then(function (data) {
            res.json(data);
        })
        .catch(function (err) {
            next(err);
        })

}
function search(req, res, next) {
    let serachCondition = {}
    ProductQuery.fetch(serachCondition)
        .then(function (data) {
            res.json(data);
        })
        .catch(function (err) {
            next(err);
        })
}

function update(req, res, next) {
    const data = req.body;
    if (req.fileErr) {
        return next({
            msg: 'invalid file format',
            status: 400
        });
    }
    if (req.file) {
        data.images = req.file.filename
    }
    data.user = req.loggedInUser._id;
    ProductQuery.update(req.params.id, data)
        .then(function (data) {
            fs.unlink(path.join(process.cwd(), 'uploads/images/' + data.oldImage), function (err, done) {
                if (err) {
                    return console.log('removing failed');
                }
                console.log('removed')
            })
            res.json(data);
        })
        .catch(function (err) {
            next(err);
        })

}

function remove(req, res, next) {
    ProductQuery.remove(req.params.id)
        .then(function (data) {
            res.json(data);
        })
        .catch(function (err) {
            next(err);
        })
}

module.exports = {
    get,
    getById,
    insert,
    search,
    update,
    remove
}


