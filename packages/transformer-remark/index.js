const RemarkTransformer = require('@gridsome/transformer-remark')

const {
	GraphQLString
} = require('gridsome/graphql')


console.log(RemarkTransformer)
console.log('WUU')

class MyRemarkTransformer extends RemarkTransformer {
	extendNodeType () {
		return {
			...super.extendNodeType(),
			content: {
				type: GraphQLString,
				resolve: node => node.content
			},
			content_mdast: {
				type: GraphQLString,
				resolve: async node => JSON.stringify(await this._nodeToAST(node))
			},
			content_html: {
				type: GraphQLString,
				resolve: node => this._nodeToHTML(node)
			},
		}
	}
}

module.exports = MyRemarkTransformer
