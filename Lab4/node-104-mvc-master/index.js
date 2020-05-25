const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const adminRouters = require('./routes/admin');
const shopRouters = require('./routes/shop');
const rootDirectory = require('./util/path');

const app = express();

app.use(bodyParser.urlencoded({extended:false}));

app.set('view engine', 'ejs');
app.set('views', 'views');

//serve file statically
app.use(express.static(path.join(__dirname, 'public')))

//middleware
app.use('/admin',adminRouters);
app.use(shopRouters);

// catch all middleware
app.use((req,res,next)=>{
    res.render('404', {
        someTitle: 'HEY!!!! PAGE NOT FOUND!',
        pageTitle: 'Page not found'
    });
});

app.listen(5000);
