var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CustomerSchema = new Schema({
    customer_id: {
        type: String,
        required: true,
        max: 100
    },
    ads: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Ad'
        }
    ],
    customer_name: {
        type: String,
        required: true,
        max: 100
    },
    first_name: {
        type: String,
        max: 100
    },
    last_name: {
        type: String,
        max: 100
    },
    phone: {
        type: String,
        max: 100
    },
    email: {
        type: String,
        max: 100
    },
    address: {
        type: String
    }
}, { strict: false });

// Virtual for author's full name
CustomerSchema
    .virtual('name')
    .get(function () {
        return  this.first_name + ' ' + this.last_name;
    });

// Virtual for author's URL
// UserSchema
//     .virtual('url')
//     .get(function () {
//         return '/user/' + this._id;
//     });

//Export model
module.exports = mongoose.model('Customer', CustomerSchema);