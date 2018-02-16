#! /usr/bin/env node

var async = require('async');

var Category = require('./models/category');

var mongoose = require('mongoose');
var mongoDB = 'mongodb://localhost:27017/singtao-ad';
var promise = mongoose.connect(mongoDB, { useMongoClient: true });
var db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongoose.Promise = global.Promise;

var categories = [];

function categoriesCreate(cat, cat_title_cn, cat_cn, type, cb) {
    let catDetail = {
        cat,
        cat_cn,
        type
    };
    if (cat_title_cn) catDetail.cat_title_cn = cat_title_cn;
    var cat = new Category(catDetail);
    
    cat.save(function(err) {
        if (err) {
            cb(err, null);
            return;
        }

        console.log('New Category: ' + cat);
        cb(null, cat);
    });
}

function createCategories(cb) {
    async.series([
        function(callback) {
            categoriesCreate('101_102', '聘請', '公司', 'classified', callback);
        },
        function(callback) {
            categoriesCreate('106', '聘請', '餐館', 'classified', callback);
        },
        function(callback) {
            categoriesCreate('103_104', '聘請', '官家保母托兒', 'classified', callback);
        },
        function(callback) {
            categoriesCreate('105', '聘請', '衣廠', 'classified', callback);
        },
        function(callback) {
            categoriesCreate('301', '住宅租售', '住宅出租 城市 A-C', 'classified', callback);
        },
        function(callback) {
            categoriesCreate('302', '住宅租售', '住宅出租 城市 D-H', 'classified', callback);
        },
        function(callback) {
            categoriesCreate('303', '住宅租售', '住宅出租 城市 I-M', 'classified', callback);
        },
        function(callback) {
            categoriesCreate('304', '住宅租售', '住宅出租 城市 N-R', 'classified', callback);
        },
        function(callback) {
            categoriesCreate('305', '住宅租售', '住宅出租 城市 S', 'classified', callback);
        },
        function(callback) {
            categoriesCreate('306', '住宅租售', '住宅出租 城市 T-W', 'classified', callback);
        },
        function(callback) {
            categoriesCreate('307', '住宅租售', '住宅出租 城市 X-Z', 'classified', callback);
        },
        function(callback) {
            categoriesCreate('501', '住宅租售', '住宅出售 城市 A-C', 'classified', callback);
        },
        function(callback) {
            categoriesCreate('502', '住宅租售', '住宅出售 城市 D-H', 'classified', callback);
        },
        function(callback) {
            categoriesCreate('503', '住宅租售', '住宅出售 城市 I-M', 'classified', callback);
        },
        function(callback) {
            categoriesCreate('504', '住宅租售', '住宅出售 城市 N-R', 'classified', callback);
        },
        function(callback) {
            categoriesCreate('505', '住宅租售', '住宅出售 城市 S', 'classified', callback);
        },
        function(callback) {
            categoriesCreate('506', '住宅租售', '住宅出售 城市 T-W', 'classified', callback);
        },
        function(callback) {
            categoriesCreate('507', '住宅租售', '住宅出售 城市 X-Z', 'classified', callback);
        },
        function(callback) {
            categoriesCreate('200', '商業租售', '商業招租', 'classified', callback);
        },
        function(callback) {
            categoriesCreate('700', '商業租售', '商業出讓', 'classified', callback);
        },
        function(callback) {
            categoriesCreate('400', '專業經紀', '地產', 'classified', callback);
        },
        function(callback) {
            categoriesCreate('600', '專業經紀', '貸款', 'classified', callback);
        },
        function(callback) {
            categoriesCreate('818', '專業經紀', '保險', 'classified', callback);
        },
        function(callback) {
            categoriesCreate('801', '專業經紀', '福地', 'classified', callback);
        },
        function(callback) {
            categoriesCreate('804', '家居', '水電', 'classified', callback);
        },
        function(callback) {
            categoriesCreate('805', '家居', '裝修油漆', 'classified', callback);
        },
        function(callback) {
            categoriesCreate('802_803', '家居', '清潔殺蟲', 'classified', callback);
        },
        function(callback) {
            categoriesCreate('810', '商業服務', '電腦監控', 'classified', callback);
        },
        function(callback) {
            categoriesCreate('808', '商業服務', '商業', 'classified', callback);
        },
        function(callback) {
            categoriesCreate('816', '商業服務', '會計稅務', 'classified', callback);
        },
        function(callback) {
            categoriesCreate('809', '商業服務', '法律', 'classified', callback);
        },
        function(callback) {
            categoriesCreate('814', '商業服務', '命相', 'classified', callback);
        },
        function(callback) {
            categoriesCreate('813', '保健', '按摩推拿', 'classified', callback);
        },
        function(callback) {
            categoriesCreate('812', '保健', '醫藥', 'classified', callback);
        },
        function(callback) {
            categoriesCreate('815', '保健', '美容', 'classified', callback);
        },
        function(callback) {
            categoriesCreate('817', '保健', '醫生', 'classified', callback);
        },
        function(callback) {
            categoriesCreate('811', '招生', '招生', 'classified', callback);
        },
        function(callback) {
            categoriesCreate('900', '汽車運送', '二手車', 'classified', callback);
        },
        function(callback) {
            categoriesCreate('807', '汽車運送', '專車接送', 'classified', callback);
        },
        function(callback) {
            categoriesCreate('806', '汽車運送', '搬運', 'classified', callback);
        },
        function(callback) {
            categoriesCreate('1000', '其他', '姻緣', 'classified', callback);
        },
        function(callback) {
            categoriesCreate('1201', '其他', '尋人', 'classified', callback);
        },
        function(callback) {
            categoriesCreate('1200', '其他', '遺失', 'classified', callback);
        },
        function(callback) {
            categoriesCreate('1300', '其他', '啟事', 'classified', callback);
        },
        function(callback) {
            categoriesCreate('real_loan', false, '地產貸款', 'commercial', callback);
        },
        function(callback) {
            categoriesCreate('appli_cons_furn_home', false, '建築家居', 'commercial', callback);
        },
        function(callback) {
            categoriesCreate('doc_healt_hosp', false, '醫療保健', 'commercial', callback);
        },
        function(callback) {
            categoriesCreate('food_rest_super_dept', false, '餐館超市', 'commercial', callback);
        },
        function(callback) {
            categoriesCreate('auto_trans', false, '汽車運輸', 'commercial', callback);
        },
        function(callback) {
            categoriesCreate('acc_bank_insur_ivs', false, '財務保險', 'commercial', callback);
        },
        function(callback) {
            categoriesCreate('att_tax', false, '法律諮詢', 'commercial', callback);
        },
        function(callback) {
            categoriesCreate('cell_tele', false, '電子通訊', 'commercial', callback);
        },
        function(callback) {
            categoriesCreate('air_hotel_trav', false, '旅遊生活', 'commercial', callback);
        },
        function(callback) {
            categoriesCreate('fas_casino_ent', false, '時尚娛樂', 'commercial', callback);
        },
        function(callback) {
            categoriesCreate('auc_coml_edu', false, '商業教育', 'commercial', callback);
        },
        function(callback) {
            categoriesCreate('other', false, '其他', 'commercial', callback);
        },
        function(callback) {
            categoriesCreate('NO CATEGORY', false, 'NO CATEGORY', 'other', callback);
        }
    ],
    cb);
}

async.series([
    createCategories
],
// optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    //All done, disconnect from database
    mongoose.connection.close();
});



