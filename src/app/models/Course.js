const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;
mongoose.plugin(slug);
const Course = new Schema({
    _id:{type: Number},
    name: {type: String, required: true},
    description: {type: String},
    img: {type: String},
    videoId: {type: String, required: true},
    level: {type: String},
    slug: { type: String, slug: 'name', unique: true }
}, {
    _id: false,
    timestamps: true
});

Course.query.sortable = function(req) {
    if(req.query.hasOwnProperty('_sort')) {
        const isValidType = ['asc', 'desc'].includes(req.query.type);
        return this.sort({
            [req.query.column]: isValidType ? req.query.type : 'desc'
        })
    }
    return this; 
}

Course.plugin(AutoIncrement);

Course.plugin(mongooseDelete, {
    deletedAt:true,
    overrideMethods: 'all'
});

module.exports = mongoose.model('Course', Course);