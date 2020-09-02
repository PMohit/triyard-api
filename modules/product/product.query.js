const ProductModel = require('./product.model');

function map_prodcut_req(product, productDetails) {
    if (productDetails.name)
        product.name = productDetails.name;
    if (productDetails.description)
        product.description = productDetails.description;
    if (productDetails.category)
        product.category = productDetails.category;
    if (productDetails.brand)
        product.brand = productDetails.brand;
    if (productDetails.price)
        product.price = productDetails.price;
     if (productDetails.color)
        product.color = productDetails.color;
    if (productDetails.quantity)
        product.quantity = productDetails.quantity;
    if (productDetails.cuponCode)
        product.cuponCode = productDetails.cuponCode;
    if (productDetails.status)
        product.status = productDetails.status;
    if (productDetails.supplier)
        product.supplier = productDetails.supplier;
    if (productDetails.images)
        product.images = productDetails.images;
    if (productDetails.tags)
        product.tags = typeof (productDetails.tags) === 'string'
            ? productDetails.tags.split(',')
            : productDetails.tags
    if (productDetails.offers)
        product.offers = typeof (productDetails.offers) === 'string'
            ? productDetails.offers.split(',')
            : productDetails.offers
    // for insertion
    if (!product.discount) {
        product.discount = {};
    }
    if (productDetails.discountedItem == 'true')
        product.discount.discountedItem = true;
    if (productDetails.discountedItem == 'false')
        product.discount.discountedItem = false;
    if (productDetails.discountType)
        product.discount.discountType = productDetails.discountType;
    if (productDetails.discountValue)
        product.discount.discountValue = productDetails.discountValue;
    if (productDetails.reviewPoint || productDetails.reviewMessage) {
        let review = {
            point: productDetails.reviewPoint,
            message: productDetails.reviewMessage,
            user: productDetails.user
        }
        product.reviews.push(review)
    }
}

function fetch(condition) {
    return new Promise(function (resolve, reject) {
        ProductModel
            .find(condition, { category: 0 })
            .populate('supplier', { username: 1 })
            .sort({
                _id: -1
            })
            .exec(function (err, products) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(products)
                }
            });
    })

}

function save(data) {
    const newProduct = new ProductModel({});
    map_prodcut_req(newProduct, data);
    return newProduct.save();// promise
}

function update(id, data) {
    return new Promise(function (resolve, reject) {
        ProductModel.findById(id).exec(function (err, product) {
            if (err) {
                reject(err);
            }
            if (!product) {
                return reject({
                    msg: "Product Not Found",
                    status: 404
                })
            }
            var oldImage = product.images[0];
            map_prodcut_req(product, data);
            product.save(function (err, updated) {
                if (err) {
                    reject(err);
                } else {
                    updated.oldImage = oldImage;
                    resolve(updated);
                }
            })
        })
    })
}

function remove(id) {
    return new Promise(function (resolve, reject) {
        ProductModel.findById(id)
            .then(function (product) {
                if (!product) {
                    return reject({
                        msg: "Product Not Found",
                        status: 404
                    })
                }
                product.remove(function (err, removed) {
                    if (err) {
                        return reject(err);
                    }
                    resolve(removed);
                })
            })
            .catch(function (err) {
                reject(err);
            })
    })
}

module.exports = {
    fetch, save, remove, update
}