import { MongoClient } from 'mongodb';
import assert from 'assert';
import fs from 'fs';
import extract from 'extract-zip';

import config from './config';

var moment = require('moment');

let today = moment().format('YYYYMMDD');
let tomorrow = moment().add(1, 'day').format('YYYYMMDD');
let counter = 0;
let insertCount = 0;

let extractPromise = new Promise ((resolve, reject) => {
    extract('/home/singtao-ftp/ftp/files/' + tomorrow + '.zip', {dir: '/opt/singtao-ad/public/ads/' + tomorrow}, err => {
        if (err) {
            reject(err);
        } else {
            resolve("Zip file has successfully unzipped.");
        }
    });
});

extractPromise.then(success => {
    console.log(success);
    MongoClient.connect(config.mongodbUri, (err, db) => {
        assert.equal(null, err);
    
        let buf=fs.readFileSync('/opt/singtao-ad/public/ads/' + tomorrow + '/webclass.txt');
      
        let insertPromist = new Promise ((resolve, reject) => {
            buf.toString().split("\n").forEach((line) => {
                // preserve webclass line array
                let webclassArr;
                webclassArr = line.split(/^"|"$|","/).filter(text => text != '');
                
                //preserve class
                let cls;
                if (webclassArr[0]) {
                    counter++;
                    insertCount++;
                    if (webclassArr[2] == "101" || webclassArr[2] == "102") {
                        cls = "101_102";
                    } else if (webclassArr[2] == "103" || webclassArr[2] == "104") {
                        cls = "103_104";
                    } else if (webclassArr[2] == "802" || webclassArr[2] == "803") {
                        cls = "802_803";
                    } else {
                        cls = webclassArr[2];
                    }

                    // preserve text
                    let textBuf;
                    let textArray;
                    let title;
                    let descArray;
                    textBuf = fs.readFileSync("/opt/singtao-ad/public/ads/" + tomorrow + "/" + webclassArr[0] + ".txt");
                    textArray = textBuf.toString().split(/\r|\n/).filter(text => text != '');
                    if (textArray[0] != '') {
                        title = textArray[0];
                        descArray = textArray.slice(1);
                    } else {
                        title = textArray[1];
                        descArray = textArray.slice(2);
                    }

                    // preserve ad_id
                    let ad_id = webclassArr[0];
                    db.collection('categories').findOne({cat: cls}).then((cat) => {
                        db.collection('ads').insertOne({
                            ad_id,
                            date_inserted: tomorrow,
                            cat: cat.cat,
                            cat_title_cn: cat.cat_title_cn,
                            cat_cn: cat.cat_cn,
                            type: cat.type,
                            title: title,
                            description: descArray,
                            image: "/ads/" + tomorrow + "/" + ad_id + ".jpg",
                            locations: ["classified"],
                            tags: []
                        }).then(() => {
                            if (--counter === 0) {
                                resolve("entries successfully inserted");
                            }
                        });
                    });
                }
                
            });
            
        });
    
        insertPromist.then((success) => {
            console.log('[ ' + insertCount + ' ] ' + success + ' - ' + moment().toString());
            db.collection('ads')
                .updateOne(
                    { lastUpdate: { $exists: true } },
                    { $set: { lastUpdate: tomorrow }},
                    { upsert: true },
                    (err, result) => {
                        console.log('Last Update: ' + today);
                        db.close();
                    }
                )
        });
        
    });
}).catch(reject => {
    console.error(reject);
});
