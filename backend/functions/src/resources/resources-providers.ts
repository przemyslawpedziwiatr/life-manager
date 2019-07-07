import express = require('express');
import { db } from "../tools";
import * as admin from 'firebase-admin';
import { ProductProvider } from "../model/resources.model";

export interface ProductProviderWithId extends ProductProvider {
    id: string;
}

module.exports = function (app: express.Application) {
    const resourcesCollection = db.collection('resources-providers');

    const convertSnapshotToProviders = (querySnapshot: admin.firestore.QuerySnapshot) => {
        const transformData = (doc: admin.firestore.QueryDocumentSnapshot) => {
            return {
                id: doc.id,
                ...<ProductProvider>doc.data()
            };
        };
        return querySnapshot.docs.map(transformData);
    };

    app.get('/dictionaries/providers', async (req: express.Request, res: express.Response) => {

        return await db.collection('resources-providers').get().then((querySnapshot: admin.firestore.QuerySnapshot) => {
            const productProviders = convertSnapshotToProviders(querySnapshot);
            return res.status(200).send(productProviders);
        })
    });

    app.put('/dictionaries/providers', async (req: express.Request, res: express.Response) => {
        const sentProviders: Array<ProductProviderWithId> = req.body;
        const serverProvidersSnapshot = await resourcesCollection.get();
        const existingProviders: Array<ProductProviderWithId> = convertSnapshotToProviders(serverProvidersSnapshot);

        const isExistingNotInSent = (existing: ProductProviderWithId) => {
            return sentProviders.every(sp => sp.id !== existing.id)
        };

        const isSentNotInExisting = (sent: ProductProviderWithId) => {
            return existingProviders.every(ep => sent.id !== ep.id)
        };

        const isInExisting = (provider: ProductProviderWithId) => {
            return existingProviders.some(sp => sp.id === provider.id)
        }

        const providersToRemove = existingProviders.filter(isExistingNotInSent);
        const providersToAdd = sentProviders.filter(isSentNotInExisting);
        const providersToUpdate = sentProviders.filter(isInExisting);

        for(const provider of providersToRemove) {
            await resourcesCollection.doc(provider.id).delete();
        }

        return res.status(200).send({
            sentProviders,
            existingProviders,
            toRemove: providersToRemove.map(p => p.id),
            toAdd: providersToAdd,
            toUpdate: providersToUpdate.map(p => p.id)
        })
    });

    app.post('/dictionaries/providers', async(req: express.Request, res: express.Response) => {
        try {
            const body = req.body;

            const productProvider: ProductProvider = {
                name: body.name,
                color: body.color
            } as ProductProvider;

            await db.collection('resources-providers').add(productProvider).then(doc => {
                return res.status(200).send({
                    status: `Product Provider ${body.name} added!`
                });
            });
        } catch(error) {
            console.log({error});
            return res.status(400).send({
                status: 'Error adding provider...',
                error: error.message
            })
        }
        return res.status(400).send({
            status: 'Unknown error adding provider...'
        })
    });
};
