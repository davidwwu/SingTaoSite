import express from 'express';
import { MongoClient } from 'mongodb';
import assert from 'assert';
import config from '../config';
import { request } from 'https';
var moment = require('moment');
var Ad = require('../models/ad');
var Category = require('../models/category');

let mdb;
let listLength = 10;
let lastUpdate;
MongoClient.connect(config.mongodbUri, (err, db) => {
    
    assert.equal(null,err);

    mdb = db;
})

const router = express.Router();

router.use((req, res, next) => {
    mdb.collection('ads').findOne({ lastUpdate: { $exists: true }}, (err, lu) => {
        assert.equal(null, err);
        // then use the last update date to fetch the ads accordingly
        lastUpdate = lu.lastUpdate;
        
        next();
    });
})

// Note: only return ads that are not expired
router.get('/get_categories', (req, res) => {
    Category
        .find()
        .select('_id cat cat_cn cat_title_cn type')
        .sort( '_id' )
        .exec((err, cats) => {
            if (err) console.log('error getting categories: ', err);
            res.send(cats);
        });
})

router.get('/get_manual_uploads', (req, res) => {
    Ad
        .find({
            uploaded_manually: true
        })
        .populate('category')
        .populate('tags')
        .exec((err, muAds) => {
            if (err) console.log('error getting full manual upload list: ', err);
            res.send(muAds);
        });
})

router.get('/get_manual_uploads/top_ad', (req, res) => {
    Ad
    .findOne({
        uploaded_manually: true,
        location: 'top',
        $and: [
            {
                start_date: { $lte : moment().format('YYYY-MM-DD') }
            },
            {
                $or: [
                    { end_date: { $gte : moment().format('YYYY-MM-DD') } },
                    { end_date: "" }
                ]
            }
        ]
    }, {
        ad_link: 1,
        image: 1,
        title: 1
    }
    )
    .populate('tags')
    .exec((err, sideAds) => {
        if (err) console.log('error getting top ad: ', err);
        res.send(sideAds);
    });
})

router.get('/get_manual_uploads/slider', (req, res) => {
    Ad
        .find({
            uploaded_manually: true,
            location: 'slider',
            $and: [
                {
                    start_date: { $lte : moment().format('YYYY-MM-DD') }
                },
                {
                    $or: [
                        { end_date: { $gte : moment().format('YYYY-MM-DD') } },
                        { end_date: "" }
                    ]
                }
            ]
        })
        .populate('tags')
        .exec((err, sliderAds) => {
            if (err) console.log('error getting full manual upload list: ', err);
            res.send(sliderAds);
        });
})

router.get('/get_manual_uploads/aside/:leftRight', (req, res) => {
    Ad
    .find({
        uploaded_manually: true,
        location: 'aside-' + req.params.leftRight,
        $and: [
            {
                start_date: { $lte : moment().format('YYYY-MM-DD') }
            },
            {
                $or: [
                    { end_date: { $gte : moment().format('YYYY-MM-DD') } },
                    { end_date: "" }
                ]
            }
        ]
    }, {
        ad_link: 1,
        image: 1,
        title: 1
    }
    )
    .sort('order')
    .populate('tags')
    .exec((err, sideAds) => {
        if (err) console.log('error getting left/right ads: ', err);
        res.send(sideAds);
    });
})

// Note: only return ads that are not expired
router.get('/commercialAds/:cat?', (req, res) => {
    Ad
        .find({
            uploaded_manually: true,
            location: "commercial",
            $and: [
                {
                    start_date: { $lte : moment().format('YYYY-MM-DD') }
                },
                {
                    $or: [
                        { end_date: { $gte : moment().format('YYYY-MM-DD') } },
                        { end_date: "" }
                    ]
                }
            ]
        })
        .sort({ _id: -1})
        .populate('category')
        .populate('tags')
        .exec((err, muAds) => {

            if (req.params.cat) {
                let filteredAds = muAds.filter((ad) => {
                    return ad.category.cat == req.params.cat;
                });
                res.send(filteredAds);
            } else {
                res.send(muAds);
            }
        });
})

router.get('/classifiedAds', (req, res) => {
    mdb.collection('ads')
    .find({
        date_inserted: lastUpdate,
        type: 'classified'
    })
    .toArray((err, ads) => {
        assert.equal(null, err);
        res.send(ads);
    });
    
})

router.get('/classifiedAds/all/page/:page', (req, res) => {
    mdb.collection('ads')
    .find({
        date_inserted: lastUpdate,
        type: 'classified'
    })
    .skip( (req.params.page-1) * listLength )
    .limit(listLength)
    .toArray((err, ads) => {
        assert.equal(null, err);
        res.send(ads);
    });
})

router.get('/classifiedAds/:class', (req, res) => {
    if (req.query.id) {
        mdb.collection('ads')
            .find(
                {
                    ad_id: req.query.id,
                    type: "classified",
                    date_inserted: lastUpdate, 
                    cat: req.params.class
                }
            )
            .toArray((err, docs) => {
                assert.equal(null, err);
                res.send(docs);
            });
    } else if (req.query.page) {
        // need fixing
        mdb.collection('ads')
            .find(
                {
                    ad_id: req.query.id,
                    type: "classified",
                    date_inserted: lastUpdate, 
                    cat: req.params.class
                }
            )
            .toArray((err, docs) => {
                assert.equal(null, err);
                res.send(docs);
            });
    } else {
        mdb.collection('ads')
            .find(
                {
                    type: "classified",
                    date_inserted: lastUpdate, 
                    cat: req.params.class
                }
            )
            .toArray((err, docs) => {
                assert.equal(null, err);
                res.send(docs);
            });
    }
    

})

export default router;