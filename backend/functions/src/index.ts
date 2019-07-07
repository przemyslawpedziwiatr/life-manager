import * as functions from 'firebase-functions';
import { app } from "./tools";

exports.api = functions.https.onRequest(app);
