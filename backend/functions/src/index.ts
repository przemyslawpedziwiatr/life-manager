import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase);

import express = require('express');

export const cors = require('cors');
export const app = express();
export const db = admin.firestore();



app.use(cors({origin: true}));

require('./resources/resources')(app);
require('./resources/resources-types')(app);

exports.api = functions.https.onRequest(app);
