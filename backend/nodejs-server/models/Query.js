const mongoose = require('mongoose');

const QuerySchema = new mongoose.Schema({
    email: { type: String, required: true },
    query: { type: String, required: true },
    completed: { type: String, default: false }
}, {
    timestamps: true
})

const Query = mongoose.model('Query', QuerySchema);

module.exports = Query;