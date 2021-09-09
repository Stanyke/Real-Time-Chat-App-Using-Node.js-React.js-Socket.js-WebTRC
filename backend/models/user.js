const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {jwtSecret} = require('../bin/config');

const UserSchema = mongoose.Schema({
    username: { type: String },
    password: { type: String },
}, { timestamps: true});

UserSchema.pre("save", function (next) {
    const user = this;
    
    if (!user.isModified('password')) return next();

    bcrypt.hash(user.password, 10, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
    });
});

UserSchema.methods.generateToken = async function () {
	const user = this;
	const token = jwt.sign(
		{ _id: user._id.toString() },
		jwtSecret,
        { expiresIn: '7d' }
	);

	return token;
};

const User = module.exports = mongoose.model('User', UserSchema);