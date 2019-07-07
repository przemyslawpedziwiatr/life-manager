import express = require('express');
import { db } from "../tools";
import * as admin from 'firebase-admin';
import { ResourceType } from "../model/resources.model";

export interface ResourceTypeWithID extends ResourceType {
    id: string;
}

module.exports = function (app: express.Application) {
    app.get('/resources/types', async (req: express.Request, res: express.Response) => {

        return await db.collection('resources-types').get().then((querySnapshot: admin.firestore.QuerySnapshot) => {
            const transformData = (doc: admin.firestore.QueryDocumentSnapshot) => {
                return {
                    id: doc.id,
                    ...<ResourceType>doc.data()
                };
            };

            const resourceTypes = querySnapshot.docs.map(transformData);
            return res.status(200).send(resourceTypes);
        })
    });

    app.post('/resources/types', async(req: express.Request, res: express.Response) => {
        const body = req.body;
        const resource: ResourceType = {
            name: body.name,
            namePL: body.namePL
        } as ResourceType;

        await db.collection('resources-types').add(resource).then(doc => {
            return res.status(200).send(doc);
        });
    });
};
