import express = require('express');
import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

admin.initializeApp(functions.config().firebase);

export const cors = require('cors');
export const app = express();
export const db = admin.firestore();

app.use(cors({origin: true}));

require('./resources/resources')(app);
require('./resources/resources-types')(app);
require('./resources/resources-providers')(app);
