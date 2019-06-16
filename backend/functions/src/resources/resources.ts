import {Quantity, Resource, ResourceDTO, ResourceType} from "../model/resources.model";
import express = require('express');
import {db} from "../index";
import * as admin from "firebase-admin";
import {forkJoin} from "rxjs";
import {ResourceTypeWithID} from "./resources-types";
import {isObject} from 'lodash';
import { filesUpload } from '../utilities/file-upload';
import Request = Express.Request;

interface ResourceWithId extends Resource {
    id: string;
}



module.exports = function (app: express.Application) {
    app.get('/resources', async (req: express.Request, res: express.Response) => {
        const resources = db.collection('resources').get();
        const types = db.collection('resources-types').get();
        let fetchedTypes: Array<ResourceTypeWithID> = [];
        let allDocuments: Array<ResourceWithId> = [];

        const resourceTypeFromFetchedTypes = (type: string) => {
            const foundType = fetchedTypes.find(t => t.id === type);
            return {
                id: foundType !== undefined ? foundType.id : '',
                name: foundType !== undefined ? foundType.name : "",
                namePL: foundType !== undefined ? foundType.namePL : ""
            } as ResourceTypeWithID;
        };

        const getTypes = (typesSnapshot: admin.firestore.QuerySnapshot) => {
            return typesSnapshot.docs.map((doc: { id: any; data: () => Object; }) => {
                return {
                    id: doc.id,
                    ...<ResourceType>doc.data()
                };
            });
        };

        const mergeDocuments = (querySnapshot: admin.firestore.QuerySnapshot) => {
            return querySnapshot.docs.map((doc) => {
                const {name, providers, quantity, pictureUrl, type}: ResourceDTO = <ResourceDTO>doc.data();

                return {
                    id: doc.id,
                    name,
                    providers,
                    quantity,
                    pictureUrl,
                    type: resourceTypeFromFetchedTypes(type)
                };
            });
        };

        return await forkJoin(resources, types).toPromise().then((values) => {
            fetchedTypes = getTypes(values[1]);
            allDocuments = mergeDocuments(values[0]);
            return res.status(200).send(allDocuments);
        });

    });

    app.put('/resources/:id', async (req: express.Request, res: express.Response) => {
        const resourceId = req.params.id;
        const body = req.body;
        const extractTypeReference = (type: ResourceTypeWithID | string) => isObject(type) ? type.id : type;

        const resource: ResourceDTO = {
            name: body.name,
            providers: body.providers,
            pictureUrl: body.pictureUrl,
            quantity: body.quantity,
            type: extractTypeReference(body.type)
        };

        await db.collection('resources').doc(`${resourceId}`).set(resource).then(doc => {
            return res.status(200).send({status: 'Resource updated!'});
        });
    });

    app.post('/resources', async (req: express.Request, res: express.Response) => {
        const body = req.body;
        const resource: ResourceDTO = {
            name: body.name,
            providers: body.providers,
            pictureUrl: body.pictureUrl,
            quantity: Quantity.LOW,
            type: ''
        } as ResourceDTO;

        await db.collection('resources').add(resource).then(doc => {
            return res.status(200).send(doc);
        });
    });

    app.delete('/resources/:id', async (req: express.Request, res: express.Response) => {
        const resourceId = req.params.id;

        await db.collection('resources').doc(`${resourceId}`).delete().then(doc => {
            return res.status(200).send('Resource removed!');
        }).catch((data) => {
            return res.status(500).send(data);
        })
    });

    app.put('/resources/:id/image', filesUpload, async (req: Request, res: express.Response) => {
        const resourceId = req.params.id;
        const {files} = req;

        const storage = admin.storage();
        storag.bucket().upload('file',{
            contentType: 'image/jpeg',
            destination: 'file.png'
        })
        // upload file to stoarge
        // get file url
        // add url to collection
    });
}
