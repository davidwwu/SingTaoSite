var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CategorySchema = new Schema({
    cat: {
        type: String,
        required: true
    },
    cat_title_cn: {
        type: String
    },
    cat_cn: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: [
            'classified',
            'commercial',
            'other'
        ]
    }
}, { strict: false });

// Virtual for author's URL
CategorySchema
    .virtual('url')
    .get(function () {
        return '/' + this.type + '/' + this.cat;
    });

//Export model
module.exports = mongoose.model('Category', CategorySchema);