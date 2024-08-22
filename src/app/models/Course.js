const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;
mongoose.plugin(slug);
const Course = new Schema({
    name: {type: String, required: true},
    description: {type: String},
    img: {type: String},
    videoId: {type: String, required: true},
    level: {type: String},
    slug: { type: String, slug: 'name', unique: true }
}, {
    timestamps: true
});

Course.plugin(mongooseDelete, {
    deletedAt:true,
    overrideMethods: 'all'
});

module.exports = mongoose.model('Course', Course);