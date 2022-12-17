require('dotenv').config();
import routes from './routes';
import { connect } from './db/index';
const cors = require('cors');
const express = require('express');
var bodyParser = require("body-parser");
var cookieParser = require('cookie-parser')
const app: any = express()
const port: any = process.env.PORT;

app.set('trust proxy', true);
app.use(cors({origin: 'http://localhost:3000', credentials: true}));
app.use(cookieParser());
app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', routes);

connect().catch(err => console.log(err));

app.listen(port, () => {
    console.log(`App launch successfully : http://localhost:${port}`)
});
