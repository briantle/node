const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
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
        firstname: this.firstname,
        lastname: this.lastname,
        username: this.username
    }

    const token = jwt.sign(payload, 'abcd1234')

    return token
}

UserSchema.methods.generateUserObject = function () {
    return {
        username: this.username,
        token: this.generateToken()
    }
}

UserSchema.methods.generatePasswordHash = function (password) {
    const salt = bcryptjs.genSaltSync(10)
    const passwordHash = bcryptjs.hashSync(password, salt);

    this.password = passwordHash;
}

const User = mongoose.model('User', UserSchema);

module.exports = User