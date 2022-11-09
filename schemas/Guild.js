const { model, Schema, Types } = require('mongoose');

module.exports = model('Guild', new Schema({
    id: { type: String },
    logId: { type: String }
}));