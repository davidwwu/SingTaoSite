var Ad = require('../models/ad');
var Category = require('../models/category');
var Customer = require('../models/customer');
var config = require('../config');
var fs = require("fs");
var async = require('async');
var moment = require('moment');

// Display list of manually uploaded ads
exports.maintenance_list = function(req, res) {
    // handle query
    let pageNumber = req.query.pageNumber || '1';
    let sortBy = req.query.sortBy || 'start_date';
    let nPerPage = 20;

    // Get page count
    Ad
        .count({ uploaded_manually: true })
        .exec((err, count) => {
            let totalPages = Math.ceil(count / nPerPage);

            // do list query
            Ad
                .find({
                    uploaded_manually: true
                })
                .populate('tags', 'cat_cn')
                .populate('customer')
                .sort(sortBy)
                .skip(pageNumber > 0 ? ((pageNumber-1)*nPerPage) : 0)
                .limit(nPerPage)
                .exec((err, ads) => {
                    if (err) {
                        res.flash('error', 'Error Fetching list: ' + err);
                        res.render('maintenance', {
                            flash: {
                                error: 'Error fatching list: ' + err
                            },
                            title: "list",
                            totalPages: 0,
                            ads: []
                        });
                    }
                    res.render('maintenance', {
                        title: "List",
                        pageNumber,
                        sortBy,
                        totalPages,
                        ads
                    });
                });
    });

}

// Display maintenance create form on GET
exports.maintenance_create_get = function(req, res, next) {
    // load categories
    Category.
        find(function (error, categories) {
            if (error) return next(error);
            let classified_ads = [],
                commercial_ads = [];
            categories.forEach(c => {
                if (c.type == 'classified') {
                    classified_ads.push(c);
                } else if (c.type == 'commercial') {
                    commercial_ads.push(c);
                }
            });
            res.render('create', {
                title: 'Create',
                defaultStartDate: moment().format('YYYY-MM-DD'),
                classified_ads,
                commercial_ads
            });
        });
};

// Handle maintenance create on POST
exports.maintenance_create_post = function(req, res) {
    let data = req.body;

    let conf = {
        ad_id: data.adId,
        date_inserted: moment().format('YYYYMMDD'),
        uploaded_manually: true,
        location: data.location,
        order: data.order,
        title: data.title,
        description: data.description,
        ad_link: data.link,
        image: req.file !== undefined ? "/manualUploads/images/" + req.file.filename : "",
        yt_short_link: data.ytShortLink,
        yt_full_link: data.ytFullLink,
        start_date: "",
        end_date: "",
        media_format: data.mediaFormat,
        tags: data.tags
    }

    if (moment(data.startDate).isValid()) {
        conf.start_date = moment(data.startDate).format('YYYY-MM-DD');
    }

    if (moment(data.endDate).isValid()) {
        conf.end_date = moment(data.endDate).format('YYYY-MM-DD');
    }

    async.waterfall([
        (callback) => {
            if (data.category !== "") {
                Category
                    .findById(data.category, (err, category) => {
                        if (err) callback('error at finding matching category: ' + err, null);

                        conf.category = category._id;
            
                        let ad = new Ad(conf);
                        
                        console.log("[cat] ad is now:", ad);
                        callback(null, ad);
                    })
            } else {
                let ad = new Ad(conf);

                console.log("[no_cat] ad is now:", ad);
                callback(null, ad);
            }
        },
        (newAd, callback) => {
            // look for customer by id, if not found, insert a new customer.
            Customer.
                findOne({customer_id: data.customerId}, (err, cus) => {
                    if (err) callback('error at finding matching customer: ' + err, null);

                    if (!cus) {
                        let c = new Customer({
                            customer_id: data.customerId,
                            customer_name: data.customerName,
                            first_name: data.firstName,
                            last_name: data.lastName,
                            phone: data.phone,
                            email: data.email,
                            address: data.address
                        });

                        c.save((err) => {
                            if (err) callback('error at saving new customer: ' + err, null);
                            console.log('new customer created')
                        });
                    }
                    callback(null, newAd);
                });
        },
        (newAd, callback) => {
            newAd.save(function (err) {
                if (err) callback('error at saving: ' + err, null);
                // look for customer by id, if found, push the ad to its ads reference
                Customer.
                    findOne({customer_id: data.customerId}, (err, cus) => {
                        if (cus) {
                            cus.ads.push(newAd);
    
                            cus.save((err) => {
                                console.log('customer updated');
                                newAd.customer = cus._id;
                                newAd.save((err) => {
                                    if (err) callback('error at saving > update ad customer info: ' + err, null);
                                    console.log('customer updated with new ad');
                                });
                            });
                        }
                    });
                
                callback(null, 'saving ad done');
            });
        }
    ], (err, result) => {
        if (err) {
            res.flash('error', "error creating ad post: " + err);
            res.redirect('/maintenance');
        };

        res.flash('success', 'Ad successfully created!');
        res.redirect('/maintenance');
    })
};

// Handle maintenance delete on POST
exports.maintenance_delete_post = function(req, res) {
    // Unlink the image file when deleting
    // fs.unlink("./" + req.file.path);
    Ad
        .findOneAndRemove({_id: req.params.id})
        .populate('customer')
        .exec((err, removed) => {
            if(err) {
                res.flash('error', "Error when deleting ad: " + err);
                res.redirect('/maintenance');
            }

            if (removed.image !== "") {
                // remove image file
                fs.unlinkSync("./public" + removed.image);
            }

            Customer
                .findOneAndUpdate(
                    { customer_id: removed.customer.customer_id },
                    { $pull: { ads: req.params.id } },
                    (err, removedFromCustomer) => {
                        if (err) {
                            res.flash('error', "Error when deleting customer link: " + err);
                            res.redirect('/maintenance');
                        };
                
                        res.flash('success', 'Ad successfully deleted!');
                        res.redirect('/maintenance');
                    }
                );
          
        })
};

// Display maintenance update form on GET
exports.maintenance_edit_get = function(req, res) {
    async.parallel({
        ad: (callback) => {
            Ad.
                findById(req.params.id).
                populate('category').
                populate('customer').
                populate('tags').
                exec(callback);
        },
        categories: (callback) => {
            Category.find(callback);
        }
    }, (err, results) => {
        if (err) {
            res.flash('error', "error getting edit page: " + err);
            res.redirect('/maintenance');
        }

        let classified_ads = [],
            commercial_ads = [];

        results.categories.forEach(c => {
            let returnedCat = c.toObject();
            if(results.ad.category) {
                if (c._id.toString() == results.ad.category._id.toString()) {
                    returnedCat.catSelected='true';
                }
            }

            results.ad.tags.forEach(t => {
                if (c._id.toString() == t._id.toString()) {
                    returnedCat.tagChecked='true';
                }
            })

            if (c.type == 'classified') {
                classified_ads.push(returnedCat);
            } else if (c.type == 'commercial') {
                commercial_ads.push(returnedCat);
            }
        });

        res.render('create', {
            title: 'Edit',
            ad: results.ad,
            classified_ads,
            commercial_ads
        });
    });
};

// Handle maintenance update on POST
exports.maintenance_edit_post = function(req, res) {
    let data = req.body;
    async.parallel({
        ad: (callback) => {
            // Update Ad with the new information
            let adConf = {
                order: data.order,
                title: data.title,
                description: data.description,
                ad_link: data.link,
                media_format: data.mediaFormat,
                yt_short_link: data.ytShortLink,
                yt_full_link: data.ytFullLink,
                start_date: "",
                end_date: "",
                location: data.location,
                tags: data.tags || [] 
            }
        
            if (data.category !== "") {
                adConf.category = data.category;
            }
        
            if (moment(data.startDate).isValid()) {
                adConf.start_date = moment(data.startDate).format('YYYY-MM-DD');
            }
        
            if (moment(data.endDate).isValid()) {
                adConf.end_date = moment(data.endDate).format('YYYY-MM-DD');
            }
        
            Ad.
                findOneAndUpdate(
                    { _id: req.params.id },
                    { $set: adConf },
                    (err) => {
                        if (err) { callback(err, null); }
                        callback(null, "Ad updated");
                    }
                );
        },
        customer: (callback) => {
            // Update customer. If no customer is found on the customer_id,
            // a new customer will be created
            let customerConf = {
                customer_name: data.customerName,
                first_name: data.firstName,
                last_name: data.lastName,
                phone: data.phone,
                email: data.email,
                address: data.address
            }
            Customer.
                findOneAndUpdate(
                    { customer_id: data.customerId },
                    { $set: customerConf },
                    (err, result) => {
                        if (err) { callback(err, null); }
                        callback(null, "Customer updated");
                    }
                );
        }
    }, (err, results) => {
        if (err) {
            res.flash('error', "error finish editing ad post: " + err);
            res.redirect('/maintenance/' + req.params.id + '/edit');
        }

        res.flash('success', 'Ad information successfully updated!');
        res.redirect('/maintenance');
    });
    
};