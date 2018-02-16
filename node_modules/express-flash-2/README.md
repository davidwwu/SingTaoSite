# express-flash-2 [![Build Status](https://travis-ci.org/jack2gs/express-flash-2.svg?branch=master)](https://travis-ci.org/jack2gs/express-flash-2)

This middleware is based on `connect-flash`. I simplify it and rewite the tests with `Mocha` and `Chai`.

* use `res.flash()` instead of `req.flash()`;
* res.flash() just for writing messages into the sesson;
* all flash messages will be copied to `res.locals.flash` automatically.

## Install

    $ npm install express-flash-2

## Usage

#### Express 4.x

Flash messages are stored in the session.  First, setup sessions as usual by
enabling `cookieParser` and `session` middleware.  Then, use `flash` middleware
provided by express-flash-2.

```javascript
var flash = require('express-flash-2');
var app = express();

  app.use(cookieParser('keyboard cat'));
  app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized:true}));
 // use  the flash middleware 
  app.use(flash());
```

With the `flash` middleware in place, all requests will have a `res.flash()` function
that can be used for flash messages.

```javascript
app.get('/flash', function(req, res){
  // Set a flash message by passing the key, followed by the value, to res.flash().
  res.flash('info', 'Flash is back!')
  res.redirect('/');
});
```

## Examples

For an example using express-flash-2 in an Express 4.x app, refer to the [express4](https://github.com/jack2gs/express-flash-2/tree/master/examples/express4)
example.

## Tests

    $ npm install  
    $ make test

## Credits

  - [Jared Hanson](http://github.com/jaredhanson)
  - [TJ Holowaychuk](https://github.com/visionmedia)

## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2012-2013 Jared Hanson <[http://jaredhanson.net/](http://jaredhanson.net/)>
