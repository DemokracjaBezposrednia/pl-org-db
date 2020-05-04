import * as path from 'path'
import { promises as fs } from 'fs'
import slash = require('slash')
import { lookup as checkType } from 'mime-types'
import { watch } from 'chokidar'

import * as gridsome from '@pl-org-db/types-gridsome'

const isDev = process.env.NODE_ENV === 'development'

interface Ref {
	typeName: string
	create: boolean
}

function loadRefs (rawRefs: any, defaultTypeName: string) {
	const refs = new Map<string, Ref>()
	for (const key in rawRefs) {
		let ref = rawRefs[key]
		if (typeof ref === 'string') {
			ref = { typeName: ref, create: false }
		}

		refs.set(key, {
			typeName: ref.typeName ?? defaultTypeName,
			create: ref.create ? true : false,
		})
	}
	return refs
}

export default class FilesystemSource {
	private context: string
	private path: string
	private refs: Map<string, Ref>
	private refsCache: Set<string>

	static defaultOptions () {
		return {
			typeName: 'FileNode',
			baseDir: undefined,
			path: undefined,
			refs: {}
		}
	}

	constructor (api: gridsome.ServerApi, options: any) {
		const typeName = options.typeName
		this.context = options.baseDir ? (api as any).resolve(options.baseDir) : (api as any).context
		this.path = options.path
		this.refs = loadRefs(options.refs, typeName)
		this.refsCache = new Set()

		api.loadSource(async (actions) => {
			const collection = this.createCollections(typeName, actions)
			await this.watchFiles(collection, actions)
		})
	}

	createCollections (typeName: string, {addCollection}: gridsome.LoadSourceActions) {
		const collection = addCollection({
			typeName,
		})

		for (const [fieldName, ref] of this.refs) {
			collection.addReference(fieldName, ref.typeName)

			if (ref.create) {
				addCollection({
					typeName: ref.typeName,
				})
			}
		}

		return collection
	}

	async watchFiles (collection: gridsome.Collection, actions: gridsome.LoadSourceActions) {
		const watcher = watch(this.path, {
			cwd: this.context,
		})

		watcher.on('add', async file => {
			const options = await this.nodeData(slash(file))
			const node = collection.addNode(options)
			this.createNodeRefs(node, actions)
		})

		watcher.on('change', async file => {
			const options = await this.nodeData(slash(file))
			const node = collection.updateNode(options)
			this.createNodeRefs(node, actions)
		})

		watcher.on('unlink', file => {
			collection.removeNode({
				'internal.origin': path.join(this.context, slash(file))
			})
		})

		await new Promise((resolve, reject) => {
			watcher.on('ready', () => {
				if (!isDev) {
					watcher.close()
				}

				resolve()
			})
		})
	}

	async nodeData (file: string) {
		const origin = path.join(this.context, file)
		const content = await fs.readFile(origin, {encoding: 'utf8'})
		const { dir, name, ext = '' } = path.parse(file)
		const mimeType = checkType(file) || `application/x-${ext.replace('.', '')}`

		return {
			id: dir ? `${dir}/${name}` : name,
			author: dir,
			name: name,
			slug: name.replace(/ /g, '-'),
			internal: {
				mimeType,
				content,
				origin
			}
		}
	}

	createNodeRefs (node: any, {getCollection}: gridsome.LoadSourceActions) {
		for (const [fieldName, ref] of this.refs) {
			if (node && node[fieldName] && ref.create) {
				const values = node[fieldName]

				for (const value of (Array.isArray(values) ? values : [values])) {
					const cacheKey = `${ref.typeName}-${fieldName}-${value}`

					if (!this.refsCache.has(cacheKey) && value) {
						this.refsCache.add(cacheKey)

						getCollection(ref.typeName)!.addNode({ id: value, title: value })
					}
				}
			}
		}
	}
}

module.exports = FilesystemSource
