"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs_1 = require("fs");
const slash = require("slash");
const mime_types_1 = require("mime-types");
const chokidar_1 = require("chokidar");
const isDev = process.env.NODE_ENV === 'development';
function loadRefs(rawRefs, defaultTypeName) {
    var _a;
    const refs = new Map();
    for (const key in rawRefs) {
        let ref = rawRefs[key];
        if (typeof ref === 'string') {
            ref = { typeName: ref, create: false };
        }
        refs.set(key, {
            typeName: (_a = ref.typeName) !== null && _a !== void 0 ? _a : defaultTypeName,
            create: ref.create ? true : false,
        });
    }
    return refs;
}
class FilesystemSource {
    constructor(api, options) {
        Object.defineProperty(this, "context", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "path", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "refs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "refsCache", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        const typeName = options.typeName;
        this.context = options.baseDir ? api.resolve(options.baseDir) : api.context;
        this.path = options.path;
        this.refs = loadRefs(options.refs, typeName);
        this.refsCache = new Set();
        api.loadSource(async (actions) => {
            const collection = this.createCollections(typeName, actions);
            await this.watchFiles(collection, actions);
        });
    }
    static defaultOptions() {
        return {
            typeName: 'FileNode',
            baseDir: undefined,
            path: undefined,
            refs: {}
        };
    }
    createCollections(typeName, { addCollection }) {
        const collection = addCollection({
            typeName,
        });
        for (const [fieldName, ref] of this.refs) {
            collection.addReference(fieldName, ref.typeName);
            if (ref.create) {
                addCollection({
                    typeName: ref.typeName,
                });
            }
        }
        return collection;
    }
    async watchFiles(collection, actions) {
        const watcher = chokidar_1.watch(this.path, {
            cwd: this.context,
        });
        watcher.on('add', async (file) => {
            const options = await this.nodeData(slash(file));
            const node = collection.addNode(options);
            this.createNodeRefs(node, actions);
        });
        watcher.on('change', async (file) => {
            const options = await this.nodeData(slash(file));
            const node = collection.updateNode(options);
            this.createNodeRefs(node, actions);
        });
        watcher.on('unlink', file => {
            collection.removeNode({
                'internal.origin': path.join(this.context, slash(file))
            });
        });
        await new Promise((resolve, reject) => {
            watcher.on('ready', () => {
                if (!isDev) {
                    watcher.close();
                }
                resolve();
            });
        });
    }
    async nodeData(file) {
        const origin = path.join(this.context, file);
        const content = await fs_1.promises.readFile(origin, { encoding: 'utf8' });
        const { dir, name, ext = '' } = path.parse(file);
        const mimeType = mime_types_1.lookup(file) || `application/x-${ext.replace('.', '')}`;
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
        };
    }
    createNodeRefs(node, { getCollection }) {
        for (const [fieldName, ref] of this.refs) {
            if (node && node[fieldName] && ref.create) {
                const values = node[fieldName];
                for (const value of (Array.isArray(values) ? values : [values])) {
                    const cacheKey = `${ref.typeName}-${fieldName}-${value}`;
                    if (!this.refsCache.has(cacheKey) && value) {
                        this.refsCache.add(cacheKey);
                        getCollection(ref.typeName).addNode({ id: value, title: value });
                    }
                }
            }
        }
    }
}
exports.default = FilesystemSource;
module.exports = FilesystemSource;
