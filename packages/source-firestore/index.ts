import firebase = require('firebase')
import { firestore } from 'firebase'

import * as gridsome from '@pl-org-db/types-gridsome'

type FirestoreReference<T = firestore.DocumentData> = firestore.CollectionReference<T> | firestore.DocumentReference<T>
type FirestoreSnapshot<T = firestore.DocumentData> = firestore.QuerySnapshot<T> | firestore.DocumentSnapshot<T>

const isCollectionReference = <T>(x: FirestoreReference<T>): x is firestore.CollectionReference<T> => (x as firestore.CollectionReference<T>).add !== undefined
const isQuerySnapshot = <T>(x: FirestoreSnapshot<T>): x is firestore.QuerySnapshot<T> => (x as firestore.QuerySnapshot<T>).size !== undefined

const isDev = process.env.NODE_ENV === 'development'

const watch = async <T>(ref: FirestoreReference<T>, listener: ((snapshot: FirestoreSnapshot<T>) => Promise<void>)) => {
	await listener(await ref.get())

	if (isDev) {
		;(ref.onSnapshot as (onNext: (snapshot: FirestoreSnapshot<T>) => void) => void)(listener)
	}
}

const mapValue = (value: any): any => {
	if (!value) return value
	switch (typeof value) {
		case "string":
		case "number":
		case "boolean":
			return value

		case "object":
			switch (value.constructor) {
				case Object:
					return Object.fromEntries(Object.getOwnPropertyNames(value).map(p => [p, mapValue(value[p])]))
				case Array:
					return (value as any[]).map(v => mapValue(v))
				case Date:
					return value
				case firestore.Timestamp:
					return value.toDate()
				case firestore.GeoPoint:
					return {
						lat: value.latitude,
						long: value.longitude
					}
				case firestore.DocumentReference:
					return value.id
			}
	}
}

export interface SimplifiedDocumentSnapshot<T = firestore.DocumentData> {
	data?: T
	id: string
	ref: firestore.DocumentReference<T>
	parent: SimplifiedDocumentSnapshot | null
}

const docData = <T>(doc: firestore.DocumentSnapshot<T>, parent: SimplifiedDocumentSnapshot | null = null): SimplifiedDocumentSnapshot => {
	return {
		data: doc.data(),
		id: doc.id,
		ref: doc.ref,
		parent: parent,
	}
}

interface CollectionOptions {
	typeName: string
	ref(db: firestore.Firestore, parentDoc: SimplifiedDocumentSnapshot | null): FirestoreReference
	children?: CollectionOptions[]
}

class FirestoreSource {
	static defaultOptions () {
		return {
			firebaseConfig: null as Object | null,
			collections: [] as CollectionOptions[]
		}
	}

	constructor (api: gridsome.ServerApi, options = FirestoreSource.defaultOptions()) {
		if (options.firebaseConfig) {
			firebase.initializeApp(options.firebaseConfig)
		}

		api.loadSource(async (actions) => {
			const db = firebase.firestore()

			const processCollections = async (collections: CollectionOptions[], parentDoc: SimplifiedDocumentSnapshot | null = null) => {
				const { addCollection } = actions

				await Promise.all(collections.map(async options => {
					const collection = addCollection({
						typeName: options.typeName
					})

					const ref = options.ref(db, parentDoc)

					await watch(ref, async snapshot => {
						const docs = new Map<string, SimplifiedDocumentSnapshot>((isQuerySnapshot(snapshot) ? snapshot.docs : [snapshot]).map(doc => [doc.id, docData(doc, parentDoc)]))

						const oldIds = new Set<string>(collection.findNodes().map(node => node.id))
						const newIds = new Set<string>(docs.keys())

						const added = [...newIds].filter(newId => !oldIds.has(newId))
						const updated = [...oldIds].filter(oldId => newIds.has(oldId))
						const removed = [...oldIds].filter(oldId => !newIds.has(oldId))

						for (const id of added) {
							const doc = docs.get(id)!
							const node = mapValue({
								...doc.data,
								id: doc.id,
								_parent: parentDoc ? parentDoc.ref : null
							})
							collection.addNode(node)
						}

						for (const id of updated) {
							const doc = docs.get(id)!
							const node = mapValue({
								...doc.data,
								id: doc.id,
								_parent: parentDoc ? parentDoc.ref : null
							})
							collection.updateNode(node)
						}

						for (const id of removed) {
							collection.removeNode(id)
							// Note that it's impossible to remove subcollections.
						}

						// OK, now we can await.

						if (options.children) {
							await Promise.all([...added].map(async id => {
								await processCollections(options.children!, docs.get(id))
							}))
						}
					})
				}))
			}
			await processCollections(options.collections)
		})
	}
}

module.exports = FirestoreSource
