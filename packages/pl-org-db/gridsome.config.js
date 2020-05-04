// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
	siteName: 'Demokracja Bezpośrednia',
	catchLinks: false, // Breaks on fragment identifiers with non-ASCII chars.
	permalinks: {
		trailingSlash: false,
	},
	plugins: [
		{
			use: '@pl-org-db/source-filesystem',
			options: {
				typeName: 'Person',
				baseDir: './ludzie',
				path: '*.md',
			}
		},
		{
			use: '@pl-org-db/source-filesystem',
			options: {
				typeName: 'Article',
				baseDir: './blog',
				path: '*/*.md',
				v2path: ':author__name/:name.md',
				refs: {
					author: 'Person',
				}
			}
		},
		{
			use: '@pl-org-db/source-filesystem',
			options: {
				typeName: 'Plank',
				baseDir: './program',
				path: '**/*.md',
			}
		},/*
		{
			use: '@pl-org-db/source-firestore',
			options: {
				firebaseConfig: {
					apiKey: "AIzaSyCFliXmNiMaXaDoXF2JMjRnV1eeCqmz1yE",
					authDomain: "pl-org-db.firebaseapp.com",
					databaseURL: "https://pl-org-db.firebaseio.com",
					projectId: "pl-org-db",
					storageBucket: "pl-org-db.appspot.com",
					messagingSenderId: "690869339919",
					appId: "1:690869339919:web:7b60dcdb9abdd4a3b7607a",
					measurementId: "G-K9FB4CWM6W"
				},
				collections: [
					{
						typeName: 'BlogPost',
						ref: (db => db.collection('blogposts')),
					},
				],
			},
		},*/
	],
	templates: {
		Plank: '/program/:id',
		Article: '/blog/:author/:slug',
	},
	transformers: {
		remark: {
			config: {
				commonmark: true,
			},
		}
	},
}
