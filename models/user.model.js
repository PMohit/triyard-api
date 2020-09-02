const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const UserSchema = new Schema({
    
    name: String,
    email: {
        type: String,
        unique: true,
        sparse: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number
    },
    address: {
        permanentAddress: String,
        tempAddress: [String]
    },
    role: {
        type: Number, // 1 admin 2 end user 
        default: 2
    },
    maritalStatus: {
        type: Boolean
    },
    status: {
        type: Boolean,
        default: true
    },
    displayName: {
        type: String
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'others']
    },
    dateOfBirth: Date,
    
}, {
    timestamps: true
})

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;
