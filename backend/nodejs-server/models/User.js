const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, {
    timestamps: true
});

UserSchema.methods.comparePassword = function (password) {
    return bcryptjs.compareSync(password, this.password)
}

UserSchema.methods.generateToken = function () {
    const payload = {
        email: this.email,
        username: this.username
    }

    const token = jwt.sign(payload, 'abcd1234')

    return token;
}

UserSchema.methods.generateUserObject = function () {
    return {
        username: this.username,
        email: this.email,
        token: this.generateToken()
    }
}

UserSchema.methods.generatePasswordHash = function (password) {
    const salt = bcryptjs.genSaltSync(10);
    const passwordHash = bcryptjs.hashSync(password, salt);

    this.password = passwordHash;
}

const User = mongoose.model('User', UserSchema);

module.exports = User;