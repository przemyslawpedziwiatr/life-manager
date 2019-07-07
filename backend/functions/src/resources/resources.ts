import {Quantity, Resource, ResourceDTO, ResourceType} from "../model/resources.model";
import express = require('express');
import {db} from "../tools";
import * as admin from "firebase-admin";
import {forkJoin} from "rxjs";
import {ResourceTypeWithID} from "./resources-types";
import {isObject} from 'lodash';
import {filesUpload, UploadedFile} from '../utilities/file-upload';
import {Express} from "../custom";
import RequestWithFiles = Express.RequestWithFiles;
const os = require('os');
const fs = require('fs');
const storage = admin.storage();

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
                const {name, providers, quantity, type}: ResourceDTO = <ResourceDTO>doc.data();

                return {
                    id: doc.id,
                    name,
                    providers,
                    quantity,
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
        const updatedParameters = req.body;
        const extractTypeReference = (type: ResourceTypeWithID | string) => isObject(type) ? type.id : type;
        const updatedResource: Partial<ResourceDTO> = {};

        console.log({updatedParameters});

        Object.keys(updatedParameters).forEach(paramKey => {
            Object.defineProperty(updatedResource, paramKey, {
                writable:true,
                enumerable: true,
                value: updatedParameters[paramKey]});
        });

        console.log({updatedResource});

        if(updatedResource.type) {
            updatedResource.type = updatedResource.type ?
                extractTypeReference(updatedResource.type) : updatedResource.type;
        }

        console.log({updatedResource});

        await db.collection('resources').doc(`${resourceId}`).update(updatedResource).then(doc => {
            return res.status(200).send({status: 'Resource updated!'});
        });
    });

    app.post('/resources', async (req: express.Request, res: express.Response) => {
        const body = req.body;
        const resource: ResourceDTO = {
            name: body.name,
            providers: body.providers,
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

    app.put('/resources/:id/picture', filesUpload, async (req: RequestWithFiles, res: express.Response) => {
        if(req.files && req.files.length > 0) {
            const resourceId = req.params.id;
            const file: UploadedFile = <UploadedFile>req.files[0];
            const filepath = `${os.tmpdir()}/${file.originalname}`;

            const uploadFileToFirebaseStorage = () => storage.bucket().upload(filepath,{
                destination: `resources/${resourceId}.jpg`
            });

            const removeLocalFile = () => fs.unlinkSync(filepath);

            try {
                await uploadFileToFirebaseStorage();
                await removeLocalFile();
                return res.status(200).send({
                    status: 'File uploaded and saved to FireStore!'
                });
            } catch(error) {
                return res.status(400).send({
                    status: 'Could not upload file!'
                });
            }
        }
        return res.status(404);
    });

    app.delete('/resources/:id/picture', async(req, res) => {
       const resourceId = req.params.id;

       const removeFileFromFirebaseStorage = () => storage.bucket()
           .file(`/resources/${resourceId}.jpg`)
           .delete();

       await removeFileFromFirebaseStorage().then(() => {
           return res.status(200).send({
               status: 'File removed from FireStore!'
           });
       })
    });
};
