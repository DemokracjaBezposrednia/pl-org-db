export type NodeOptions = any

export interface Collection {
	findNodes(query?: any): { id: string }[]
	getNodeById(id: string): { id: string }
	addNode(options: NodeOptions): void
	updateNode(options: NodeOptions): void
	removeNode(id: NodeOptions): void
    addReference(fieldName: string, typeName: string): void
}

import { LoadSourceActions as BaseLoadSourceActions } from '@tyankatsu0105/types-gridsome/dist/dataStore'

export interface LoadSourceActions extends BaseLoadSourceActions {
    addCollection(options: { typeName: string } | string): Collection
	getCollection(typeName: string): Collection | null
	createReference(typeName: string, id: any): unknown
}

import { Server } from '@tyankatsu0105/types-gridsome'
type BaseServerApi = Parameters<Server>[0]

export interface ServerApi extends BaseServerApi {
    loadSource(callback: (actions: LoadSourceActions) => void): void
}
