import express = require('express');
import {db} from "../tools";
import { Discount } from '../model/discounts.model';
import * as admin from 'firebase-admin';


module.exports = function (app: express.Application) {
  app.get('/discounts', async(req: express.Request, res: express.Response) => {
    const discounts = db.collection('discounts').get();

    let fetchedDiscounts: Array<Discount> = [];

    const extractDiscounts = (discountsSnapshot: admin.firestore.QuerySnapshot) => {
      return discountsSnapshot.docs.map((doc) => {
        return <Discount>doc.data();
      })
    }

    console.log(fetchedDiscounts);
    return await discounts.then((values) => {
      console.log(values);
      // @ts-ignore
      fetchedDiscounts = extractDiscounts(values);
      console.log(fetchedDiscounts);
      return res.status(200).send(fetchedDiscounts);
    }).catch((err) => {
      return res.status(400).send();
    })
  });

}
