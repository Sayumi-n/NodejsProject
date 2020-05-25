const express = require('express');
const path = require('path');

const membersRoute = require('./routes/members');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use('/members', membersRoute);

app.listen(5000);