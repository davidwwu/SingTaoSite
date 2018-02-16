import sassMiddleware from 'node-sass-middleware';
import path from 'path';
import express from 'express';
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var flash = require('express-flash-2');
var multer = require('multer');
var passport = require('passport');

import config from './config';
import apiRouter from './api';
import * as serverRender from './serverRender';
var maintenance_controller = require('./controllers/maintenanceController');
var auth_controller = require('./controllers/authController');

// Set up mongoose connection
var mongoose = require('mongoose');
var mongoDB = config.mongodbUri;
mongoose.connect(mongoDB, {
    useMongoClient: true
});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Setup storage engine
var storageEngine = multer.diskStorage({
    destination: './public/manualUploads/images/',
    filename: (req, file, callback) => {
        callback(null, 'image-' + Date.now() + path.extname(file.originalname));
    }
});
var upload = multer({ storage: storageEngine });

const server = express();

server.use(sassMiddleware({
    src: path.join(__dirname, 'sass'),
    dest: path.join(__dirname, 'public')
}));

// view engine setup
server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'pug');

server.use('/api', apiRouter);
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
    extended: false
}));
server.use(cookieParser());
server.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));
server.use(flash());
server.use(express.static('public'));
server.use(passport.initialize());
server.use(passport.session());

passport.use(auth_controller.authStrategy);
passport.serializeUser(auth_controller.authSerializer);
passport.deserializeUser(auth_controller.authDeserializer);


server.get('/new_user', (req, res) => {
    res.render('new_user');
});
server.post('/new_user', auth_controller.user_create_post);

server.get('/maintenance_login', (req, res) => {
    res.render('login');
});
// server.post('/maintenance_login', passport.authenticate('local', {
//     successRedirect: '/maintenance',
//     failureRedirect: '/maintenance_login',
//     failureFlash: true
// }));

server.post('/maintenance_login', (req, res, next) => {
    passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) { 
            res.flash('error', 'Password incorrect.');
            return res.redirect('/maintenance_login'); 
        }

        req.logIn(user, function(err) {
            if (err) { return next(err); }
            res.flash('success', 'Logged in.');
            return res.redirect('/maintenance');
        });
    })(req, res, next);
});

server.get('/maintenance_logout', auth_controller.logout);

server.get('/maintenance:query?', auth_controller.restrict, maintenance_controller.maintenance_list);

server.get('/maintenance/create', auth_controller.restrict, maintenance_controller.maintenance_create_get);
server.post('/maintenance/create', auth_controller.restrict, upload.single("image"), maintenance_controller.maintenance_create_post);

server.get('/maintenance/:id/edit', auth_controller.restrict, maintenance_controller.maintenance_edit_get);
server.post('/maintenance/:id/edit', auth_controller.restrict, maintenance_controller.maintenance_edit_post);

server.post('/maintenance/:id/delete', auth_controller.restrict, maintenance_controller.maintenance_delete_post);


let cls_cats, com_cats, slider_ads, aside_right, aside_left, top_ad;

server.use(
    (req, res, next) => {
        serverRender.serverRenderGetCats()
            .then((cats) => {
                cls_cats = cats.filter((cat) => {
                    return cat.type === 'classified'
                });
                
                com_cats = cats.filter((cat) => {
                    return cat.type === 'commercial'
                });

                next();
            })
            .catch((error) => {
                console.error(error);

                next();
            });
    }, (req, res, next) => {
        serverRender.serverRenderSliderList()
            .then((sliders) => {
                // randomize slides
                for (var i = sliders.length - 1; i > 0; i--) {
                    var j = Math.floor(Math.random() * (i + 1));
                    var temp = sliders[i];
                    sliders[i] = sliders[j];
                    sliders[j] = temp;
                }

                // // push only 10 slides in to list to ensure performance
                // if (sliders.length > 10) {
                //     slider_ads = [];
                //     for (let i = 0; i < 10; i++) {
                //         slider_ads.push(sliders[i]);
                //     }
                // } else {
                //     slider_ads = sliders;
                // }


                // revert back to unlimited
                slider_ads = sliders;

                next();
            })
    }, (req, res, next) => {
        serverRender.serverRenderTopAd()
            .then((topAd) => {
                top_ad = topAd;

                next();
            })
    }, (req, res, next) => {
        serverRender.serverRenderRightSide()
            .then((rightSideAds) => {
                aside_right = rightSideAds;

                next();
            })
    }, (req, res, next) => {
        serverRender.serverRenderLeftSide()
            .then((leftSideAds) => {
                aside_left = leftSideAds;

                next();
            })
    }
);

server.get('/' , (req, res) => {
    res.render('index', {
        type: "home",
        initialCat: null,
        initialData: [],
        cls_cats,
        com_cats,
        slider_ads,
        aside_right,
        aside_left,
        top_ad
    });

});

server.get('/classifiedAds/:cat?' , (req, res) => {
    let request = "";
    if (req.query.id) {
        request = "?id=" + req.query.id;
    } else if (req.query.page) {
        request = "?page=" + req.query.page;
    }
    serverRender.serverRender(
        {
            type: "classifiedAds", 
            path: req.params.cat ? req.params.cat : "",
            query: request
        }
    )
    .then((initialData) => {
        res.render('index', {
            type: "classifiedAds",
            initialCat: req.params.cat,
            initialData,
            cls_cats,
            com_cats,
            slider_ads,
            aside_right,
            aside_left,
            top_ad
        });
    })
    .catch((error) => 
        console.error(error));
});

server.get('/classifiedAds/all/page/:page' , (req, res) => {
    serverRender.serverRenderPage(
        {
            type: "classifiedAds", 
            page: req.params.page
        }
    )
    .then((initialData) => {
        res.render('index', {
            type: "classifiedAds",
            initialCat: req.params.cat,
            initialData,
            cls_cats,
            com_cats,
            slider_ads,
            aside_right,
            aside_left,
            top_ad
        });
    })
    .catch((error) => 
        console.error(error));
});

server.get('/commercialAds/:cat?/:id?' , (req, res) => {
    let type = "commercialAds";
    let path = "";

    if (req.params.cat) {
        path = req.params.cat;
        if (req.params.id) {
            path = req.params.cat + '/' + req.params.id
        }
    }
    serverRender.serverRender({type, path})
        .then((initialData) => {
            res.render('index', {
                type,
                initialCat: req.params.cat,
                initialData,
                cls_cats,
                com_cats,
                slider_ads,
                aside_right,
                aside_left,
                top_ad
            });
        })
        .catch((error) => 
        console.error(error));
});

server.get('/copyright', (req, res) => {
    res.render('copyright');
})

server.get('/privacy', (req, res) => {
    res.render('privacy');
})

server.get('/terms', (req, res) => {
    res.render('terms');
})

// server.use(function (err, req, res, next) {
//     console.error(err.stack);
//     res.status(404).send('Something broke!');
// });



server.listen(config.port, config.host, () => {
    console.info('Node server is running on port', config.port);
});