"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const firebase = require("firebase");
const firebase_1 = require("firebase");
const isCollectionReference = (x) => x.add !== undefined;
const isQuerySnapshot = (x) => x.size !== undefined;
const isDev = process.env.NODE_ENV === 'development';
const watch = async (ref, listener) => {
    await listener(await ref.get());
    if (isDev) {
        ;
        ref.onSnapshot(listener);
    }
};
const mapValue = (value) => {
    if (!value)
        return value;
    switch (typeof value) {
        case "string":
        case "number":
        case "boolean":
            return value;
        case "object":
            switch (value.constructor) {
                case Object:
                    return Object.fromEntries(Object.getOwnPropertyNames(value).map(p => [p, mapValue(value[p])]));
                case Array:
                    return value.map(v => mapValue(v));
                case Date:
                    return value;
                case firebase_1.firestore.Timestamp:
                    return value.toDate();
                case firebase_1.firestore.GeoPoint:
                    return {
                        lat: value.latitude,
                        long: value.longitude
                    };
                case firebase_1.firestore.DocumentReference:
                    return value.id;
            }
    }
};
const docData = (doc, parent = null) => {
    return {
        data: doc.data(),
        id: doc.id,
        ref: doc.ref,
        parent: parent,
    };
};
class FirestoreSource {
    static defaultOptions() {
        return {
            firebaseConfig: null,
            collections: []
        };
    }
    constructor(api, options = FirestoreSource.defaultOptions()) {
        if (options.firebaseConfig) {
            firebase.initializeApp(options.firebaseConfig);
        }
        api.loadSource(async (actions) => {
            const db = firebase.firestore();
            const processCollections = async (collections, parentDoc = null) => {
                const { addCollection } = actions;
                await Promise.all(collections.map(async (options) => {
                    const collection = addCollection({
                        typeName: options.typeName
                    });
                    const ref = options.ref(db, parentDoc);
                    await watch(ref, async (snapshot) => {
                        const docs = new Map((isQuerySnapshot(snapshot) ? snapshot.docs : [snapshot]).map(doc => [doc.id, docData(doc, parentDoc)]));
                        const oldIds = new Set(collection.findNodes().map(node => node.id));
                        const newIds = new Set(docs.keys());
                        const added = [...newIds].filter(newId => !oldIds.has(newId));
                        const updated = [...oldIds].filter(oldId => newIds.has(oldId));
                        const removed = [...oldIds].filter(oldId => !newIds.has(oldId));
                        for (const id of added) {
                            const doc = docs.get(id);
                            const node = mapValue({
                                ...doc.data,
                                id: doc.id,
                                _parent: parentDoc ? parentDoc.ref : null
                            });
                            collection.addNode(node);
                        }
                        for (const id of updated) {
                            const doc = docs.get(id);
                            const node = mapValue({
                                ...doc.data,
                                id: doc.id,
                                _parent: parentDoc ? parentDoc.ref : null
                            });
                            collection.updateNode(node);
                        }
                        for (const id of removed) {
                            collection.removeNode(id);
                            // Note that it's impossible to remove subcollections.
                        }
                        // OK, now we can await.
                        if (options.children) {
                            await Promise.all([...added].map(async (id) => {
                                await processCollections(options.children, docs.get(id));
                            }));
                        }
                    });
                }));
            };
            await processCollections(options.collections);
        });
    }
}
module.exports = FirestoreSource;
