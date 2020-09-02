const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const reviewSchema = new Schema({
    point: Number,// 1-5
    message: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
 
}, {
    timestamps: true
})

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    brand: String,
    category: String,
    color: String,
    price: Number,
    tags: [String],
    reviews: [reviewSchema],
    modelNo: String,
    cuponCode: String, 
    quantity: Number,
    supplier: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    images: [String],
    status: {
        type: String,
        enum: ['available', 'out of stock', 'booked'],
        default: 'available'
    },
    discount: {
        discountedItem: Boolean,
        discountType: {
            type: String,
            enum: ['percentage', 'value', 'qunatity']
        },
        discountValue: String
    },
    offers: [String],

}, {
    timestamps: true
})

module.exports = mongoose.model('product', ProductSchema);